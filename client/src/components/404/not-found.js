import React from 'react';
import {Link} from "react-router-dom";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";

const NotFound = () => {
    return (
        <div className='error'>
            <h1>Error 404</h1>
            <img width='400px' alt='404'
                 src='https://leonardo.osnova.io/8e65ac6b-c871-021f-e355-c0fb858b8a52/-/resize/900/'/>
            <h2>Page not found</h2>
            <Link to='/'><ArrowBackOutlinedIcon/> Go back to main page</Link>
        </div>)
};

export default NotFound;