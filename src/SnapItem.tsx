import React, { useState, useEffect, Attributes } from "react";

export default function SnapItem(props: React.HTMLProps<HTMLDivElement>) {
  const { className = "", ...restProps } = props;
  const combinedClassName = `snap-item ${className}`;

  const [isActive, setIsActive] = useState(
    window.location.hash.replace("#", "") === props.id
  );

  useEffect(() => {
    const handleHashChange = () => {
      const newLocation = window.location.hash.replace("#", "");
      setIsActive(props.id === newLocation);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      if (typeof child.type === "string") {
        // Child is a DOM element
        return React.cloneElement(child, {
          className: isActive ? "snap-item-active" : "",
        } as Attributes);
      } else {
        // Child is a React component
        return React.cloneElement(child, {
          className: isActive ? "snap-item-active" : "",
          isActive: isActive,
        } as Attributes);
      }
    }
    return child;
  });

  return (
    <div className={combinedClassName} {...restProps}>
      {childrenWithProps}
    </div>
  );
}
