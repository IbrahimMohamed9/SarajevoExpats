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
        if (typeof window.adsbygoogle === "undefined") {
          console.warn("AdSense not loaded yet");
          return;
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});

        if (adRef.current) {
          adRef.current.addEventListener("load", () => {
            console.debug("Ad loaded successfully");
          });
        }
      } catch (error) {
        console.error("Error loading AdSense ad:", error.message);
      }
    };

    const timer = setTimeout(loadAd, 100);

    return () => {
      clearTimeout(timer);
      if (adRef.current) {
        adRef.current.removeEventListener("load", () => {});
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
