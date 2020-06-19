import React, {useEffect} from 'react';
import * as axios from 'axios';
import {setAuth} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import {resetAccount} from "../../redux/account-reducer";
import {setNotifications} from "../../redux/notification-reducer";

let  Logout = (props) => {

   async function getDestroy(){
      await axios.delete(`/logout?_id=${props.id}`);
       props.setAuth({login:"", _id:"", match: false});
       props.resetAccount();
       props.setNotifications({
           notifications: [],
           viewcount : 0
       });
    }

useEffect(()=> {
    if (props.id) {
        getDestroy();
    }
})

        return (<div className='logout'><h1> See you. </h1>
            <Link to='/'><ArrowBackOutlinedIcon/> Go back to main page</Link></div>)
}

let mapStateToProps = (state) => {
    return {id: state.auth._id};
}

export default connect(mapStateToProps, {setAuth,resetAccount,setNotifications})(Logout);