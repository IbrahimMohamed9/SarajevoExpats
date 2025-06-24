"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/config/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const TripApplicationForm = ({ tripId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedDate: "",
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
      
      const applicationData = {
        ...otherFormData,
        selectedDate: formattedDate
      };

      await axiosInstance.post(`/trips/${tripId}/apply`, applicationData);

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        selectedDate: "",
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
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md border border-orange-100">
      <h2 className="text-2xl font-bold text-tertiary mb-6">Join This Trip</h2>

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
              className="px-8 py-3 bg-main text-white text-lg font-medium rounded-md hover:bg-tertiary transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              Apply Now
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-main focus:border-main"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-main focus:border-main"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-main focus:border-main"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label
                htmlFor="selectedDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Date *
              </label>
              <select
                id="selectedDate"
                name="selectedDate"
                value={formData.selectedDate}
                onChange={handleInputChange}
                required
                disabled={isLoadingDates}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                  isLoadingDates ? "bg-gray-100" : ""
                } focus:ring-main focus:border-main`}
              >
                <option value="">
                  {isLoadingDates ? "Loading dates..." : "Select a date"}
                </option>
                {availableDates && availableDates.length > 0
                  ? availableDates.map((date, index) => (
                      <option key={index} value={date}>
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </option>
                    ))
                  : !isLoadingDates && (
                      <option value="" disabled>
                        {dateError || "No available dates found"}
                      </option>
                    )}
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 text-white font-medium rounded-md transition-colors ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-main hover:bg-tertiary"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripApplicationForm;
