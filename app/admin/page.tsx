"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/inquiries?page=1&limit=1");

      if (res.status === 401) {
        // 로그인 안 됨
        router.replace("/admin/login");
      } else {
        // 로그인 됨
        router.replace("/admin/dashboard");
      }
    } catch (error) {
      // 에러 발생 시 로그인 페이지로
      router.replace("/admin/login");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontSize: "18px",
        color: "var(--color-text)",
      }}
    >
      리다이렉트 중...
    </div>
  );
}
