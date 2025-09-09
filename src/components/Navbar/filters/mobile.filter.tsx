import FilterModalMobile from "@/components/Filters/Modals/mobile";

type Props = {
  testid?: string;
  triggerButtonLabel?: string;
};

const MobileFilters = ({ triggerButtonLabel }: Props) => {
  return (
    <div className="flex flex-col gap-3 w-full justify-center  lg:w-full  lg:flex-row lg:flex-wrap">
      <div className="flex flex-col gap-3 w-full lg:w-3/4 ">
        <div className="w-full lg:w-full">
          <FilterModalMobile triggerButtonLabel={triggerButtonLabel} />
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
