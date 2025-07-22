import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" passHref>
        <Image
          src="/images/peak-logo.png"
          alt="Peak"
          width={90}
          height={30}
          priority
        />
    </Link>
  );
}

export default Logo;