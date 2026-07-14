"use client";

import style from "@/styles/page/service.module.scss";
import { Dict, Lang } from "@/app/dictionaries";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface Props extends Dict {
  lang: Lang;
}

export default function Service({ dict, lang }: Props) {
  const { service } = dict;
  const router = useRouter();
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

  return (
    <div className={style.service}>
      {/* ===== Page Header ===== */}
      <section className={style.pageHeader}>
        <div className={style.inner}>
          <div className={style.sectionLabel}>Customer Service</div>
          <h1 className="reveal" ref={addRevealRef}>
            {service.title}
          </h1>
          <p className={`${style.headerDesc} reveal`} ref={addRevealRef}>
            {service.desc}
          </p>
        </div>
      </section>

      {/* ===== Service List ===== */}
      <section className={style.serviceList}>
        <div className={style.inner}>
          {service.items.map((item: { title: string; desc: string }, i: number) => (
            <div
              key={item.title}
              className={`${style.serviceRow} reveal`}
              ref={addRevealRef}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className={style.rowNumber}>0{i + 1}</div>
              <div className={style.rowTitle}>{item.title}</div>
              <p className={style.rowDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Service CTA ===== */}
      <section className={style.serviceCta}>
        <div className={style.inner}>
          <div className={`${style.ctaBox} reveal`} ref={addRevealRef}>
            <h2>{service.cta.title}</h2>
            <p>{service.cta.desc}</p>
            <div className={style.ctaActions}>
              <button onClick={() => router.push(`/${lang}/question`)}>
                {service.cta.button}
                <span>→</span>
              </button>
              <div className={style.ctaContact}>
                <span>Tel 02-553-0903</span>
                <span>Fax 02-555-5584</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
