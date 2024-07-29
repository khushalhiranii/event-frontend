import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { startLoading, stopLoading } = useLoading();

  const sendEmail = async (e) => {
    startLoading();
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('/api/v1/auth/forget-password', { email });

      if (response.status === 200) {
        stopLoading();
        setMessage('Email sent for password reset');
        setEmail('');
      }
    } catch (error) {
      stopLoading();
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 400:
            setError(data.message || 'Email is required');
            break;
          case 404:
            setError('User not found');
            break;
          case 500:
            setError('Internal Server Error');
            break;
          default:
            setError('Unknown error occurred');
        }
      } else {
        setError('Error: Unable to connect to the server');
      }
    }
  };


  useEffect(() => {
    // Simple email validation
    const isValidEmail = (email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Enable the button only when email is valid
    if (isValidEmail(email)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email]);

  const handleEmailChange = (e) => setEmail(e.target.value);

  return (
    <div className="w-full relative bg-white h-[65.313rem] overflow-hidden">
      <div className="absolute top-[calc(50%_-_180.5px)] right-[5rem] shadow-[0px_4px_8px_-2px_rgba(0,_0,_0,_0.1),_0px_2px_4px_-2px_rgba(0,_0,_0,_0.06)] rounded-xl bg-white flex flex-col items-start justify-center py-[3.75rem] px-[7.5rem] gap-[0.625rem]">
        
        <div
          className="w-[401px] max-w-full flex flex-col items-start justify-center gap-[32px] text-left text-13xl text-text font-h3-32-bold"
        >
          <div className="flex flex-col items-start justify-center gap-[12px]">
            <b className="w-[365px] relative tracking-[-0.02em] leading-[40px] inline-block">
              Forgot Password?
            </b>
            <div className="relative text-base leading-[26px] font-paragraph-medium-16-regular text-body-text">
              Enter your email address to reset your password
            </div>
          </div>
          {message && ( // Display error message if exists
                  <div className="self-stretch text-red-500 text-sm">
                    {message}
                  </div>
                )}
                {error && ( // Display error message if exists
                  <div className="self-stretch text-red-500 text-sm">
                    {error}
                  </div>
                )}
          <div className="self-stretch flex flex-col items-start justify-center text-base text-lightslategray font-paragraph-medium-16-semi-bold">
            <div className="self-stretch flex flex-col items-center justify-start gap-[24px]">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch rounded-lg bg-white flex flex-row items-center justify-start py-component-padding-medium px-component-padding-xlarge gap-[16px] border-[1.6px] border-solid border-gainsboro-200">
                  <img
                    className="w-[21.5px] relative h-[17.2px]"
                    alt=""
                    src="/group2.svg"
                  />
                  <input
                    className="relative p-0 w-full tracking-[0.1px] border-white text-lg text-gray-500 focus:outline-none focus:ring-0"
                    placeholder="Your Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              <button
                className="self-stretch rounded-lg bg-dodgerblue disabled:bg-sky-300 flex flex-row items-center justify-center py-component-padding-medium px-component-padding-6xlarge text-center text-white"
                onClick={() => sendEmail(email)}
                disabled={isButtonDisabled}
              >
                <div className="relative leading-[24px] font-semibold">{`Send Email `}</div>
              </button>
            </div>
          </div>
        </div>
        <div className="w-[25.063rem] h-[0rem]" />
      </div>
      <img
        className="absolute top-[calc(50%_-_200.5px)] left-[5rem] w-[37.588rem] h-[25rem] overflow-hidden"
        alt=""
        src="/undraw-forgot-password-re-hxwm-1.svg"
      />
    </div>
  );
};

export default ForgetPassword;
