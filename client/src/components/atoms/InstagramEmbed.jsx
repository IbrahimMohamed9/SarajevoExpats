"use client";

import { useEffect, useRef } from "react";

const InstagramEmbed = ({ url }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load Instagram embed script
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = "//www.instagram.com/embed.js";
      document.body.appendChild(script);
    }
  }, [url]);

  return (
    <div ref={containerRef} className="instagram-media-wrapper max-w-2xl mx-auto">
      <blockquote
        className="instagram-media w-full"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
      />
    </div>
  );
};

export default InstagramEmbed;
