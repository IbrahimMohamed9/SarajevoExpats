"use client";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

const Consultation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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
    {
      name: "citizenship",
      label: "Citizenship",
      type: "text",
      placeholder: "Enter your citizenship",
      multiline: false,
    },
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
    {
      name: "time",
      label: "Preferred Time",
      type: "text",
      placeholder: "Enter your preferred time",
      multiline: false,
    },
  ];

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      borderRadius: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(8px)",
      "& fieldset": {
        borderWidth: "2px",
        borderColor: "rgba(156, 163, 175, 0.3)",
      },
      "&:hover": {
        transform: "translateY(-2px)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        "& fieldset": {
          borderColor: "#ff7003",
          borderWidth: "2px",
        },
      },
      "&.Mui-focused": {
        transform: "translateY(-2px)",
        backgroundColor: "white",
        boxShadow: "0 8px 24px rgba(255, 112, 3, 0.12)",
        "& fieldset": {
          borderColor: "#ff7003",
          borderWidth: "2.5px",
        },
      },
    },
    "& .MuiInputLabel-root": {
      fontWeight: "500",
      transform: "translate(14px, -9px) scale(0.75)",
      "&.Mui-focused": {
        color: "#ff7003",
        fontWeight: "600",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "1.2rem",
      fontSize: "1rem",
      "&::placeholder": {
        opacity: 0,
        transition: "opacity 0.2s ease-in-out",
      },
      "&:focus::placeholder": {
        opacity: 1,
      },
    },
  };

  const buttonSx = {
    position: "relative",
    height: "60px",
    background: "linear-gradient(45deg, #ff7003 0%, #ff9340 100%)",
    borderRadius: "16px",
    textTransform: "none",
    fontSize: "1.125rem",
    fontWeight: "600",
    letterSpacing: "0.5px",
    padding: "0.8rem 2.5rem",
    marginTop: "2rem",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 12px rgba(255, 112, 3, 0.15)",
    "&:hover": {
      background: "linear-gradient(45deg, #ff9340 0%, #ff7003 100%)",
      transform: "translateY(-3px)",
      boxShadow: "0 8px 24px rgba(255, 112, 3, 0.25)",
    },
    "&:active": {
      transform: "translateY(0)",
      boxShadow: "0 4px 12px rgba(255, 112, 3, 0.2)",
    },
    "&.Mui-disabled": {
      background: "linear-gradient(45deg, #ff7003 0%, #ff9340 100%)",
      opacity: 0.7,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 font-inter text-gray-800">
      <h2 className="text-5xl font-bold text-main mb-8 pb-4 border-b-2 border-secondary/30 text-center">
        How It Works
      </h2>

      <div className="space-y-16">
        {/* Process Section */}
        <section className="bg-gradient-to-br from-white to-main/5 rounded-2xl shadow-lg p-10 border border-secondary/20 hover:border-main/30 transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-3xl font-bold text-tertiary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-main/10 flex items-center justify-center text-main text-xl">
              1
            </span>
            Our Process
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            First-time clients receive a free 30-minute consultation with a
            Sarajevo Expats consultant, plus 30 minutes with a vetted
            English-speaking lawyer from our network.
          </p>
          <p className="text-gray-700 leading-relaxed">
            During your session with us, we'll answer all your questions about
            Bosnia—whether it's about residency, citizenship, healthcare,
            property investment, rentals, business operations, daily life,
            bureaucracy, or cultural nuances. Our advice is tailored to your
            needs.
          </p>
        </section>

        {/* Meet Mohammed Section */}
        <section className="bg-gradient-to-br from-white to-main/5 rounded-2xl shadow-lg p-10 border border-secondary/20 hover:border-main/30 transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-3xl font-bold text-tertiary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-main/10 flex items-center justify-center text-main text-xl">
              2
            </span>
            Meet Mohammed
          </h3>
          <div className="prose max-w-none text-gray-700">
            <p className="leading-relaxed mb-4">
              Mohammed is a dedicated entrepreneur, community builder, and proud
              father of three. Originally from Egypt, he has been happily
              married to his Bosnian wife for over 30 years.
            </p>
            <p className="leading-relaxed mb-4">
              His journey with Bosnia began during the war when he arrived on a
              humanitarian mission to provide essential aid and support. After
              the war, he returned to Egypt but felt a deep connection to
              Bosnia.
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-gradient-to-br from-white to-main/5 rounded-2xl shadow-lg p-10 border border-secondary/20 hover:border-main/30 transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-3xl font-bold text-tertiary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-main/10 flex items-center justify-center text-main text-xl">
              3
            </span>
            Pricing
          </h3>
          <div className="space-y-6">
            <p className="text-gray-700">
              The following rates are per 30-minute session:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>First-time clients: €100 (includes session with a lawyer)</li>
              <li>Repeat clients: €50</li>
            </ul>
            <div className="bg-gradient-to-r from-main/10 to-secondary/10 p-6 rounded-xl border border-main/20">
              <p className="text-tertiary font-semibold">
                Bonus for First-Time Clients: All first-time clients receive an
                extra 30-minute session with a vetted, English-speaking lawyer
                from our network.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Typography
        variant="h2"
        className="text-5xl font-bold text-main mb-12 pb-4 border-b-2 border-secondary/30 mt-20 text-center"
      >
        Schedule a Consultation
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gradient-to-br from-white via-white to-main/5 rounded-3xl shadow-2xl border border-secondary/20 p-12 hover:border-main/30 transition-all duration-500 backdrop-blur-sm"
        sx={{
          "&:hover": {
            boxShadow: "0 25px 50px -12px rgba(255, 112, 3, 0.15)",
          },
        }}
      >
        <div className="space-y-8">
          {inputFields.map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              required
              fullWidth
              multiline={field.multiline}
              rows={field.rows}
              variant="outlined"
              placeholder={focusedField === field.name ? field.placeholder : ""}
              onFocus={() => setFocusedField(field.name)}
              onBlur={() => setFocusedField(null)}
              InputLabelProps={{
                shrink: true,
                sx: {
                  backgroundColor: "white",
                  padding: "0 8px",
                  borderRadius: "4px",
                  color: "#64748b",
                  fontWeight: "500",
                  "&.Mui-focused": {
                    color: "#ff7003",
                    fontWeight: "600",
                  },
                },
              }}
              InputProps={{
                sx: {
                  "&::placeholder": {
                    opacity: 0,
                  },
                  "&:focus::placeholder": {
                    opacity: 1,
                  },
                },
              }}
              sx={textFieldSx}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disableElevation
            disabled={isSubmitting}
            sx={buttonSx}
          >
            {isSubmitting ? "Submitting..." : "Schedule Your Consultation"}
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Consultation;
