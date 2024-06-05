import { Link } from "react-router-dom";
import useSettingStore from "../../admin/setting/useSettingStore";

export default function ({ showPhone = false }) {

    const { settings } = useSettingStore();
    
    return (

        <ul>
            {
                settings.phone && showPhone &&
                <li style={{ "marginRight": "auto" }}><i className="fa-solid fa-phone"></i> {settings.phone}</li>
            }
            {
                settings.facebook &&
                <li><Link to={settings.facebook} target="_blank"><i className="fa-brands fa-square-facebook"></i></Link></li>
            }
            {
                settings.instagram &&
                <li><Link to={settings.instagram} target="_blank"><i className="fa-brands fa-square-instagram"></i></Link></li>
            }
            {
                settings.instagram &&
                <li><Link to={`mailto:${settings.email}`} ><i className="fa-solid fa-envelope"></i></Link></li>
            }
        </ul>

    )
}