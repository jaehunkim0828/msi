/* eslint-disable @next/next/no-img-element */
"use client";

import { Dict, Lang } from "@/app/dictionaries";
import style from "@/styles/page/company.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Props extends Dict {
  lang: Lang;
}

interface StatDef {
  value: number;
  suffix: string;
  label: string;
}

const stats: Record<string, StatDef[]> = {
  en: [
    { value: 1979, suffix: "", label: "Founded" },
    { value: 20, suffix: "+", label: "Products" },
    { value: 10, suffix: "+", label: "Global Partners" },
  ],
  ko: [
    { value: 1979, suffix: "", label: "설립" },
    { value: 20, suffix: "+", label: "제품군" },
    { value: 10, suffix: "+", label: "글로벌 파트너" },
  ],
};

export default function Company({ dict, lang }: Props) {
  const { company } = dict;
  const router = useRouter();
  const revealRefs = useRef<HTMLElement[]>([]);
  const statsRef = useRef<HTMLElement>(null);
  const hasCountedUp = useRef(false);

  const currentStats = lang.startsWith("ko") ? stats.ko : stats.en;
  const [counters, setCounters] = useState<number[]>(
    () => currentStats.map(() => 0)
  );

  // Reveal animation observer
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

  // Count-up animation for stats
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCountedUp.current) {
          hasCountedUp.current = true;
          const targets = currentStats.map((s) => s.value);
          const duration = 1400;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCounters(targets.map((t) => Math.round(t * eased)));

            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [currentStats]);

  const addRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  return (
    <div className={style.companyContainer}>
      {/* ===== Section 1: Hero — Split Layout ===== */}
      <section className={style.hero}>
        <div className={style.inner}>
          <div className={`${style.sectionLabel} reveal`} ref={addRevealRef}>
            About Us
          </div>
          <div className={style.heroSplit}>
            <div className={style.heroText}>
              <h1 className={`${style.heroTitle} reveal`} ref={addRevealRef}>
                MSI
                <br />
                Corporation
              </h1>
              <div className={`${style.heroTagline} reveal`} ref={addRevealRef}>
                {company.desc[0]}
              </div>
              <p className={`${style.heroDesc} reveal`} ref={addRevealRef}>
                {company.desc[1]}
              </p>
              {company.desc[2] && (
                <p className={`${style.heroDesc} reveal`} ref={addRevealRef}>
                  {company.desc[2]}
                </p>
              )}
            </div>
            <div className={`${style.heroImage} reveal`} ref={addRevealRef}>
              <img src="/images/company-hero.jpg" alt="MSI Corporation" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Stats with count-up ===== */}
      <section
        className={style.statsSection}
        ref={statsRef as React.RefObject<HTMLElement>}
      >
        <div className={style.inner}>
          <div className={style.statsGrid}>
            {currentStats.map((stat, i) => (
              <div
                key={`stat-${i}`}
                className={`${style.statItem} reveal`}
                ref={addRevealRef}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={style.statNumber}>
                  {counters[i]?.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className={style.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 3: Vision & Mission ===== */}
      <section className={style.vision}>
        <div className={style.inner}>
          <div className={`${style.sectionLabel} reveal`} ref={addRevealRef}>
            Vision & Mission
          </div>
          <div className={style.visionContent}>
            <div className={style.visionLeft}>
              <h2
                className={`${style.visionTitle} reveal`}
                ref={addRevealRef}
              >
                Vision &
                <br />
                Mission
              </h2>
              <p className={`${style.visionDesc} reveal`} ref={addRevealRef}>
                {company.vision.desc[0]}
              </p>
              <p className={`${style.visionDesc} reveal`} ref={addRevealRef}>
                {company.vision.desc[1]}
              </p>
            </div>
            <div className={style.visionRight}>
              <div className={style.visionCards}>
                {company.vision.items.map((item: any, i: number) => (
                  <div
                    key={`vision-${i}`}
                    className={style.cardReveal}
                    ref={addRevealRef}
                    style={{ transitionDelay: `${i * 0.12}s` }}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className={`${style.visionImage} reveal`} ref={addRevealRef}>
                <img src="/images/company-vision.jpg" alt="Vision" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Team / People ===== */}
      <section className={style.people}>
        <div className={style.inner}>
          <div className={style.peopleContent}>
            <div className={style.peopleLeft}>
              <div
                className={`${style.sectionLabel} ${style.sectionLabelWhite} reveal`}
                ref={addRevealRef}
              >
                Our Team
              </div>
              <h2
                className={`${style.peopleTitle} reveal`}
                ref={addRevealRef}
              >
                MSI <strong>Team</strong>
              </h2>
              <div
                className={`${style.peopleSubtitle} reveal`}
                ref={addRevealRef}
              >
                {company.major.title}
              </div>
            </div>
            <div className={style.peopleRight}>
              <p className={`${style.peopleDesc} reveal`} ref={addRevealRef}>
                {company.major.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 5: Sustain + CTA ===== */}
      <section className={style.sustain}>
        <div className={style.inner}>
          <div className={`${style.sustainContent} reveal`} ref={addRevealRef}>
            {company.last}
          </div>
          <div className={`${style.ctaButtons} reveal`} ref={addRevealRef}>
            <button
              className={style.btnPrimary}
              onClick={() => router.push(`/${lang}/product`)}
            >
              {lang === "ko" ? "제품 보기" : "View Products"}
              <span>→</span>
            </button>
            <button
              className={style.btnSecondary}
              onClick={() => router.push(`/${lang}/question`)}
            >
              {lang === "ko" ? "문의하기" : "Contact Us"}
            </button>
          </div>
        </div>
        <img
          src="/images/sustain.png"
          className={style.sustainImg}
          alt="sustain"
        />
      </section>
    </div>
  );
}
