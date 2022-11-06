import React, { useState } from "react";


const HELPER_ARRAY = [1, 2, 3, 4, 5, 6];

const Otp = ({ handleCodeChange, otpCode, ...props }) => {

  const inputFocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6) {
        e.target.form.elements[next].focus();
      }
    }
  };

  return (
    //   remove the width below
    <form className="w-full"> 
      <div className="flex items-center justify-between w-full">
        {HELPER_ARRAY.map((el) => (
          <input
            key={el}
            type="number"
            name={`otp_${el}`}
            className={"h-12 w-12 border-2 border-green text-center caret-transparent otp-input rounded-md"}
            value={otpCode[`otp_${el}`]}
            max="1"
            onChange={handleCodeChange}
            onKeyUp={inputFocus}
            tabIndex={el}
            disabled={el === 1 ? false : !otpCode[`otp_${el-1}`]}
            required
          />
        ))}
      </div>
      <span>{props.errorMessage}</span>
    </form>
  );
};

export default Otp;
