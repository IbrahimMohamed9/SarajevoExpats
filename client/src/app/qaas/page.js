"use client";

import axiosInstance from "@/config/axios";
import QAAccordion from "@/components/atoms/QAAccordion";

const QaAs = async () => {
  const response = await axiosInstance.get("/qaas");
  const qaAs = response.data;

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Questions & Answers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about living in Sarajevo
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {qaAs.map((qaA, index) => (
            <QAAccordion
              key={qaA.id || index}
              question={qaA.question}
              answer={qaA.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QaAs;
