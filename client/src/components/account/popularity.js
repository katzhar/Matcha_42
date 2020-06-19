import React, {useEffect, useState} from 'react';
import st from "./account.module.css";
import * as axios from 'axios';

let Likers = (props) => {
    if (props.likers)
        return (props.likers.map((e, i) => {
            return (<div key={i}><a style={{textDecoration: 'none', color: 'rgba(202, 14, 68, 0.8)'}}
                                    href={`/profile/${e._id}`}>{e.login}</a></div>);
        }))
    else {
        return (<></>)
    }
}
let Visitors = (props) => {
    if (props.visitors)
        return (props.visitors.map((e, i) => {
            return (<div key={i}><a style={{textDecoration: 'none', color: 'rgba(202, 14, 68, 0.8)'}}
                                    href={`/profile/${e._id}`}>{e.login}</a></div>);
        }))
    else {
        return (<></>)
    }
}

const Popularity = () => {
    let [popularity, setPopularity] = useState({likers: [], popularity: []});

    useEffect(() => {
        let isMounted = true;
        axios.get('/account/popularity').then((res) => {
            if (isMounted) {
                setPopularity(res.data);
            }
        })
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className={st.account}>
            <div className={st.accountRight}>
                <p>Like you:</p>
                <div className={st.pop}>
                    <Likers likers={popularity.likers}/>
                </div>
                <p>Peeping:</p>
                <div className={st.pop}>
                    <Visitors visitors={popularity.visitors}/>
                </div>
            </div>
        </div>
    );
}
export default Popularity;