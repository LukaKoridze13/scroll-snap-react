import React from "react";
interface WrapperProps extends React.HTMLProps<HTMLDivElement> {
    forwardedRef: React.Ref<HTMLDivElement> | null;
}
declare const Wrapper: React.FC<WrapperProps>;
export default Wrapper;
