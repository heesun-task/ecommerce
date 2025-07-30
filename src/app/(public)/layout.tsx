import { Navbar } from "@/components/navbar";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen relative pt-[70px]">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
