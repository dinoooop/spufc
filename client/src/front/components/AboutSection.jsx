import { Link } from "react-router-dom";
import { dummySettings } from "../../helpers/dummyData"
import DOMPurify from 'dompurify';
import useSettingStore from "../../admin/setting/useSettingStore";
import { useEffect } from "react";

export default function () {
    const {item, show} = useSettingStore();

    useEffect(() => {
        show()
    }, [])

    console.log(item.title);

    const clean_title = DOMPurify.sanitize(item.title)
    const clean_description = DOMPurify.sanitize(item.description)

    return (
        <div className="wrapper bridge">
            <div className="bridge-text">
                <h2 className="sub-heading" dangerouslySetInnerHTML={{ __html: clean_title }}></h2>
                <p dangerouslySetInnerHTML={{ __html: clean_description }}></p>
                <Link className="fbtn" to="#">View More</Link>
            </div>

            <div className="bridge-image">
                <img src={item.image} />
            </div>
        </div>
    )
}