/* eslint-disable @next/next/no-img-element */
"use client";

import style from "@/styles/page/home.module.scss";
import Image from "next/image";
import P_Icon from "@/public/images/product.png";
import R_Icon from "@/public/images/request.png";
import S_Icon from "@/public/images/service.png";
import L_Icon from "@/public/images/location.png";
import { Dict, Lang } from "../dictionaries";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface Props extends Dict {
  lang: Lang;
}

const products = [
  { name: "NXTR-A", tag: "Automation", img: "/images/NXTR_A.png", id: 3 },
  { name: "NXTR-S", tag: "Intelligence", img: "/images/NXTR-S.png", id: 2 },
  { name: "AIMEXR", tag: "Versatility", img: "/images/AIMEXR_product.png", id: 1 },
  { name: "NXT III", tag: "Modular", img: "/images/nxt3.png", id: 4 },
];

export default function Page({ dict, lang }: Props) {
  const { home } = dict;
  const router = useRouter();
  const revealRefs = useRef<HTMLElement[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // IntersectionObserver for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  // Pause the hero video while it is scrolled out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const routings = [
    { name: lang === "ko" ? "제품" : "Product", sub: lang === "ko" ? "장비 보기" : "View equipment", image: P_Icon, path: "/product" },
    { name: lang === "ko" ? "제품 문의" : "Product Inquiry", sub: lang === "ko" ? "견적 요청" : "Request quote", image: R_Icon, path: "/question" },
    { name: lang === "ko" ? "서비스 문의" : "Service", sub: lang === "ko" ? "기술 지원" : "Tech support", image: S_Icon, path: "/question" },
    { name: lang === "ko" ? "오시는 길" : "Location", sub: lang === "ko" ? "방문 안내" : "Visit us", image: L_Icon, path: "/location" },
  ];

  const facts = [
    {
      key: lang === "ko" ? "기업명" : "Company",
      value: lang === "ko" ? "엠에스아이코퍼레이션" : "MSI Corporation",
    },
    {
      key: lang === "ko" ? "설립" : "Founded",
      value: lang === "ko" ? "1979년" : "1979",
    },
    {
      key: lang === "ko" ? "사업분야" : "Business",
      value:
        lang === "ko"
          ? "SMT 장비 공급 및 기술 서비스"
          : "SMT equipment supply & technical service",
    },
    {
      key: lang === "ko" ? "본사" : "Headquarters",
      value:
        lang === "ko"
          ? "경기도 오산시 가장산업서로 56-20"
          : "56-20, Gajangsaneopseo-ro, Osan-si, Gyeonggi-do",
    },
    {
      key: lang === "ko" ? "연락처" : "Contact",
      value: "Tel 02-553-0903 · Fax 02-555-5584",
    },
  ];

  return (
    <div className={style.homeContainer}>
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* ===== Hero — NXTR-A video background ===== */}
      <section className={style.hero}>
        <video
          ref={videoRef}
          className={style.heroVideo}
          src="/videos/nxtr-a.mp4"
          poster="/images/nxtr-a-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className={style.heroOverlay} />
        <div className={style.heroContent}>
          <div className={style.heroBadge}>
            {lang === "ko" ? "SMT 전문 기업" : "SMT Total Solution"}
          </div>
          <h1>
            <span className={style.heroLine}>
              {lang === "ko"
                ? "스마트 팩토리 시대의 실장 기술,"
                : "SMT technology for the smart factory era,"}
            </span>
            <span className={style.heroGradient}>
              {lang === "ko" ? "MSI가 완성합니다" : "completed by MSI"}
            </span>
          </h1>
          <p className={style.heroDesc}>
            {lang === "ko"
              ? "1979년부터 쌓아온 현장 경험과 검증된 SMT 장비로 최고의 생산성과 품질을 약속드립니다."
              : "With field experience since 1979 and proven SMT equipment, we promise the best productivity and quality."}
          </p>
          <div className={style.heroCTA}>
            <button
              className={style.btnHeroPrimary}
              onClick={() => router.push(`/${lang}/product`)}
            >
              {lang === "ko" ? "제품 보기" : "View Products"}
            </button>
            <button
              className={style.btnHeroGlass}
              onClick={() => router.push(`/${lang}/question`)}
            >
              {lang === "ko" ? "문의하기" : "Contact Us"}
            </button>
          </div>
        </div>
        <div className={style.scrollHint}>
          <span>Scroll</span>
          <div className={style.scrollLine} />
        </div>
      </section>

      {/* Content scrolls up over the sticky hero */}
      <div className={style.afterHero}>
        {/* ===== Quick Links ===== */}
        <section className={style.quickLinks}>
          <div className={style.quickLinksInner}>
            {routings.map((route, i) => (
              <div
                key={`quick-${i}`}
                className={style.quickItem}
                onClick={() => router.push(`/${lang}${route.path}`)}
              >
                <div className={style.quickIcon}>
                  <Image src={route.image} alt={route.name} width={24} height={24} />
                </div>
                <div>
                  <div className={style.quickLabel}>{route.name}</div>
                  <div className={style.quickSub}>{route.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== About Section ===== */}
        <section className={style.aboutSection}>
          <div className={style.inner}>
            <div className={`${style.sectionHead} reveal`} ref={addRevealRef}>
              <div className={style.eyebrow}>About MSI</div>
              <h2>{lang === "ko" ? "회사소개" : "Who We Are"}</h2>
            </div>
            <div className={style.aboutGrid}>
              <div className={`${style.aboutText} reveal`} ref={addRevealRef}>
                <h3>
                  {lang === "ko"
                    ? "SMT 산업의 든든한 파트너"
                    : "A trusted partner in the SMT industry"}
                </h3>
                <p>{home.corporation.content}</p>
                <button
                  className={style.textLink}
                  onClick={() => router.push(`/${lang}/company`)}
                >
                  {lang === "ko" ? "회사소개 더 보기" : "Learn more"}
                  <span>→</span>
                </button>
              </div>
              <dl className={`${style.factTable} reveal`} ref={addRevealRef}>
                {facts.map((f) => (
                  <div className={style.factRow} key={f.key}>
                    <dt>{f.key}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={style.corpGrid}>
              {home.corporation.items.map((item: any, i: number) => (
                <div
                  key={`corp-${i}`}
                  className={`${style.corpCard} reveal`}
                  ref={addRevealRef}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={style.cardNumber}>0{i + 1}</div>
                  <div className={style.cardTitle}>{item.title}</div>
                  <div className={style.cardDesc}>
                    {item.desc.map((d: string, j: number) => (
                      <span key={j}>
                        {d}
                        {j < item.desc.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Product Section ===== */}
        <section className={style.productSection}>
          <div className={style.inner}>
            <div className={`${style.sectionHead} reveal`} ref={addRevealRef}>
              <div className={style.eyebrow}>Products</div>
              <h2>{lang === "ko" ? "제품" : "Products"}</h2>
              <p>{home.product.title}</p>
            </div>

            <div className={style.bentoGrid}>
              {products.map((product, i) => (
                <div
                  key={`product-${i}`}
                  className={`${style.bentoItem} reveal`}
                  ref={addRevealRef}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  onClick={() => router.push(`/${lang}/product/${product.id}`)}
                >
                  <div className={style.bentoImage}>
                    <img
                      src={product.img}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={style.bentoInfo}>
                    <div>
                      <div className={style.bentoName}>{product.name}</div>
                      <div className={style.bentoTag}>{product.tag}</div>
                    </div>
                    <div className={style.bentoArrow}>↗</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Global Network — full-bleed image band ===== */}
        <section className={style.globalSection}>
          <div className={style.globalBg} />
          <div className={style.globalOverlay} />
          <div className={style.inner}>
            <div className={`${style.sectionHead} reveal`} ref={addRevealRef}>
              <div className={style.eyebrow}>Global Network</div>
              <h2>
                {lang === "ko" ? (
                  <>
                    세계 52개국으로
                    <br />
                    뻗어 나가는 네트워크
                  </>
                ) : (
                  <>
                    A network reaching
                    <br />
                    52 countries worldwide
                  </>
                )}
              </h2>
              <p>
                {lang === "ko"
                  ? "유럽에서 아메리카까지, 전 세계 글로벌 네트워크를 통해 최상의 서비스를 제공합니다."
                  : "From Europe to the Americas, we deliver the best services through our worldwide network."}
              </p>
            </div>
            <div className={style.statGrid}>
              <div className={`${style.statItem} reveal`} ref={addRevealRef}>
                <div className={style.statNumber}>32</div>
                <div className={style.statLabel}>Europe</div>
              </div>
              <div className={`${style.statItem} reveal`} ref={addRevealRef} style={{ transitionDelay: "0.1s" }}>
                <div className={style.statNumber}>11</div>
                <div className={style.statLabel}>Middle East &amp; Africa</div>
              </div>
              <div className={`${style.statItem} reveal`} ref={addRevealRef} style={{ transitionDelay: "0.2s" }}>
                <div className={style.statNumber}>7</div>
                <div className={style.statLabel}>Asia</div>
              </div>
              <div className={`${style.statItem} reveal`} ref={addRevealRef} style={{ transitionDelay: "0.3s" }}>
                <div className={style.statNumber}>2</div>
                <div className={style.statLabel}>Americas</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA Section ===== */}
        <section className={style.ctaSection}>
          <div className={style.ctaInner}>
            <h2 className={`${style.ctaTitle} reveal`} ref={addRevealRef}>
              {lang === "ko"
                ? "MSI와 함께 시작하세요"
                : "Get Started with MSI"}
            </h2>
            <p className={`${style.ctaDesc} reveal`} ref={addRevealRef}>
              {lang === "ko"
                ? "제품 문의부터 기술 지원까지, 전문 상담을 받아보세요."
                : "From product inquiries to technical support, get expert consultation."}
            </p>
            <div className={`${style.ctaButtons} reveal`} ref={addRevealRef}>
              <button
                className={style.btnPrimary}
                onClick={() => router.push(`/${lang}/question`)}
              >
                {lang === "ko" ? "문의하기" : "Contact Us"}
                <span>→</span>
              </button>
              <button
                className={style.btnSecondary}
                onClick={() => router.push(`/${lang}/product`)}
              >
                {lang === "ko" ? "제품 보기" : "View Products"}
              </button>
            </div>
          </div>
        </section>

        {/* ===== Contact Info Strip ===== */}
        <section className={style.contactStrip}>
          <div className={style.contactInner}>
            <span>Tel : 02-553-0903</span>
            <span>Fax : 02-555-5584</span>
            <span>
              {lang === "ko"
                ? "경기도 오산시 가장산업서로 56-20"
                : "56-20, Gajangsaneopseo-ro, Osan-si, Gyeonggi-do"}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
