"use client";

import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import countries from "@/data/countries";
import MeetingMohammed from "@/app/consultation/components/MeetingMohammed";
import Pricing from "@/app/consultation/components/Pricing";
import HowItWorks from "@/app/consultation/components/HowItWorks";
import LoadingIcon from "@icons/LoadingIcon";
import DropList from "@atoms/DropList";

const Consultation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your full name",
      multiline: false,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address",
      multiline: false,
    },
    // Remove citizenship from inputFields as we'll handle it separately
    {
      name: "message",
      label: "Message",
      type: "text",
      placeholder: "Enter your message",
      multiline: true,
      rows: 4,
    },
    {
      name: "foundUsBy",
      label: "How did you find us?",
      type: "text",
      placeholder: "How did you hear about us?",
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
          {inputFields.map((field) => (
            <div key={field.name} className="group">
              <TextField
                name={field.name}
                label={field.label}
                type={field.type}
                required
                fullWidth
                multiline={field.multiline}
                rows={field.rows}
                placeholder={field.placeholder}
                className="transition-all duration-300 group-hover:-translate-y-1"
              />
            </div>
          ))}

          {/* Citizenship Select Field */}
          <DropList
            items={countries}
            label={"Citizenship"}
            name={"citizenship"}
            required={true}
          />

          <div className="pt-4">
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              className="relative overflow-hidden bg-gradient-to-r from-main to-secondary hover:from-secondary hover:to-main 
                transition-all duration-500 text-white py-5 rounded-xl shadow-md hover:shadow-xl 
                normal-case text-lg font-medium transform hover:-translate-y-1 active:translate-y-0
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
                before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <LoadingIcon />
                  <span className="animate-pulse">Processing...</span>
                </span>
              ) : (
                "Schedule Meeting"
              )}
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Consultation;
