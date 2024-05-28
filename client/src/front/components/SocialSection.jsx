import { Link } from "react-router-dom";

export default function ({ showPhone = false }) {

    const item = {
        facebook: 'https://www.facebook.com/southperthfc/',
        instagram: "https://www.instagram.com/spufc/",
        email: 'juniors@southperthunitedfc.com.au',
        phone: "+22 456 899",
        // title: item.title,
        // description: item.description,
        // image: item.image,
        // side: item.side,
    };
    return (

        <ul>
            {
                item.phone && showPhone &&
                <li style={{ "marginRight": "auto" }}><i className="fa-solid fa-phone"></i> {item.phone}</li>
            }
            {
                item.facebook &&
                <li><Link to={item.facebook} target="_blank"><i className="fa-brands fa-square-facebook"></i></Link></li>
            }
            {
                item.instagram &&
                <li><Link to={item.instagram} target="_blank"><i className="fa-brands fa-square-instagram"></i></Link></li>
            }
            {
                item.instagram &&
                <li><Link to={`mailto:${item.email}`} ><i className="fa-solid fa-envelope"></i></Link></li>
            }
        </ul>

    )
}