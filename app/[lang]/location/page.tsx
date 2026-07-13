"use client";

import style from "@/styles/page/location.module.scss";
import { useCallback, useEffect, useState } from "react";
import { config } from "@/config";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function Location({
  params,
}: {
  params: { lang: string };
}) {
  const isKo = params.lang.startsWith("ko");
  const [_, setMap] = useState<google.maps.Map | null>(null);
  const house = { lat: 37.1646, lng: 127.0302, place: "MSI" };
  const mapKey = config.google_map;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapKey,
  });

  const onLoad = useCallback((map: any) => {
    const bounds = new window.google.maps.LatLngBounds(house);
    bounds.extend(new window.google.maps.LatLng(house.lat, house.lng));
    map.fitBounds(bounds);
    map.zoom = 10;
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, []);

  return (
    <div className={style.location}>
      {/* ===== Page Header ===== */}
      <section className={style.pageHeader}>
        <div className={style.inner}>
          <div className={style.sectionLabel}>Location</div>
          <h1>{isKo ? "오시는 길" : "How to Find Us"}</h1>
          <p className={style.headerDesc}>
            {isKo
              ? "MSI 본사는 경기도 오산시에 있습니다. 방문 전 연락 주시면 자세히 안내해 드리겠습니다."
              : "MSI headquarters is located in Osan-si, Gyeonggi-do. Contact us before visiting and we will be happy to guide you."}
          </p>
        </div>
      </section>

      {/* ===== Map & Info ===== */}
      <section className={style.mapSection}>
        <div className={style.inner}>
          {isLoaded && (
            <div className={style.mapFrame}>
              <GoogleMap
                mapContainerClassName={style.googleMap}
                onLoad={map => onLoad(map)}
                options={{ minZoom: 5, maxZoom: 15 }}
              >
                <Marker position={house} />
              </GoogleMap>
            </div>
          )}

          <div className={style.infoGrid}>
            <div className={style.infoCard}>
              <div className={style.infoLabel}>Address</div>
              <p className={style.infoMain}>경기도 오산시 가장산업서로 56-20</p>
              <p className={style.infoSub}>
                56-20, Gajangsaneopseo-ro, Osan-si, Gyeonggi-do, Republic of
                Korea
              </p>
            </div>
            <div className={style.infoCard}>
              <div className={style.infoLabel}>Contact</div>
              <p className={style.infoMain}>Tel 02-553-0903</p>
              <p className={style.infoSub}>Fax 02-555-5584</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
