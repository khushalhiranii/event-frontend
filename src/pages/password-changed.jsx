const PasswordChanged = () => {
  return (
    <div className="w-full relative bg-white h-[65.313rem] overflow-hidden text-center text-[2rem] text-text font-h3-32-bold">
      <img
        className="absolute top-[calc(50%_-_200.5px)] left-[5rem] w-[37.588rem] h-[25rem] overflow-hidden"
        alt=""
        src="/undraw-forgot-password-re-hxwm-11.svg"
      />
      <div className="absolute top-[calc(50%_-_217.5px)] right-[5rem] shadow-[0px_4px_8px_-2px_rgba(0,_0,_0,_0.1),_0px_2px_4px_-2px_rgba(0,_0,_0,_0.06)] rounded-xl bg-white flex flex-col items-center justify-center py-[3.75rem] px-[7.5rem]">
        <div className="flex flex-col items-center justify-center gap-[2rem]">
          <img
            className="w-[7.5rem] relative h-[7.5rem] overflow-hidden shrink-0"
            alt=""
            src="/checkcircle.svg"
          />
          <div className="self-stretch flex flex-col items-center justify-center gap-[2rem]">
            <div className="flex flex-col items-center justify-center gap-[0.5rem]">
              <b className="w-[22.813rem] relative tracking-[-0.02em] leading-[2.5rem] inline-block whitespace-pre-wrap">
                Password Changed.
              </b>
              <div className="w-[22.313rem] relative text-[1rem] leading-[1.625rem] font-paragraph-medium-16-regular text-body-text inline-block h-[2.188rem] shrink-0">
                You password has been changed successfully.
              </div>
            </div>
            <div className="self-stretch rounded-lg bg-angiant-color-system-anginat-success-anginat-success-500 flex flex-row items-center justify-center py-component-padding-medium px-component-padding-6xlarge text-[1rem] text-white font-paragraph-medium-16-semi-bold">
              <div className="relative leading-[1.5rem] font-semibold">
                Continue
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChanged;
