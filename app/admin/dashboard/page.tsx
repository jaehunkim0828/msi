"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import styles from "./dashboard.module.scss";

interface Inquiry {
  id: string;
  type: string;
  product: string;
  company: string;
  department: string;
  manager: string;
  email: string;
  content: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, [page]);

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`/api/admin/inquiries?page=${page}&limit=20`);

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

      // 전체 데이터 조회
      const res = await fetch("/api/admin/inquiries?page=1&limit=10000");
      if (!res.ok) {
        alert("데이터를 불러오는데 실패했습니다.");
        return;
      }

      const data = await res.json();
      const allInquiries = data.data;

      // 엑셀 데이터 포맷
      const excelData = allInquiries.map((inquiry: Inquiry, index: number) => ({
        번호: index + 1,
        날짜: formatDate(inquiry.createdAt),
        문의유형: inquiry.type,
        회사명: inquiry.company,
        부서: inquiry.department,
        담당자: inquiry.manager,
        이메일: inquiry.email,
        제품: inquiry.product,
        내용: inquiry.content,
      }));

      // 워크시트 생성
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "문의내역");

      // 컬럼 너비 자동 조정
      const colWidths = [
        { wch: 8 },  // 번호
        { wch: 20 }, // 날짜
        { wch: 12 }, // 문의유형
        { wch: 20 }, // 회사명
        { wch: 15 }, // 부서
        { wch: 12 }, // 담당자
        { wch: 25 }, // 이메일
        { wch: 20 }, // 제품
        { wch: 50 }, // 내용
      ];
      worksheet["!cols"] = colWidths;

      // 파일명 생성 (현재 날짜 포함)
      const today = new Date();
      const fileName = `MSI_문의내역_${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}.xlsx`;

      // 파일 다운로드
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
            📊 엑셀 다운로드
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

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>날짜</th>
              <th>유형</th>
              <th>회사명</th>
              <th>담당자</th>
              <th>이메일</th>
              <th>제품</th>
              <th>상세</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>{formatDate(inquiry.createdAt)}</td>
                <td>{inquiry.type}</td>
                <td>{inquiry.company}</td>
                <td>{inquiry.manager}</td>
                <td>{inquiry.email}</td>
                <td>{inquiry.product}</td>
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

      {selectedInquiry && (
        <div className={styles.modal} onClick={() => setSelectedInquiry(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>문의 상세</h2>
            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label>날짜:</label>
                <span>{formatDate(selectedInquiry.createdAt)}</span>
              </div>
              <div className={styles.field}>
                <label>유형:</label>
                <span>{selectedInquiry.type}</span>
              </div>
              <div className={styles.field}>
                <label>회사명:</label>
                <span>{selectedInquiry.company}</span>
              </div>
              <div className={styles.field}>
                <label>부서:</label>
                <span>{selectedInquiry.department}</span>
              </div>
              <div className={styles.field}>
                <label>담당자:</label>
                <span>{selectedInquiry.manager}</span>
              </div>
              <div className={styles.field}>
                <label>이메일:</label>
                <span>{selectedInquiry.email}</span>
              </div>
              <div className={styles.field}>
                <label>제품:</label>
                <span>{selectedInquiry.product}</span>
              </div>
              <div className={styles.field}>
                <label>내용:</label>
                <p className={styles.content}>{selectedInquiry.content}</p>
              </div>
            </div>
            <button onClick={() => setSelectedInquiry(null)} className={styles.closeBtn}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
