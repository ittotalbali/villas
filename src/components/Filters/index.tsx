import Content from "./filter.modal.content";
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
