type Props = {
  testid?: string;
};

const Image = ({}: Props) => {
  return (
    <div className="flex items-center ">
      <a href="https://totalbali.com">
        <img
          src="https://www.totalbali.com/images/logoTb.PNG"
          alt="Logo"
          className="h-16 mr-5"
        />
      </a>
      {/* <VillaFilterModal /> */}
    </div>
  );
};

export default Image;
