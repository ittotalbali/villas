import Content from "./Modals/desktop";
import { FilterContextProvider } from "./context";

type Props = {
  testid?: string;
};

const Filters = ({}: Props) => {
  return (
    <FilterContextProvider>
      <Content />
    </FilterContextProvider>
  );
};

export default Filters;
