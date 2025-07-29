import { Navbar } from "@/components/navbar";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <div className="flex-1">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
