import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div
        className="relative bg-cover bg-[left_bottom] text-white min-h-130 lg:min-h-150 flex items-center justify-center mb-12 pt-15 pb-5"
        style={{
          backgroundImage: `url('/images/main/main-hero-footwear.jpg')`,
        }}
      >
        <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Container className="relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold font-serif mb-3 mt-3">
            Step Into the Summit
          </h2>
          <p className="whitespace-pre-line text-md lg:text-xl mt-4">
            From frozen ridgelines to muddy trails, <br/>trust what's under your
            feet.
          </p>

          <div className="flex flex-col gap-y-4 mt-16">
            <Link passHref href="/mens/footwear">
              <Button variant="outline" size="lg">
                Shop Men's
              </Button>
            </Link>

            <Link passHref href="/womens/footwear">
              <Button variant="outline" size="lg">
                Shop Women's
              </Button>
            </Link>

            <Link passHref href="/footwear">
              <Button variant="outline" size="lg">
                Shop All
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
