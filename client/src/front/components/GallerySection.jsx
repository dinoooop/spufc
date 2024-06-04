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
            name: "Juniors Awards Day",
            logo: 'http://127.0.0.1:8800/uploads/1717044305969-571005642.jpg',
            photos: [
                'http://127.0.0.1:8800/uploads/1716983586205-845245176.jpg',
                'http://127.0.0.1:8800/uploads/1717043338836-180953728.jpg',
            ],
        },
        {
            name: "Sponsors Event",
            logo: 'http://127.0.0.1:8800/uploads/1717042995702-316224608.jpg',
            photos: [
                'http://127.0.0.1:8800/uploads/1717058296607-805663078.jpg',
                'http://127.0.0.1:8800/uploads/1717042931797-934152875.jpg',
                'http://127.0.0.1:8800/uploads/1717052091694-953704298-256793746_3161554944065363_3197786348402462677_n.jpg',
            ],
        },

    ]

    const [showSubPage, setShowSubPage] = useState(false)
    const [showMainPage, setShowMainPage] = useState(true)
    const [subItems, setSubItems] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState(null)
    const [photoIndex, setPhotoIndex] = useState(null)

    useEffect(() => {
        index()
    }, [])

    const goToMainPage = item => {
        setShowMainPage(true)
        setShowSubPage(false)
        setSubItems([])
    }

    const goToSubPage = item => {
        setShowMainPage(false)
        setShowSubPage(true)
        setSubItems(item)
    }

    const handleModal = index => {
        setShowModal(true)
        setPhotoIndex(index)

        if (typeof subItems.photos[index] !== 'undefined') {
            setModal(subItems.photos[index])
        }
    }

    const modalRight = () => {
        const nextIndex = photoIndex + 1;
        if (typeof subItems.photos[nextIndex] !== 'undefined') {
            setModal(subItems.photos[nextIndex])
            setPhotoIndex(nextIndex)

        }
    }

    const modalLeft = () => {
        const nextIndex = photoIndex - 1;
        if (typeof subItems.photos[nextIndex] !== 'undefined') {
            setModal(subItems.photos[nextIndex])
            setPhotoIndex(nextIndex)

        }
    }


    return (
        <>
            <div className="wrapper gallery">
                <h2 className="sub-heading">Gallery</h2>
                <div className="gallery-breadcrumbs">
                    {
                        showMainPage
                            ? <p>Collection</p>
                            : <p> <strong onClick={goToMainPage}>Collection</strong> / {subItems.name}</p>

                    }
                </div>

                {
                    showMainPage &&
                    <div className="gallery-images">
                        {
                            items.map(item => (
                                <div className="set">
                                    <div className="gallery-image" key={item._id} onClick={() => goToSubPage(item)}>
                                        <img src={item.logo} />
                                    </div>
                                    <h3>{item.name}</h3>
                                </div>
                            ))
                        }
                    </div>
                }

                {
                    showSubPage &&
                    <div className="gallery-images">
                        {
                            subItems.photos?.map((item, index) => (
                                <div className="set">

                                    <div className="gallery-image" key={index} >
                                        <img src={item} onClick={() => handleModal(index)} />
                                    </div>
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
                    <div className="modal-content">
                        <div className="modal-img-row">
                            <i class="fa-solid fa-caret-left" onClick={modalLeft} ></i>
                            <img src={modal} />
                            <i class="fa-solid fa-caret-right" onClick={modalRight} ></i>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}