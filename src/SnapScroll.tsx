import React, { useRef, useEffect, useState } from "react";
import Wrapper from "./Wrapper";
export default function SnapScroll(props: React.HTMLProps<HTMLDivElement>) {
  const { className = "", ...restProps } = props;
  const combinedClassName = `snap-container ${className}`;

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const COOLDOWN: number = 500;

  const [snapItems, setSnapItems] = useState<Element[] | null>(null);
  const [lastScrollTime, setLastScrollTime] = useState<number>(Date.now());
  const [xDown, setXDown] = useState<number | null>(null);
  const [yDown, setYDown] = useState<number | null>(null);

  const scrollToElement = (element: Element) => {
    element.scrollIntoView();
  };

  const emitGoEvent = (direction: "up" | "down") => {
    if (snapItems) {
      // prettier-ignore
      const currentItem = snapItems.find((item) => item.id === window.location.hash.replace('#', ''));
      if (currentItem) {
        const currentIndex = snapItems.indexOf(currentItem);
        if (direction === "up") {
          if (currentIndex !== 0) {
            window.location.hash = snapItems[currentIndex - 1].id;
          }
        } else {
          if (currentIndex !== snapItems.length - 1) {
            window.location.hash = snapItems[currentIndex + 1].id;
          }
        }
      }
    }
  };

  const handleWheelEvent = (event: WheelEvent) => {
    event.preventDefault();
    const currentTime: number = Date.now();
    if (currentTime - lastScrollTime > COOLDOWN) {
      const scrollDirection = event.deltaY > 0 ? "down" : "up";
      if (scrollDirection === "down") {
        emitGoEvent("down");
      } else {
        emitGoEvent("up");
      }
      setLastScrollTime(currentTime);
    }
  };

  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault();
    var firstTouch = getTouches(event)[0];
    setXDown(firstTouch.clientX);
    setYDown(firstTouch.clientY);
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    if (!xDown || !yDown) {
      return;
    }
    var xUp = event.touches[0].clientX;
    var yUp = event.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if (Math.abs(xDiff) <= Math.abs(yDiff)) {
      if (yDiff > 0) {
        emitGoEvent("down");
      } else {
        emitGoEvent("up");
      }
    }
    setXDown(null);
    setYDown(null);
  };

  const getTouches = (event: TouchEvent) => {
    return event.touches;
  };
  useEffect(() => {
    if (wrapperRef.current) {
      const children = Array.from(wrapperRef.current.children);
      const snapItems = children.filter((child) =>
        child.classList.contains("snap-item")
      );
      setSnapItems(snapItems);
    }
  }, [wrapperRef]);
  // scroll when hash is changed
  useEffect(() => {
    if (snapItems) {
      // prettier-ignore
      const foundItem = snapItems.find((item) => item.id === window.location.hash.replace('#', ''));
      foundItem && scrollToElement(foundItem);
    }
  }, [window.location.hash]);
  // change hash while swipe
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [lastScrollTime, xDown, yDown]);
  // change hash while wheel is scrolling
  useEffect(() => {
    document.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheelEvent);
    };
  }, [lastScrollTime]);

  // Starting hash giver
  useEffect(() => {
    if (!window.localStorage.hash && snapItems) {
      window.location.hash = snapItems[0].id;
    }
  }, [snapItems]);

  return (
    <Wrapper
      forwardedRef={wrapperRef}
      className={combinedClassName}
      {...restProps}
    >
      {props.children}
    </Wrapper>
  );
}
