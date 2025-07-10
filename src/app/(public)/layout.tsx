import { Navbar } from "@/components/navbar";

interface Props {
  children?: React.ReactNode;
}

const Layout = async ({ children }: Props) => {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
