import React, {Component} from "react";
import {Redirect} from "react-router-dom";


class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            key: window.location.pathname.split("/")[2]
        };
    }

    componentDidMount() {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
        }
        fetch("/verify", {
            method: "post",
            headers: headers,
            body: JSON.stringify(this.state)
        })
    };

    render() {
        return (<Redirect to='/auth'/>);
    }
}

export default Authentication;