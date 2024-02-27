import style from "@/styles/page/contact.module.scss";
import Image from "next/image";
import R_Icon from "@/public/images/request.png";
import S_Icon from "@/public/images/service.png";
import { Dict, Lang } from "@/app/dictionaries";

interface Props extends Dict {
  lang: Lang;
}

export default function Contact({ dict }: Props) {
  const { contact } = dict;

  return (
    <div className={style.contactContainer}>
      <div className={style.cover}>
        <div className={style.content}>
          <h1>{contact.title}</h1>
          <p>{contact.desc}</p>
        </div>
        <div className={style.router}>
          <div className={style.item}>
            <Image src={R_Icon} width={100} height={100} alt="sale" />
            <div>{contact.route.items[0]}</div>
            <div>Sale@msinter.co.kr</div>
            <div>+82-02-553-0903</div>
          </div>
          <span className={style.breaker} />
          <div className={style.item}>
            <Image src={S_Icon} width={100} height={100} alt="service" />
            <div>{contact.route.items[1]}</div>
            <div>Service@msinter.co.kr</div>
            <div>+82-02-553-0903</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
