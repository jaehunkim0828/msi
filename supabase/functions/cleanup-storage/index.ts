import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BUCKET = "msi";
const EXPIRY_MONTHS = 3;

Deno.serve(async (req) => {
  // Authorization 확인 (pg_cron에서 service_role 키로 호출)
  const authHeader = req.headers.get("Authorization");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  if (authHeader !== `Bearer ${serviceKey}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    serviceKey
  );

  // 3개월 전 기준 날짜 계산
  const now = new Date();
  const cutoff = new Date(now.getFullYear(), now.getMonth() - EXPIRY_MONTHS, 1);
  const cutoffStr = `${cutoff.getFullYear()}-${String(cutoff.getMonth() + 1).padStart(2, "0")}`;

  // inquiries/ 아래 월별 폴더 목록 조회
  const { data: monthFolders, error: listError } = await supabase.storage
    .from(BUCKET)
    .list("inquiries", { limit: 1000 });

  if (listError) {
    return new Response(JSON.stringify({ error: listError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let deletedCount = 0;

  for (const folder of monthFolders || []) {
    // folder.name = "2026-01" 같은 형식, cutoff 이전이면 삭제
    if (folder.name >= cutoffStr) continue;

    // 해당 월 폴더 안의 UUID 폴더 목록
    const { data: uuidFolders } = await supabase.storage
      .from(BUCKET)
      .list(`inquiries/${folder.name}`, { limit: 1000 });

    for (const uuidFolder of uuidFolders || []) {
      // UUID 폴더 안의 파일 목록
      const { data: files } = await supabase.storage
        .from(BUCKET)
        .list(`inquiries/${folder.name}/${uuidFolder.name}`, { limit: 1000 });

      if (files && files.length > 0) {
        const filePaths = files.map(
          (f) => `inquiries/${folder.name}/${uuidFolder.name}/${f.name}`
        );

        const { error: deleteError } = await supabase.storage
          .from(BUCKET)
          .remove(filePaths);

        if (!deleteError) {
          deletedCount += filePaths.length;
        }
      }
    }
  }

  return new Response(
    JSON.stringify({ success: true, deletedCount, cutoff: cutoffStr }),
    { headers: { "Content-Type": "application/json" } }
  );
});
