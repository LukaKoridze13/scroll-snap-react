import React from "react";
interface ScnapScrollProps extends React.HTMLProps<HTMLDivElement> {
    cooldown?: number;
    isSnapScrollEnabled?: boolean;
    scrollPosition?: "nearest" | "center" | "start" | "end";
    userCanScroll?: boolean;
}
export default function SnapScroll(props: ScnapScrollProps): React.JSX.Element;
export {};
