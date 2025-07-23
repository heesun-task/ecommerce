type ContainerProps = {
  children?: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return <div className="container w-full p-6">{children}</div>;
};

export default Container;
