import React from 'react'
import Lottie from "react-lottie";
import error from "../../assets/animations/errorNotFound.json"
import "./Error.css"
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
};

const Error = () => {
  return (
    <div className='shopx_error'>
        <Lottie options={defaultOptions} height={350} width={450} />
    </div>
  )
}

export default Error