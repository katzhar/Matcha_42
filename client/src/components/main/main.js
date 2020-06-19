import React from 'react';
import SignUp from '../auth/form-signup';
import s from './main.module.css'
import {connect} from "react-redux";
import {Redirect} from "react-router";

const Main = (props) => {
    if (props.auth.match)
        return <Redirect to='/match'/>;
    else if (props.auth.login)
        return <Redirect to='/account'/>;
    else
        return (
            <div className={s.main}>
                <div className={s.shodites}>
                    <img src='https://memepedia.ru/wp-content/uploads/2018/01/1504727711113899828.jpg'
                         alt='background'/>
                </div>
                <div className={s.form}>
                    <SignUp/>
                </div>
            </div>
        )
};
let mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Main);