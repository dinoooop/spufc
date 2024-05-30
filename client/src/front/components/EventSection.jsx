import { useEffect, useState } from "react"
import { dummyEvent, sponsersData } from "../../helpers/dummyData"
import useSponsorStore from "../../admin/sponsor/useSponsorStore";
import { Link } from "react-router-dom";
import useEventStore from "../../admin/event/useEventStore";
import "leaflet/dist/leaflet.css";
export default function () {

    const [modal, setModal] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const { items, index } = useEventStore()
    useEffect(() => { index() }, [])
    

    const handleClick = (item) => {
        setShowModal(true)
        setModal(item)
    }


    return (
        <>
            <div className="wrapper gallery">
                <h2 className="sub-heading">EVENTS</h2>
                <div className="gallery-images">
                    {
                        items.map(item => (
                            <div className="gallery-image" key={item._id} onClick={() => handleClick(item)}>
                                <img src={item.logo} alt={item.name} />
                            </div>
                        ))
                    }
                </div>
                <Link className="fbtn fbtn-big" to="#">BOOK NOW</Link>
            </div>
            {
                showModal &&
                <div className="modal">

                    <div className="modal-close-screen" onClick={() => setShowModal(false)}></div>
                    <div className="modal-content scroll">
                        <div className="modal-header">
                            <h2>{modal.name}</h2>
                            <i className="fa-solid fa-circle-xmark " onClick={() => setShowModal(!showModal)}></i>
                        </div>
                        <div className="row ">
                            <div className="col-md-6">
                                <p>{modal.description}</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <img src={modal.logo} />
                            </div>
                        </div>
                        <div className="imgrow mb-2">
                            {
                                modal.photos?.map((photo, index) => (
                                    <div key={index} className="imgcol"><img src={photo} /></div>
                                ))
                            }
                        </div>

                        <h3 className="modal-sub-heading">Event Info:</h3>
                        <ul className="modal-contact">
                            
                            {
                                modal.start_at &&
                                <li><i class="fa-solid fa-clock"></i> {modal.start_at}</li>
                                
                            }
                            {
                                modal.phone &&
                                <li><i class="fa-solid fa-phone"></i> {modal.phone}</li>
                            }
                            {
                                modal.email &&
                                <li>
                                    <i class="fa-solid fa-envelope"></i> <Link to={`mailto:${modal.email}`}>{modal.email}</Link>
                                </li>
                            }
                            {
                                modal.address &&
                                <li><i class="fa-solid fa-location-dot"></i> {modal.address}</li>
                            }
                            {
                                modal.website &&
                                <li>
                                    <i class="fa-solid fa-link"></i> <Link to={modal.website} target="_blank">{modal.website}</Link>
                                </li>
                            }
                            {
                                modal.payment_link &&
                                <li className="mt-2">
                                   <Link className="fbtn" to={modal.payment_link} target="_blank">Payment</Link>
                                </li>
                            }
                        </ul>
                    </div>

                </div>
            }
        </>
    )
}