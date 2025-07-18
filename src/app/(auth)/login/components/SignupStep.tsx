import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LinedHeading from "@/components/text/lined-heading";
import { useFormValidation } from "../hooks/useFormValidation";
import type { SignupStepProps } from "../types/auth";

const SignupStep = ({
  email,
  password,
  setPassword,
  name,
  setName,
  handleSignup,
  loading,
  error,
  onBack,
}: SignupStepProps) => {
  const { passwordError, validatePassword } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword(password, true)) {
      await handleSignup();
    }
  };

  const resetForm = () => {
    setPassword("");
    setName("");
    onBack();
  };

  return (
    <div>
      <LinedHeading>Join the PEAK community</LinedHeading>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <span className="text-sm text-peak-forest">
            Creating account for <strong>{email}</strong>
            <Button
              variant="link"
              className="ml-2 p-0 h-auto text-peak-maple hover:underline "
              onClick={resetForm}
            >
              Change email?
            </Button>
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-name">Name (optional)</Label>
          <Input
            id="signup-name"
            type="text"
            value={name}
            placeholder="Enter your name"
            className="w-full"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email address</Label>
          <Input
            id="signup-email"
            type="email"
            value={email}
            disabled
            className="w-full bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Create password</Label>
          <Input
            id="signup-password"
            type="password"
            value={password}
            placeholder="At least 8 characters with letters and numbers"
            className={passwordError ? "border-red-500" : ""}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validatePassword(password, true)}
          />
          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}
          <div className="text-xs text-gray-500">
            Password must contain at least 8 characters with letters and numbers
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button
          size="xlg"
          type="submit"
          disabled={loading}
          className="xlg w-full bg-peak-maple hover:bg-peak-maple/90"
        >
          {loading ? "Creating account..." : "CREATE ACCOUNT"}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          By creating an account, you agree to PEAK's{" "}
          <a href="/terms" className="underline hover:text-peak-maple">
            Terms of Service
          </a>{" "}
          <br/>
          and{" "}
          <a href="/privacy" className="underline hover:text-peak-maple">
            Privacy Policy
          </a>
          .
        </div>
      </form>
    </div>
  );
};

export default SignupStep;
