"use client";
import Image from "next/image";
import { Lang } from "@/app/dictionaries";
import Burger from "@/burger";
import Cancel from "@/cancel";
import style from "@/styles/header.module.scss";
import useResize from "@/useResize";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import Burg from "../public/images/square.png";
import Inter from "../public/images/internet.png";
import Logo from "../public/images/msi.png";

export default function Header({ lang, dict }: { lang: Lang; dict: any }) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const { width } = useResize(200);
  const [isOpen, setIsOpen] = useState(false);
  const [isIOpen, setIsIOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const onRoute = (path: string) => {
    router.push(`${lang}/${path}`);
    setIsOpen(false);
  };

  const navitems = [
    `/company`,
    `/product`,
    // "/service",
    `/question`,
    `/location`,
  ];
  const navList = dict.header.nav.map((n: any, i: number) => {
    return { item: n, route: navitems[i] };
  });

  const navList2 = ["COMPANY", "PRODUCT", "CONTACT", "LOCATION"];

  const routers = [
    [{ name: "Intro", route: `${lang}/company` }],
    [
      { name: "SMT Pick and place", route: `${lang}/product` },
      { name: "Printers", route: `${lang}/product` },
      { name: "Inserts", route: `${lang}/product` },
      { name: "Software", route: `${lang}/product` },
      { name: "Automatic maintenance", route: `${lang}/product` },
      { name: "Automatic Units", route: `${lang}/product` },
    ],
    [{ name: "Product Sales", route: `${lang}/question` }],
    [{ name: "Map", route: `${lang}/location` }],
  ];

  return (
    <header className={style.headerContainer}>
      <div
        style={{ display: width > 1032 ? "flex" : "none" }}
        className={style.translation}
      >
        <div className={style.transForm}>
          <Link
            href={`/en/${segment ?? ""}`}
            className={style.lang}
            replace={true}
          >
            ENGLISH
          </Link>
          <div className={style.seperator}></div>
          <Link
            href={`/ko/${segment ?? ""}`}
            className={style.lang}
            replace={true}
          >
            KOREAN
          </Link>
        </div>
      </div>
      <div className={style.container}>
        <div onClick={() => onRoute("/")} className={style.logo}>
          <Image src={Logo} width={110} height={58} alt="internet" />
        </div>
        {width > 1032 ? (
          <div className={style.nav}>
            <nav className={style.navItems}>
              {navList.map((item: any, i: number) => (
                <div
                  key={`nav: ${i}`}
                  className={style.navBtn}
                  onClick={() => onRoute(item.route)}
                >
                  {item.item}
                </div>
              ))}
            </nav>
          </div>
        ) : (
          <div className={style.row}>
            <div className={style.inter}>
              <div onClick={() => setIsIOpen(!isIOpen)}>
                <Image src={Inter} width={50} height={50} alt="internet" />
              </div>
              <div
                style={{ display: isIOpen ? "flex" : "none" }}
                className={style.list}
              >
                <div className={style.title}>LANGUAGE</div>
                <Link
                  href={`/en/${segment ?? ""}`}
                  className={style.item}
                  replace={true}
                  onClick={() => setIsIOpen(false)}
                >
                  ENGLISH
                </Link>
                <Link
                  href={`/ko/${segment ?? ""}`}
                  className={style.item}
                  replace={true}
                  onClick={() => setIsIOpen(false)}
                >
                  KOREAN
                </Link>
              </div>
            </div>
            <div
              onClick={() => {
                setIsOpen(!isOpen);
                setIsIOpen(false);
              }}
            >
              <Image src={Burg} width={50} height={50} alt="burger" />
            </div>
          </div>
        )}
      </div>
      {width < 1032 && isOpen ? (
        <div className={style.back}>
          <div className={style.navList}>
            {navList2.map((item: any, i: number) => (
              <div
                key={`navL: ${i}`}
                className={style.item}
                onClick={() => setIndex(i)}
              >
                {item}
              </div>
            ))}
          </div>
          <div className={style.routers}>
            {routers[index].map((rt2, j) => (
              <div
                onClick={() => {
                  router.push(rt2.route);
                  setIsOpen(false);
                }}
                className={style.router}
                key={`rt: ${j}`}
              >
                {rt2.name}
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
