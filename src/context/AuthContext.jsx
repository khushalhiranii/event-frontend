import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useLoading } from "../context/Loadingcontext";

const SignUp1 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { signupStep2, googleSignup2 } = useContext(AuthContext);
  const { startLoading, stopLoading } = useLoading();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [googleId, setGoogleId] = useState(null);

  // Use the useLocation hook to get the current URL
  const location = useLocation();

  useEffect(() => {
    // Extract the 'id' parameter from the URL
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');
    
    if (id) {
      setGoogleId(id);
    }
  }, [location.search]);

  useEffect(() => {
    // Enable the button when the user inputs change
    if (orgName && phoneNo.length === 10) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [orgName, phoneNo]);

  const handleSubmit2 = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      startLoading();
      const success = await googleSignup2(googleId, orgName, phoneNo);
      stopLoading();
      if (success) {
        navigate("/dashboard");
      } else {
        setError('Signup step 2 failed');
        console.error("Signup step 2 failed");
      }
    } catch (err) {
      stopLoading();
      setError('Error: Unable to connect to the server');
      console.error("Error during signup step 2:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      startLoading();
      const response = await signupStep2(orgName, phoneNo);
      stopLoading();
      if (response && response.statusCode === 200) {
        setMessage('User registered successfully');
        setError('');
        navigate("/dashboard");
      } else if (response) {
        switch (response.statusCode) {
          case 400:
            setError(response.message || 'Bad Request');
            break;
          case 404:
            setError(response.message);
            break;
          case 409:
            setError(response.message);
            break;
          case 500:
            setError(response.message);
            break;
          default:
            setError('Unknown error occurred');
        }
        setMessage('');
      }
    } catch (err) {
      stopLoading();
      setError('Error: Unable to connect to the server');
      console.error('Error:', err);
      setMessage('');
    }
  };

  return (
    <div className="w-full relative flex flex-row justify-around bg-white h-full py-12 overflow-hidden text-left text-[2rem] text-angiant-color-system-anginat-gray-darker font-h3-32-bold mq450:flex-col mq675:flex-col">
      <div className="left-[6.813rem] flex flex-col items-start justify-start gap-[2rem] text-[2.25rem] text-text">
        <div className="relative flex-1 tracking-[-0.02em] leading-[2.75rem] font-semibold">
          Create account
        </div>
        <img
          className="left-[5rem] w-[34.381rem] h-[25.25rem] overflow-hidden"
          alt=""
          src="/undraw-going-up-re-86kg.svg"
        />
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
                  </div>
                </div>
                {message && (
                  <div className="self-stretch text-green-500 text-sm">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="self-stretch text-red-500 text-sm">
                    {error}
                  </div>
                )}
                <div className="w-[25.063rem] flex flex-col items-start justify-start gap-[1rem]">
                  <div className="self-stretch rounded-lg bg-white flex flex-row items-center justify-start py-component-padding-medium px-component-padding-xlarge gap-[1rem] border-[1.6px] border-solid border-gainsboro-200">
                    <input
                      className="relative p-0 w-full tracking-[0.1px] border-white text-lg text-gray-500 focus:outline-none focus:ring-0 placeholder:text-sm placeholder:font-medium placeholder:leading-[21px] placeholder:tracking-[0.1px] placeholder:text-[#969AB8] font-poppins"
                      placeholder="Organisation Name"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>
                  <div className="self-stretch rounded-lg bg-white flex flex-row flex-wrap items-center justify-between py-component-padding-medium px-component-padding-xlarge border-[1.6px] border-solid border-gainsboro-200">
                    <div className="w-[19.375rem] flex flex-row items-center justify-start gap-[1rem]">
                      <input
                        className="relative w-full tracking-[0.1px] text-lg text-violet-500 self-stretch focus:outline-none focus:ring-0 placeholder:text-sm placeholder:font-medium placeholder:leading-[21px] placeholder:tracking-[0.1px] placeholder:text-[#969AB8] font-poppins"
                        placeholder="Phone No."
                        type="tel"
                        maxLength={10}
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="self-stretch rounded-lg bg-dodgerblue disabled:bg-sky-300 flex flex-row items-center justify-center py-component-padding-medium px-component-padding-6xlarge cursor-pointer text-center text-[1.125rem] text-white"
                onClick={(googleId ? handleSubmit2 : handleSubmit)}
                disabled={isButtonDisabled}
              >
                <div className="relative leading-[1.75rem] font-semibold">
                  Continue
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp1;
