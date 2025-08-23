import { default as Head } from "./head";
import { default as Name } from "./name";
import { default as Details } from "./details";
import { default as Date } from "./dates";
import { default as Price } from "./price";

type props = {
  testid?: string;
};

const ListCardContent = ({}: props) => {
  return (
    <div className="flex flex-col gap-1">
      <Head />

      <Name />

      <Details />

      <Date />

      <Price />
    </div>
  );
};

export default ListCardContent;
