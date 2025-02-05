"use client";

import Image from "next/image";
import SectionHeder from "@atoms/SectionHeder";

const SponsorsBar = ({ sponsors }) => {
  if (!sponsors?.length) return null;

  return (
    <div className="bg-white shadow-md py-8 px-6 rounded-lg">
      <SectionHeder title="Our Sponsors" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
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
    </div>
  );
};

export default SponsorsBar;
