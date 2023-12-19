"use client";
import { Lang } from "@/app/dictionaries";
import style from "@/styles/header.module.scss";
import useResize from "@/useResize";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

export default function Header({ lang, dict }: { lang: Lang; dict: any }) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const { width } = useResize(200);

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
          <div></div>
        )}
      </div>
    </header>
  );
}
