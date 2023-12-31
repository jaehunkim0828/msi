"use client";

import style from "@/styles/page/home.module.scss";

import Image from "next/image";
import Product1 from "@/public/images/back1_img.png";
import Product2 from "@/public/images/product2.png";
import P_Icon from "@/public/images/product.png";
import R_Icon from "@/public/images/request.png";
import S_Icon from "@/public/images/service.png";
import L_Icon from "@/public/images/location.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import useResize from "@/useResize";
import InfiniteScroll from "@/components/infiniteScroll";

export default function Page() {
  SwiperCore.use([Autoplay]);
  const routings = [
    { name: "Product", image: P_Icon },
    { name: "Product request", image: R_Icon },
    { name: "Service Request", image: S_Icon },
    { name: "Location", image: L_Icon },
  ];

  const company = [
    { title: "Introduction", desc: ["Who we are in", "the market"] },
    { title: "Management", desc: ["Sustainable", "Business Strategy"] },
    {
      title: "Products",
      desc: ["Providing the best", "Performance Products"],
    },
  ];

  const { width } = useResize(500);

  return (
    <div className={style.homeContainer}>
      <div className={style.landingContainer}>
        <Swiper
          className={style.slider}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
        >
          <SwiperSlide>
            <div
              className={style.background}
              style={{ backgroundImage: `url("/images/background1.jpg")` }}
            >
              <div className={style.wrapper2}>
                <div className={`${style.sliderItem} ${style.slide_left}`}>
                  <h2>
                    <strong
                      style={{ color: "red", backgroundColor: "transparent" }}
                    >
                      NEW
                    </strong>{" "}
                    NXTR-S
                  </h2>
                  <strong className={style.sub}>Unifying intelligence</strong>
                  <strong className={style.sub}>performance</strong>
                  <div className={style.viewMore}>View More</div>
                </div>
                <div style={{ flex: "1", position: "relative", top: "20px" }}>
                  <Image
                    src={Product1}
                    width={width > 1032 ? 600 : 300}
                    height={width > 1032 ? 400 : 200}
                    alt={"product1"}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={style.background}
              style={{ backgroundImage: `url("/images/background2.jpg")` }}
            >
              <div
                className={style.wrapper2}
                style={width < 1032 ? { flexDirection: "column-reverse" } : {}}
              >
                <div style={{ flex: "1" }}>
                  <Image
                    src={Product2}
                    width={width > 1032 ? 600 : 300}
                    height={width > 1032 ? 400 : 200}
                    alt={"product2"}
                  />
                </div>
                <div className={`${style.sliderItem} ${style.slide_right}`}>
                  <h2>
                    <strong
                      style={{ color: "red", backgroundColor: "transparent" }}
                    >
                      NEW
                    </strong>{" "}
                    AIMEXR
                  </h2>
                  <strong className={style.sub}>Inspiring Everyday</strong>
                  <strong className={style.sub}>Efficiency</strong>
                  <div className={style.viewMore}>View More</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={style.background}
              style={{ backgroundImage: `url("/images/back33.webp")` }}
            >
              <div className={style.sliderItem2}>
                <h2>REQUEST</h2>
                <strong className={style.sub}>
                  Providing the best services
                </strong>
                <div className={style.viewMore}>View More</div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className={style.routing}>
          <div className={style.title}>Go to MSI Sites</div>
          <div className={style.content}>
            {routings.map((route, i) => (
              <div className={style.item} key={`route-${i}`}>
                <Image
                  src={route.image}
                  alt="icon"
                  width={width > 1032 ? 80 : 60}
                  height={width > 1032 ? 80 : 60}
                />
                <div>{route.name}</div>
              </div>
            ))}
          </div>
          <div className={style.tel}>Tel : 02-553-0903 | Fax : 02-555-5584</div>
        </div>
      </div>
      <div className={style.company}>
        <div className={style.block} />
        <div className={style.wrapper}>
          <div className={style.info}>
            <div className={style.title}>Company</div>
            <div className={style.desc}>
              {`“In the vanguard of future industries, we commit to enhancing
              life's quality with our dedication, quality, and service."`}
            </div>
            <div className={style.companyContent}>
              {company.map((cp, i) => (
                <div key={`company-${i}`} className={style.companyItem}>
                  <div className={style.itemWrapper}>
                    <div className={style.en}>{cp.title}</div>
                    <div className={style.ko}>
                      {cp.desc.map((de, i) => (
                        <div className={style.desc_con} key={`de: ${i}`}>
                          {de}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={style.infiniteContainer}>
        <InfiniteScroll
          speed="10s"
          isright={1}
          width="1200"
          slideArr={["Think, Evolve, and Act."]}
          itemElement={text => (
            <div style={{ width: "1200px" }} className={style.act}>
              {text}
            </div>
          )}
        />
      </div>
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
                <div>A taleted</div>
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
    </div>
  );
}
