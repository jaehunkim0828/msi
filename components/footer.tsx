import { Lang } from "@/app/dictionaries";
import style from "@/styles/footer.module.scss";

export default function Footer({ lang, dict }: { lang: Lang; dict: any }) {
  return (
    <footer className={style.footer}>
      <p>
        {`18103 경기도 오산시 가장산업서로 56-20 ｜ 회사명:
      (주)엠에스아이코퍼레이션 사업자등록번호 575-88-00614 ｜ Tel : 02-553-0903
      ｜ Fax : 02-555-5584 Copyright ⓒ (주)엠에스아이코퍼레이션 All rights
      reserved.`}
      </p>
    </footer>
  );
}
