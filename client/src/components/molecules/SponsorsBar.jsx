"use client";

import Image from "next/image";
import SectionHeder from "@atoms/SectionHeder";

const SponsorsBar = ({ sponsors }) => {
  if (!sponsors?.length) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 bg-[#ff7003]/10">
      {sponsors.map((sponsor) => (
        <div
          key={sponsor._id}
          className="flex items-center justify-center w-full h-32 px-4 hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={sponsor.picture}
            alt={sponsor.name}
            width={240}
            height={120}
            className="object-contain max-h-28"
            title={sponsor.name}
          />
        </div>
      ))}
    </div>
  );
};

export default SponsorsBar;
