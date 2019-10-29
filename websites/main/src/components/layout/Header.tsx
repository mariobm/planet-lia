import React, {useEffect, useState} from 'react';
import logo from "../../assets/images/logo.png";
import "../../assets/scss/responsive.scss";
import "../../assets/scss/style.scss";
import {Button, Image} from "react-bootstrap";

export function Header(props) {
    const [position, setPosition] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll)
    }, []);

    const listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrolled = winScroll / height;

        setPosition(scrolled);
    };

    return(
        <div id="header-sticky" className={"header-line-wrapper" + ((position > 0.2) ? " affix-top" : "")}>
        <header className="header-wrapper fixed-top plr100">
            <div className="table height-100p">
                <div className="table-row">
                    <div className="table-cell valign-middle text-left">
                        <a href="index.html" className="logo">
                            <Image src={logo} className="img-responsive inline-block"/>
                        </a>
                    </div>
                    <div className="table-cell valign-top text-center vm-sm">
                        <div className="main-menu">
                            <span className="toggle_menu">
                                <span></span>
                            </span>
                            <ul className="menu clearfix">
                                <li className="inline-block active">
                                    <a href="index.html">
                                        Games
                                    </a>
                                </li>
                                <li className="inline-block">
                                    <a href="index.html">
                                        Tournaments
                                    </a>
                                </li>
                                <li className="inline-block">
                                    <a href="index.html">
                                        Community
                                    </a>
                                </li>
                                <li className="inline-block">
                                    <a href="index.html">
                                        Contribute
                                    </a>
                                </li>
                                <li className="inline-block">
                                    <a href="index.html">
                                        About
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="table-cell valign-top text-right">
                        <div className="right-bl">
                            <div className="btn-head inline-block valign-middle">
                            <Button href="#" className="btn header-btn ml25 color-white hidden-sm hidden-xs">
                                Join us Now
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
    )
}