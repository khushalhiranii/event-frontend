import PropTypes from "prop-types";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const FrameComponent1 = ({
  className = "",
  loginWithGoogle,
  group427320702,
}) => {
  const { googleSignup } = useContext(AuthContext);

  return (
    <button
      onClick={()=>{ googleSignup() }}
      className={`self-stretch flex flex-col items-start justify-start gap-[0.5rem] text-left text-[1rem] text-angiant-color-system-anginat-primary-anginat-primary-300 font-paragraph-medium-16-regular ${className}`}
    >
      <div className="self-stretch flex flex-row items-center justify-center">
        <div className="relative leading-[1.625rem]">OR</div>
      </div>
      <div className="self-stretch shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-lg bg-white flex flex-col items-start justify-start py-[0.5rem] px-[0rem] border-[1px] border-solid border-angiant-color-system-anginat-gray-light">
        <div className="self-stretch flex flex-row items-center justify-center gap-[0.625rem]">
          <div className="relative leading-[1.625rem]">{loginWithGoogle}</div>
          <img
            className="w-[1.25rem] relative h-[1.25rem]"
            alt=""
            src={group427320702}
          />
        </div>
      </div>
    </button>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
  loginWithGoogle: PropTypes.string,
  group427320702: PropTypes.string,
};

export default FrameComponent1;
