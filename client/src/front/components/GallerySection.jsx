import { useEffect, useState } from "react"
import { dummyEvent, sponsersData } from "../../helpers/dummyData"
import useSponsorStore from "../../admin/sponsor/useSponsorStore";
import { Link } from "react-router-dom";
import useEventStore from "../../admin/event/useEventStore";
import "leaflet/dist/leaflet.css";
import { bc } from "../../helpers/bc";
import processData from "../../helpers/processData";
import useGalleryStore from "../../admin/gallery/useGalleryStore";
export default function () {

    const { index } = useGalleryStore()

    const items = [
        {
            name: "sample",
            logo: 'http://127.0.0.1:8800/uploads/1717044305969-571005642.jpg',
            photos: [
                'http://127.0.0.1:8800/uploads/1716983586205-845245176.jpg',
                'http://127.0.0.1:8800/uploads/1717043338836-180953728.jpg',
            ],
        },
        {
            name: "sample",
            logo: 'http://127.0.0.1:8800/uploads/1717042995702-316224608.jpg',
            photos: [
                'http://127.0.0.1:8800/uploads/1717042582723-606718806.jpg',
                'http://127.0.0.1:8800/uploads/1717042931797-934152875.jpg',
            ],
        },

    ]

    const [showSubItems, setShowSubItems] = useState(false)
    const [subItems, setSubItems] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState(null)

    useEffect(() => {
        index()
    }, [])

    const handleSubItems = item => {
        setShowSubItems(true)
        setSubItems(item.photos)
    }

    const handleModal = item => {
        setShowModal(true)
        setModal(item)
    }


    return (
        <>
            <div className="wrapper gallery">
                <h2 className="sub-heading">Galleries</h2>

                <div className="gallery-images">
                    {
                        items.map(item => (
                            <div className="gallery-image" key={item._id} onClick={handleSubItems}>
                                <img src={item.logo} />
                                <h3>{item.name}</h3>
                            </div>
                        ))
                    }
                </div>
                {
                    showSubItems &&
                    <div className="gallery-images">
                        {
                            subItems.map((item, index) => (
                                <div className="gallery-image" key={index} >
                                    <img src={item} onClick={handleModal} />
                                </div>
                            ))
                        }
                    </div>
                }



            </div>
            {
                showModal &&
                <div className="modal">

                    <div className="modal-close-screen" onClick={() => setShowModal(false)}></div>
                    <div className="modal-content scroll">
                        <div className="modal-header">
                            <i className="fa-solid fa-circle-xmark " onClick={() => setShowModal(!showModal)}></i>
                        </div>
                        <div className="row ">
                            <img src={modal} />
                        </div>
                    </div>

                </div>
            }
        </>
    )
}