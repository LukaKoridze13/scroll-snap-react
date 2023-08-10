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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function SnapItem(props) {
    const { className = "" } = props, restProps = __rest(props, ["className"]);
    const combinedClassName = `snap-item ${className}`;
    const [isActive, setIsActive] = (0, react_1.useState)(window.location.hash.replace("#", "") === props.id);
    (0, react_1.useEffect)(() => {
        const handleHashChange = () => {
            const newLocation = window.location.hash.replace("#", "");
            setIsActive(props.id === newLocation);
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);
    const childrenWithProps = react_1.default.Children.map(props.children, (child) => {
        if (react_1.default.isValidElement(child)) {
            if (typeof child.type === "string") {
                // Child is a DOM element
                return react_1.default.cloneElement(child, {
                    className: isActive ? "snap-item-active" : "",
                });
            }
            else {
                // Child is a React component
                return react_1.default.cloneElement(child, {
                    className: isActive ? "snap-item-active" : "",
                    isActive: isActive,
                });
            }
        }
        return child;
    });
    return (react_1.default.createElement("div", Object.assign({ className: combinedClassName }, restProps), childrenWithProps));
}
exports.default = SnapItem;
