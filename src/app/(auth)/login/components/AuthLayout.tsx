import AuthBanner from "./AuthBanner";

interface AuthLayoutProps {
  children: React.ReactNode;
  onBack: () => void;
}

const AuthLayout = ({ children, onBack }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <AuthBanner onBack={onBack} />
      
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;