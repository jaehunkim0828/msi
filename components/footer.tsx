"use client";
import { Lang } from "@/app/dictionaries";
import style from "@/styles/footer.module.scss";
import Image from "next/image";
import Logo from "../public/images/msi.png";
import { useRouter } from "next/navigation";

export default function Footer({ lang }: { lang: Lang; dict: any }) {
  const router = useRouter();

  const navigate = (path: string) => router.push(`/${lang}/${path}`);

  return (
    <footer className={style.footer}>
      <div className={style.footerInner}>
        <div className={style.footerTop}>
          <div className={style.footerBrand}>
            <div className={style.footerLogo}>
              <Image src={Logo} width={90} height={48} alt="MSI Corporation" />
            </div>
            <p className={style.footerTagline}>
              {lang === "ko"
                ? "SMT 산업의 미래를 선도하는 엠에스아이코퍼레이션"
                : "Leading the future of the SMT industry"}
            </p>
          </div>

          <div className={style.footerLinks}>
            <div className={style.linkGroup}>
              <div className={style.linkTitle}>Company</div>
              <span className={style.linkItem} onClick={() => navigate("company")}>
                {lang === "ko" ? "회사소개" : "About Us"}
              </span>
              <span className={style.linkItem} onClick={() => navigate("location")}>
                {lang === "ko" ? "오시는 길" : "Location"}
              </span>
            </div>
            <div className={style.linkGroup}>
              <div className={style.linkTitle}>Products</div>
              <span className={style.linkItem} onClick={() => navigate("product")}>
                {lang === "ko" ? "전체 제품" : "All Products"}
              </span>
            </div>
            <div className={style.linkGroup}>
              <div className={style.linkTitle}>Support</div>
              <span className={style.linkItem} onClick={() => navigate("question")}>
                {lang === "ko" ? "제품 문의" : "Product Inquiry"}
              </span>
              <span className={style.linkItem} onClick={() => navigate("question")}>
                {lang === "ko" ? "서비스 문의" : "Service Request"}
              </span>
            </div>
          </div>
        </div>

        <div className={style.footerBottom}>
          <div className={style.copyright}>
            Copyright &copy; {new Date().getFullYear()} (주)엠에스아이코퍼레이션 All rights reserved.
          </div>
          <div className={style.footerContact}>
            <span>Tel : 02-553-0903</span>
            <span>Fax : 02-555-5584</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
