"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/config/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

// Import atomic components
import FormInput from "../atoms/FormInput";
import ParticipantsSelector from "../atoms/ParticipantsSelector";
import StyledDatePicker from "../atoms/StyledDatePicker";
import SubmitButton from "../atoms/SubmitButton";
import FormRow from "../atoms/FormRow";

const TripApplicationForm = ({ tripId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedDate: "",
    numberOfPeople: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [isLoadingDates, setIsLoadingDates] = useState(false);
  const [dateError, setDateError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numbersOnly,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Fetch available dates when component mounts
  useEffect(() => {
    const fetchAvailableDates = async () => {
      if (!tripId) return;

      try {
        setIsLoadingDates(true);
        setDateError(null);

        const response = await axiosInstance.get(
          `/trips/${tripId}/available-dates`
        );

        if (response.data && Array.isArray(response.data)) {
          setAvailableDates(response.data);
        } else {
          setAvailableDates([]);
        }
      } catch (error) {
        console.error("Error fetching available dates:", error);
        setDateError("Failed to load available dates. Please try again later.");
        setAvailableDates([]);
      } finally {
        setIsLoadingDates(false);
      }
    };

    fetchAvailableDates();
  }, [tripId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Remove tripId from the form data sent to the API
      const { selectedDate, ...otherFormData } = formData;

      // Format the date to remove time part
      const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

      const applicationData = {
        ...otherFormData,
        selectedDate: formattedDate,
      };

      await axiosInstance.post(`/trips/${tripId}/apply`, applicationData);

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        selectedDate: "",
        numberOfPeople: 1,
      });
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full border-2 border-main rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <AnimatePresence mode="wait">
        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-md text-center"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Application Submitted!
              </h3>
              <p className="text-green-700 mb-4">
                Thank you for your interest in this trip. Our team will review
                your application and contact you soon with more details.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </motion.div>
        ) : !showForm ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6"
          >
            <p className="text-gray-600 mb-8">
              Experience this amazing trip with us! Apply now to secure your
              spot and join other travelers on this adventure.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-3 bg-main text-white text-lg font-medium rounded-md hover:bg-tertiary transition-all transform hover:-translate-y-1 hover:shadow-lg border-2 border-white"
            >
              Apply Now
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-main mb-8 text-center">
              Select participants, date, and contact info
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
              {/* First Row */}
              <FormRow>
                {/* Name Input */}
                <div className="relative flex-1">
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                  />
                </div>

                {/* Email Input */}
                <div className="relative flex-1">
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />
                </div>
              </FormRow>

              {/* Second Row */}
              <FormRow>
                {/* Participants Selector */}
                <div className="relative flex-1">
                  <ParticipantsSelector
                    numberOfPeople={formData.numberOfPeople}
                    onChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        numberOfPeople: value,
                      }));
                    }}
                  />
                </div>

                {/* Date Selector */}
                <div className="relative flex-1">
                  <StyledDatePicker
                    disabled={isLoadingDates || availableDates.length === 0}
                    value={
                      formData.selectedDate
                        ? new Date(formData.selectedDate)
                        : null
                    }
                    onChange={(newDate) => {
                      setFormData((prev) => ({
                        ...prev,
                        selectedDate: newDate
                          ? typeof newDate === "string"
                            ? newDate
                            : newDate.toISOString()
                          : "",
                      }));
                    }}
                    shouldDisableDate={(date) => {
                      if (availableDates.length === 0) return true;
                      return !availableDates.some(
                        (availableDate) =>
                          new Date(availableDate).toDateString() ===
                          date.toDateString()
                      );
                    }}
                    placeholder={
                      isLoadingDates ? "Loading dates..." : "Select date"
                    }
                  />
                </div>

                {/* Phone Input */}
                <div className="relative flex-1">
                  <FormInput
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter phone number"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    }
                  />
                </div>
              </FormRow>

              {/* Third Row - Submit Button */}
              <div className="mt-6">
                <SubmitButton
                  text="Check availability"
                  loadingText="Submitting..."
                  isLoading={isSubmitting}
                  className="w-full py-4 text-lg font-medium transition-all transform hover:scale-[1.02]"
                  disabled={
                    !formData.name ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.selectedDate
                  }
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripApplicationForm;
