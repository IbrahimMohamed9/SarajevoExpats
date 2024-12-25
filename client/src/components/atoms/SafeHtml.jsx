"use client";

import { useEffect, useRef } from "react";

const SafeHtml = ({ content, className, as: Component = "span" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const cleanContent = content.replace(
        /style="color:\s*rgb\(\d+,\s*\d+,\s*\d+\);?"/g,
        ""
      );
      containerRef.current.innerHTML = cleanContent;
    }
  }, [content]);

  return <Component ref={containerRef} className={className} />;
};

export default SafeHtml;
