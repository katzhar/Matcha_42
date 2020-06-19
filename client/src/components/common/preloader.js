import React from "react";
import preloader from "../../assets/preloader.svg";

let Preloader = () => {
    return <img className='preloader' style={{position: 'absolute', left: '50%'}} src={preloader} alt='preloader'/>
}

export default Preloader;