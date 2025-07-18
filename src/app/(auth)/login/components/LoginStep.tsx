import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LinedHeading from "@/components/text/lined-heading";
import { useFormValidation } from "../hooks/useFormValidation";
import type { LoginStepProps } from "../types/auth";

const LoginStep = ({
  email,
  password,
  setPassword,
  handleLogin,
  loading,
  error,
  onBack,
}: LoginStepProps) => {
  const { passwordError, validatePassword } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword(password)) {
      await handleLogin();
    }
  };

  return (
    <div>
      <LinedHeading>Welcome back to PEAK</LinedHeading>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            Logging in as <strong>{email}</strong>.{" "}
            <Button
              variant="link"
              className="ml-2 mb-2 p-0 h-auto text-peak-maple hover:underline"
              onClick={onBack}
            >
              Change email?
            </Button>
          </div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            className={passwordError ? "border-red-500" : ""}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validatePassword(password)}
          />
          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        <Button
          size="xlg"
          type="submit"
          disabled={loading}
          className="w-full bg-peak-maple hover:bg-peak-maple/90"
        >
          {loading ? "Logging in..." : "LOG IN"}
        </Button>
        <div className="flex justify-end items-center">
          <button
            type="button"
            className="text-sm text-peak-maple hover:underline"
            onClick={() => {
              // TODO: find password
            }}
          >
            Forgot password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginStep;
