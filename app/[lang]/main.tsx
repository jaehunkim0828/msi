"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import style from "@/styles/main.module.scss";
import Header from "../../components/header";
import Footer from "@/components/footer";
import { usePathname, useSearchParams } from "next/navigation";
import { Dict, Lang } from "../dictionaries";

export const BREAK_POINT_L = 1440;
export const BREAK_POINT_M = 800;
export const BREAK_POINT_S = 360;

interface Props extends Dict {
  children: React.ReactNode;
  lang: Lang;
}

export default function MainLayout({ children, lang, dict }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const basePath = `/${lang}`;

  const handleOnRouteChanged = useCallback(() => {
    if (pathname === `/${lang}/about`) {
      document.body.style.overflow = "hidden";
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.backgroundColor = "transparent";
    }
  }, [pathname, lang]);

  useEffect(() => {
    handleOnRouteChanged();
  }, [handleOnRouteChanged, searchParams]);

  // const get100vhOnDevice = () => {
  //   const vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty('--vh', `${vh}px`);
  // };

  return (
    <React.Fragment>
      <React.Fragment>
        <Header lang={lang} dict={dict} />
        <main className={style.main}>{children}</main>
        <Footer lang={lang} dict={undefined} />
      </React.Fragment>
    </React.Fragment>
  );
}
