import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthBannerProps {
  onBack: () => void;
}

const AuthBanner = ({ onBack }: AuthBannerProps) => {
  return (
    <div className="lg:w-1/2 relative bg-peak-forest">
      <Button
        className="absolute left-4 top-4 z-10"
        variant="outline"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="font-semibold">BACK</span>
      </Button>
      
      {/* PEAK branding section */}
      <div className="relative w-full h-40 lg:h-screen flex flex-col justify-center items-center text-white p-8">
        <img
          src="/images/login-banner-1.png"
          alt="Login Banner"
          className="absolute z-1 left-0 top-0 h-full w-full object-cover"
        />
        <div className="relateive z-2 text-center space-y-4">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-wider">
            PEAK
          </h1>
          
          <div className="space-y-2">
            <p className="text-lg lg:text-xl font-medium">
              Canadian Outdoor Excellence
            </p>
            <p className="text-sm lg:text-base text-white/80 max-w-md">
              Built for -40°C winters and +35°C summers.<br />
              Gear that performs when nature challenges you.
            </p>
          </div>

          {/* Icons or decorative elements */}
          <div className="hidden lg:block mt-8">
            <div className="flex justify-center space-x-4 text-white/60">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;