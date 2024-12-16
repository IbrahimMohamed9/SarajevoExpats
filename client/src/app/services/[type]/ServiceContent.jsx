"use client";
import { useState } from "react";
import FilterSection from "@molecules/FilterSection";
import CardsTemplete from "@templates/CardsTemplete";

function ServiceContent({ initialServices, serviceSubtypes, typeCounts }) {
  const [selectedSubtype, setSelectedSubtype] = useState(null);

  const filteredServices = selectedSubtype
    ? initialServices.filter(
        (service) =>
          serviceSubtypes.find((type) => type._id === service.serviceSubtype)
            ?.name === selectedSubtype
      )
    : initialServices;

  // console.log(filteredServices);

  return (
    <div>
      <FilterSection
        types={serviceSubtypes}
        counts={typeCounts}
        onTypeSelect={(value) => setSelectedSubtype(value)}
        selectedType={selectedSubtype}
      />

      <CardsTemplete data={filteredServices} type="services" />
    </div>
  );
}

export default ServiceContent;
