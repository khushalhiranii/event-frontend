import Component from "../components/component";

const ForgetPassword1 = () => {
  return (
    <div className="w-full relative bg-white h-[65.313rem] overflow-hidden">
      <div className="absolute top-[calc(50%_-_224.5px)] right-[5rem] shadow-[0px_4px_8px_-2px_rgba(0,_0,_0,_0.1),_0px_2px_4px_-2px_rgba(0,_0,_0,_0.06)] rounded-xl bg-white flex flex-col items-start justify-center py-[3.75rem] px-[7.5rem] gap-[0.625rem]">
        <Component following="Verify OTP" />
        <div className="w-[25.063rem] h-[0rem]" />
      </div>
      <img
        className="absolute top-[calc(50%_-_200.5px)] left-[5rem] w-[21.431rem] h-[25rem] overflow-hidden"
        alt=""
        src="/undraw-authentication-re-svpt-1.svg"
      />
    </div>
  );
};

export default ForgetPassword1;
