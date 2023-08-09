import React from "react";

interface WrapperProps extends React.HTMLProps<HTMLDivElement> {
  forwardedRef: React.Ref<HTMLDivElement> | null;
}

const Wrapper: React.FC<WrapperProps> = ({ forwardedRef, ...restProps }) => {
  return <div ref={forwardedRef} {...restProps} />;
};

export default Wrapper;
