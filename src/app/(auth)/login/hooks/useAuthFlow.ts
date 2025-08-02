import { useState } from "react";
import { useRouter } from "next/navigation";

import { useEmailCheck } from "./useEmailCheck";
import { useAuth } from "./useAuth";
import { AuthFlowReturn, AuthStep } from "../types/auth";

export const useAuthFlow = (): AuthFlowReturn => {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { checkEmail } = useEmailCheck();
  const { login, signup } = useAuth();

  const proceedWithEmail = async () => {
    setLoading(true);
    setError(null);

    try {
      const userExists = await checkEmail(email);
      setStep(userExists ? "password" : "signup");
    } catch (err) {
      setError("Failed to check email. Please try again.");
      console.error("Email check error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      await signup(email, password, name);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const onBack = () => {
    if (step === "password" || step === "signup") {
      setStep("email");
      setError(null);
      setPassword("");
    } else {
      router.back();
    }
  };

  return {
    step,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    error,
    setError,
    loading,
    proceedWithEmail,
    handleLogin,
    handleSignup,
    onBack,
  };
};
