import React, { useState, useEffect, useMemo } from "react";
import FormContainer from "../components/FormContainer";
import Otp from "../components/Otp";
import { useNavigate } from "react-router-dom";
import customAxios from "../utils/CustomAxios";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/auth/reducer";

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
  const [otpCode, setOtpCode] = useState(initalOtpState)
  const [otpError, setError] = useState('')
  const [voterId, setVoterId] = useState('')
  const [data, setData] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const otp = useMemo(() => {
    // e.preventDefault();
    let otpString = "";
    for (let i = 1; i <= 6; i++) {
      otpString += otpCode[`otp_${i}`];
    }
    return otpString
  }, [otpCode]);

  useEffect(() => {
    if (otp.length === 6) {
      setError('')
    }
  }, [otp])

  const handleCodeChange = (e) => {
    if (e.target.value.length > 1) {
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

  const verifyOtp = async () => {
    if (otp.length === 0) {
      setError('OTP cannot be empty')
    } else if (otp.length !== 6) {
      setError('Invalid OTP')
    } else {
      const response = await customAxios.post('/voter/verifyOTP', { voter_id: voterId, otp, email: data?.email, voter_details_id: data?.voter_details_id})
      dispatch(signIn(response.data.data))
      navigate('/')
    }
  }

const submitVoterId = async () => {
  const response = await customAxios.post('/voter/getOTP', { voter_id: voterId })
  setData(response.data.data)
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
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
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
        <Otp handleCodeChange={handleCodeChange} otpCode={otpCode} errorMessage={otpError} />
      </div>
    </FormContainer>}
  </div>
);
};

export default AuthPage;
