"use client";

import style from "@/styles/page/home.module.scss";

import dynamic from "next/dynamic";
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
    { en: "Company Introduce", ko: "회사소개", image: "/images/company1.jpeg" },
    { en: "Management", ko: "지속가능경영", image: "/images/company2.jpeg" },
    {
      en: "Product Introduce",
      ko: "제품 소개",
      image: "/images/company3.jpeg",
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
              <div className={style.wrapper}>
                <div className={style.sliderItem}>
                  <h2>
                    <strong
                      style={{ color: "red", backgroundColor: "transparent" }}
                    >
                      NEW
                    </strong>{" "}
                    NXTR-S
                  </h2>
                  <strong className={style.sub}>
                    Unifying intelligence and performance
                  </strong>
                  <p>
                    NXTR is the next stage toward the smart factory of the
                    future.
                  </p>
                  <p>NXTR offers a truly modular design for the optimal line</p>
                  <p>configuration that caters to your production.</p>
                </div>
                <div style={{ flex: "1" }}>
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
                className={style.wrapper}
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
                <div className={style.sliderItem}>
                  <h2>
                    <strong
                      style={{ color: "red", backgroundColor: "transparent" }}
                    >
                      NEW
                    </strong>{" "}
                    AIMEXR
                  </h2>
                  <strong className={style.sub}>
                    Inspiring Everyday Efficiency
                  </strong>
                  <p>This high-end model machine supports the latest</p>
                  <p>functions that support various production types</p>
                  <p>flexibly on an advanced platform.</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={style.background}
              style={{ backgroundImage: `url("/images/back3.webp")` }}
            >
              <div className={style.sliderItem2}>
                <h2>REQUEST</h2>
                <strong className={style.sub}>
                  Providing the best services
                </strong>
                <p>We grow with customer satisfaction by providing</p>
                <p>the best products and services.</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className={style.routing}>
          <div className={style.title}>Go to MSI Sites</div>
          <div className={style.content}>
            {routings.map((route, i) => (
              <div className={style.item} key={`route-${i}`}>
                <div>{route.name}</div>
                <Image
                  src={route.image}
                  alt="icon"
                  width={width > 1032 ? 80 : 60}
                  height={width > 1032 ? 80 : 60}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.company}>
        <div className={style.wrapper}>
          <div className={style.info}>
            <div className={style.title}>Company</div>
            <span className={style.desc}>
              {`“In the vanguard of future industries, we commit to enhancing
              life's quality with our dedication, quality, and service."`}
            </span>
            <div className={style.companyContent}>
              {company.map((cp, i) => (
                <div
                  style={{
                    backgroundImage: `url(${cp.image})`,
                  }}
                  key={`company-${i}`}
                  className={style.companyItem}
                >
                  <div className={style.en}>{cp.en}</div>
                  <div className={style.ko}>{cp.ko}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={style.infiniteContainer}>
        <InfiniteScroll
          speed="35s"
          isright={1}
          width="3000"
          slideArr={["Think, Evolve, and Act,"]}
          itemElement={text => (
            <div style={{ width: "3000px" }} className={style.act}>
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
              <span className={style.highlight}>Creating </span> and{" "}
              <span className={style.highlight}> Providing </span> the Future.
            </span>
            <p>MSI is the trusted name in SMT.</p>
            <p>Since our founding in 1989, </p>
            <p>we have put evolvement first.</p>
          </div>
        </div>
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
                <p>The MSI crew—the people who serve</p>
                <p>our clients and steward their assets with </p>
                <p>dedication, integrity, and passion—are </p>
                <p>critical to our success.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.infiniteContainer}>
        <InfiniteScroll
          speed="35s"
          isright={1}
          width="2500"
          slideArr={["Major Society ‘人’"]}
          itemElement={text => (
            <div style={{ width: "2500px" }} className={style.act}>
              {text}
            </div>
          )}
        />
      </div>
    </div>
  );
}
