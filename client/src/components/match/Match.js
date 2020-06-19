import React from "react";
import s from "./match.module.css";
import MatchNav from "./match-nav";
import Button from "@material-ui/core/Button";

let Match = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++)
        pages.push(i);

    return (
        <div className={s.match}>
            <MatchNav setUsers={props.setUsers} setFilter={props.setFilter}/>
            <div className={s.users}>
                <div className={s.page}>
                    {pages.map((p, i) => {
                        return (<p key={i} className={(props.currentPage === p) ? s.selectPage : undefined}
                                   onClick={() => props.onPageChange(p)}>{p}</p>)
                    })}
                </div>
                <div className={s.users}>
                    {props.users.map((u, i) => {
                        if (!u.info.block)
                            return (<div key={i} className={s.user}>
                                <div className={s.userphoto}>
                                    <a rel="noopener noreferrer" href={`/profile/${u.info._id}`}><img
                                        alt='userphoto'
                                        src={u.avatar || 'https://memepedia.ru/wp-content/uploads/2018/01/94e-%E2%80%94-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg'}/></a>
                                </div>
                                <div className={s.about}>
                                    <div className={s.bio}>
                                        <b>{`${u.info.login},${u.info.age}`}</b>
                                        <p className={s.infobio}>{u.info.bio}</p>
                                            <p className={s.fame}>{`Fame rating: ${u.info.fame_rating}`}</p>
                                    </div>
                                    <div>
                                        {u.info.tags.map((tag,i)=>{
                                            return(<span className={s.tags} key={i}>#{tag} </span>)
                                        })}
                                    </div>
                                </div>
                                <div className={s.matchbtn}>
                                    <div className={s.choiceno}>
                                        <Button onClick={() => (props.blockAPI(u.info._id))}>Block</Button>
                                    </div>
                                    <div className={s.choiceyes}>
                                        {(u.info.like) ?
                                            <Button
                                                onClick={() => (props.dislikeAPI(u.info._id))}>Dislike</Button> :
                                            <Button
                                                onClick={() => (props.likeAPI(u.info._id,u.info.login))}>Like</Button>}
                                    </div>
                                    <div className={s.report}>
                                        <Button onClick={() => (props.reportAPI(u.info._id))}>Report</Button>
                                    </div>
                                </div>
                            </div>)
                        return (<br key={i} />)
                    })}
                </div>
            </div>
        </div>)
}
export default Match;