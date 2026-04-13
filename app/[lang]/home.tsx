/* eslint-disable @next/next/no-img-element */
"use client";

import style from "@/styles/page/home.module.scss";
import Image from "next/image";
import Product1 from "@/public/images/back1_img.png";
import Product2 from "@/public/images/product2.png";
import P_Icon from "@/public/images/product.png";
import R_Icon from "@/public/images/request.png";
import S_Icon from "@/public/images/service.png";
import L_Icon from "@/public/images/location.png";
import { Dict, Lang } from "../dictionaries";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props extends Dict {
  lang: Lang;
}

const heroSlides = [
  {
    tag: "NEW",
    title: "NXTR-S",
    subtitle: "Unifying Intelligence\nPerformance",
    image: "/images/NXTR-S.png",
    bg: "/images/background1.jpg",
    link: "/product/2",
  },
  {
    tag: "NEW",
    title: "AIMEXR",
    subtitle: "Inspiring Everyday\nEfficiency",
    image: "/images/AIMEXR_product.png",
    bg: "/images/background2.jpg",
    link: "/product/1",
  },
];

const products = [
  { name: "NXTR-A", tag: "Automation", img: "/images/NXTR_A.png", id: 3 },
  { name: "NXTR-S", tag: "Intelligence", img: "/images/NXTR-S.png", id: 2 },
  { name: "AIMEXR", tag: "Versatility", img: "/images/AIMEXR_product.png", id: 1 },
  { name: "NXT III", tag: "Modular", img: "/images/nxt3.png", id: 4 },
];

export default function Page({ dict, lang }: Props) {
  const { home } = dict;
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const revealRefs = useRef<HTMLElement[]>([]);

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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

  const slide = heroSlides[currentSlide];

  const routings = [
    { name: lang === "ko" ? "제품" : "Product", sub: lang === "ko" ? "장비 보기" : "View equipment", image: P_Icon, path: "/product" },
    { name: lang === "ko" ? "제품 문의" : "Product Inquiry", sub: lang === "ko" ? "견적 요청" : "Request quote", image: R_Icon, path: "/question" },
    { name: lang === "ko" ? "서비스 문의" : "Service", sub: lang === "ko" ? "기술 지원" : "Tech support", image: S_Icon, path: "/question" },
    { name: lang === "ko" ? "오시는 길" : "Location", sub: lang === "ko" ? "방문 안내" : "Visit us", image: L_Icon, path: "/location" },
  ];

  return (
    <div className={style.homeContainer}>
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* ===== Hero Section ===== */}
      <section className={style.hero}>
        <div
          className={style.heroBg}
          style={{ backgroundImage: `url("${slide.bg}")` }}
          key={currentSlide}
        />
        <div className={style.heroContent}>
          <div className={style.heroText}>
            <div className={style.heroTag} ref={addRevealRef}>
              {slide.tag}
            </div>
            <h1>
              <span className={style.accent}>{slide.title}</span>
              <br />
              {slide.subtitle.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
            <p className={style.heroDesc}>
              {lang === "ko"
                ? "SMT 산업에서 독보적인 기술력으로 최고의 생산성과 품질을 제공합니다."
                : "Delivering unmatched productivity and quality with dominant technology in the SMT industry."}
            </p>
            <div className={style.heroCTA}>
              <button
                className={style.btnPrimary}
                onClick={() => router.push(`/${lang}${slide.link}`)}
              >
                {lang === "ko" ? "자세히 보기" : "View Details"}
                <span>→</span>
              </button>
              <button
                className={style.btnSecondary}
                onClick={() => router.push(`/${lang}/product`)}
              >
                {lang === "ko" ? "전체 제품" : "All Products"}
              </button>
            </div>
          </div>
          <div className={style.heroImage}>
            <div className={style.productShowcase}>
              <img
                src={slide.image}
                alt={slide.title}
                loading="eager"
              />
            </div>
          </div>
        </div>

        <div className={style.heroIndicators}>
          {heroSlides.map((_, i) => (
            <div
              key={i}
              className={`${style.indicator} ${
                i === currentSlide ? style.activeIndicator : ""
              }`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>

        <div className={style.scrollHint}>
          <span>Scroll</span>
          <div className={style.scrollLine} />
        </div>
      </section>

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

      {/* ===== Corporation Section ===== */}
      <section className={style.corporation}>
        <div className={style.corpInner}>
          <div className={style.sectionLabel} ref={addRevealRef}>
            About MSI
          </div>
          <h2 className={`${style.corpTitle} reveal`} ref={addRevealRef}>
            Corporation
          </h2>
          <p className={`${style.corpDesc} reveal`} ref={addRevealRef}>
            {home.corporation.content}
          </p>
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

      {/* ===== Marquee Section ===== */}
      <section className={style.marqueeSection}>
        <div className={style.marqueeTrack}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={style.marqueeItem}>
              Think, Evolve, and Act.&nbsp;&nbsp;
              <span className={style.filled}>Think, Evolve, and Act.</span>
              &nbsp;&nbsp;
            </div>
          ))}
        </div>
      </section>

      {/* ===== Product Section ===== */}
      <section className={style.productSection}>
        <div className={style.productInner}>
          <div className={style.productHeader}>
            <div>
              <div className={style.sectionLabel} ref={addRevealRef}>
                Products
              </div>
              <h2 className={`${style.productTitle} reveal`} ref={addRevealRef}>
                Product
              </h2>
            </div>
            <p className={`${style.productDesc} reveal`} ref={addRevealRef}>
              {home.product.title}
            </p>
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

      {/* ===== Global Network Section ===== */}
      <section className={style.globalSection}>
        <div className={style.globalInner}>
          <div className={style.globalInfo}>
            <div className={style.sectionLabel} ref={addRevealRef}>
              Network
            </div>
            <h2 className={`${style.globalTitle} reveal`} ref={addRevealRef}>
              Global
              <br />
              Network
            </h2>
            <p className={`${style.globalDesc} reveal`} ref={addRevealRef}>
              {lang === "ko"
                ? "전 세계 52개국 이상의 글로벌 네트워크를 통해 최상의 서비스를 제공합니다."
                : "Providing the best services through a global network spanning over 52 countries."}
            </p>
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
          <div className={`${style.globalMap} reveal`} ref={addRevealRef}>
            <img src="/images/map.png" alt="Global Network Map" loading="lazy" decoding="async" />
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
  );
}
