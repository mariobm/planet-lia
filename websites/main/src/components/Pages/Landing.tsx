import React, { Component } from 'react';
import queryString from 'query-string';
import {RouteComponentProps} from "react-router";
import api from '../../utils/api';

class LandingPage extends Component<RouteComponentProps<any>> {
    constructor(props) {
        super(props);
        this.state = {
            gameId: null,
            showTryNowPopup: false,
            showSubscribePopup: false
        }
    }

    componentDidMount = () => {
        //save invite reference for registration
        const parms = queryString.parse(this.props.location.search);
        if(parms.ref){
            this.saveReference(parms.ref);
        }
    }

    saveReference = async (refUserName) => {
        try {
            const respUserId = await api.user.getUsernameToUserId(refUserName);
            localStorage.setItem("inviteRefUserId", respUserId.userId);
        } catch(err) {
            this.setState({
                error: "Network Error"
            });
            console.log(err.message);
        }
    }

    redirectToLiveDemo = () => {
        window.open("/editor", "_blank");
    }

    redirectToGettingStarted = () => {
        window.open("https://docs.liagame.com/", "_blank");
    }

    onPopupClose = () => {
        this.setState({
            showTryNowPopup: false,
            showSubscribePopup: false
        });
    }

    render() {
        return (
            <section className="game-section pt150 pb85">
                <div className="container">
                    <div className="row">
                        <div className="title-bl text-center wow fadeIn" data-wow-duration="2s">
                            <div className="title color-white">
                                UpComing Games:
                            </div>
                            <div className="subtitle">
                                Coming soon
                            </div>
                        </div>
                        <div className="tm-tabs tabs mt70">
                            <div className="tab-content relative mt90">
                                <div className="tab-pane fade active in text-left clearfix" id="tab-item-1">
                                    <div
                                        className="tab-info col-lg-6 col-md-12 col-sm-12 col-xs-12 ptb90 pl100 equal-height">
                                        <div className="tab-head table uppercase fsize-14 fweight-700">
                                            <div className="table-cell valign-middle ws-20 color-1">
                                                New games action
                                            </div>
                                            <div className="table-cell valign-middle text-right">
                                                Apr 25-27, 2018
                                            </div>
                                        </div>
                                        <div
                                            className="uppercase fsize-32 fweight-700 font-agency color-white lheight-normal">
                                            Fifal 2018
                                        </div>
                                        <div className="mt50 lheight-26 fweight-300">
                                            <p>Andouille frankfurter hamburger, swine leberkas tenderloin cupim. Ground
                                                round ball tip
                                                pastrami, turducken chicken porchetta fatback frankfurter. Pig kielbasa
                                                jowl strip.</p>
                                            <p>Steak sausage pork loin bacon tri-tip meatball shoulder cupim beef pork
                                                chop kevin boudin.
                                                Short loin pig meatball ham landjaeger pastrami. Drumstick ham hock
                                                chuck pork belly
                                                chicken prosciutto biltong salami ham pancetta.</p>
                                        </div>
                                        <div className="mt60 table g-bottom">
                                            <div className="table-cell valign-middle">
                                                <a href="single-game.html"
                                                   className="btn gradient color-white plr60 ptb19">
                                                    Read more
                                                </a>
                                            </div>
                                            <div className="rating table-cell valign-middle text-right">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-img col-lg-6 col-md-12 col-sm-12 col-xs-12 pr0 equal-height"
                                         style={{height: "613.667px"}}>
                                        <div className="image-bl">
                                            <img className="game-full-img" src="../assets/images/game-slide-img-1.jpg"
                                                 />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade in text-left clearfix" id="tab-item-2">
                                    <div
                                        className="tab-info col-lg-6 col-md-12 col-sm-12 col-xs-12 ptb90 pl100 equal-height"
                                        style={{height: "613.667px"}}>
                                        <div className="tab-head table uppercase fsize-14 fweight-700">
                                            <div className="table-cell valign-middle ws-20 color-1">
                                                New games action
                                            </div>
                                            <div className="table-cell valign-middle text-right">
                                                Apr 25-27, 2018
                                            </div>
                                        </div>
                                        <div
                                            className="uppercase fsize-32 fweight-700 font-agency color-white lheight-normal">
                                            Mix Combination
                                        </div>
                                        <div className="mt50 lheight-26 fweight-300">
                                            <p>Andouille frankfurter hamburger, swine leberkas tenderloin cupim. Ground
                                                round ball tip
                                                pastrami, turducken chicken porchetta fatback frankfurter. Pig kielbasa
                                                jowl strip.</p>
                                            <p>Steak sausage pork loin bacon tri-tip meatball shoulder cupim beef pork
                                                chop kevin boudin.
                                                Short loin pig meatball ham landjaeger pastrami. Drumstick ham hock
                                                chuck pork belly
                                                chicken prosciutto biltong salami ham pancetta.</p>
                                        </div>
                                        <div className="mt60 table g-bottom">
                                            <div className="table-cell valign-middle">
                                                <a href="single-game.html"
                                                   className="btn gradient color-white plr60 ptb19">
                                                    Read more
                                                </a>
                                            </div>
                                            <div className="rating table-cell valign-middle text-right">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-img col-lg-6 col-md-12 col-sm-12 col-xs-12 pr0 equal-height" style={{height: "613.667px"}}>
                                        <div className="image-bl">
                                            <img className="game-full-img" src="../assets/images/game-slide-img-1.jpg"
                                                 alt={""}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade in text-left clearfix" id="tab-item-3">
                                    <div
                                        className="tab-info col-lg-6 col-md-12 col-sm-12 col-xs-12 ptb90 pl100 equal-height"
                                        style={{height: "613.667px"}}>
                                        <div className="tab-head table uppercase fsize-14 fweight-700">
                                            <div className="table-cell valign-middle ws-20 color-1">
                                                New games action
                                            </div>
                                            <div className="table-cell valign-middle text-right">
                                                Apr 25-27, 2018
                                            </div>
                                        </div>
                                        <div
                                            className="uppercase fsize-32 fweight-700 font-agency color-white lheight-normal">
                                            Forza Jacson
                                        </div>
                                        <div className="mt50 lheight-26 fweight-300">
                                            <p>Andouille frankfurter hamburger, swine leberkas tenderloin cupim. Ground
                                                round ball tip
                                                pastrami, turducken chicken porchetta fatback frankfurter. Pig kielbasa
                                                jowl strip.</p>
                                            <p>Steak sausage pork loin bacon tri-tip meatball shoulder cupim beef pork
                                                chop kevin boudin.
                                                Short loin pig meatball ham landjaeger pastrami. Drumstick ham hock
                                                chuck pork belly
                                                chicken prosciutto biltong salami ham pancetta.</p>
                                        </div>
                                        <div className="mt60 table g-bottom">
                                            <div className="table-cell valign-middle">
                                                <a href="single-game.html"
                                                   className="btn gradient color-white plr60 ptb19">
                                                    Read more
                                                </a>
                                            </div>
                                            <div className="rating table-cell valign-middle text-right">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-img col-lg-6 col-md-12 col-sm-12 col-xs-12 pr0 equal-height"
                                         style={{height: "613.667px"}}>
                                        <div className="image-bl">
                                            <img className="game-full-img" src="../assets/images/game-slide-img-1.jpg"
                                                 alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade in text-left clearfix" id="tab-item-4">
                                    <div
                                        className="tab-info col-lg-6 col-md-12 col-sm-12 col-xs-12 ptb90 pl100 equal-height"
                                        style={{height: "613.667px"}}>
                                        <div className="tab-head table uppercase fsize-14 fweight-700">
                                            <div className="table-cell valign-middle ws-20 color-1">
                                                New games action
                                            </div>
                                            <div className="table-cell valign-middle text-right">
                                                Apr 25-27, 2018
                                            </div>
                                        </div>
                                        <div
                                            className="uppercase fsize-32 fweight-700 font-agency color-white lheight-normal">
                                            NO MAN’S SKY
                                        </div>
                                        <div className="mt50 lheight-26 fweight-300">
                                            <p>Andouille frankfurter hamburger, swine leberkas tenderloin cupim. Ground
                                                round ball tip
                                                pastrami, turducken chicken porchetta fatback frankfurter. Pig kielbasa
                                                jowl strip.</p>
                                            <p>Steak sausage pork loin bacon tri-tip meatball shoulder cupim beef pork
                                                chop kevin boudin.
                                                Short loin pig meatball ham landjaeger pastrami. Drumstick ham hock
                                                chuck pork belly
                                                chicken prosciutto biltong salami ham pancetta.</p>
                                        </div>
                                        <div className="mt60 table g-bottom">
                                            <div className="table-cell valign-middle">
                                                <a href="single-game.html"
                                                   className="btn gradient color-white plr60 ptb19">
                                                    Read more
                                                </a>
                                            </div>
                                            <div className="rating table-cell valign-middle text-right">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-img col-lg-6 col-md-12 col-sm-12 col-xs-12 pr0 equal-height"
                                         style={{height: "613.667px"}}>
                                        <div className="image-bl">
                                            <img className="game-full-img" src="../assets/images/game-slide-img-1.jpg"
                                                 />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade in text-left clearfix" id="tab-item-5">
                                    <div
                                        className="tab-info col-lg-6 col-md-12 col-sm-12 col-xs-12 ptb90 pl100 equal-height"
                                        style={{height: "613.667px"}}>
                                        <div className="tab-head table uppercase fsize-14 fweight-700">
                                            <div className="table-cell valign-middle ws-20 color-1">
                                                New games action
                                            </div>
                                            <div className="table-cell valign-middle text-right">
                                                Apr 25-27, 2018
                                            </div>
                                        </div>
                                        <div
                                            className="uppercase fsize-32 fweight-700 font-agency color-white lheight-normal">
                                            NO MAN’S SKY 2
                                        </div>
                                        <div className="mt50 lheight-26 fweight-300">
                                            <p>Andouille frankfurter hamburger, swine leberkas tenderloin cupim. Ground
                                                round ball tip
                                                pastrami, turducken chicken porchetta fatback frankfurter. Pig kielbasa
                                                jowl strip.</p>
                                            <p>Steak sausage pork loin bacon tri-tip meatball shoulder cupim beef pork
                                                chop kevin boudin.
                                                Short loin pig meatball ham landjaeger pastrami. Drumstick ham hock
                                                chuck pork belly
                                                chicken prosciutto biltong salami ham pancetta.</p>
                                        </div>
                                        <div className="mt60 table g-bottom">
                                            <div className="table-cell valign-middle">
                                                <a href="single-game.html"
                                                   className="btn gradient color-white plr60 ptb19">
                                                    Read more
                                                </a>
                                            </div>
                                            <div className="rating table-cell valign-middle text-right">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-img col-lg-6 col-md-12 col-sm-12 col-xs-12 pr0 equal-height"
                                         style={{height: "613.667px"}}>
                                        <div className="image-bl">
                                            <img className="game-full-img" src="../assets/images/game-slide-img-1.jpg"
                                                 alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }

}

export default LandingPage;