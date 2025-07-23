import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
};
const Container = ({ className, children }: ContainerProps) => {
  return <div className={cn("container w-full p-6", className)}>{children}</div>;
};

export default Container;
