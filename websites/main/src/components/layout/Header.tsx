import React, {useEffect, useState} from 'react';
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
                            <Image src="assets/images/logo.png" className="img-responsive inline-block"/>
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
                                        Homepage
                                    </a>
                                </li>
                                <li className="inline-block menu-item-has-children">
                                    <a href="#">
                                        Pages
                                    </a>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="about.html">About</a>
                                        </li>
                                        <li>
                                            <a href="404.html">404</a>
                                        </li>
                                        <li>
                                            <a href="faq.html">FAQ</a>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="team.html">Team</a>
                                            <ul className="sub-menu">
                                                <li>
                                                    <a href="single-team.html">Member profile</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="typography.html">Typography</a>
                                        </li>
                                        <li>
                                            <a href="price.html">Pricing plans</a>
                                        </li>
                                        <li>
                                            <a href="testimonials.html">Testimonials</a>
                                        </li>
										<li>
                                            <a href="statistic.html">Statistic</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="inline-block menu-item-has-children">
                                    <a href="#">
                                        Gallery
                                    </a>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="gallery-regular.html">Gallery Regular</a>
                                        </li>
                                        <li>
                                            <a href="gallery-masonry.html">Gallery Masonry</a>
                                        </li>
                                        <li>
                                            <a href="gallery-full.html">Gallery Fullwidth</a>
                                        </li>
                                        <li>
                                            <a href="gallery-extended.html">Gallery Extended</a>
                                        </li>
                                        <li>
                                            <a href="single-image.html">Single image</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="inline-block menu-item-has-children">
                                    <a href="games.html">
                                        Games
                                    </a>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="single-game.html">Single game</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="inline-block menu-item-has-children">
                                    <a href="#">
                                        Blog
                                    </a>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="blog-full.html">Blog Fullwidth</a>
                                        </li>
                                        <li>
                                            <a href="blog-left.html">Blog Left sidebar</a>
                                        </li>
                                        <li>
                                            <a href="blog-right.html">Blog Right sidebar</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="inline-block">
                                    <a href="contacts.html">
                                        Contacts
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