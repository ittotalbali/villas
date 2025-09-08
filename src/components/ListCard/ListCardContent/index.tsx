import { default as Head } from "./head";
import { default as Name } from "./name";
import { default as Details } from "./details";
import { default as Date } from "./dates";
import { default as Price } from "./price";
import { cn } from "@/lib/utils";
import { useListCardContext } from "../context";

type props = {
  testid?: string;
};

const ListCardContent = ({}: props) => {
  const { forMap } = useListCardContext();
  return (
    <div className={cn("flex flex-col gap-1.5 px-2 py-3", forMap && "p-2")}>
      <Head />

      <Name />

      <Details />

      <Date />

      <Price />
    </div>
  );
};

export default ListCardContent;
