"use client";
import { useAuthFlow } from "./hooks/useAuthFlow";
import AuthLayout from "./components/AuthLayout";
import EmailStep from "./components/EmailStep";
import LoginStep from "./components/LoginStep";
import SignupStep from "./components/SignupStep";

const LogInPage = () => {
  const authFlowProps = useAuthFlow();
  const { step } = authFlowProps;

  const renderStep = () => {
    switch (step) {
      case "email":
        return <EmailStep {...authFlowProps} />;
      case "password":
        return <LoginStep {...authFlowProps} />;
      case "signup":
        return <SignupStep {...authFlowProps} />;
      default:
        return null;
    }
  };

  return (
    <AuthLayout onBack={authFlowProps.onBack}>
      {renderStep()}
    </AuthLayout>
  );
};

export default LogInPage;