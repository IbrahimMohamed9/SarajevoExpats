"use client";

import { useEffect, useRef } from "react";

const AdBanner = ({ slot, format = "auto", responsive = true }) => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      const pushAd = () => {
        try {
          if (window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (innerError) {
          console.error('Error pushing ad:', innerError);
        }
      };

      // If script is already loaded
      if (window.adsbygoogle) {
        pushAd();
      } else {
        // Wait for script to load
        window.addEventListener('load', pushAd);
        return () => window.removeEventListener('load', pushAd);
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default AdBanner;
