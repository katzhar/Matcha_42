import React from 'react';
import {Route, Switch} from "react-router-dom";
import NotFound from "./404/not-found";
import Main from "./main/main";
import Authentication from "./authentication/Authentication";
import Logout from "./logout/logout";
import FormMail from "./reset-pass/form-mail";
import ResetPass from "./reset-pass/reset-pass";
import Account from "./account/account";

const AuthRoute = () => {
    return (
        <Switch>
            <Route exact path='/account' render={() => (<Account/>)}/>
            <Route exact path='/resetpassword' render={() => <FormMail/>}/>
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/' render={() => <Main/>}/>
            <Route exact path='/auth/:key' render={() => <Authentication/>}/>
            <Route exact path='/reset/:key' render={() => <ResetPass/>}/>
            <Route render={() => <NotFound/>}/>
        </Switch>
    );
};

export default AuthRoute;