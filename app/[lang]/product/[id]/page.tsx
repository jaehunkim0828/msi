/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import json from "@/product.json";
import style from "@/styles/page/productItem.module.scss";
import { useRouter } from "next/navigation";

export default function ProductItem({ params }: { params: { id: string } }) {
  const router = useRouter();
  const replaceId = params.id;
  const info = json.products.find(pd => pd.id.toString() === replaceId);
  return (
    <div className={style.productItem}>
      <div className={style.name}>{info?.name.toUpperCase()}</div>
      <div className={style.product}>
        <img src={info?.mainImg} className={style.mainImg} alt="item" />
        <div className={style.content}>
          <ul className={style.tags}>
            {info?.tags.map(tag => (
              <li className={style.tag} key={`tag: ${tag}`}>
                {tag}
              </li>
            ))}
          </ul>
          <img className={style.subImg} src={info?.subImg} alt="sub" />
          <img src={info?.mainImg} className={style.mainImg2} alt="item" />
          <div className={style.descContainer}>
            <div
              className={style.desc}
              dangerouslySetInnerHTML={{ __html: info?.desc ?? "" }}
            />
            <button
              onClick={() => router.push("/question")}
              className={style.contact}
            >
              Contact US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
