"use client";

import style from "@/styles/page/location.module.scss";
import { useCallback, useEffect, useState } from "react";
import { config } from "@/config";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function Location() {
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
      <div className={style.desc}>
        <h1>How to find Us</h1>
      </div>
      {isLoaded && (
        <GoogleMap
          mapContainerClassName={style.googleMap}
          onLoad={map => onLoad(map)}
          options={{ minZoom: 5, maxZoom: 15 }}
        >
          <Marker position={house} />
        </GoogleMap>
      )}
      <div className={style.adress}>
        <span>주소: 경기도 오산시 가장산업서로 56-20</span>
        <span className={style.br} />
        <span>
          Adress: 56-20, Gajangsaneopseo-ro, Osan-si, Gyeonggi-do, Republic of
          Korea
        </span>
      </div>
    </div>
  );
}
