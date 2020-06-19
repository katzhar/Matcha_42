import React from 'react';
import {Route, Switch} from "react-router-dom";
import NotFound from "./404/not-found";
import Main from "./main/main";
import Authentication from "./authentication/Authentication";
import Logout from "./logout/logout";
import UserChatContainer from "./chat/user-chat-contanier";
import FormMail from "./reset-pass/form-mail";
import ResetPass from "./reset-pass/reset-pass";
import ProfileUserContainer from "./profile/profile-user-container";
import MatchContainer from "./match/match-container";
import Account from "./account/account";
import UserChatNav from "./chat/user-chat-nav";

const PrivRoute = () => {
    return (
        <Switch>
            <Route exact path="/match" render={() => (<MatchContainer/>)}/>
            <Route exact path='/chat' render={() => (<UserChatNav/>)}/>
            <Route exact path='/account' render={() => (<Account/>)}/>
            <Route exact path='/chat/:id/:login' render={() => <UserChatContainer/>}/>
            <Route exact path='/resetpassword' render={() => <FormMail/>}/>
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/profile/:id' render={() => (<ProfileUserContainer/>)}/>
            <Route exact path='/' render={() => <Main/>}/>
            <Route exact path='/auth/:key' render={() => <Authentication/>}/>
            <Route exact path='/reset/:key' render={() => <ResetPass/>}/>
            <Route render={() => <NotFound/>}/>
        </Switch>
    );
};

export default PrivRoute;