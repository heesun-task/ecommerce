export type AuthStep = "email" | "password" | "signup";

export interface AuthFlowReturn {
  step: AuthStep;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  name: string;
  setName: (name: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  loading: boolean;
  proceedWithEmail: () => Promise<void>;
  handleLogin: () => Promise<void>;
  handleSignup: () => Promise<void>;
  onBack: () => void;
}

interface AuthStepProps {
  email: string;
  loading: boolean;
  error: string | null;
  onBack: () => void;
}

export interface EmailStepProps extends AuthStepProps {
  setEmail: (email: string) => void;
  proceedWithEmail: () => Promise<void>;
}

export interface LoginStepProps extends AuthStepProps {
  password: string;
  setPassword: (password: string) => void;
  handleLogin: () => Promise<void>;
}

export interface SignupStepProps extends AuthStepProps {
  password: string;
  setPassword: (password: string) => void;
  name: string;
  setName: (name: string) => void;
  handleSignup: () => Promise<void>;
}