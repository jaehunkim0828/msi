/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import style from "@/styles/page/product.module.scss";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Product() {
  const mecaRef = useRef(null);
  const printerRef = useRef(null);
  const insertRef = useRef(null);
  const softwareRef = useRef(null);
  const automaticRef = useRef(null);
  const automationRef = useRef(null);
  const warehouseRef = useRef(null);

  const router = useRouter();

  const onPushProduct = (ref: any) => {
    window.scrollTo({ top: ref.current.offsetTop - 104, behavior: "smooth" });
  };

  const printers = [
    { path: "/images/NXTRPM.png", name: "NXTRPM", id: 9 },
    { path: "/images/GPX-CII_00.png", name: "GPX-CII/GPX-CSII/GPX-CL", id: 10 },
  ];

  const inserts = [
    { path: "/images/startWing.png", name: "SmartWing BA", id: -1 },
    { path: "/images/sFAB-D.png", name: "sFAB-D", id: 11 },
    { path: "/images/sFab-SH.png", name: "sFab-SH", id: 12 },
  ];
  const software = [{ path: "/images/Nexim01.jpg", name: "Nexim", id: 13 }];
  const automatic = [
    {
      path: "/images/AFMU_02.png",
      name: "Auto Feeder Maintenance Unit",
      id: 14,
    },
    { path: "/images/smart.png", name: "Smart Nozzle Cleaner", id: 15 },
    { path: "/images/AHC-R_00.png", name: "Auto Head Cleaner-R", id: 16 },
    { path: "/images/cleaner.png", name: "Auto Head Cleaner", id: 17 },
  ];
  const automation = [
    { path: "/images/auto.png", name: "Auto Splicing Unit", id: 18 },
    { path: "/images/ALF-3.png", name: "Auto Loading Feeder", id: 19 },
  ];
  const warehouse = [{ path: "/images/sTower2.png", name: "sTower II" }];

  return (
    <div className={style.productContainer}>
      <div className={style.wrapper}>
        <h1>Products</h1>
        <ul className={style.list}>
          <li onClick={() => onPushProduct(mecaRef)}>
            <span>SMT pick and place machines</span>
          </li>
          <li onClick={() => onPushProduct(printerRef)}>
            <span>Printers</span>
          </li>
          <li onClick={() => onPushProduct(insertRef)}>
            <span>Inserters</span>
          </li>
          <li onClick={() => onPushProduct(softwareRef)}>
            <span>Software</span>
          </li>
          <li onClick={() => onPushProduct(automaticRef)}>
            <span>Automatic maintenance units</span>
          </li>
          <li onClick={() => onPushProduct(automationRef)}>
            <span>Automation units</span>
          </li>
          {/* <li onClick={() => onPushProduct(warehouseRef)}>
            <span>Automation warehouses</span>
          </li> */}
        </ul>
        <div ref={mecaRef} className={style.products}>
          <div className={style.sub}>SMT Pic and Place Machines</div>
          <div className={style.productList}>
            <div
              onClick={() => router.push("/product/1")}
              className={style.item}
            >
              <img src={"/images/AIMEXR_product.png"} alt="product" />
              <div className={style.productName}>AIMEXR</div>
            </div>
            <div
              onClick={() => router.push("/product/2")}
              className={style.item}
            >
              <img src={"/images/NXTR-S.png"} alt="product" />
              <div className={style.productName}>{`NXTR(S Model)`}</div>
            </div>
            <div
              onClick={() => router.push("/product/3")}
              className={style.item}
            >
              <img src={"/images/NXTR_A.png"} alt="product" />
              <div className={style.productName}>{`NXTR(A Model)`}</div>
            </div>
            <div
              onClick={() => router.push("/product/4")}
              className={style.item}
            >
              <img src={"/images/nxt3.png"} alt="product" />
              <div className={style.productName}>NXT III</div>
            </div>
            <div
              onClick={() => router.push("/product/5")}
              className={style.item}
            >
              <img src={"/images/nxt3c.png"} alt="product" />
              <div className={style.productName}>NXT IIIc</div>
            </div>
            <div
              onClick={() => router.push("/product/6")}
              className={style.item}
            >
              <img src={"/images/AIMEXIII.png"} alt="product" />
              <div className={style.productName}>AIMEX III</div>
            </div>
            <div
              onClick={() => router.push("/product/7")}
              className={style.item}
            >
              <img src={"/images/AIMEXIIIc.png"} alt="product" />
              <div className={style.productName}>AIMEX IIIc</div>
            </div>
            <div
              onClick={() => router.push("/product/8")}
              className={style.item}
            >
              <img src={"/images/NXT-H.png"} alt="product" />
              <div className={style.productName}>NXT-H</div>
            </div>
          </div>
        </div>
        <div ref={printerRef} className={style.products}>
          <div className={style.sub}>Printers</div>
          <div className={style.productList}>
            {printers.map((print, i) => (
              <div
                onClick={() => router.push(`/product/${print.id}`)}
                className={style.item}
                key={`print-${i}`}
              >
                <img src={print.path} alt="product" />
                <div className={style.productName}>{print.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div ref={insertRef} className={style.products}>
          <div className={style.sub}>Inserts</div>
          <div className={style.productList}>
            {inserts.map((print, i) => (
              <div
                onClick={() => {
                  if (print.id !== -1) router.push(`/product/${print.id}`);
                }}
                className={style.item}
                key={`print-${i}`}
              >
                <img src={print.path} alt="product" />
                <div className={style.productName}>{print.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div ref={softwareRef} className={style.products}>
          <div className={style.sub}>Software</div>
          <div className={style.productList}>
            {software.map((print, i) => (
              <div
                onClick={() => router.push(`/product/${print.id}`)}
                className={style.item}
                key={`print-${i}`}
              >
                <img src={print.path} alt="product" />
                <div className={style.productName}>{print.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div ref={automaticRef} className={style.products}>
          <div className={style.sub}>Automatic maintenance units</div>
          <div className={style.productList}>
            {automatic.map((print, i) => (
              <div
                onClick={() => router.push(`/product/${print.id}`)}
                className={style.item}
                key={`print-${i}`}
              >
                <img src={print.path} alt="product" />
                <div className={style.productName}>{print.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div ref={automationRef} className={style.products}>
          <div className={style.sub}>Automation units</div>

          <div className={style.productList}>
            {automation.map((print, i) => (
              <div
                onClick={() => router.push(`/product/${print.id}`)}
                className={style.item}
                key={`print-${i}`}
              >
                <img src={print.path} alt="product" />
                <div className={style.productName}>{print.name}</div>
              </div>
            ))}
          </div>
        </div>
        {/* <div ref={warehouseRef} className={style.products}>
          <div className={style.sub}>Automatic Warehouse</div>
          <div className={style.productList}>
            {warehouse.map((print, i) => (
              <div className={style.item} key={`print-${i}`}>
                <img src={print.path} alt="product" />
                <div className={style.productName}>{print.name}</div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
