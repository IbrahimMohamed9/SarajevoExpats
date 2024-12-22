"use client";

import Script from "next/script";

const AdSense = () => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
      onError={(e) => {
        console.error("AdSense script failed to load:", e);
      }}
      onLoad={() => {
        console.debug("AdSense script loaded successfully");
      }}
    />
  );
};

export default AdSense;
