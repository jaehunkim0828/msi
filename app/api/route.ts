import { NextResponse, NextRequest } from "next/server";
import { createTransport } from "nodemailer";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

const transporter = createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export async function POST(req: NextRequest) {
  let mailSent = false;
  let dbSaved = false;
  let mailError: any = null;
  let dbError: any = null;

  try {
    const data: any = await req.json();

    // 두 명에게 메일 전송    
    const recipients = ["Ys.kim@msinter.co.kr"];

    // 메일 전송과 DB 저장을 독립적으로 실행 (Best Effort)
    const mailPromise = transporter
      .sendMail({
        from: "jhunkim0828@gmail.com",
        to: recipients.join(", "),
        subject: "[MSI]메일 문의",
        html: `
          <p style="width: 100%; white-space: pre-wrap;">
            <div>문의 유형: ${data.type}\n</div>
            <div>제품: ${data.mecanic}\n</div>
            <div>회사명: ${data.company}\n</div>
            <div>부서명: ${data.department}\n</div>
            <div>담당자명: ${data.manager}\n</div>
            <div>회신 이메일: ${data.email}\n</div>
            <div>내용: ${data.content}\n</div>
          </p>
        `,
      })
      .then(() => {
        mailSent = true;
        console.log("✅ 메일 전송 성공");
      })
      .catch((err) => {
        mailError = err;
        console.error("❌ 메일 전송 실패:", err);
      });

    const dbPromise = prisma.contactInquiry
      .create({
        data: {
          type: data.type,
          product: data.mecanic,
          company: data.company,
          department: data.department,
          manager: data.manager,
          email: data.email,
          content: data.content,
        },
      })
      .then(() => {
        dbSaved = true;
        console.log("✅ DB 저장 성공");
      })
      .catch((err) => {
        dbError = err;
        console.error("❌ DB 저장 실패:", err);
      });

    // 두 작업이 모두 완료될 때까지 대기
    await Promise.all([mailPromise, dbPromise]);

    // 둘 다 실패하면 에러 반환
    if (!mailSent && !dbSaved) {
      return NextResponse.json(
        {
          error: "메일 전송 및 DB 저장 모두 실패",
          mailError: mailError?.message,
          dbError: dbError?.message,
        },
        { status: 500 }
      );
    }

    // 하나라도 성공하면 성공으로 처리
    return NextResponse.json({
      success: true,
      message: "문의가 접수되었습니다.",
      mailSent,
      dbSaved,
      ...(mailError && { mailWarning: "메일 전송 실패" }),
      ...(dbError && { dbWarning: "DB 저장 실패" }),
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "서버 오류",
        details: error.message,
        mailSent,
        dbSaved,
      },
      { status: 500 }
    );
  }
}
