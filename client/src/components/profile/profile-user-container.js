import ProfileUser from "./profile-user";
import {connect} from "react-redux";
import React from "react";
import * as axios from "axios";
import {toggleIsFetching, setProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import socket from "../../ socket/socket-client";
import history from "../../history";


class ProfileUserComponent extends React.Component {
    state = {
        address: '',
        client: socket(),
    }

    componentDidMount() {
        this._mounted = true;
        let userId = this.props.match.params.id;
        let url = '/?'+ Math.random();
        axios.get(`/profile/${userId}${url}`)
            .then(response => {
                if (!response.data.msg) {
                    if (this._mounted) {
                        this.props.setProfile(response.data)
                        axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${response.data.info.location.lat}&longitude=${response.data.info.location.lng}&localityLanguage=en`)
                            .then(res => {
                                this.setState({address: res.data.locality})
                            })
                        let data = {
                            login: this.props.auth.login,
                            sender: this.props.auth._id,
                            recipient: response.data.info._id,
                            action: 'visit'
                        }
                        this.state.client.notif(data);
                    } else {
                        history.push('/')
                    }
                }
            })
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        return (<ProfileUser address={this.state.address} profile={this.props.profile}
        />)
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        auth: state.auth
    }
}
let WithUrlContainerComponent = withRouter(ProfileUserComponent);

export default connect(mapStateToProps, {setProfile, toggleIsFetching})(WithUrlContainerComponent);