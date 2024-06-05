import { Link } from "react-router-dom";
import { dummySettings } from "../../helpers/dummyData"
import DOMPurify from 'dompurify';
import useSettingStore from "../../admin/setting/useSettingStore";
import { useEffect, useState } from "react";

export default function ({heading}) {
    const { settings } = useSettingStore();
    const [showModal, setShowModal] = useState(false)

    const clean_title = DOMPurify.sanitize(settings.title)
    const clean_description = DOMPurify.sanitize(settings.description)
    const clean_more = DOMPurify.sanitize(settings.more)

    return (

        <div className="modal">

            <div className="modal-close-screen" onClick={() => setShowModal(false)}></div>
            <div className="modal-content scroll">
                <div className="modal-header">
                    <h2>{heading}</h2>
                    <i className="fa-solid fa-circle-xmark " onClick={() => setShowModal(false)}></i>
                </div>

                <div className="wyswyg" dangerouslySetInnerHTML={{ __html: clean_more }}></div>

            </div>

        </div>

    )
}