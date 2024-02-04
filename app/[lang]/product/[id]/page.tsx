/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import json from "@/product.json";
import style from "@/styles/page/productItem.module.scss";

export default function ProductItem({ params }: { params: { id: string } }) {
  const replaceId = params.id.replaceAll("%20", " ");
  const info = json.products.find(pd => pd.name === replaceId);
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
            <button className={style.contact}>Contact US</button>
          </div>
        </div>
      </div>
    </div>
  );
}
