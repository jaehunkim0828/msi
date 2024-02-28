import { NextResponse, NextRequest } from "next/server";
import { createTransport } from "nodemailer";

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
  const data: any = await req.json();

  await transporter.sendMail({
    from: "kkaa81@naver.com",
    to: "spamforwilliamyskim@gmail.com",
    subject: "[MSI]메일 문의",
    html: `
      <p style="width: 100%; white-space: pre-wrap;">
        <div>제품: ${data.mecanic}\n</div>
        <div>회사명: ${data.company}\n</div>
        <div>부서명: ${data.department}\n</div>
        <div>담당자명: ${data.manager}\n</div>
        <div>회신 이메일: ${data.email}\n</div>
      </p>
    `,
  });

  return NextResponse.json("Done");
}
