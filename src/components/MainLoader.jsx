import React from 'react'
import Loader from "../assets/images/MainLoader.svg"
const MainLoader = () => {
    return (
        <div className="flex items-center justify-center w-full min-h-[40vh]">
            <img
                src={Loader}
                alt="loader"
            />
        </div >
  )
}

export default MainLoader