import ApplyFilterButton from "./Buttons/apply.filter";
import CancelButton from "./Buttons/cancel";
import ClearAllFilterButton from "./Buttons/clear.all.filter";

type Props = {
  testid?: string;
};

const ActionButton = ({}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 p-4 sm:px-6 sm:py-4 border-t bg-background">
      <ClearAllFilterButton label="Clear All" />
      <div className="flex flex-col sm:flex-row gap-3 sm:space-x-3 sm:gap-0">
        <CancelButton label="Cancel" />

        <ApplyFilterButton label="Apply Filters" />
      </div>
    </div>
  );
};

export default ActionButton;
