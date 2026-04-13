"use client";
import Image from "next/image";
import { Lang } from "@/app/dictionaries";
import style from "@/styles/header.module.scss";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../public/images/msi.png";

export default function Header({ lang, dict }: { lang: Lang; dict: any }) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onRoute = (path: string) => {
    router.push(`/${lang}/${path}`);
    setIsOpen(false);
  };

  const navItems = [
    { label: dict.header.nav[0], route: "company" },
    { label: dict.header.nav[1], route: "product" },
    { label: dict.header.nav[2], route: "question" },
    { label: dict.header.nav[3], route: "location" },
  ];

  const isHome = segment === null;

  return (
    <header
      className={`${style.headerContainer} ${scrolled ? style.scrolled : ""} ${isHome && !scrolled ? style.heroMode : ""}`}
    >
      <div className={style.container}>
        <div onClick={() => onRoute("")} className={style.logo}>
          <Image src={Logo} width={110} height={58} alt="MSI Corporation" />
        </div>

        {/* Desktop nav — hidden on mobile via CSS */}
        <div className={style.nav}>
          <nav className={style.navItems}>
            {navItems.map((item, i) => (
              <div
                key={`nav-${i}`}
                className={`${style.navBtn} ${
                  segment === item.route ? style.active : ""
                }`}
                onClick={() => onRoute(item.route)}
              >
                {item.label}
              </div>
            ))}
          </nav>
          <div className={style.langSwitch}>
            <Link
              href={`/en/${segment ?? ""}`}
              className={`${style.langBtn} ${
                lang === "en" ? style.activeLang : ""
              }`}
              replace
            >
              EN
            </Link>
            <Link
              href={`/ko/${segment ?? ""}`}
              className={`${style.langBtn} ${
                lang === "ko" ? style.activeLang : ""
              }`}
              replace
            >
              KO
            </Link>
          </div>
        </div>

        {/* Mobile menu button — hidden on desktop via CSS */}
        <div className={style.mobileRight}>
          <div
            className={`${style.menuBtn} ${isOpen ? style.open : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={style.menuIcon}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={style.mobileMenu}>
          {navItems.map((item, i) => (
            <div
              key={`mobile-nav-${i}`}
              className={style.mobileNavItem}
              onClick={() => onRoute(item.route)}
            >
              {item.label}
            </div>
          ))}
          <div className={style.mobileLang}>
            <Link
              href={`/en/${segment ?? ""}`}
              replace
              onClick={() => setIsOpen(false)}
            >
              English
            </Link>
            <Link
              href={`/ko/${segment ?? ""}`}
              replace
              onClick={() => setIsOpen(false)}
            >
              한국어
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
