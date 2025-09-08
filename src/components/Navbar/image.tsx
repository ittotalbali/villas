import { cn } from "@/lib/utils";

type Props = {
  testid?: string;
  className?: string;
};

const Image = ({ className }: Props) => {
  return (
    <div className="flex items-center ">
      <a href="https://totalbali.com">
        <img
          src="https://www.totalbali.com/images/logoTb.PNG"
          alt="Logo"
          className={cn("h-12 lg:h-16 mr-5", className)}
        />
      </a>
      {/* <VillaFilterModal /> */}
    </div>
  );
};

export default Image;
