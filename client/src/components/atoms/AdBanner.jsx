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
        if (typeof window.adsbygoogle !== "undefined") {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          console.debug("Ad push successful");
        }
      } catch (error) {
        console.error("Error loading AdSense ad:", error.message);
      }
    };

    // Small delay to ensure AdSense script is loaded
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, [isClient]);

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
