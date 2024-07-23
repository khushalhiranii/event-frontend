import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Component = ({ className = "", following }) => {
  const navigate = useNavigate();

  const onFrameContainerClick = useCallback(() => {
    navigate("/forgetpassword");
  }, [navigate]);

  const onFrameContainerClick1 = useCallback(() => {
    navigate("/resetpassword");
  }, [navigate]);

  return (
    <div
      className={`w-[25.063rem] flex flex-col items-start justify-center gap-[2rem] text-center text-[1rem] text-black1 font-paragraph-medium-16-regular ${className}`}
    >
      <div className="self-stretch flex flex-col items-start justify-center gap-[0.5rem]">
        <div
          className="rounded bg-white flex flex-row items-center justify-start py-[0.25rem] px-[0rem] gap-[0.25rem] cursor-pointer"
          onClick={onFrameContainerClick}
        >
          <img
            className="w-[1rem] relative h-[1rem] overflow-hidden shrink-0 object-contain"
            alt=""
            src="/chevrondown@2x.png"
          />
          <div className="relative leading-[1.625rem]">Back</div>
        </div>
        <b className="w-[22.813rem] relative text-[2rem] tracking-[-0.02em] leading-[2.5rem] inline-block font-h3-32-bold text-text text-left">
          Few Details
        </b>
        <div className="w-[25.063rem] flex flex-col items-start justify-start gap-[1rem]">
                    <div className="self-stretch rounded-lg bg-white flex flex-row items-center justify-start py-component-padding-medium px-component-padding-xlarge gap-[1rem] border-[1.6px] border-solid border-gainsboro-200">
                      <img
                        className="w-[1.344rem] relative h-[1.075rem]"
                        alt=""
                        src="/group.svg"
                      />
                      <input
                        className="relative p-0 w-full tracking-[0.1px] border-white text-lg text-gray-500 focus:outline-none focus:ring-0"
                        placeholder="Organisation Name"
                      />

                    </div>
                    <div className="self-stretch rounded-lg bg-white flex flex-row flex-wrap items-center justify-between py-component-padding-medium px-component-padding-xlarge border-[1.6px] border-solid border-gainsboro-200">
                      <div className="w-[19.375rem] flex flex-row items-center justify-start gap-[1rem]">
                        <img
                          className="w-[1.188rem] relative h-[1.188rem]"
                          alt=""
                          src="/group1.svg"
                        />
                        <input className="relative w-full tracking-[0.1px] text-lg text-violet-500 self-stretch focus:outline-none focus:ring-0"
                      placeholder="Phone No."
                      />
                      </div>
                    </div>
                  </div>
        <div
          className="self-stretch rounded-lg bg-dodgerblue flex flex-row items-center justify-center py-component-padding-medium px-component-padding-6xlarge cursor-pointer text-white"
          onClick={onFrameContainerClick1}
        >
          <div className="relative leading-[1.5rem] font-semibold">
            {following}
          </div>
        </div>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  following: PropTypes.string,
};

export default Component;
