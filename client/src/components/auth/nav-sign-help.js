import React from 'react';
import {NavLink} from "react-router-dom";
import s from './auth.module.css';

const NavSignHelp = (props) => {
    let have = 'Have an account?';
    let sign = 'Sign in';
    let link = '/auth';
    let account = props.status;
    if (account === 'signin') {
        have = "Don't have an account? ";
        sign = 'Sign Up';
        link = `/signup`;
    } else if (account === 'forgot') {
        have = "Forgot Password? ";
        sign = 'Reset';
        link = `/resetpassword`;
    }
    return (
        <div className={s.formhelp}>
            <p>{have}
                <NavLink to={link}>{sign}</NavLink></p>
        </div>
    )
}

export default NavSignHelp;