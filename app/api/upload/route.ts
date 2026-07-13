import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase, BUCKET } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const MAX_FILES = 5;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
];

const EXT_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "video/mp4": ".mp4",
  "video/quicktime": ".mov",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const files: { name: string; type: string }[] = body.files;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "파일이 없습니다." },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `최대 ${MAX_FILES}개까지 업로드 가능합니다.` },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `허용되지 않는 파일 형식입니다: ${file.name}` },
          { status: 400 }
        );
      }
    }

    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const folderId = randomUUID();

    const signed: { path: string; signedUrl: string; token: string; publicUrl: string }[] = [];

    for (const file of files) {
      const ext = EXT_MAP[file.type] || "";
      const safeName = `${randomUUID()}${ext}`;
      const storagePath = `inquiries/${month}/${folderId}/${safeName}`;

      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUploadUrl(storagePath);

      if (error || !data) {
        console.error("Signed URL error:", error);
        return NextResponse.json(
          { error: "업로드 URL 생성에 실패했습니다." },
          { status: 500 }
        );
      }

      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(storagePath);

      signed.push({
        path: storagePath,
        signedUrl: data.signedUrl,
        token: data.token,
        publicUrl: urlData.publicUrl,
      });
    }

    return NextResponse.json({ success: true, signed });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "업로드 URL 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
