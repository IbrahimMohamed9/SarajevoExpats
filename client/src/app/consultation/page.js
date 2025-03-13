"use client";

import {  Box } from "@mui/material";
import { useState } from "react";
import countries from "@/data/countries";
import MeetingMohammed from "@/app/consultation/components/MeetingMohammed";
import Pricing from "@/app/consultation/components/Pricing";
import HowItWorks from "@/app/consultation/components/HowItWorks";
import FormElement from "@molecules/FormElement";
import SubmitBtn from "@atoms/SubmitBtn";

const Consultation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
      multiline: false,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address",
      required: true,
      multiline: false,
    },
    {
      name: "citizenship",
      label: "Citizenship",
      type: "droplist",
      items: countries,
      required: true,
    },
    {
      name: "message",
      label: "Message",
      type: "text",
      placeholder: "Enter your message",
      multiline: true,
      required: true,
      rows: 4,
    },
    {
      name: "foundUsBy",
      label: "How did you find us?",
      type: "text",
      placeholder: "How did you hear about us?",
      required: true,
      multiline: false,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  const fieldsElements = inputFields.map((field) => (
    <FormElement field={field} />
  ));

  return (
    <div className="max-w-[816px] mx-auto px-12 py-16 bg-white min-h-screen">
      {/* Documentation Section */}
      <div className="mb-16 space-y-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 pb-2 border-b border-gray-200">
          Consultation Services
        </h1>
        <HowItWorks />
        <MeetingMohammed />
        <Pricing />
      </div>

      {/* Form Section */}
      <div className="mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-main/5 to-white -z-10" />

        <h2 className="text-5xl font-bold text-main mb-12 pb-4 border-b-2 border-secondary/30 mt-20 text-center">
          Schedule a Meeting
        </h2>

        <Box
          component="form"
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-8 bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-lg border border-gray-100"
        >
          {fieldsElements}

          <SubmitBtn label={"Schedule Meeting"} isSubmitting={isSubmitting} />
        </Box>
      </div>
    </div>
  );
};

export default Consultation;
