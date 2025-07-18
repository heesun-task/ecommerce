interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
    </div>
  );
};

export default Layout;
