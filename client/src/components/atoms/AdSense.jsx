"use client";

import Script from "next/script";

const AdSense = () => {
  return (
    <Script
      id="adsbygoogle-script"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4465300068442635"
      crossOrigin="anonymous"
      onError={(e) => {
        console.error('AdSense script failed to load:', e);
      }}
    />
  );
};

export default AdSense;
