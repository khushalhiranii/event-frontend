import { useState, useCallback, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent1 from "../components/frame-component1";
import UndrawSignUpN6im from "../components/undraw-sign-up-n6im";
import AuthContext from "../context/AuthContext";
import { useLoading } from "../context/Loadingcontext";
import DefaultInput from "../admin/DesignSystem/DefaultInput";
import PasswordInput from "../admin/DesignSystem/PasswordInput";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { signupStep1 } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { startLoading, stopLoading } = useLoading();

  const onFrameContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFrameContainerClick1 = async (e) => {
    e.preventDefault();
    try {
      startLoading()
      const response = await signupStep1(email, password); // Await the response
      console.log(response)
      if (response && response.statusCode === 200) {
        stopLoading();
        setMessage(response.message);
        setError('');
        // Optionally, redirect to login page or clear form
      } else {
        
        if (response.statusCode === 400) {
          stopLoading();
          setError(response.message || 'Bad Request');
        } else if (response.statusCode === 409) {
          stopLoading();
          setError(response.message);
        } else if (response.statusCode === 500) {
          stopLoading();
          setError(response.message);
        } else {
          stopLoading();
          setError('Unknown error occurred');
        }
        setMessage('');
      }
    } catch (error) {
      stopLoading();
      console.error('Error:', error);
      setError('Error: Unable to connect to the server');
      setMessage('');
    }
  };
  

  useEffect(() => {
    // Simple email validation
    const isValidEmail = (email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    // Enable the button only when email and password are valid
    if (isValidEmail(email) && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="w-full relative flex flex-row justify-around bg-white h-full py-12 text-left text-[2rem] text-angiant-color-system-anginat-gray-darker font-h3-32-bold mq675:flex-col">
      <div className="left-[6.813rem] flex flex-col items-start justify-start gap-[2rem] text-[2.25rem] text-text">
        <div className="relative tracking-[-0.02em] leading-[2.75rem] font-semibold">
          Create account
        </div>
        <UndrawSignUpN6im />
      </div>
      <div className="left-[44.938rem] shadow-[0px_4px_8px_-2px_rgba(0,_0,_0,_0.1),_0px_2px_4px_-2px_rgba(0,_0,_0,_0.06)] rounded-xl bg-white flex flex-col items-start justify-start py-[3.75rem] px-[7.5rem]">
        <div className="w-[25.063rem] flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-start justify-start gap-[2rem]">
            <div className="flex flex-col items-center justify-start gap-[2rem]">
              <div className="flex flex-col items-end justify-start gap-[2rem]">
                <div className="self-stretch h-[2.25rem] flex flex-col items-center justify-center">
                  <div className="self-stretch flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-start py-[0.25rem] px-[0.5rem]">
                      <b className="relative tracking-[-0.02em] leading-[2.5rem]">
                        Signup
                      </b>
                    </div>
                    <div
                      className="flex flex-col items-center justify-start py-[0.25rem] px-[0.5rem] cursor-pointer text-center text-[1rem] text-black1 font-paragraph-medium-16-regular border-b-[1px] border-solid border-angiant-color-system-anginat-primary-anginat-primary-900"
                      onClick={onFrameContainerClick}
                    >
                      <div className="relative leading-[1.625rem]">Login</div>
                    </div>
                  </div>
                </div>
                {message && ( // Display error message if exists
                  <div className="self-stretch text-green-500 text-sm">
                    {message}
                  </div>
                )}
                {error && ( // Display error message if exists
                  <div className="self-stretch text-red-500 text-sm">
                    {error}
                  </div>
                )}
                <div className="w-[25.063rem] flex flex-col items-start justify-start gap-[1rem]">
                  {/* <div className="self-stretch rounded-lg bg-white flex flex-row items-center justify-start py-component-padding-medium px-component-padding-xlarge gap-[1rem] border-[1.6px] border-solid border-gainsboro-200">
                    <img
                      className="w-[1.344rem] relative h-[1.075rem]"
                      alt=""
                      src="/group.svg"
                    />
                    <input
                      className="relative p-0 w-full tracking-[0.1px] border-white text-lg text-gray-500 focus:outline-none focus:ring-0 placeholder:text-sm placeholder:font-medium placeholder:leading-[21px] placeholder:tracking-[0.1px] placeholder:text-[#969AB8] font-poppins"
                      placeholder="Your email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div> */}
                  <DefaultInput 
                      img={"/group.svg"}
                      placeholder="Your email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange} />
                  
                  <PasswordInput
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}/>
                </div>
              </div>
              <button
                className="self-stretch rounded-lg bg-dodgerblue disabled:bg-sky-300 flex flex-row items-center justify-center py-component-padding-medium px-component-padding-6xlarge cursor-pointer text-center text-[1.125rem] text-white"
                onClick={onFrameContainerClick1}
                disabled={isButtonDisabled}
              >
                <div className="relative leading-[1.75rem] font-semibold">
                  Continue
                </div>
              </button>
            </div>
            <FrameComponent1
              loginWithGoogle="Signup with google"
              group427320702="/group-4273207021.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
