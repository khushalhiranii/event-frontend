import Property1Frame from "../components/property1-frame";

const SignUp2 = () => {
  return (
    <div className="w-full relative bg-white h-[65.313rem] overflow-hidden">
      <div className="absolute top-[calc(50%_-_179.5px)] right-[5rem] bg-white flex flex-col items-start justify-center py-[3.75rem] px-[7.5rem] gap-[0.625rem]">
        <Property1Frame
          forgotPassword="Re-enter Number"
          enterYourEmailOrPhoneToRe="Enter your phone number to verify it."
          following=" Phone no."
          showGroupIcon={false}
          property1Frame427320730Width="25.063rem"
          property1Frame427320730Gap="2rem"
        />
        <div className="w-[25.063rem] h-[0rem]" />
      </div>
      <img
        className="absolute top-[calc(50%_-_200.5px)] left-[5rem] w-[37.975rem] h-[25rem] overflow-hidden"
        alt=""
        src="/undraw-profile-data-re-v81r-1.svg"
      />
    </div>
  );
};

export default SignUp2;
