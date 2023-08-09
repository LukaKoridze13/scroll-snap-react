import React, { useState, useEffect } from "react";

export default function SnapItem(props: React.HTMLProps<HTMLDivElement>) {
  const location = window.location.hash.replace("#", "");
  const { className = "", ...restProps } = props;
  const combinedClassName = `snap-item ${className}`;

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(props.id === location);
  }, [props.id, location]);

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { active: isActive } as any); // Type assertion here
    }
    return child;
  });

  return (
    <div className={combinedClassName} {...restProps}>
      {childrenWithProps}
    </div>
  );
}
