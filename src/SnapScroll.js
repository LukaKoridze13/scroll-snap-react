"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Wrapper_1 = __importDefault(require("./Wrapper"));
function SnapScroll(props) {
    const { className = "", cooldown, isSnapScrollEnabled, scrollPosition, userCanScroll } = props, restProps = __rest(props, ["className", "cooldown", "isSnapScrollEnabled", "scrollPosition", "userCanScroll"]);
    const combinedClassName = `snap-container ${className}`;
    const wrapperRef = (0, react_1.useRef)(null);
    const COOLDOWN = cooldown || 500;
    const scrollEnabled = setDefault(isSnapScrollEnabled);
    const canScroll = setDefault(userCanScroll);
    const [snapItems, setSnapItems] = (0, react_1.useState)(null);
    const [lastScrollTime, setLastScrollTime] = (0, react_1.useState)(Date.now());
    const [xDown, setXDown] = (0, react_1.useState)(null);
    const [yDown, setYDown] = (0, react_1.useState)(null);
    const [swipeDirection, setSwipeDirection] = (0, react_1.useState)(null);
    const scrollToElement = (element) => {
        element.scrollIntoView({ block: scrollPosition || "start" });
    };
    const emitGoEvent = (direction) => {
        if (direction === "hash") {
            if (snapItems) {
                const currentItem = snapItems.find((item) => item.id === window.location.hash.replace("#", ""));
                if (currentItem) {
                    setTimeout(() => {
                        scrollToElement(currentItem);
                    }, 100);
                }
            }
        }
        else {
            if (snapItems && canScroll) {
                // prettier-ignore
                const currentItem = snapItems.find((item) => item.id === window.location.hash.replace('#', ''));
                if (currentItem) {
                    const currentIndex = snapItems.indexOf(currentItem);
                    if (direction === "up") {
                        if (currentIndex !== 0) {
                            window.location.hash = snapItems[currentIndex - 1].id;
                        }
                    }
                    else {
                        if (currentIndex !== snapItems.length - 1) {
                            window.location.hash = snapItems[currentIndex + 1].id;
                        }
                    }
                }
            }
        }
    };
    const handleWheelEvent = (event) => {
        event.preventDefault();
        const currentTime = Date.now();
        if (currentTime - lastScrollTime > COOLDOWN) {
            const scrollDirection = event.deltaY > 0 ? "down" : "up";
            if (scrollDirection === "down") {
                emitGoEvent("down");
            }
            else {
                emitGoEvent("up");
            }
            setLastScrollTime(currentTime);
        }
    };
    const handleTouchStart = (event) => {
        var firstTouch = getTouches(event)[0];
        setXDown(firstTouch.clientX);
        setYDown(firstTouch.clientY);
    };
    const handleTouchMove = (event) => {
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
            }
            else {
                setSwipeDirection("up");
            }
        }
        setXDown(null);
        setYDown(null);
    };
    const handleTouchEnd = () => {
        const currentTime = Date.now();
        if (currentTime - lastScrollTime > COOLDOWN) {
            swipeDirection && emitGoEvent(swipeDirection);
            setLastScrollTime(currentTime);
        }
    };
    const getTouches = (event) => {
        return event.touches;
    };
    function setDefault(prop) {
        let value;
        if (prop === undefined) {
            value = true;
        }
        else {
            value = prop;
        }
        return value;
    }
    (0, react_1.useEffect)(() => {
        emitGoEvent("hash");
    }, [snapItems]);
    (0, react_1.useEffect)(() => {
        if (wrapperRef.current) {
            const children = [...wrapperRef.current.children];
            const snapItems = children.filter((child) => child.classList.contains("snap-item"));
            setSnapItems(snapItems);
        }
    }, [wrapperRef]);
    // scroll when hash is changed
    (0, react_1.useEffect)(() => {
        if (snapItems) {
            // prettier-ignore
            const foundItem = snapItems.find((item) => item.id === window.location.hash.replace('#', ''));
            foundItem && scrollToElement(foundItem);
        }
    }, [window.location.hash]);
    // change hash while swipe
    (0, react_1.useEffect)(() => {
        scrollEnabled &&
            document.addEventListener("touchmove", handleTouchMove, {
                passive: false,
            });
        return () => {
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, [lastScrollTime, xDown, yDown, scrollEnabled, canScroll]);
    (0, react_1.useEffect)(() => {
        scrollEnabled && document.addEventListener("touchstart", handleTouchStart);
        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
        };
    }, [scrollEnabled]);
    (0, react_1.useEffect)(() => {
        scrollEnabled && document.addEventListener("touchend", handleTouchEnd);
        return () => {
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [lastScrollTime, swipeDirection, scrollEnabled]);
    // change hash while wheel is scrolling
    (0, react_1.useEffect)(() => {
        scrollEnabled &&
            document.addEventListener("wheel", handleWheelEvent, { passive: false });
        return () => {
            document.removeEventListener("wheel", handleWheelEvent);
        };
    }, [lastScrollTime, scrollEnabled, canScroll]);
    // Starting hash giver
    (0, react_1.useEffect)(() => {
        if (!window.location.hash && snapItems) {
            window.location.hash = snapItems[0].id;
        }
    }, [snapItems]);
    function stopScroll(event) {
        event.preventDefault();
    }
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement(Wrapper_1.default, Object.assign({ forwardedRef: wrapperRef, className: combinedClassName }, restProps), props.children));
}
exports.default = SnapScroll;
