"use client";

import Image from "next/image";
import SectionHeder from "@atoms/SectionHeder";

const SponsorsBar = ({ sponsors }) => {
  if (!sponsors?.length) return null;

  return (
    <div className="bg-[#ff7003]/10 py-3 px-4 -mt-6">
      <h1 className="text-lg font-semibold text-main text-center mb-3">Trusted By</h1>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {sponsors.map((sponsor) => (
          <Image
            src={sponsor.picture}
            key={sponsor._id}
            alt={sponsor.name}
            width={240}
            height={120}
            className="object-contain max-h-28 hover:scale-105 transition-transform duration-300"
            title={sponsor.name}
          />
        ))}
      </div>
    </div>
  );
};

export default SponsorsBar;
