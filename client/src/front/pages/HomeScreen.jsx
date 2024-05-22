import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { useSelector } from "react-redux";
import { Link as ScrollLink, Element } from 'react-scroll';
import { useEffect, useState } from "react";
import EnquirySection from "../components/EnquirySection";

export default function () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const year = new Date().getFullYear();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <HomeLayout>
            <section className="social-media">
                <div className="wrapper">
                    <ul>
                        <li><Link to="https://www.facebook.com/southperthfc/" target="_blank"><i class="fa-brands fa-square-facebook"></i></Link></li>
                        <li><Link to="https://www.instagram.com/spufc/" target="_blank"><i class="fa-brands fa-square-instagram"></i></Link></li>
                        <li><Link to="mailto:juniors@southperthunitedfc.com.au"><i class="fa-solid fa-envelope"></i></Link></li>
                    </ul>
                </div>
            </section>

            <section className="header">
                <div className="front-topnav wrapper">
                    <div className="logo">
                        <Link to="/"><img src="/images/logo.png" /></Link>
                    </div>
                    <ul className={`nav ${isMenuOpen ? 'open' : ''}`}>

                        <li className="nav-item">
                            <ScrollLink to="about" smooth={true} duration={500} onClick={toggleMenu}>About</ScrollLink>
                            <ul className="subnav">
                                <li><ScrollLink to="hire" smooth={true} duration={500} onClick={toggleMenu}>Hire</ScrollLink></li>
                                <li><ScrollLink to="sustainability" smooth={true} duration={500} onClick={toggleMenu}>Sustainability</ScrollLink></li>
                            </ul>
                        </li>
                        <li className="nav-item"><ScrollLink to="sponsers" smooth={true} duration={500} onClick={toggleMenu}>Sponsers</ScrollLink></li>
                        <li className="nav-item"><ScrollLink to="shop" smooth={true} duration={500} onClick={toggleMenu}>Shop</ScrollLink></li>
                        <li className="nav-item"><ScrollLink to="events" smooth={true} duration={500} onClick={toggleMenu}>Events</ScrollLink></li>
                    </ul>
                    <div className="menu-icon" onClick={toggleMenu}>
                        {
                            isMenuOpen
                                ? ''
                                : <i class="fa-solid fa-bars"></i>
                        }
                    </div>
                </div>
                {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
            </section>

            <section className="banner">
                <img src="./images/banner.JPG" />
            </section>

            <Element name="about" className="part part-sky">
                <div className="wrapper bridge">
                    <div className="bridge-text">
                        <h2 className="sub-heading"><strong>SOUTH PERTH UNITED</strong> FOOTBALL CLUB</h2>
                        <p>The South Perth United Football Club was formed in 1981 with an initial membership of just 20 members. From our humble beginnings, we have grown in line with the phenomenal growth in the popularity of the sport of soccer itself in Australia. In fact, the growth in the club’s player membership has even accelerated over the last five years, where membership approaches 250 including seniors and juniors.</p>
                        <Link className="fbtn" to="#">View More</Link>
                    </div>

                    <div className="bridge-image">
                        <img src="/images/sven-kucinic-Z0KjmjxUsKs-unsplash.jpg" />
                    </div>
                </div>
            </Element>

            <Element name="sponsers" className="part part-white">
                <div className="wrapper badges">
                    <h2 className="sub-heading">SPONSORS</h2>
                    <h2 className="sub-sub-heading">GOLD</h2>
                    <div className="badge-collection">
                        <div className="badge-image">
                            <img src="/images/sponsers/beaufort.jpg" />
                        </div>
                        <div className="badge-image">
                            <img src="/images/sponsers/hpright-1.jpg" />
                        </div>
                        <div className="badge-image">
                            <img src="/images/sponsers/signhere-logo.jpg" />
                        </div>
                    </div>
                    <h2 className="sub-sub-heading">SILVER</h2>
                    <div className="silver-collection">
                        <img src="/images/sponsers/thai-orchid-logo.jpg" />
                        <img src="/images/sponsers/cullen-co-logo.jpg" />
                        <img src="/images/sponsers/perthwellness.jpg" />
                        <img src="/images/sponsers/logo-pegasus.jpg" />
                        <img src="/images/sponsers/lyan.jpg" />
                    </div>

                </div>
            </Element>

            <Element name="shop" className="part part-sky">
                <div className="wrapper drone">
                    <div className="drone-image">
                        <img src="/images/merchant.png" />
                    </div>
                    <div className="drone-text">
                        <h2 className="sub-heading">BUY MERCHANDISE</h2>
                        <Link className="fbtn fbtn-big" target="_blank" to="https://clubshop.macron.com/perth/south-perth-united/merchandising">SHOP</Link>
                    </div>
                </div>
            </Element>

            <Element name="events" className="part part-white">
                <div className="wrapper gallery">
                    <h2 className="sub-heading">EVENTS</h2>
                    <div className="gallery-images">
                        <div className="gallery-image"><img src="/images/gallery/257452641_3161556570731867_2662264097425203818_n.jpg" /></div>
                        <div className="gallery-image"><img src="/images/gallery/257420091_3161553517398839_553132077215824615_n.jpg" /></div>
                        <div className="gallery-image"><img src="/images/gallery/257368378_3161556647398526_1757375925250370273_n.jpg" /></div>
                        <div className="gallery-image"><img src="/images/gallery/245093245_3134035143484010_5080014933652872975_n.jpg" /></div>
                        <div className="gallery-image"><img src="/images/gallery/244724497_3134034420150749_878775198806294466_n-1.jpg" /></div>
                        <div className="gallery-image"><img src="/images/gallery/244660721_3134035120150679_6969282931110061514_n.jpg" /></div>
                    </div>
                    <Link className="fbtn fbtn-big" to="#">BOOK NOW</Link>
                </div>
            </Element>

            <Element name="enquiry" className="part part-sky">
                <EnquirySection />
            </Element>

            <Element name="enquiry" className="part part-black">
                <div className="wrapper footer">
                    <div className="pockets">
                        <div className="pocket">
                            <h3>Contact</h3>
                            <p>
                                South Perth United Football Club. <br />
                                Challenger Reserve,<br />
                                Challenger Avenue,<br />
                                Manning,<br />
                                WA 6152<br />
                            </p>
                        </div>
                        <div className="pocket">
                            <h3>Club Constitution </h3>
                            <ul>
                                <li><Link to="https://www.theifab.com/laws/latest/about-the-laws" target="_blank">Laws of the Game</Link></li>
                                <li><Link to="https://www.footballwest.com.au/play/resources" target="_blank">Status and regulations</Link></li>
                                <li><Link to="https://www.footballwest.com.au/inside-fw/resources" target="_blank">Constitution of FFA and Football West</Link></li>
                                <li>Join now for 2022 season u6-u7</li>
                            </ul>
                        </div>
                        <div className="pocket">
                            <h3>Conduct Policy</h3>
                            <ul>
                                <li>Registrations</li>
                                <li>Philosophy and code of conduct</li>
                                <li>Photography Consent Form</li>
                                <li>Be a Major Sponsor</li>
                                <li>Terms and Conditions</li>
                                <li>Privacy</li>
                                <li>FFA Insurance</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-social">
                        <ul>
                            <li><Link to="https://www.facebook.com/southperthfc/" target="_blank"><i class="fa-brands fa-square-facebook"></i></Link></li>
                            <li><Link to="https://www.instagram.com/spufc/" target="_blank"><i class="fa-brands fa-square-instagram"></i></Link></li>
                            <li><Link to="mailto:juniors@southperthunitedfc.com.au"><i class="fa-solid fa-envelope"></i></Link></li>
                        </ul>
                    </div>
                    <p className="copyright">&copy; {year} South Perth United Football Club. All Rights Reserved. Powered By <Link target="_blank" to="https://www.hellopeople.com.au">Hello People</Link></p>
                </div>
            </Element>
        </HomeLayout>
    )
}
