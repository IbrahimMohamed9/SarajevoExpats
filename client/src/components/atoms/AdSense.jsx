"use client";

import Script from "next/script";

const AdSense = () => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      onError={(e) => {
        console.error("AdSense script failed to load:", e);
      }}
      onLoad={() => {
        console.debug("AdSense script loaded successfully");
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error('Error initializing ads:', err);
        }
      }}
    />
  );
};

export default AdSense;
