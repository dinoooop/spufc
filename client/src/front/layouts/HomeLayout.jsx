import { useEffect, useState } from "react";

export default function (props) {
    const [showGoToTop, setShowGoToTop] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowGoToTop(true);
        } else {
            setShowGoToTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="front">
            {props.children}

            {showGoToTop && (
                <div className="scroll-top" onClick={scrollToTop}>
                    <i className="fa-solid fa-circle-up "></i>
                </div>
            )}
        </div>
    );
}