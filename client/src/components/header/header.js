import React from 'react';
import {NavLink} from "react-router-dom";
import st from "./header.module.css";
import axios from 'axios';
import {connect} from "react-redux";
import {setAuth} from "../../redux/auth-reducer";
import {pushNotificationRecipient, setNotifications} from "../../redux/notification-reducer";
import socket from "../../ socket/socket-client";


const Navigation = (props) => {
let count = (typeof props.count === "undefined" || typeof props.viewcount === "undefined") ? 0 : Number(props.count) - Number(props.viewcount);
    count = (count < 0) ? 0 : count;

    switch (true) {
        case props.auth.match:
            return (
                <nav>
                    <div className={st.burger}>
                        <svg onClick={props.tModal2} width="40" height="20" viewBox="0 0 40 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <line x1="38" y1="10" x2="2" y2="10" stroke="#7E12B0" strokeOpacity="0.61" strokeWidth="4"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="38" y1="2" x2="2" y2="2" stroke="#7E12B0" strokeOpacity="0.4" strokeWidth="4"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="38" y1="18" x2="2" y2="18" stroke="#7E12B0" strokeWidth="4" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        <div className={st.notification}>
                            <img onClick={props.tModal} className={st.logo_ntf}
                                 src="https://smmis.ru/wp-content/uploads/2015/03/uvedomleniya.png" alt='notification'/>
                            <div className={st.count_ntf}><p>{count}</p></div>
                        </div>
                    </div>
                    <div className={st.navlink}>
                        <NavLink to="/chat" activeClassName={`${st.active} + ${st.link}`}>Chat</NavLink>
                        <NavLink to="/account" activeClassName={`${st.active} + ${st.link}`}>Account</NavLink>
                        <NavLink to="/match" activeClassName={`${st.active} + ${st.link}`}>Match</NavLink>
                        <NavLink to="/logout" activeClassName={`${st.active} + ${st.link}`}>Log Out</NavLink>
                        <div className={st.notification}>
                            <img onClick={props.tModal} className={st.logo_ntf}
                                 src="https://smmis.ru/wp-content/uploads/2015/03/uvedomleniya.png" alt='notification'/>
                            <div className={st.count_ntf}><p>{count}</p></div>
                        </div>
                    </div>
                </nav>);
        case (props.auth.login && !props.auth.match):
            return (<nav>
                <div className={st.burger}>
                    <svg onClick={props.tModal2} width="40" height="20" viewBox="0 0 40 20" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <line x1="38" y1="10" x2="2" y2="10" stroke="#7E12B0" strokeOpacity="0.61" strokeWidth="4"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="38" y1="2" x2="2" y2="2" stroke="#7E12B0" strokeOpacity="0.4" strokeWidth="4"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="38" y1="18" x2="2" y2="18" stroke="#7E12B0" strokeWidth="4" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className={st.navlink}>
                <NavLink to="/account" activeClassName={`${st.active} + ${st.link}`}>Account</NavLink>
                <NavLink to="/logout" activeClassName={`${st.active} + ${st.link}`}>Log Out</NavLink>
                </div>
                </nav>);
        default:
            return (<nav/>)
    }
}

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            link: '/',
            match: false,
            client: socket(),
        }
        this.onNotificationReceived = this.onNotificationReceived.bind(this);
        axios.get('/isauth')
            .then(response => {
                this.props.setAuth(response.data)
            })
    }

    componentDidMount() {
        this.state.client.registerNotification(this.onNotificationReceived)
    }
    componentWillUnmount() {
        this.state.client.unregisterNotification();
    }

    onNotificationReceived(entry) {
        if(entry.action === 'match')
        {
            let obj = {
                action : entry.action,
                login : '',
                sender : ''
            };
            if(entry.sender !== this.props.auth._id && entry.recipient === this.props.auth._id)
            {
                obj['sender'] = entry.sender;
                obj['login'] = entry.login;
                this.props.pushNotificationRecipient(obj);
            }
             if(entry.sender === this.props.auth._id && entry.recipient !== this.props.auth._id){
                obj['sender'] = entry.recipient;
                obj['login'] = entry.login2;
                this.props.pushNotificationRecipient(obj);
            }
        }
        else if(entry.sender !== this.props.auth._id && entry.recipient === this.props.auth._id)
            this.props.pushNotificationRecipient(entry);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.auth.match !== this.props.auth.match) {
            axios.get('/isauth')
                .then(response => {
                    this.props.setAuth(response.data)
                })
            axios.get(`/notifications/${this.props.auth._id}`)
                .then(response => {
                    this.props.setNotifications(response.data)
                })
        }
    }

    render() {
        return (
            <div>
                <div className={st.header}>
                    <svg width="164" height="50" viewBox="0 0 164 50" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M34.2943 49.6286L34.1845 31.9688L25.8442 46.1409H20.1376L11.7972 32.5777V49.6286H0V10.8766H10.6449L23.1555 31.5259L35.3368 10.8766H45.9818L46.0915 49.6286H34.2943Z"
                            fill="#7E13B0"/>
                        <path
                            d="M34.2943 38.7519L34.1845 21.0921L25.8442 35.2643H20.1376L11.7972 21.7011V38.7519H0V0H10.6449L23.1555 20.6492L35.3368 0H45.9818L46.0915 38.7519H34.2943Z"
                            fill="#ED8F02"/>
                        <path
                            d="M62.9276 20.1648L67.3105 32.5398L71.6698 20.1648H76.287V37.2273H72.7597V32.5632L73.1112 24.5125L68.5058 37.2273H66.0917L61.498 24.5242L61.8495 32.5632V37.2273H58.3339V20.1648H62.9276ZM89.2011 33.7117H83.037L81.8651 37.2273H78.1269L84.4784 20.1648H87.7362L94.123 37.2273H90.3847L89.2011 33.7117ZM83.9862 30.864H88.2519L86.1073 24.4773L83.9862 30.864ZM107.154 23.0125H101.928V37.2273H98.412V23.0125H93.2558V20.1648H107.154V23.0125ZM122.236 31.5437C122.103 33.3796 121.424 34.825 120.197 35.8796C118.978 36.9343 117.369 37.4617 115.369 37.4617C113.182 37.4617 111.459 36.7273 110.201 35.2586C108.951 33.782 108.326 31.7586 108.326 29.1882V28.1453C108.326 26.5046 108.615 25.0593 109.193 23.8093C109.771 22.5593 110.596 21.6023 111.666 20.9382C112.744 20.2664 113.994 19.9304 115.416 19.9304C117.385 19.9304 118.971 20.4578 120.174 21.5125C121.377 22.5671 122.072 24.0476 122.26 25.9539H118.744C118.658 24.8523 118.35 24.0554 117.818 23.5632C117.295 23.0632 116.494 22.8132 115.416 22.8132C114.244 22.8132 113.365 23.2351 112.779 24.0789C112.201 24.9148 111.904 26.2156 111.889 27.9812V29.2703C111.889 31.114 112.166 32.4617 112.721 33.3132C113.283 34.1648 114.166 34.5906 115.369 34.5906C116.455 34.5906 117.264 34.3445 117.795 33.8523C118.334 33.3523 118.642 32.5828 118.721 31.5437H122.236ZM138.432 37.2273H134.916V29.9148H128.06V37.2273H124.545V20.1648H128.06V27.0789H134.916V20.1648H138.432V37.2273ZM151.357 33.7117H145.193L144.021 37.2273H140.283L146.635 20.1648H149.892L156.279 37.2273H152.541L151.357 33.7117ZM146.142 30.864H150.408L148.264 24.4773L146.142 30.864Z"
                            fill="#ED8F02"/>
                        <path
                            d="M62.9276 20.1648L67.3105 32.5398L71.6698 20.1648H76.287V37.2273H72.7597V32.5632L73.1112 24.5125L68.5058 37.2273H66.0917L61.498 24.5242L61.8495 32.5632V37.2273H58.3339V20.1648H62.9276ZM89.2011 33.7117H83.037L81.8651 37.2273H78.1269L84.4784 20.1648H87.7362L94.123 37.2273H90.3847L89.2011 33.7117ZM83.9862 30.864H88.2519L86.1073 24.4773L83.9862 30.864ZM107.154 23.0125H101.928V37.2273H98.412V23.0125H93.2558V20.1648H107.154V23.0125ZM122.236 31.5437C122.103 33.3796 121.424 34.825 120.197 35.8796C118.978 36.9343 117.369 37.4617 115.369 37.4617C113.182 37.4617 111.459 36.7273 110.201 35.2586C108.951 33.782 108.326 31.7586 108.326 29.1882V28.1453C108.326 26.5046 108.615 25.0593 109.193 23.8093C109.771 22.5593 110.596 21.6023 111.666 20.9382C112.744 20.2664 113.994 19.9304 115.416 19.9304C117.385 19.9304 118.971 20.4578 120.174 21.5125C121.377 22.5671 122.072 24.0476 122.26 25.9539H118.744C118.658 24.8523 118.35 24.0554 117.818 23.5632C117.295 23.0632 116.494 22.8132 115.416 22.8132C114.244 22.8132 113.365 23.2351 112.779 24.0789C112.201 24.9148 111.904 26.2156 111.889 27.9812V29.2703C111.889 31.114 112.166 32.4617 112.721 33.3132C113.283 34.1648 114.166 34.5906 115.369 34.5906C116.455 34.5906 117.264 34.3445 117.795 33.8523C118.334 33.3523 118.642 32.5828 118.721 31.5437H122.236ZM138.432 37.2273H134.916V29.9148H128.06V37.2273H124.545V20.1648H128.06V27.0789H134.916V20.1648H138.432V37.2273ZM151.357 33.7117H145.193L144.021 37.2273H140.283L146.635 20.1648H149.892L156.279 37.2273H152.541L151.357 33.7117ZM146.142 30.864H150.408L148.264 24.4773L146.142 30.864Z"
                            fill="url(#paint0_linear)"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="110.405" y1="15.2273" x2="110.405" y2="45.6819"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#800195"/>
                                <stop offset="0.630208" stopColor="#A64DB5" stopOpacity="0.699297"/>
                                <stop offset="0.9999" stopColor="#ECD9EF" stopOpacity="0.151042"/>
                                <stop offset="1" stopColor="white" stopOpacity="0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <Navigation {...this.props}/>
                </div>
                <div className={st.hr}>
                    <hr/>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        auth: state.auth,
        notifications: state.notifications.notifications,
        viewcount: state.notifications.viewcount,
        count : state.notifications.count
    }
}


export default connect(mapStateToProps, {setAuth, setNotifications,pushNotificationRecipient})(Header);