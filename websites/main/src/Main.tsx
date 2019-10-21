import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Loader from 'react-loader-spinner';
/*import axios from 'axios';*/

import {Header} from './components/layout/Header';
import Routes from './components/layout/Routes';
/*
import {connect} from "react-redux";
import { authActions } from './utils/actions/authActions';
 */

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faFacebookSquare, faGithub, faYoutube, faReddit, faDiscord
} from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope, faTrophy, faDesktop, faPlay, faUser, faTv, faMedal, faRobot,
    faChessRook, faBullhorn, faUpload, faQuestionCircle, faTicketAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faFacebookSquare, faGithub, faYoutube, faEnvelope, faTrophy,
    faTv, faRobot, faMedal, faDesktop, faPlay, faUser, faChessRook, faReddit,
    faBullhorn, faUpload, faDiscord, faQuestionCircle, faTicketAlt
);
interface MainProps {
    isCheckingAuth: boolean;
    isLoggedOut: boolean;
    isAuthenticated: boolean;
    dispatch: any;
}

interface MainState {
    update?:  boolean;
}

class Main extends Component<MainProps, MainState> {
    private interval: any | null;

    constructor(props){
        super(props);
        this.interval = null;
    }

    render() {
        const isEditor = (window.location.pathname.split("/")[1]==="editor");
        const darkPages = ["/editor", "/editor/", "/events/slt2019", "/events/slt2019/"];
        for (let i = 1; i < 17; i++) {
            darkPages.push("/events/slt2019/battle/" + i)
            darkPages.push("/events/slt2019/battle/" + i + "/")
        }
        if (this.props.isCheckingAuth) {
            return (
                <div className="cont-loader">
                    <Loader
                        type="Triangle"
                        color="#019170"
                        height="100"
                        width="100"
                    />
                </div>
            )
        } else {
            return (
                <div id="main-container">
                    <Header foo={() => false}/>
                    <div className={isEditor ? "main-content no-footer" : "main-content"}>
                        <Route component={Routes}/>
                    </div>
                    { !isEditor ? (null) : null}
                </div>
            )
        }
    }
}

export default withRouter(Main);