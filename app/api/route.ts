import { NextResponse, NextRequest } from "next/server";
import { createTransport } from "nodemailer";
import { prisma } from "@/lib/prisma";
import { calculateServicePriority } from "@/lib/priority";

export const dynamic = "force-dynamic";

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
    const isService = data.type === "서비스";

    // 서비스 문의: 우선순위 자동 산정
    let priority: string | null = null;
    if (isService && data.lineStatus && data.issueType) {
      const result = calculateServicePriority(data.lineStatus, data.issueType);
      priority = result.priority;
    }

    const recipients = ["Ys.kim@msinter.co.kr", "sh.cho@msinter.co.kr"];
    // const recipients = ["kkaa81@naver.com"];

    // 유형별 이메일 제목 + 본문
    const subject = isService
      ? `[MSI] 서비스 문의 [${priority}] - ${data.company}`
      : `[MSI] 영업 장비 문의 - ${data.company}`;

    const html = isService
      ? buildServiceEmail(data, priority)
      : buildProductEmail(data);

    // 메일 전송과 DB 저장을 독립적으로 실행
    const mailPromise = transporter
      .sendMail({
        from: "jhunkim0828@gmail.com",
        to: recipients.join(", "),
        subject,
        html,
      })
      .then(() => {
        mailSent = true;
        console.log("메일 전송 성공");
      })
      .catch((err) => {
        mailError = err;
        console.error("메일 전송 실패:", err);
      });

    const telegramPromise = (async () => {
      await sendTelegramMessage(
        isService ? buildServiceTelegram(data, priority) : buildProductTelegram(data)
      );
      if (isService && data.attachments) {
        try {
          const urls: string[] = JSON.parse(data.attachments);
          if (urls.length > 0) await sendTelegramAttachments(urls);
        } catch (e) {
          console.error("첨부파일 파싱 실패:", e);
        }
      }
    })().catch((err: any) => {
      console.error("텔레그램 전송 실패:", err);
    });

    const dbPromise = prisma.contactInquiry
      .create({
        data: {
          type: data.type,
          company: data.company,
          manager: data.manager,
          email: data.email,
          phone: data.phone,
          position: data.position || null,
          content: data.content,
          // 제품 전용
          product: data.product || null,
          inquiryType: data.inquiryType || null,
          expectedTimeline: data.expectedTimeline || null,
          currentEquipment: data.currentEquipment || null,
          productionVolume: data.productionVolume || null,
          budgetRange: data.budgetRange || null,
          // 서비스 전용
          department: data.department || null,
          equipmentModel: data.equipmentModel || null,
          serialNumber: data.serialNumber || null,
          installLocation: data.installLocation || null,
          issueType: data.issueType || null,
          lineStatus: data.lineStatus || null,
          issueDate: data.issueDate || null,
          attachments: data.attachments || null,
          priority,
        },
      })
      .then(() => {
        dbSaved = true;
        console.log("DB 저장 성공");
      })
      .catch((err) => {
        dbError = err;
        console.error("DB 저장 실패:", err);
      });

    await Promise.all([mailPromise, dbPromise, telegramPromise]);

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

