import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Header from './header/header';
import Notification from "./notification/notification"
import {connect} from "react-redux";
import {setAuth} from "../redux/auth-reducer";
import NavBurger from "./header/navburger";
import AuthRoute from "./AuthRoute";
import NoAuthRoute from "./NoAuthRoute";
import PrivRoute from "./PrivRoute";

let App = (props) => {
    let [isModalOpen, setisModal] = useState(false);
    let [isModal2Open, setisModal2] = useState(false);

    let toggleModal = () => {
        setisModal(!isModalOpen);
    };

    let toggleModal2 = () => {
        setisModal2(!isModal2Open);
    };

    return (
        <div>
            {isModalOpen &&
            ReactDOM.createPortal(<Notification tModal={toggleModal}/>, document.getElementById('portal'))}
            {isModal2Open &&
            ReactDOM.createPortal(<NavBurger tModal2={toggleModal2}/>, document.getElementById('portal2'))}
            <Header tModal2={toggleModal2} tModal={toggleModal}/>
            <div className="app-content">
                {(props.auth.login) ? (props.auth.match) ? <PrivRoute/> : <AuthRoute/> : <NoAuthRoute/>}
            </div>
        </div>

    );
}
let mapStateToProps = (state) => {
    return {auth: state.auth}
}

export default connect(mapStateToProps, {setAuth})(App);
