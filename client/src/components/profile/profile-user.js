import React from 'react';
import Preloader from "../common/preloader";
import s from "../match/match.module.css";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

let Gallery = (props) => {
    if (props.profile.gallery)
        return (
            <Carousel arrows dots>
                {props.profile.gallery.map((photo, i) => <img className={s.slider}
                    key={i} src={photo}
                    alt='profile_photo'/>)}
            </Carousel>
        )
    else
        return null;
}

let ProfileUser = (props) => {
    if (!props.profile)
        return <Preloader/>
    return (<div className="profile">
            <div className="up_part">
                <div className={s.profilephoto}>
                    <img src={props.profile.avatar} alt='logo'/>
                </div>
                <div id="about">
                    <h1>{`${props.profile.info.fn} ${props.profile.info.ln}`}</h1>
                    {(props.profile.online.online) ? <p className="online_profile">Online</p> :
                        <p className="offline_profile">Was online at {props.profile.online.lastvisit}</p>}
                    <p>Fame Rating:{props.profile.info.fame_rating}</p>
                    <p>Age:{props.profile.info.age}</p>
                    <p>Address : {props.address}</p>
                    <p>Gender:{props.profile.info.sex}</p>
                    <p> Sex Preference : {props.profile.info.sexpref}</p>
                </div>
            </div>
            <div className="down_part">
                <p>{props.profile.info.bio}</p>
            </div>
            <div>
                <p className="gal">Gallery:</p>
                <Gallery profile={props.profile}/>
            </div>
            <p className='p_tags'>Tags:</p>
            <div className="tags">
                {props.profile.info.tags.map((tag, i) => ((tag !== '') ? <a key={i} href="/">{tag}</a> : null))}
            </div>
        </div>
    )

}

export default ProfileUser;