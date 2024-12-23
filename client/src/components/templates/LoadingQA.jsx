"use client";

import { Accordion, AccordionSummary, Skeleton } from "@mui/material";

const LoadingQA = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-4 p-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((index) => (
        <Accordion key={index} disabled>
          <AccordionSummary>
            <div className="flex items-center space-x-4 w-full">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
              <Skeleton variant="text" width="80%" height={32} />
            </div>
          </AccordionSummary>
        </Accordion>
      ))}
    </div>
  );
};

export default LoadingQA;
