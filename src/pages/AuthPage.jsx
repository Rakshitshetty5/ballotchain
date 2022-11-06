import React, { useState, useEffect, useMemo } from "react";
import FormContainer from "../components/FormContainer";
import Otp from "../components/Otp";
import { useNavigate } from "react-router-dom";

const initalOtpState = {
    otp_1: "",
    otp_2: "",
    otp_3: "",
    otp_4: "",
    otp_5: "",
    otp_6: "",
};

const AuthPage = () => {
  const [step, setStep] = useState(0)
  const [otpCode, setOtpCode] = useState(initalOtpState);
  const [otpError, setError] = useState('')
  const navigate = useNavigate()

  const otp = useMemo(() => {
    // e.preventDefault();
    let otpString = "";
    for (let i = 1; i <= 6; i++) {
      otpString += otpCode[`otp_${i}`];
    }
    return otpString
  }, [otpCode]);

  useEffect(() => {
    if(otp.length === 6){
      setError('')
    }
  },[otp])

  const handleCodeChange = (e) => {
    if(e.target.value.length > 1){
        e.target.value = e.target.value.slice(1, 2);
    }
    else if (e.target.value > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }

    setOtpCode((otpCode) => {
      return {
        ...otpCode,
        [e.target.name]: e.target.value,
      };
    });
  };

  const verifyOtp = () => {
    if(otp.length === 0){
      setError('OTP cannot be empty')
    }else if(otp.length !== 6){
      setError('Invalid OTP')
    }else{
      navigate('/')
    }
  }

  const submitVoterId = () => {
      setStep(1)
  }

  const submitOtp = () => {
    verifyOtp()
  }

  return (
    <div>
      {step === 0 && <FormContainer
        formTitle={"Login"}
        formSubTitle={
          "Please enter your 6 digit voter id in order to continue."
        }
        rBtnText={"Next"}
        nextStep={submitVoterId}
      >
        <div className="w-full">
          <label className="text-[1.1rem]">Enter Voter ID</label>
          <input
            className="border border-[#0909c0] w-full h-[2.5rem] px-2 rounded-xl mt-3 outline-none"
            placeholder="XXXXXX"
          />
        </div>
      </FormContainer>}
      {step === 1 && <FormContainer
        formTitle={"Login"}
        formSubTitle={
          "Enter the 6 digit otp sent to your registered email ID."
        }
        rBtnText={"Login"}
        lBtnText={"Back"}
        prevStep={() => setStep(0)}
        nextStep={submitOtp}
      >
        <div className="w-full">
          <label className="text-[1.1rem]">Enter OTP</label>
          <Otp handleCodeChange={handleCodeChange} otpCode={otpCode} errorMessage={otpError}/>
        </div>
      </FormContainer>}
    </div>
  );
};

export default AuthPage;
