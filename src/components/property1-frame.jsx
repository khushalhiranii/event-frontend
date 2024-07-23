import { useMemo } from "react";
import PropTypes from "prop-types";

const Property1Frame = ({
  className = "",
  forgotPassword,
  enterYourEmailOrPhoneToRe,
  following,
  showGroupIcon,
  property1Frame427320730Width,
  property1Frame427320730Gap,
}) => {
  const property1Frame427320730Style = useMemo(() => {
    return {
      width: property1Frame427320730Width,
      gap: property1Frame427320730Gap,
    };
  }, [property1Frame427320730Width, property1Frame427320730Gap]);

  return (
    <div
      className={`w-[401px] max-w-full flex flex-col items-start justify-center gap-[32px] text-left text-13xl text-text font-h3-32-bold ${className}`}
      style={property1Frame427320730Style}
    >
      <div className="flex flex-col items-start justify-center gap-[12px]">
        <b className="w-[365px] relative tracking-[-0.02em] leading-[40px] inline-block">
          {forgotPassword}
        </b>
        <div className="relative text-base leading-[26px] font-paragraph-medium-16-regular text-body-text">
          {enterYourEmailOrPhoneToRe}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-center text-base text-lightslategray font-paragraph-medium-16-semi-bold">
        <div className="self-stretch flex flex-col items-center justify-start gap-[24px]">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch rounded-lg bg-white flex flex-row items-center justify-start py-component-padding-medium px-component-padding-xlarge gap-[16px] border-[1.6px] border-solid border-gainsboro-200">
              {showGroupIcon && (
                <img
                  className="w-[21.5px] relative h-[17.2px]"
                  alt=""
                  src="/group2.svg"
                />
              )}
              <input
                        className="relative p-0 w-full tracking-[0.1px] border-white text-lg text-gray-500 focus:outline-none focus:ring-0"
                        placeholder={following}
                      />
            </div>
          </div>
          <div className="self-stretch rounded-lg bg-dodgerblue flex flex-row items-center justify-center py-component-padding-medium px-component-padding-6xlarge text-center text-white">
            <div className="relative leading-[24px] font-semibold">{`Send Email `}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Property1Frame.propTypes = {
  className: PropTypes.string,
  forgotPassword: PropTypes.string,
  enterYourEmailOrPhoneToRe: PropTypes.string,
  following: PropTypes.string,
  showGroupIcon: PropTypes.bool,

  /** Style props */
  property1Frame427320730Width: PropTypes.any,
  property1Frame427320730Gap: PropTypes.any,
};

export default Property1Frame;
