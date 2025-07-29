import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
};
const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className={cn("container p-4", className)}>{children}</div>
    </div>
  );
};

export default Container;
