import style from "@/styles/page/service.module.scss";
import { Dict, Lang } from "@/app/dictionaries";

interface Props extends Dict {
  lang: Lang;
}

export default function Service({ dict }: Props) {
  const { service } = dict;

  return (
    <div className={style.service}>
      <h1>{service.title}</h1>
      <div className={style.content}>
        <p className={style.desc}>{service.desc}</p>
      </div>
    </div>
  );
}
