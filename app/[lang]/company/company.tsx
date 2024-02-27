/* eslint-disable @next/next/no-img-element */
"use client";

import { Dict, Lang } from "@/app/dictionaries";
import InfiniteScroll from "@/components/infiniteScroll";
import style from "@/styles/page/company.module.scss";

interface Props extends Dict {
  lang: Lang;
}

export default function Company({ dict }: Props) {
  const { company } = dict;

  return (
    <div className={style.companyContainer}>
      <div className={style.corporation}>
        <div className={style.wrapper}>
          <div className={style.content}>
            <div className={style.title}>MSI Coporation</div>
            <span className={style.desc}>{company.desc[0]}</span>
            <p>{company.desc[1]}</p>
          </div>
        </div>
      </div>
      <div className={style.vision}>
        <div className={style.wrapper}>
          <div className={style.content}>
            <div className={style.left}>
              <div className={style.title}>Vison & Misson ____</div>
              <div className={style.desc}>{company.vision.desc[0]}</div>
              <div className={style.desc}>
                <p>{company.vision.desc[1]}</p>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.rightWrapper}>
                <div className={style.img}></div>
                <div className={style.desc2}>
                  <div className={style.detail}>
                    <h3>{company.vision.items[0].title}</h3>
                    <p>{company.vision.items[0].desc}</p>
                  </div>
                  <div className={style.detail}>
                    <h3>{company.vision.items[1].title}</h3>
                    <p>{company.vision.items[1].desc}</p>
                  </div>
                  <div className={style.detail}>
                    <h3>{company.vision.items[2].title}</h3>
                    <p>{company.vision.items[2].desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.infiniteContainer}>
        <InfiniteScroll
          speed="10s"
          isright={1}
          width="1000"
          slideArr={["Major Society ‘人’"]}
          itemElement={text => (
            <div style={{ width: "1000px" }} className={style.act}>
              {text}
            </div>
          )}
        />
      </div>
      <div className={style.people}>
        <div className={style.wrapper}>
          <div className={style.content}>
            <div className={style.left}>
              <div className={style.title}>
                MSI <strong>Team</strong>
              </div>
              <div className={style.desc}>
                <div>{company.major.title}</div>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.desc2}>
                <p>{company.major.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.sustain}>
        <div className={style.wrapper}>
          <div className={style.content}>{company.last}</div>
        </div>
        <img
          src={"/images/sustain.png"}
          className={style.sustainImg}
          alt="sustain"
        />
      </div>
    </div>
  );
}