function buildProductEmail(data: any): string {
  return `
    <div style="font-family: 'Pretendard', -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0096ff; border-bottom: 2px solid #0096ff; padding-bottom: 10px;">영업 장비 문의</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold; color: #666; width: 120px;">회사명</td><td style="padding: 8px;">${data.company}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">담당자명</td><td style="padding: 8px;">${data.manager}</td></tr>
        ${data.position ? `<tr><td style="padding: 8px; font-weight: bold; color: #666;">직책</td><td style="padding: 8px;">${data.position}</td></tr>` : ""}
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">이메일</td><td style="padding: 8px;">${data.email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">전화번호</td><td style="padding: 8px;">${data.phone}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">관심 제품</td><td style="padding: 8px;">${data.product}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">문의 유형</td><td style="padding: 8px;">${data.inquiryType}</td></tr>
        ${data.expectedTimeline ? `<tr><td style="padding: 8px; font-weight: bold; color: #666;">도입 시기</td><td style="padding: 8px;">${data.expectedTimeline}</td></tr>` : ""}
        ${data.currentEquipment ? `<tr><td style="padding: 8px; font-weight: bold; color: #666;">현재 장비</td><td style="padding: 8px;">${data.currentEquipment}</td></tr>` : ""}
        ${data.productionVolume ? `<tr><td style="padding: 8px; font-weight: bold; color: #666;">월 생산량</td><td style="padding: 8px;">${data.productionVolume}</td></tr>` : ""}
        ${data.budgetRange ? `<tr><td style="padding: 8px; font-weight: bold; color: #666;">예산 범위</td><td style="padding: 8px;">${data.budgetRange}</td></tr>` : ""}
      </table>
      <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
        <strong>문의 내용:</strong>
        <p style="white-space: pre-wrap; margin-top: 8px;">${data.content}</p>
      </div>
    </div>
  `;
}

function buildServiceEmail(data: any, priority: string | null): string {
  const priorityColors: Record<string, string> = {
    P1: "#dc2626",
    P2: "#d97706",
    P3: "#0096ff",
    P4: "#a1a1aa",
  };
  const priorityColor = priority ? priorityColors[priority] || "#666" : "#666";

  return `
    <div style="font-family: 'Pretendard', -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0096ff; border-bottom: 2px solid #0096ff; padding-bottom: 10px;">
        서비스 문의
        ${priority ? `<span style="color: ${priorityColor}; font-size: 16px; margin-left: 8px; padding: 2px 8px; border: 1px solid ${priorityColor}; border-radius: 4px;">${priority}</span>` : ""}
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold; color: #666; width: 120px;">회사명</td><td style="padding: 8px;">${data.company}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">담당자명</td><td style="padding: 8px;">${data.manager}</td></tr>
        ${data.position ? `<tr><td style="padding: 8px; font-weight: bold; color: #666;">직책</td><td style="padding: 8px;">${data.position}</td></tr>` : ""}
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">부서명</td><td style="padding: 8px;">${data.department}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">이메일</td><td style="padding: 8px;">${data.email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">전화번호</td><td style="padding: 8px;">${data.phone}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">장비 모델</td><td style="padding: 8px;">${data.equipmentModel}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">시리얼 번호</td><td style="padding: 8px;">${data.serialNumber}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">설치 위치</td><td style="padding: 8px;">${data.installLocation}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">문제 유형</td><td style="padding: 8px;">${data.issueType}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">라인 상태</td><td style="padding: 8px; ${data.lineStatus === "라인 정지" ? "color: #dc2626; font-weight: bold;" : ""}">${data.lineStatus}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">발생 시점</td><td style="padding: 8px;">${data.issueDate}</td></tr>
      </table>
      <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
        <strong>증상 / 에러코드:</strong>
        <p style="white-space: pre-wrap; margin-top: 8px;">${data.content}</p>
      </div>
      ${
        data.attachments
          ? `<div style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-radius: 8px;">
              <strong>첨부파일:</strong>
              <ul style="margin-top: 8px;">${JSON.parse(data.attachments)
                .map((url: string) => `<li><a href="${url}">${url}</a></li>`)
                .join("")}</ul>
            </div>`
          : ""
      }
    </div>
  `;
}

async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("텔레그램 환경변수 미설정 — 전송 스킵");
    return;
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API ${res.status}: ${body}`);
  }
  console.log("텔레그램 전송 성공");
}

async function sendTelegramAttachments(urls: string[]): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId || urls.length === 0) return;

  const isImage = (url: string) => /\.(jpe?g|png|gif|webp|heic|heif)(\?|#|$)/i.test(url);
  const images = urls.filter(isImage);
  const documents = urls.filter((u) => !isImage(u));
  const base = `https://api.telegram.org/bot${token}`;

  const post = async (endpoint: string, payload: any) => {
    const res = await fetch(`${base}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, ...payload }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Telegram ${endpoint} 실패 ${res.status}: ${body}`);
    }
  };

  if (images.length === 1) {
    await post("sendPhoto", { photo: images[0] });
  } else if (images.length >= 2) {
    for (let i = 0; i < images.length; i += 10) {
      const batch = images.slice(i, i + 10);
      await post("sendMediaGroup", {
        media: batch.map((url) => ({ type: "photo", media: url })),
      });
    }
  }

  for (const doc of documents) {
    await post("sendDocument", { document: doc });
  }
}

