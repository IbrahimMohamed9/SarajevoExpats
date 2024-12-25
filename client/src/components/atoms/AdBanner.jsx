"use client";

import { useEffect, useRef, useState } from "react";

const AdBanner = ({ slot, format = "auto", responsive = true }) => {
  const adRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const loadAd = async () => {
      try {
        let attempts = 0;
        while (typeof window.adsbygoogle === "undefined" && attempts < 10) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          attempts++;
        }

        if (typeof window.adsbygoogle === "undefined") {
          console.warn("AdSense not loaded after multiple attempts");
          return;
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.debug("Ad push successful");
      } catch (error) {
        console.error("Error loading AdSense ad:", error.message);
      }
    };

    loadAd();

    return () => {
      if (adRef.current) {
        adRef.current.remove();
      }
    };
  }, [slot, isClient]);

  if (!isClient) return null;

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
};

export default AdBanner;
