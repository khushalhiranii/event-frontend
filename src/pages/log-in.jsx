import { useCallback, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent1 from "../components/frame-component1";
import AuthContext from "../context/AuthContext";
import { useLoading } from "../context/Loadingcontext";

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
 // Error message state
  const { login } = useContext(AuthContext);
  const { startLoading, stopLoading } = useLoading();

  const onFrameContainerClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const onFrameContainerClick2 = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      const response = await login(email, password);
      
      if (response) {
        stopLoading();
        if (response.statusCode === 200) {
          setMessage('User logged in successfully');
          setError('');
          // Optional: Redirect to dashboard
        } else if (response.statusCode === 202) {
          setMessage('Additional info is required');
          setError('');
          // Optional: Redirect to additional info page
        } else {
          handleKnownErrors(response);
        }
      } else {
        stopLoading();
        setError('Error: Unable to connect to the server');
        setMessage('');
      }
    } catch (error) {
      stopLoading();
      console.error('Error:', error);
      setError('Error: Unable to connect to the server');
      setMessage('');
    }
  };
  
  const handleKnownErrors = (response) => {
    switch (response.statusCode) {
      case 400:
        setError(response.message || 'Bad Request');
        break;
      case 401:
        setError('Invalid password');
        break;
      case 404:
        setError('User does not exist, please register first');
        break;
      case 500:
        setError('Internal Server Error');
        break;
      // default:
      //   setError('Unknown error occurred');
    }
  };
  

  const onFrameContainerClick1 = useCallback(() => {
    navigate("/forgetpassword");
  }, [navigate]);

  useEffect(() => {
    const isValidEmail = (email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
    <div className="w-full top-[calc(50%_-_269px)] flex flex-row justify-around relative bg-white h-full py-12 text-center text-[2rem] text-black1 font-h3-32-bold md:flex-row">
      <div className="top-[calc(50%_-_294.5px)] left-[5rem] flex flex-col items-start justify-start gap-[4rem] text-left text-[2.25rem] text-text">
        <div className="relative tracking-[-0.02em] leading-[2.75rem] font-semibold">
          Welcome back
        </div>
        <img
          className="w-[30.844rem] relative h-[30.05rem] overflow-hidden shrink-0 object-contain"
          alt=""
          src="/undraw-my-password-re-ydq7.svg"
        />
      </div>
      <div className="shadow-[0px_4px_8px_-2px_rgba(0,_0,_0,_0.1),_0px_2px_4px_-2px_rgba(0,_0,_0,_0.06)] rounded-xl bg-white flex flex-col items-start justify-start py-[3.75rem] px-[7.5rem]">
        <div className="w-[25.063rem] flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-start justify-start gap-[2rem]">
            <div className="flex flex-col items-center justify-start gap-[2rem]">
              <div className="flex flex-col items-end justify-start gap-[2rem]">
                <div className="self-stretch h-[2.25rem] flex flex-col items-center justify-center">
                  <div className="self-stretch flex flex-row items-center justify-between">
                    <div className="flex flex-col items-center justify-start">
                      <b className="relative tracking-[-0.02em] leading-[2.5rem]">
                        Login
                      </b>
                    </div>
                    <div
                      className="flex flex-row items-center justify-start py-[0.25rem] px-[0.5rem] cursor-pointer text-left text-[1rem] text-angiant-color-system-anginat-gray-darker font-paragraph-medium-16-semi-bold border-b-[1px] border-solid border-angiant-color-system-anginat-primary-anginat-primary-900"
                      onClick={onFrameContainerClick}
                    >
                      <div className="relative leading-[1.5rem] font-medium">
                        signup
                      </div>
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
                <div className="flex flex-col items-end justify-start gap-[1rem] text-left text-[0.875rem] text-lightslategray font-poppins">
                  <div className="w-[25.063rem] flex flex-col items-start justify-start gap-[1rem]">
                    <div className="self-stretch rounded-lg bg-white flex flex-row items-center justify-start py-component-padding-medium px-component-padding-xlarge gap-[1rem] border-[1.6px] border-solid border-gainsboro-200">
                      <img
                        className="w-[1.344rem] relative h-[1.075rem]"
                        alt=""
                        src="/group.svg"
                      />
                      <input
                        className="relative p-0 w-full tracking-[0.1px] border-white text-lg text-gray-500 focus:outline-none focus:ring-0"
                        placeholder="Your email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="self-stretch rounded-lg bg-white flex flex-row flex-wrap items-center justify-between py-component-padding-medium px-component-padding-xlarge border-[1.6px] border-solid border-gainsboro-200">
                      <div className="w-[19.375rem] flex flex-row items-center justify-start gap-[1rem]">
                        <img
                          className="w-[1.188rem] relative h-[1.188rem]"
                          alt=""
                          src="/group1.svg"
                        />
                        <input
                          className="relative w-full tracking-[0.1px] text-lg text-violet-500 self-stretch focus:outline-none focus:ring-0"
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <img
                        className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0 cursor-pointer"
                        alt=""
                        src={showPassword ? "/eye-open-svgrepo-com.svg" : "/eye--hide.svg"}
                        onClick={toggleShowPassword}
                      />
                    </div>
                  </div>
                  <div
                    className="flex flex-row items-end justify-start py-[0.25rem] px-[0.5rem] cursor-pointer text-[1rem] text-angiant-color-system-anginat-error-anginat-error-500 font-paragraph-medium-16-semi-bold"
                    onClick={onFrameContainerClick1}
                  >
                    <div className="relative leading-[1.5rem] font-medium">
                      Forgot password?
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="self-stretch rounded-lg bg-dodgerblue disabled:bg-sky-300 flex flex-row items-center justify-center py-component-padding-medium px-component-padding-6xlarge cursor-pointer text-center text-[1.125rem] text-white"
                onClick={onFrameContainerClick2}
                disabled={isButtonDisabled}
              >
                <div className="relative leading-[1.75rem] font-semibold">
                  Login
                </div>
              </button>
            </div>
            <FrameComponent1
              loginWithGoogle="Login with google"
              group427320702="/group-427320702.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
