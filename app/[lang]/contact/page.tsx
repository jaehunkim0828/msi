import style from "@/styles/page/contact.module.scss";
import Image from "next/image";
import R_Icon from "@/public/images/request.png";
import S_Icon from "@/public/images/service.png";

export default function Contact() {
  return (
    <div className={style.contactContainer}>
      <div className={style.cover}>
        <div className={style.content}>
          <h1>Contact us</h1>
          <h2>Thank you for visiting MSI website.</h2>
          <p>
            {`Please send to your inquiry your details along with accurate email
          information. We will respond as quickly as possible."`}
          </p>
        </div>
        <div className={style.router}>
          <div className={style.item}>
            <Image src={R_Icon} width={100} height={100} alt="sale" />
            <div>Product Request</div>
            <div>Sale@msinter.co.kr</div>
          </div>
          <span className={style.breaker} />
          <div className={style.item}>
            <Image src={S_Icon} width={100} height={100} alt="service" />
            <div>Service Request</div>
            <div>Service@msinter.co.kr</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
