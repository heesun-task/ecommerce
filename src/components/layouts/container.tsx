type ContainerProps = {
  children?: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return <div className="w-full max-w-[1440px] p-6">{children}</div>;
};

export default Container;
