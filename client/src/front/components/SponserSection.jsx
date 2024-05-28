import { useEffect, useState } from "react"
import { sponsersData } from "../../helpers/dummyData"
import useSponsorStore from "../../admin/sponsor/useSponsorStore";
import { Link } from "react-router-dom";

export default function () {

    const [modal, setModal] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const { items, index } = useSponsorStore()
    // const items = sponsersData;
    useEffect(() => { index() }, [])

    const handleClick = (item) => {
        setShowModal(true)
        setModal(item)
    }

    return (
        <>
            <div className="wrapper badges">
                <h2 className="sub-heading">SPONSORS</h2>
                <h2 className="sub-sub-heading">GOLD</h2>
                <div className="badge-collection mb-4">
                    {
                        items.filter(item => item.type == "gold" && item.status == "active").map(item => (
                            <div className="badge-image" key={item._id} onClick={() => handleClick(item)}>
                                <img src={item.logo} alt={item.name} />
                            </div>
                        ))
                    }
                </div>
                <h2 className="sub-sub-heading">Silver</h2>
                <div className="silver-collection">
                    {
                        items.filter(item => item.type == "silver" && item.status == "active").map(item => (
                            <div className="badge-image" key={item._id} onClick={() => handleClick(item)}>
                                <img src={item.logo} alt={item.name} />
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                showModal &&
                <div className="modal">

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
                                    <div className="imgcol"><img key={index} src={photo} /></div>
                                ))
                            }
                        </div>
                        <h3 className="modal-sub-heading">Contact</h3>
                        <ul className="modal-contact">
                            <li><i class="fa-solid fa-phone"></i> {modal.phone}</li>
                            <li><i class="fa-solid fa-envelope"></i> <Link to={`mailto:${modal.email}`}>{modal.email}</Link></li>
                            <li><i class="fa-solid fa-location-dot"></i> {modal.address}</li>
                            <li><i class="fa-solid fa-link"></i> <Link to={modal.website} target="_blank">{modal.website}</Link></li>
                        </ul>
                    </div>

                </div>
            }
        </>
    )
}