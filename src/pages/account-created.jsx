const AccountCreated = () => {
  return (
    <div className="w-full relative bg-white h-[65.313rem] overflow-hidden text-center text-[2rem] text-text font-h3-32-bold">
      <div className="absolute top-[calc(50%_-_222.5px)] right-[5rem] bg-white w-[39.813rem] flex flex-col items-center justify-center py-[3.75rem] px-[8rem] box-border">
        <div className="self-stretch flex flex-col items-center justify-center gap-[2rem]">
          <div className="flex flex-col items-center justify-center gap-[2rem]">
            <img
              className="w-[7.5rem] relative h-[7.5rem] overflow-hidden shrink-0"
              alt=""
              src="/checkcircle.svg"
            />
            <div className="flex flex-col items-center justify-center gap-[0.5rem]">
              <b className="w-[22.813rem] relative tracking-[-0.02em] leading-[2.5rem] inline-block">
                Success!
              </b>
              <div className="w-[22.313rem] relative text-[1rem] leading-[1.625rem] font-paragraph-medium-16-regular text-body-text inline-block h-[2.875rem] shrink-0">
                <p className="m-0">Congratulations, Your account has been</p>
                <p className="m-0">successfully created.</p>
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-lg bg-angiant-color-system-anginat-success-anginat-success-500 flex flex-row items-center justify-center py-component-padding-medium px-component-padding-6xlarge text-[0.938rem] text-white font-poppins">
            <div className="relative tracking-[0.1px] font-semibold">
              Continue
            </div>
          </div>
        </div>
      </div>
      <img
        className="absolute top-[calc(50%_-_200.5px)] left-[5rem] w-[33.225rem] h-[25rem] overflow-hidden"
        alt=""
        src="/undraw-astronaut-re-8c33-1.svg"
      />
    </div>
  );
};

export default AccountCreated;
