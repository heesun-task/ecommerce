"use client";
import { useNavbarStore } from "@/stores/navbar-store";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const setVariant = useNavbarStore((state) => state.setVariant);

  useEffect(() => {
    setVariant("float");

    // cleanup
    return () => setVariant("default");
  }, [setVariant]);

  return <div className="mt-[-70px]">{children}</div>;
};

export default Layout;
