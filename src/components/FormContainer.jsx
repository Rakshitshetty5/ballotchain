import React from "react";
import footer from "../assets/images/default.png";

const FormContainer = ({
    formTitle,
    formSubTitle,
    rBtnText,
    lBtnText,
    nextStep,
    prevStep,
    children,
}) => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <div className="max-w-[100vw] md:h-[100vh] short:overflow-hidden flex flex-col">
            <div className="flex h-full w-full">
                <div
                    className={`bg-mainImage bg-contain bg-center bg-no-repeat hidden short:block h-[100vh] lg:basis-[50%]`}
                ></div>
                <div className="flex-1 bg-[#afcddb] flex flex-col justify-between min-h-[100vh] md:h-[100vh]">
                    <div className="self-center md:self-end flex flex-col items-center px-5 pt-5 w-[15rem] h-[4rem]">
                        <h1 className="text-[#c45252] text-4xl">BallotChain</h1>
                        <span className="text-sm text-[#0909c0]">make every vote count</span>
                    </div>
                    <div
                        className={`pt-8 px-[5%] md:px-[8%] lg:px-[12%] xl:px-[15%] h-full flex flex-col items-start justify-start space-y-4 tall:space-y-10 overflow-y-auto`}
                    >
                        <h1 className="text-3xl tall:text-[3rem] tall:pt-2 text-[#0909c0]">{formTitle}</h1>
                        <span className="text-grey pb-4 tall:pb-0">{formSubTitle}</span>
                        {children}
                        <div className="flex space-x-5 w-full">
                            {lBtnText && <button
                            className="bg-[#0909c0] w-full text-white font-bold rounded-full h-[3rem]"
                            onClick={prevStep}
                            >
                                {lBtnText}
                            </button>}
                            <button
                            className="bg-[#c45252] w-full text-white font-bold rounded-full h-[3rem]"
                            onClick={handleFormSubmit}
                            >
                                {rBtnText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormContainer;
