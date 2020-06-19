import React from 'react';
import FormSignup from './auth/form-signup';
import FormSignin from './auth/form-signin';
import {Route, Switch} from "react-router-dom";
import NotFound from "./404/not-found";
import Main from "./main/main";
import Authentication from "./authentication/Authentication";
import FormMail from "./reset-pass/form-mail";
import ResetPass from "./reset-pass/reset-pass";
import Logout from "./logout/logout";

const NoAuthRoute = () => {
    return (
        <Switch>
            <Route exact path='/resetpassword' render={() => <FormMail/>}/>
            <Route exact path='/signup' render={() => <FormSignup/>}/>
            <Route exact path='/auth' render={() => <FormSignin/>}/>
            <Route exact path='/' render={() => <Main/>}/>
            <Route exact path='/auth/:key' render={() => <Authentication/>}/>
            <Route exact path='/reset/:key' render={() => <ResetPass/>}/>
            <Route exact path='/logout' component={Logout}/>
            <Route render={() => <NotFound/>}/>
        </Switch>
    );
};

export default NoAuthRoute;