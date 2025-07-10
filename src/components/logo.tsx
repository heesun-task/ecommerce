import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const Logo = () => {
  return (
    <Link href="/">
      <span className={cn("text-xl font-semibold", poppins.className)}>
        lululemon
      </span>
    </Link>
  );
}

export default Logo;