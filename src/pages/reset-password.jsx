import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useLoading } from "../context/Loadingcontext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tokenParam = urlParams.get('token');
    
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      navigate("/forgetpassword");
    }
  }, [location, navigate]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = useCallback(async () => {
    startLoading();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      stopLoading();
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`, { password });

      if (response.status === 200) {
        setMessage('Password reset successfully');
        setPassword('');
        setConfirmPassword('');
        navigate("/passwordchanged");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Error resetting password');
      }
    } finally {
      stopLoading();
    }
  }, [password, confirmPassword, token, navigate, startLoading, stopLoading]);

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
            {message && ( // Display success message if exists
              <div className="self-stretch text-green-500 text-sm">
                {message}
              </div>
            )}
            {error && ( // Display error message if exists
              <div className="self-stretch text-red-500 text-sm">
                {error}
              </div>
            )}
            <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem] text-[1rem] text-lightslategray font-paragraph-medium-16-regular">
              <div className="self-stretch rounded-lg bg-white flex flex-row flex-wrap items-center justify-between py-component-padding-medium px-component-padding-xlarge border-[1.6px] border-solid border-gainsboro-200">
                <input
                  className="relative p-0 w-full tracking-[0.1px] border-white text-lg text-gray-500 focus:outline-none focus:ring-0 placeholder:text-sm placeholder:font-medium placeholder:leading-[21px] placeholder:tracking-[0.1px] placeholder:text-[#969AB8] font-poppins"
                  placeholder="New Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <img
                  className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0"
                  alt=""
                  src="/eye--hide.svg"
                />
              </div>
              <div className="w-[25.163rem] rounded-lg bg-white box-border flex flex-row flex-wrap items-center justify-between py-component-padding-medium px-component-padding-xlarge border-[1.6px] border-solid border-gainsboro-200">
                <input
                  className="relative p-0 w-full tracking-[0.1px] border-white text-lg text-gray-500 focus:outline-none focus:ring-0 placeholder:text-sm placeholder:font-medium placeholder:leading-[21px] placeholder:tracking-[0.1px] placeholder:text-[#969AB8] font-poppins"
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <img
                  className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0"
                  alt=""
                  src="/eye--hide.svg"
                />
              </div>
            </div>
          </div>
          <button
            className="self-stretch rounded-lg bg-dodgerblue flex flex-row items-center justify-center py-component-padding-medium px-component-padding-6xlarge cursor-pointer text-center text-[1rem] text-white font-paragraph-medium-16-semi-bold"
            onClick={handleSubmit}
          >
            <div className="relative leading-[1.5rem] font-semibold">
              Save password
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
