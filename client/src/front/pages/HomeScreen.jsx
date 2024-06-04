import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { Link as ScrollLink, Element } from 'react-scroll';
import { useEffect, useState } from "react";
import EnquirySection from "../components/EnquirySection";

import BannerSection from "../components/BannerSection";
import SponserSection from "../components/SponserSection";
import SocialSection from "../components/SocialSection";
import AboutSection from "../components/AboutSection";
import useSettingStore from "../../admin/setting/useSettingStore";
import useAuthStore from "../../admin/auth/useAuthStore";
import EventSection from "../components/EventSection";
import GallerySection from "../components/GallerySection";

export default function () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuthStore()

    const { show, item, store, error } = useSettingStore()    
    const year = new Date().getFullYear();

    useEffect(() => {
        show()
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <HomeLayout>
            <section className="social-media-band">
                <div className="wrapper">
                    <SocialSection showPhone={true} />
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
                        <li className="nav-item"><ScrollLink to="gallery" smooth={true} duration={500} onClick={toggleMenu}>Gallery</ScrollLink></li>
                        {
                            user
                                ? <li className="nav-item"><Link to="/admin/sponsors">Dashboard</Link></li>
                                : <li className="nav-item"><Link to="/login">Login</Link></li>
                        }
                    </ul>
                    <div className="menu-icon" onClick={toggleMenu}>
                        {
                            isMenuOpen
                                ? ''
                                : <i className="fa-solid fa-bars"></i>
                        }
                    </div>
                </div>
                {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
            </section>

            

            <section className="banner">
                <BannerSection />
            </section>

            <Element name="about" className="part part-sky">
                <AboutSection />
            </Element>

            <Element name="sponsers" className="part part-white">
                <SponserSection />
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
                <EventSection />
            </Element>

            <section name="gallery" className="part part-sky">
                <GallerySection />
            </section>

            <Element name="enquiry" className="part part-white">
                <EnquirySection />
            </Element>

            <div className="part part-black">
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
                        <SocialSection />
                    </div>
                    <p className="copyright">&copy; {year} South Perth United Football Club. All Rights Reserved. Powered By <Link target="_blank" to="https://www.hellopeople.com.au">Hello People</Link></p>
                </div>
            </div>
        </HomeLayout>
    )
}
