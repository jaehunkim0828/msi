export type Priority = "P1" | "P2" | "P3" | "P4";

interface PriorityResult {
  priority: Priority;
  label: string;
  responseTime: string;
}

/**
 * 서비스 문의 우선순위 자동 산정
 * - P1 긴급 (4시간 내): 라인 정지
 * - P2 높음 (24시간 내): 부분 가동
 * - P3 보통 (3영업일 내): 정상 가동 중 + 부품/소프트웨어/기계 고장/정기 점검
 * - P4 낮음 (5영업일 내): 교육 요청, 기타
 */
export function calculateServicePriority(
  lineStatus: string,
  issueType: string
): PriorityResult {
  // 라인 정지 → P1 긴급
  if (lineStatus === "라인 정지") {
    return { priority: "P1", label: "긴급", responseTime: "4시간 내" };
  }

  // 부분 가동 → P2 높음
  if (lineStatus === "부분 가동") {
    return { priority: "P2", label: "높음", responseTime: "24시간 내" };
  }

  // 정상 가동 중 + 기술적 이슈 → P3 보통
  const p3IssueTypes = ["부품 주문", "소프트웨어", "기계 고장", "정기 점검"];
  if (lineStatus === "정상 가동 중" && p3IssueTypes.includes(issueType)) {
    return { priority: "P3", label: "보통", responseTime: "3영업일 내" };
  }

  // 그 외 (교육 요청, 기타 등) → P4 낮음
  return { priority: "P4", label: "낮음", responseTime: "5영업일 내" };
}
