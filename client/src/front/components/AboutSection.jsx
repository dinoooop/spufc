import { Link } from "react-router-dom";
import { dummySettings } from "../../helpers/dummyData"
import DOMPurify from 'dompurify';
import useSettingStore from "../../admin/setting/useSettingStore";
import { useEffect, useState } from "react";

export default function () {
    const { settings } = useSettingStore();
    const [showModal, setShowModal] = useState(false)

    const clean_title = DOMPurify.sanitize(settings.title)
    const clean_description = DOMPurify.sanitize(settings.description)
    const clean_more = DOMPurify.sanitize(settings.more)

    return (
        <div className="wrapper bridge">
            <div className="content">
                <h2 dangerouslySetInnerHTML={{ __html: clean_title }}></h2>
                <p dangerouslySetInnerHTML={{ __html: clean_description }}></p>
                <Link className="fbtn" onClick={() => setShowModal(true)}>View More</Link>
            </div>

            <div className="thumb">
                <img src={settings.file} />
            </div>


            {
                showModal &&
                <div className="modal">

                    <div className="modal-close-screen" onClick={() => setShowModal(false)}></div>
                    <div className="modal-content scroll">
                        <div className="modal-header">
                            <h2>About Us</h2>
                            <i className="fa-solid fa-circle-xmark " onClick={() => setShowModal(false)}></i>
                        </div>
                        
                        <div className="wyswyg" dangerouslySetInnerHTML={{ __html: clean_more }}></div>

                    </div>

                </div>
            }
        </div>
    )
}