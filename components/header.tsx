"use client";
import { Lang } from "@/app/dictionaries";
import Burger from "@/burger";
import Cancel from "@/cancel";
import style from "@/styles/header.module.scss";
import useResize from "@/useResize";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

export default function Header({ lang, dict }: { lang: Lang; dict: any }) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const { width } = useResize(200);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={style.headerContainer}>
      <div className={style.translation}>
        <div className={style.transForm}>
          <Link
            href={`/en/${segment ?? ""}`}
            className={style.lang}
            style={{
              fontWeight: lang === "en" || lang === "en-US" ? "700" : "400",
            }}
            replace={true}
          >
            ENGLISH
          </Link>
          <div className={style.seperator}></div>
          <Link
            href={`/ko/${segment ?? ""}`}
            className={style.lang}
            style={{
              fontWeight: lang === "ko" || lang === "ko-KR" ? "700" : "400",
            }}
            replace={true}
          >
            KOREAN
          </Link>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.logo}>
          <strong>MSI</strong>
          Corporation
        </div>
        {width > 1200 ? (
          <div className={style.nav}>
            <nav className={style.navItems}>
              {dict.header.nav.map((item: string, i: number) => (
                <div key={`nav: ${i}`} className={style.navBtn}>
                  {item}
                </div>
              ))}
            </nav>
          </div>
        ) : (
          <div>
            {!isOpen ? (
              <div onClick={() => setIsOpen(true)}>
                <Burger />
              </div>
            ) : (
              <div onClick={() => setIsOpen(false)}>
                <Cancel />
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? (
        <div className={style.back}>
          <div className={style.navList}>
            {dict.header.nav.map((item: string, i: number) => (
              <div key={`navL: ${i}`} className={style.item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}
