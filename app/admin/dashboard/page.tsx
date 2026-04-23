"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import styles from "./dashboard.module.scss";

interface Inquiry {
  id: string;
  type: string;
  company: string;
  manager: string;
  email: string;
  phone: string;
  position?: string;
  content: string;
  createdAt: string;
  // 제품 전용
  product?: string;
  inquiryType?: string;
  expectedTimeline?: string;
  currentEquipment?: string;
  productionVolume?: string;
  budgetRange?: string;
  // 서비스 전용
  department?: string;
  equipmentModel?: string;
  serialNumber?: string;
  installLocation?: string;
  issueType?: string;
  lineStatus?: string;
  issueDate?: string;
  attachments?: string;
  priority?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filterType, setFilterType] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");

  useEffect(() => {
    fetchInquiries();
  }, [page, filterType, filterPriority]);

  const fetchInquiries = async () => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
      });
      if (filterType) params.set("type", filterType);
      if (filterPriority) params.set("priority", filterPriority);

      const res = await fetch(`/api/admin/inquiries?${params}`);

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await res.json();

      if (data.success) {
        setInquiries(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleExportExcel = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/inquiries?page=1&limit=10000");
      if (!res.ok) {
        alert("데이터를 불러오는데 실패했습니다.");
        return;
      }

      const data = await res.json();
      const allInquiries: Inquiry[] = data.data;

      const productInquiries = allInquiries.filter((i) => i.type === "제품");
      const serviceInquiries = allInquiries.filter((i) => i.type === "서비스");

      // 제품 문의 시트
      const productData = productInquiries.map((inquiry, index) => ({
        번호: index + 1,
        날짜: formatDate(inquiry.createdAt),
        회사명: inquiry.company,
        담당자: inquiry.manager,
        직책: inquiry.position || "",
        이메일: inquiry.email,
        전화번호: inquiry.phone,
        관심제품: inquiry.product || "",
        문의유형: inquiry.inquiryType || "",
        도입시기: inquiry.expectedTimeline || "",
        현재장비: inquiry.currentEquipment || "",
        월생산량: inquiry.productionVolume || "",
        예산범위: inquiry.budgetRange || "",
        내용: inquiry.content,
      }));

      // 서비스 문의 시트
      const serviceData = serviceInquiries.map((inquiry, index) => ({
        번호: index + 1,
        날짜: formatDate(inquiry.createdAt),
        우선순위: inquiry.priority || "",
        회사명: inquiry.company,
        담당자: inquiry.manager,
        부서: inquiry.department || "",
        이메일: inquiry.email,
        전화번호: inquiry.phone,
        장비모델: inquiry.equipmentModel || "",
        시리얼번호: inquiry.serialNumber || "",
        설치위치: inquiry.installLocation || "",
        문제유형: inquiry.issueType || "",
        라인상태: inquiry.lineStatus || "",
        발생시점: inquiry.issueDate || "",
        증상내용: inquiry.content,
        ...(() => {
          const urls: string[] = inquiry.attachments
            ? JSON.parse(inquiry.attachments)
            : [];
          const result: Record<string, string> = {};
          for (let i = 0; i < 5; i++) {
            result[`첨부${i + 1}`] = urls[i] || "";
          }
          return result;
        })(),
      }));

      const workbook = XLSX.utils.book_new();

      const productSheet = XLSX.utils.json_to_sheet(productData);
      productSheet["!cols"] = [
        { wch: 6 }, { wch: 20 }, { wch: 18 }, { wch: 10 }, { wch: 10 },
        { wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 15 }, { wch: 10 },
        { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 50 },
      ];
      XLSX.utils.book_append_sheet(workbook, productSheet, "제품 문의");

      const serviceSheet = XLSX.utils.json_to_sheet(serviceData);
      // 첨부파일 셀에 하이퍼링크 추가
      const attachCols = ["P", "Q", "R", "S", "T"]; // 첨부1~5 컬럼
      serviceData.forEach((row, i) => {
        const rowNum = i + 2; // 헤더가 1행
        attachCols.forEach((col, j) => {
          const cellRef = `${col}${rowNum}`;
          const cell = serviceSheet[cellRef];
          if (cell && cell.v) {
            cell.l = { Target: cell.v, Tooltip: "첨부파일 열기" };
          }
        });
      });
      serviceSheet["!cols"] = [
        { wch: 6 }, { wch: 20 }, { wch: 8 }, { wch: 18 }, { wch: 10 },
        { wch: 12 }, { wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 15 },
        { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 20 }, { wch: 50 },
        { wch: 40 }, { wch: 40 }, { wch: 40 }, { wch: 40 }, { wch: 40 },
      ];
      XLSX.utils.book_append_sheet(workbook, serviceSheet, "서비스 문의");

      const today = new Date();
      const fileName = `MSI_문의내역_${today.getFullYear()}${String(
        today.getMonth() + 1
      ).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}.xlsx`;

      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Excel export error:", error);
      alert("엑셀 다운로드 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>MSI 관리자 대시보드</h1>
        <div className={styles.headerActions}>
          <button onClick={handleExportExcel} className={styles.excelBtn}>
            엑셀 다운로드
          </button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            로그아웃
          </button>
        </div>
      </header>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>총 문의</h3>
          <p>{inquiries.length} 건</p>
        </div>
      </div>

      {/* 필터 */}
      <div className={styles.filters}>
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setPage(1);
          }}
          className={styles.filterSelect}
        >
          <option value="">전체 유형</option>
          <option value="제품">제품 문의</option>
          <option value="서비스">서비스 문의</option>
        </select>
        <select
          value={filterPriority}
          onChange={(e) => {
            setFilterPriority(e.target.value);
            setPage(1);
          }}
          className={styles.filterSelect}
        >
          <option value="">전체 우선순위</option>
          <option value="P1">P1 긴급</option>
          <option value="P2">P2 높음</option>
          <option value="P3">P3 보통</option>
          <option value="P4">P4 낮음</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>날짜</th>
              <th>유형</th>
              <th>우선순위</th>
              <th>회사명</th>
              <th>담당자</th>
              <th>전화번호</th>
              <th>상세</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>{formatDate(inquiry.createdAt)}</td>
                <td>{inquiry.type}</td>
                <td>
                  {inquiry.priority && (
                    <span
                      className={`${styles.priorityBadge} ${
                        styles[`priority${inquiry.priority}`]
                      }`}
                    >
                      {inquiry.priority}
                    </span>
                  )}
                </td>
                <td>{inquiry.company}</td>
                <td>{inquiry.manager}</td>
                <td>{inquiry.phone}</td>
                <td>
                  <button
                    onClick={() => setSelectedInquiry(inquiry)}
                    className={styles.detailBtn}
                  >
                    보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={styles.pageBtn}
        >
          이전
        </button>
        <span className={styles.pageInfo}>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={styles.pageBtn}
        >
          다음
        </button>
      </div>

      {/* 상세 모달 */}
      {selectedInquiry && (
        <div
          className={styles.modal}
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>
              문의 상세
              {selectedInquiry.priority && (
                <span
                  className={`${styles.priorityBadge} ${
                    styles[`priority${selectedInquiry.priority}`]
                  }`}
                  style={{ marginLeft: 12, fontSize: 14 }}
                >
                  {selectedInquiry.priority}
                </span>
              )}
            </h2>
            <div className={styles.modalBody}>
              {/* 공통 필드 */}
              <ModalField label="날짜" value={formatDate(selectedInquiry.createdAt)} />
              <ModalField label="유형" value={selectedInquiry.type} />
              <ModalField label="회사명" value={selectedInquiry.company} />
              <ModalField label="담당자" value={selectedInquiry.manager} />
              {selectedInquiry.position && (
                <ModalField label="직책" value={selectedInquiry.position} />
              )}
              <ModalField label="이메일" value={selectedInquiry.email} />
              <ModalField label="전화번호" value={selectedInquiry.phone} />

              {/* 제품 문의 필드 */}
              {selectedInquiry.type === "제품" && (
                <>
                  <ModalField label="관심 제품" value={selectedInquiry.product} />
                  <ModalField label="문의 유형" value={selectedInquiry.inquiryType} />
                  {selectedInquiry.expectedTimeline && (
                    <ModalField label="도입 시기" value={selectedInquiry.expectedTimeline} />
                  )}
                  {selectedInquiry.currentEquipment && (
                    <ModalField label="현재 장비" value={selectedInquiry.currentEquipment} />
                  )}
                  {selectedInquiry.productionVolume && (
                    <ModalField label="월 생산량" value={selectedInquiry.productionVolume} />
                  )}
                  {selectedInquiry.budgetRange && (
                    <ModalField label="예산 범위" value={selectedInquiry.budgetRange} />
                  )}
                </>
              )}

              {/* 서비스 문의 필드 */}
              {selectedInquiry.type === "서비스" && (
                <>
                  <ModalField label="부서" value={selectedInquiry.department} />
                  <ModalField label="장비 모델" value={selectedInquiry.equipmentModel} />
                  <ModalField label="시리얼 번호" value={selectedInquiry.serialNumber} />
                  <ModalField label="설치 위치" value={selectedInquiry.installLocation} />
                  <ModalField label="문제 유형" value={selectedInquiry.issueType} />
                  <ModalField
                    label="라인 상태"
                    value={selectedInquiry.lineStatus}
                    highlight={selectedInquiry.lineStatus === "라인 정지"}
                  />
                  <ModalField label="발생 시점" value={selectedInquiry.issueDate} />
                  {selectedInquiry.attachments && (
                    <div className={styles.field}>
                      <label>첨부파일:</label>
                      <div>
                        {JSON.parse(selectedInquiry.attachments).map(
                          (url: string, i: number) => (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.attachmentLink}
                            >
                              파일 {i + 1}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className={styles.field}>
                <label>내용:</label>
                <p className={styles.content}>{selectedInquiry.content}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedInquiry(null)}
              className={styles.closeBtn}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalField({
  label,
  value,
  highlight,
}: {
  label: string;
  value?: string | null;
  highlight?: boolean;
}) {
  if (!value) return null;
  return (
    <div className={styles.field}>
      <label>{label}:</label>
      <span style={highlight ? { color: "#dc2626", fontWeight: 700 } : undefined}>
        {value}
      </span>
    </div>
  );
}
