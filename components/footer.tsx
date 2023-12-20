import { Lang } from "@/app/dictionaries";
import style from "@/styles/footer.module.scss";

export default function Footer({ lang, dict }: { lang: Lang; dict: any }) {
  return (
    <footer className={style.footer}>
      <p>
        {`06242 서울 강남구 강남대로 354 혜천빌딩 ｜ 회사명:
      (주)엠에스아이코퍼레이션 사업자등록번호 575-88-00614 ｜ Tel : 02-553-0903
      import style from '@/styles/footer.module.scss';
      ｜ Fax : 02-555-5584 Copyright ⓒ (주)엠에스아이코퍼레이션 All rights
      reserved.`}
      </p>
    </footer>
  );
}
