import React from 'react';
import {NavLink} from "react-router-dom";
import st from "./header.module.css";
import s from '../notification/notification.module.css'
import {connect} from "react-redux";
import {setAuth} from "../../redux/auth-reducer";
import {setNotifications} from "../../redux/notification-reducer";


const NavBurger = (props) => {
    if(props.auth.match)
    return (
        <nav className={s.modal2}>
            <div className={st.navburger}>
                <NavLink to="/chat" activeClassName={`${st.active} + ${st.link}`}>Chat</NavLink>
                <NavLink to="/account" activeClassName={`${st.active} + ${st.link}`}>Account</NavLink>
                <NavLink to="/match" activeClassName={`${st.active} + ${st.link}`}>Match</NavLink>
                <NavLink to="/logout" activeClassName={`${st.active} + ${st.link}`}>Log Out</NavLink>
            </div>
        </nav>)
    else if(props.auth.login && !props.auth.match)
        return (
            <nav className={s.modal2}>
                <div className={st.navburger}>
                    <NavLink to="/account" activeClassName={`${st.active} + ${st.link}`}>Account</NavLink>
                    <NavLink to="/logout" activeClassName={`${st.active} + ${st.link}`}>Log Out</NavLink>
                </div>
            </nav>)
        else
            return(<nav></nav>);
}
let mapStateToProps = (state) => {
    return {
        auth: state.auth,
        notifications: state.notifications.notifications
    }
}


export default connect(mapStateToProps, {setAuth, setNotifications})(NavBurger);