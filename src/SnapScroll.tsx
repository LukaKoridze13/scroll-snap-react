import React, { useRef, useEffect, useState } from "react";
import Wrapper from "./Wrapper";

interface ScnapScrollProps extends React.HTMLProps<HTMLDivElement> {
  cooldown?: number;
  isSnapScrollEnabled?: boolean;
  scrollPosition?: "nearest" | "center" | "start" | "end";
  userCanScroll?: boolean;
}

export default function SnapScroll(props: ScnapScrollProps) {
  const {
    className = "",
    cooldown,
    isSnapScrollEnabled,
    scrollPosition,
    userCanScroll,
    ...restProps
  } = props;
  const combinedClassName = `snap-container ${className}`;

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const COOLDOWN: number = cooldown || 500;
  const scrollEnabled: boolean = setDefault(isSnapScrollEnabled);
  const canScroll: boolean = setDefault(userCanScroll);
  const [snapItems, setSnapItems] = useState<Element[] | null>(null);
  const [lastScrollTime, setLastScrollTime] = useState<number>(Date.now());
  const [xDown, setXDown] = useState<number | null>(null);
  const [yDown, setYDown] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<"down" | "up" | null>(
    null
  );

  const scrollToElement = (element: Element) => {
    element.scrollIntoView({ block: scrollPosition || "start" });
  };

  const emitGoEvent = (direction: "up" | "down") => {
    if (snapItems && canScroll) {
      // prettier-ignore
      const currentItem = snapItems.find((item:Element) => item.id === window.location.hash.replace('#', ''));
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
        setSwipeDirection("down");
      } else {
        setSwipeDirection("up");
      }
    }
    setXDown(null);
    setYDown(null);
  };

  const handleTouchEnd = () => {
    const currentTime: number = Date.now();
    if (currentTime - lastScrollTime > COOLDOWN) {
      swipeDirection && emitGoEvent(swipeDirection);
      setLastScrollTime(currentTime);
    }
  };

  const getTouches = (event: TouchEvent) => {
    return event.touches;
  };

  function setDefault(prop: boolean | undefined) {
    let value: boolean;
    if (prop === undefined) {
      value = true;
    } else {
      value = prop;
    }
    return value;
  }

  useEffect(() => {
    if (wrapperRef.current) {
      const children = [...wrapperRef.current.children];
      const snapItems = children.filter((child: Element) =>
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
    scrollEnabled &&
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [lastScrollTime, xDown, yDown, scrollEnabled, canScroll]);

  useEffect(() => {
    scrollEnabled && document.addEventListener("touchstart", handleTouchStart);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, [scrollEnabled]);

  useEffect(() => {
    scrollEnabled && document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [lastScrollTime, swipeDirection, scrollEnabled]);

  // change hash while wheel is scrolling
  useEffect(() => {
    scrollEnabled &&
      document.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheelEvent);
    };
  }, [lastScrollTime, scrollEnabled, canScroll]);

  // Starting hash giver
  useEffect(() => {
    if (!window.location.hash && snapItems) {
      window.location.hash = snapItems[0].id;
    }
  }, [snapItems]);

  function stopScroll(event: Event) {
    event.preventDefault();
  }

  useEffect(() => {
    if (!canScroll) {
      document.addEventListener("wheel", stopScroll, { passive: false });
      document.addEventListener("scroll", stopScroll, { passive: false });
      document.addEventListener("touchmove", stopScroll, { passive: false });
    }
    return () => {
      document.removeEventListener("wheel", stopScroll);
      document.removeEventListener("scroll", stopScroll);
      document.removeEventListener("touchmove", stopScroll);
    };
  }, [canScroll]);

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
