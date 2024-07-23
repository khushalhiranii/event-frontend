import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const onFrameContainerClick = useCallback(() => {
    navigate("/passwordchanged");
  }, [navigate]);

  return (
    <div className="w-full relative bg-white h-[65.313rem] overflow-hidden text-left text-[2rem] text-text font-h3-32-bold">
      <div className="absolute top-[calc(50%_-_221.5px)] right-[5rem] shadow-[0px_4px_8px_-2px_rgba(0,_0,_0,_0.1),_0px_2px_4px_-2px_rgba(0,_0,_0,_0.06)] rounded-xl bg-white flex flex-col items-start justify-center py-[3.75rem] px-[7.5rem] gap-[0.625rem]">
        <div className="w-[25.063rem] h-[0rem]" />
        <div className="self-stretch flex flex-col items-start justify-center gap-[2rem]">
          <div className="self-stretch flex flex-col items-start justify-center gap-[2rem]">
            <div className="flex flex-col items-start justify-center gap-[0.5rem]">
              <b className="w-[22.813rem] relative tracking-[-0.02em] leading-[2.5rem] inline-block">
                Reset password.
              </b>
              <div className="w-[19.563rem] relative text-[1rem] leading-[1.625rem] font-paragraph-medium-16-regular text-body-text inline-block h-[1.75rem] shrink-0">
                Please type something you’ll remember.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem] text-[1rem] text-lightslategray font-paragraph-medium-16-regular">
              <div className="self-stretch rounded-lg bg-white flex flex-row flex-wrap items-center justify-between py-component-padding-medium px-component-padding-xlarge border-[1.6px] border-solid border-gainsboro-200">
                <div className="relative leading-[1.625rem]">Password</div>
                <img
                  className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0"
                  alt=""
                  src="/eye--hide.svg"
                />
              </div>
              <div className="w-[25.163rem] rounded-lg bg-white box-border flex flex-row flex-wrap items-center justify-between py-component-padding-medium px-component-padding-xlarge border-[1.6px] border-solid border-gainsboro-200">
                <div className="relative leading-[1.625rem]">
                  Confirm Password
                </div>
                <img
                  className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0"
                  alt=""
                  src="/eye--hide.svg"
                />
              </div>
            </div>
          </div>
          <div
            className="self-stretch rounded-lg bg-dodgerblue flex flex-row items-center justify-center py-component-padding-medium px-component-padding-6xlarge cursor-pointer text-center text-[1rem] text-white font-paragraph-medium-16-semi-bold"
            onClick={onFrameContainerClick}
          >
            <div className="relative leading-[1.5rem] font-semibold">
              Save password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
