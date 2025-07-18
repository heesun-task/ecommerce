import { useState, useCallback } from "react";
import { isValidEmail, isValidPassword } from "@/lib/validators";

// Custom hook for handling form validation logic for email and password
export const useFormValidation = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // validate email format and presence
  const validateEmail = useCallback((email: string): boolean => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError(null); // Clear error if valid
    return true;
  }, []);

  // Validate password presense and complexity (if isSignup = true)
  const validatePassword = useCallback((password: string, isSignup = false): boolean => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (isSignup && !isValidPassword(password)) {
      setPasswordError("Password must be at least 8 characters with letters and numbers");
      return false;
    }
    setPasswordError(null);
    return true;
  }, []);

  return {
    emailError,
    passwordError,
    validateEmail,
    validatePassword,
    clearErrors: () => {
      setEmailError(null);
      setPasswordError(null);
    }
  };
};