import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" passHref>
        <Image
          className="object-contain"
          src="/images/peak-logo.png"
          alt="Peak"
          width={80}
          height={80}
          priority
        />
    </Link>
  );
}

export default Logo;