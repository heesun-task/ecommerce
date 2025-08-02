import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormValidation } from "../hooks/useFormValidation";

import type { EmailStepProps } from "../types/auth";
import LinedHeading from "@/components/text/lined-heading";

const EmailStep = ({
  email,
  setEmail,
  proceedWithEmail,
  loading,
  error,
}: EmailStepProps) => {
  const { emailError, validateEmail } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      await proceedWithEmail();
    }
  };

  return (
    <div>
      <LinedHeading>Sign in or sign up with your email</LinedHeading>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            placeholder="Enter your email"
            className={emailError ? "border-red-500" : ""}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
          />
          {emailError && <p className="text-sm text-red-500">{emailError}</p>}
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
          className="w-full bg-peak-maple hover:bg-peak-maple/90"
        >
          {loading ? "Checking..." : "CONTINUE"}
        </Button>
      </form>
    </div>
  );
};

export default EmailStep;
