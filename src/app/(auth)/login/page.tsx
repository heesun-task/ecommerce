"use client";
import { ArrowLeft } from "lucide-react";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";

import LinedHeading from "@/components/text/lined-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const texts = {
  headings: {
    email: "Sign in or create an account",
    password: "Welcome back",
    signup: "Become a member with us",
  },
  buttonTexts: {
    email: "CONTINUE",
    password: "SIGN IN",
    signup: "CREATE AN ACCOUNT",
  },
};

type Step = keyof typeof texts.headings;

const LogInPage = () => {
  const router = useRouter();
  const { headings, buttonTexts } = texts;

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      //TODO: improve error handling
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onClickContinue = async () => {
    if (step === "email") {
      if (!email) {
        setError("Please enter your email.");
        return;
      }
      try {
        const res = await fetch("/api/auth/user-exists?email=" + encodeURIComponent(email));
        const data = await res.json();

        if (res.ok && data.exists) {
          setStep("password");
          setError(null);
        } else if (res.ok && !data.exists) {
          setStep("signup");
          setError(null);
        }
      } catch (err) {
        setError("Failed to check email. Please try again.");
      } 
      return;
    }
    
    if (step === "password") {
      if (!password) {
        setError("Please enter your password.");
        return;
      }
      handleLogin();
    } 
    
    if (step === "signup") {
      if (!password) {
        setError("Please create a password.");
        return;
      }
      // TODO: Implement signup API call
    }
  };

  const onClickBack = () => {
    if (step === "password" || step === "signup") {
      setStep("email");
      setError(null);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Banner and back button */}
      <div className="lg:w-1/2 relative">
        <Button
          className="absolute left-4 top-4 z-10"
          variant={"icon"}
          title="Back"
          onClick={onClickBack}
        >
          <ArrowLeft />
          <span className="font-semibold">BACK</span>
        </Button>
        <img
          src="/images/login-banner-1.webp"
          alt="Login Banner"
          className="w-full h-40 lg:h-screen object-cover"
        />
      </div>
      {/* Form */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-8">
        <div className="flex flex-col px-4">
          <div className="mb-2">
            <LinedHeading>{headings[step]}</LinedHeading>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClickContinue();
            }}
            className="flex flex-col"
          >
            {/* Step 1 */}
            {step === "email" && (
              <div className="grid w-full items-center mb-4">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  className="w-full my-2"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            )}

            {/* Step 2 - Password */}
            {step === "password" && (
              <div className="grid w-full items-center mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="w-full my-2"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            )}

            {/* Step 3 - Signup */}
            {step === "signup" && (
              <div className="grid w-full items-center mb-4">
                <Label htmlFor="signup-email">Email address</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  disabled
                  className="w-full my-2 bg-gray-50"
                />
                <Label htmlFor="signup-password" className="mt-2">Create password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  className="w-full my-2"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            )}

            {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

            <Button
              size="xlg"
              variant="highlight"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : buttonTexts[step]}
            </Button>
            <div className="text-xs text-gray-500 mt-2">
              By signing in or creating a member account, you agree to the Terms
              of Use and acknowledge the Privacy Policy.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LogInPage;
