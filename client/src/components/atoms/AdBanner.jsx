"use client";

import { useEffect, useRef } from "react";

const AdBanner = ({ slot, format = "auto", responsive = true }) => {
  const adRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const pushAd = () => {
      try {
        if (window.adsbygoogle && adRef.current && !adRef.current.hasAttribute('data-ad-status')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          initialized.current = true;
        }
      } catch (error) {
        console.error('Error pushing ad:', error);
      }
    };

    // Try to initialize immediately if script is loaded
    if (window.adsbygoogle) {
      pushAd();
    }

    // Also listen for script load event
    const handleScriptLoad = () => {
      if (!initialized.current) {
        pushAd();
      }
    };

    window.addEventListener('load', handleScriptLoad);

    return () => {
      window.removeEventListener('load', handleScriptLoad);
    };
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
