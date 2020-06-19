import {connect} from "react-redux";
import {
    block,
    dislike,
    like,
    setCurrentPageFilter,
    setFilter,
    setUsers,
    toggleIsFetching
} from "../../redux/matcha-reducer";
import * as React from "react";
import s from './match-nav.module.css'
import * as axios from "axios";
import Match from "./Match";
import Preloader from "../common/preloader";
import socket from "../../ socket/socket-client";


class MatchAPI extends React.Component {
    state = {
        client: socket(),
    }

    componentDidMount() {
        this._mounted = true;
        this.props.toggleIsFetching(true);

        axios.post("match/filter", this.props.filterMatch)
            .then(response => {
                if(this._mounted) {
                    this.props.toggleIsFetching(false);
                    this.setState({preloader: false})
                    this.props.setUsers(response.data)
                }
            });
    }
    componentWillUnmount() {
        this._mounted = false;
    }

    likeAPI = (id, login) => {
        this.props.like(id);
        axios.get(`/match/action?_id=${id}&like=true`)
        let data = {
            login2: login,
            login: this.props.auth.login,
            sender: this.props.auth._id,
            recipient: id,
            action: 'like'
        }
        this.state.client.notif(data);
    }
    dislikeAPI = (id) => {
        this.props.dislike(id);
        axios.get(`/match/action?_id=${id}&dislike=true`)
        let data = {
            login: this.props.auth.login,
            sender: this.props.auth._id,
            recipient: id,
            action: 'dislike'
        }
        this.state.client.notif(data);
    }

    reportAPI = (id) => {
        axios.get(`/match/action?_id=${id}&report=true`)
    }

    blockAPI = (id) => {
        this.props.block(id);
        axios.get(`/match/action?_id=${id}&block=true`)
    }

    onPageChange = (numberPage) => {
        this.props.setCurrentPageFilter(numberPage);
        this.props.toggleIsFetching(true);
        axios.post("match/filter", {...this.props.filterMatch, page: numberPage})
            .then(response => {
                this.props.toggleIsFetching(false);
                this.setState({preloader: false})
                this.props.setUsers(response.data)
            });
    }

    render() {
        return <div className={s.preloader}>
            {this.props.isFetching ? <Preloader/> : null}
            <Match totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   onPageChange={this.onPageChange}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   likeAPI={this.likeAPI}
                   dislikeAPI={this.dislikeAPI}
                   blockAPI={this.blockAPI}
                   reportAPI={this.reportAPI}
                   setUsers={this.props.setUsers}
            />
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        filterMatch: state.matchaPage.filterMatch,
        users: state.matchaPage.users,
        pageSize: state.matchaPage.pageSize,
        totalUsersCount: state.matchaPage.totalUsersCount,
        currentPage: state.matchaPage.currentPage,
        isFetching: state.matchaPage.isFetching,
        auth: state.auth
    }
}

export default connect(mapStateToProps, {
    like,
    dislike,
    block,
    setUsers,
    setFilter,
    setCurrentPageFilter,
    toggleIsFetching,
})(MatchAPI);