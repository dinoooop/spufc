import { Link } from "react-router-dom";
import { dummySettings } from "../../helpers/dummyData"
import DOMPurify from 'dompurify';
import useSettingStore from "../../admin/setting/useSettingStore";
import { useEffect, useState } from "react";

export default function () {
    const { item } = useSettingStore();
    const [showModal, setShowModal] = useState(false)

    const clean_title = DOMPurify.sanitize(item.title)
    const clean_description = DOMPurify.sanitize(item.description)
    const clean_more = DOMPurify.sanitize(item.more)

    return (
        <div className="wrapper bridge">
            <div className="content">
                <h2 className="sub-heading" dangerouslySetInnerHTML={{ __html: clean_title }}></h2>
                <p dangerouslySetInnerHTML={{ __html: clean_description }}></p>
                <Link className="fbtn" onClick={() => setShowModal(true)}>View More</Link>
            </div>

            <div className="thumb">
                <img src={item.file} />
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