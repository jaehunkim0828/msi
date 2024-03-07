/* eslint-disable @next/next/no-img-element */
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
import { Dict, Lang, getDictionary } from "../dictionaries";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props extends Dict {
  lang: Lang;
}

export default function Page({ dict }: Props) {
  const { home } = dict;
  const router = useRouter();

  SwiperCore.use([Autoplay]);
  const routings = [
    { name: "Product", image: P_Icon, path: "/product" },
    { name: "Product request", image: R_Icon, path: "/question" },
    { name: "Service Request", image: S_Icon, path: "/question" },
    { name: "Location", image: L_Icon, path: "/location" },
  ];

  const { width } = useResize(500);

  return (
    <div className={style.homeContainer}>
      <div className={style.landingContainer}>
        <Swiper
          className={style.slider}
          autoplay={{ delay: 8000, disableOnInteraction: false }}
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
                    </strong>
                    NXTR-S
                  </h2>
                  <strong className={style.sub}>Unifying intelligence</strong>
                  <strong className={style.sub}>performance</strong>
                  <div
                    onClick={() => router.push("/product/2")}
                    className={style.viewMore}
                  >
                    View More
                  </div>
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
                    </strong>
                    AIMEXR
                  </h2>
                  <strong className={style.sub}>Inspiring Everyday</strong>
                  <strong className={style.sub}>Efficiency</strong>
                  <div
                    onClick={() => router.push("/product/1")}
                    className={style.viewMore}
                  >
                    View More
                  </div>
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
                <div
                  onClick={() => router.push("/question")}
                  className={style.viewMore}
                >
                  View More
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className={style.routing}>
          <div className={style.title}>Go to MSI Sites</div>
          <div className={style.content}>
            {routings.map((route, i) => (
              <div
                onClick={() => router.push(route.path)}
                className={style.item}
                key={`route-${i}`}
              >
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
        <div className={style.wrapper}>
          <div className={style.info}>
            <div className={style.title}>Corporation</div>
            <div className={style.desc}>{home.corporation.content}</div>
            <div className={style.companyContent}>
              {home.corporation.items.map((cp, i) => (
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
      <div className={style.product}>
        <div className={style.wrapper}>
          <div className={style.proContent}>
            <h2>Product</h2>
            <p>{home.product.title}</p>
            <div className={style.products}>
              <div
                onClick={() => router.push("/product/3")}
                className={style.items}
              >
                <div className={style.img}>
                  <img src={"/images/NXTR_A.png"} alt="products" />
                </div>
                <div className={style.desc}>NXTR-A</div>
              </div>
              <div
                onClick={() => router.push("/product/2")}
                className={style.items}
              >
                <div className={style.img}>
                  <img src={"/images/NXTR-S.png"} alt="products" />
                </div>
                <div className={style.desc}>NXTR-S</div>
              </div>
              <div
                onClick={() => router.push("/product/1")}
                className={style.items}
              >
                <div className={style.img}>
                  <img src={"/images/AIMEXR_product.png"} alt="products" />
                </div>
                <div className={style.desc}>AIMEXR</div>
              </div>
              <div
                onClick={() => router.push("/product/4")}
                className={style.items}
              >
                <div className={style.img}>
                  <img src={"/images/nxt3.png"} alt="products" />
                </div>
                <div className={style.desc}>NXT III</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.global}>
        <div className={style.semi}>
          <div className={style.region}>
            <div className={style.title}>Global Network - Region</div>
            <div className={style.desc}>
              <div className={style.item}>Europe - 32</div>
              <div className={style.item}>Middle east, Africa - 11</div>
              <div className={style.item}>Asia - 7</div>
              <div className={style.item}>North / South America - 2</div>
            </div>
          </div>
          <img className={style.map} src={"/images/map.png"} alt={"지도"} />
        </div>
      </div>
    </div>
  );
}
