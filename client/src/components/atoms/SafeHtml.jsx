"use client";

import { useEffect, useRef } from "react";

const SafeHtml = ({ content, className, as: Component = "span" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = content;
    }
  }, [content]);

  return <Component ref={containerRef} className={className} />;
};

export default SafeHtml;
