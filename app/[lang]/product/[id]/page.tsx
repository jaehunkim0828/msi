/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import json from "@/product.json";
import style from "@/styles/page/productItem.module.scss";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function ProductItem({
  params,
}: {
  params: { id: string; lang: string };
}) {
  const router = useRouter();
  const { id, lang } = params;
  const isKo = lang.startsWith("ko");
  const info = json.products.find(pd => pd.id.toString() === id);
  const revealRefs = useRef<HTMLElement[]>([]);

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

  const tags = isKo ? info?.tags_ko ?? info?.tags : info?.tags;
  const desc = isKo ? info?.desc_ko ?? info?.desc : info?.desc;

  return (
    <div className={style.productItem}>
      {/* Breadcrumb */}
      <div className={style.breadcrumbBar}>
        <div className={style.inner}>
          <div className={style.route}>
            <span
              className={style.btn}
              onClick={() => router.push(`/${lang}`)}
            >
              Home
            </span>
            <span className={style.separator}>/</span>
            <span
              className={style.btn}
              onClick={() => router.push(`/${lang}/product`)}
            >
              {isKo ? "제품" : "Products"}
            </span>
            <span className={style.separator}>/</span>
            <span className={style.current}>{info?.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={style.hero}>
        <div className={style.heroGlow} />
        <div className={style.inner}>
          <div className={style.heroContent}>
            <div className={style.heroInfo}>
              <img
                className={`${style.subImg} reveal`}
                src={info?.subImg}
                alt="logo"
                ref={addRevealRef as any}
              />
              <h1 className={`${style.heroTitle} reveal`} ref={addRevealRef}>
                {info?.name.toUpperCase()}
              </h1>
              <ul className={`${style.tags} reveal`} ref={addRevealRef}>
                {tags?.map(tag => (
                  <li className={style.tag} key={`tag: ${tag}`}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${style.heroImage} reveal`} ref={addRevealRef}>
              <img src={info?.mainImg} alt={info?.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Image */}
      <section className={style.mobileImage}>
        <div className={style.inner}>
          <img src={info?.mainImg} alt={info?.name} />
        </div>
      </section>

      {/* Description Section */}
      <section className={style.descSection}>
        <div className={style.inner}>
          <div className={style.descCard}>
            <div className={style.sectionLabel} ref={addRevealRef}>
              {isKo ? "제품 소개" : "Overview"}
            </div>
            <div
              className={`${style.desc} reveal`}
              ref={addRevealRef}
              dangerouslySetInnerHTML={{ __html: desc ?? "" }}
            />
            <div className={`${style.ctaRow} reveal`} ref={addRevealRef}>
              <button
                onClick={() => router.push(`/${lang}/question`)}
                className={style.btnPrimary}
              >
                {isKo ? "제품 문의" : "Contact Us"}
                <span>→</span>
              </button>
              <button
                onClick={() => router.push(`/${lang}/product`)}
                className={style.btnSecondary}
              >
                {isKo ? "전체 제품" : "All Products"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