function escapeHtml(s: string | null | undefined): string {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildProductTelegram(data: any): string {
  const lines = [
    `🔵 <b>[MSI] 영업 장비 문의</b>`,
    ``,
    `🏢 <b>회사명</b>: ${escapeHtml(data.company)}`,
    `👤 <b>담당자</b>: ${escapeHtml(data.manager)}${data.position ? ` (${escapeHtml(data.position)})` : ""}`,
    `📧 <b>이메일</b>: ${escapeHtml(data.email)}`,
    `📞 <b>전화번호</b>: ${escapeHtml(data.phone)}`,
    `📦 <b>관심 제품</b>: ${escapeHtml(data.product)}`,
    `📝 <b>문의 유형</b>: ${escapeHtml(data.inquiryType)}`,
  ];
  if (data.expectedTimeline) lines.push(`📅 <b>도입 시기</b>: ${escapeHtml(data.expectedTimeline)}`);
  if (data.currentEquipment) lines.push(`⚙️ <b>현재 장비</b>: ${escapeHtml(data.currentEquipment)}`);
  if (data.productionVolume) lines.push(`📊 <b>월 생산량</b>: ${escapeHtml(data.productionVolume)}`);
  if (data.budgetRange) lines.push(`💰 <b>예산 범위</b>: ${escapeHtml(data.budgetRange)}`);
  lines.push(``, `💬 <b>문의 내용</b>`, `<pre>${escapeHtml(data.content)}</pre>`);
  return lines.join("\n");
}

function buildServiceTelegram(data: any, priority: string | null): string {
  const priorityEmojis: Record<string, string> = {
    P1: "🚨",
    P2: "⚠️",
    P3: "📋",
    P4: "📝",
  };
  const pTag = priority ? `${priorityEmojis[priority] || ""} <b>[${priority}]</b> ` : "";

  const lines = [
    `🛠 <b>[MSI] 서비스 문의</b> ${pTag}`,
    ``,
    `🏢 <b>회사명</b>: ${escapeHtml(data.company)}`,
    `👤 <b>담당자</b>: ${escapeHtml(data.manager)}${data.position ? ` (${escapeHtml(data.position)})` : ""}`,
    `🏬 <b>부서</b>: ${escapeHtml(data.department)}`,
    `📧 <b>이메일</b>: ${escapeHtml(data.email)}`,
    `📞 <b>전화번호</b>: ${escapeHtml(data.phone)}`,
    `🔧 <b>장비 모델</b>: ${escapeHtml(data.equipmentModel)}`,
    `🔢 <b>시리얼</b>: ${escapeHtml(data.serialNumber)}`,
    `📍 <b>설치 위치</b>: ${escapeHtml(data.installLocation)}`,
    `❗ <b>문제 유형</b>: ${escapeHtml(data.issueType)}`,
    `${data.lineStatus === "라인 정지" ? "🛑" : "🟢"} <b>라인 상태</b>: ${escapeHtml(data.lineStatus)}`,
    `📅 <b>발생 시점</b>: ${escapeHtml(data.issueDate)}`,
    ``,
    `💬 <b>증상 / 에러코드</b>`,
    `<pre>${escapeHtml(data.content)}</pre>`,
  ];

  if (data.attachments) {
    try {
      const urls: string[] = JSON.parse(data.attachments);
      if (urls.length > 0) {
        lines.push(``, `📎 <b>첨부파일 ${urls.length}개</b> (아래 메시지 참고)`);
      }
    } catch {}
  }

  return lines.join("\n");
}
