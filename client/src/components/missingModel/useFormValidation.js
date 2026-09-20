import { useState } from "react";

export function useFormValidation() {
  const [missingFields, setMissingFields] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * @param {Object} formData - e.g. { name: "Aman", email: "" }
   * @param {Object} schema - Map of key to human-readable label: { name: "Full Name", email: "Email Address" }
   * @returns {boolean} true if valid, false if fields are missing
   */
  const validateForm = (formData, schema) => {
    const empty = [];

    Object.keys(schema).forEach((key) => {
      const val = formData[key];
      // Check for null, undefined, empty strings, or empty arrays
      if (
        val === undefined ||
        val === null ||
        (typeof val === "string" && val.trim() === "") ||
        (Array.isArray(val) && val.length === 0)
      ) {
        empty.push(schema[key]);
      }
    });

    if (empty.length > 0) {
      setMissingFields(empty);
      setIsModalOpen(true);
      return false;
    }

    setMissingFields([]);
    setIsModalOpen(false);
    return true;
  };

  return {
    missingFields,
    isModalOpen,
    closeModal: () => setIsModalOpen(false),
    validateForm,
  };
}