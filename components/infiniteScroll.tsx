"use client";

import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

type StyleProps = {
  width: string;
  isright: number;
  speed: string;
};

const SlideContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: auto;
  gap: 20px;
`;

const Keyframes = (props: StyleProps) => keyframes`
0% {
  transform: translateX(${props.isright ? 0 : -props.width}px);
  -webkit-backface-visibility: hidden;
}

100% {
  transform: translateX(${!props.isright ? 0 : -props.width}px);
  -webkit-backface-visibility: hidden;
}
`;

const InfiniteItems = styled.div<StyleProps>`
  text-align: center;
  display: inline-block;
  overflow: visible;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  animation: ${Keyframes};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: ${({ speed }: { speed: string }) => speed};
  position: relative;
  transition: transform 0.3s;
`;

export default function InfiniteScroll({
  width,
  speed,
  isright,
  option,
  slideArr,
  itemElement,
}: {
  width: string;
  speed: string;
  slider?: JSX.Element;
  isright: number;
  option?: {
    hover?: boolean;
    touch?: boolean;
  };
  slideArr: any[];
  itemElement: (item: any) => JSX.Element;
}) {
  const [isPause, setIsPause] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (option?.touch) {
      setIsPause(true);
      let plus = 0;
      if (elementRef && elementRef.current?.style.transform) {
        const style: any = elementRef.current.style;
        plus = parseInt(style.transform.match(/translateX\(([^)]+)\)/)[1], 10);
      }
      setDragOffset(e.touches[0].clientX - plus);
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (option?.touch) {
      const currentX = e.touches[0].clientX;
      let offsetX = currentX - dragOffset;
      if (elementRef?.current) {
        if (+width < offsetX) offsetX -= +width;
        else if (-+width > offsetX) offsetX += +width;
        elementRef.current.style.transform = `translateX(${offsetX}px)`;
      }
    }
  };

  const onTouchEnd = () => {
    option?.touch && setIsPause(false);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (option?.touch) {
      setIsPause(true);
      setMouseDown(true);
      let plus = 0;
      if (elementRef && elementRef.current?.style.transform) {
        const style: any = elementRef.current.style;
        plus = parseInt(style.transform.match(/translateX\(([^)]+)\)/)[1], 10);
      }
      setDragOffset(e.clientX - plus);
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    option?.touch && setIsPause(false);
    // setDragOffset(0);
    setMouseDown(false);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (option?.touch && mouseDown) {
      const currentX = e.clientX;
      let offsetX = currentX - dragOffset;
      if (elementRef?.current) {
        if (+width < offsetX) offsetX -= +width;
        else if (-+width > offsetX) offsetX += +width;
        elementRef.current.style.transform = `translateX(${offsetX}px)`;
      }
    }
  };

  return (
    <SlideContainer>
      <InfiniteItems
        width={width}
        isright={isright}
        speed={speed}
        style={isPause ? { animationPlayState: "paused" } : {}}
        onMouseOver={() => option?.hover && setIsPause(true)}
        onMouseLeave={() => {
          if (option?.hover || option?.touch) {
            setIsPause(false);
            setMouseDown(false);
          }
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={elementRef}
        >
          {[...slideArr, ...slideArr, ...slideArr, ...slideArr].map(
            (item, i) => (
              <React.Fragment key={`infiniteItem: ${i}`}>
                {itemElement(item)}
              </React.Fragment>
            )
          )}
        </div>
      </InfiniteItems>
    </SlideContainer>
  );
}
