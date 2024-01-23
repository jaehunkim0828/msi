/* eslint-disable @next/next/no-img-element */
"use client";

import InfiniteScroll from "@/components/infiniteScroll";
import style from "@/styles/page/company.module.scss";

export default function Contact() {
  return (
    <div className={style.companyContainer}>
      <div className={style.corporation}>
        <div className={style.wrapper}>
          <div className={style.content}>
            <div className={style.title}>MSI Coporation</div>
            <span className={style.desc}>
              Creating and Providing the Future.
            </span>
            <p>MSI is the trusted name in SMT.</p>
            <p>Since our founding in 1979, </p>
            <p>we have put evolvement first.</p>
          </div>
        </div>
      </div>
      <div className={style.vision}>
        <div className={style.wrapper}>
          <div className={style.content}>
            <div className={style.left}>
              <div className={style.title}>Vison & Misson ____</div>
              <div className={style.desc}>
                MSI is creating and providing the future.
              </div>
              <div className={style.desc}>
                <p>In the vanguard of future industries, </p>
                <p>we commit to enhancing </p>
                <p>{`life's quality with our dedication,`}</p>
                <p>quality, and service.</p>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.rightWrapper}>
                <div className={style.img}></div>
                <div className={style.desc2}>
                  <div className={style.detail}>
                    <h3>▶ Customer Satisfaction</h3>
                    <p>
                      We grow with customer satisfaction by providing the best
                      products and services.
                    </p>
                  </div>
                  <div className={style.detail}>
                    <h3>▶ Esteem Human Culture</h3>
                    <p>
                      {`"We respect autonomy and creativity with the spirit of human dignity."`}
                    </p>
                  </div>
                  <div className={style.detail}>
                    <h3>▶ On time on space</h3>
                    <p>Always be there</p>
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
                MSI <strong>People</strong>
              </div>
              <div className={style.desc}>
                <div>A talented</div>
                <div>and</div>
                <div>dedicated</div>
                <div>crew</div>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.desc2}>
                <p>
                  The MSI crew—the people who serve our clients and steward
                  their assets with dedication, integrity, and passion—are
                  critical to our success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.sustain}>
        <div className={style.wrapper}>
          <div
            className={style.content}
          >{`"MSI, a specialist in SMT technology, is committed to sustainable management practices based on a foundation of trust with our customers and various stakeholders. By systematically responding to rapidly changing global trends, we aim to achieve sustainable growth, thereby fulfilling our corporate social responsibility."`}</div>
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
