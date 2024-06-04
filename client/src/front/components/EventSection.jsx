import { useEffect, useState } from "react"
import { dummyEvent, sponsersData } from "../../helpers/dummyData"
import useSponsorStore from "../../admin/sponsor/useSponsorStore";
import { Link } from "react-router-dom";
import useEventStore from "../../admin/event/useEventStore";
import "leaflet/dist/leaflet.css";
import { bc } from "../../helpers/bc";
import processData from "../../helpers/processData";
export default function () {

    const [modal, setModal] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const { items, index } = useEventStore()
    const [formValues, setFormValues] = useState({
        type: ""
    });

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        )
        index(data)
    }, [formValues])


    const handleClick = (item) => {
        setShowModal(true)
        setModal(item)
    }

    const handleFilter = e => {
        setFormValues(prev => ({ ...prev, type: e.target.value }))
    }


    return (
        <>
            <div className="wrapper gallery event">
                <h2 className="sub-heading">EVENTS</h2>
                <div className="front-form-group">
                    <select
                        id="type"
                        name="type"
                        onChange={handleFilter}
                        value={formValues.type}
                        className="form-control"
                    >
                        <option value="">None</option>
                        {
                            processData.eventTypes.map(mapitem => (
                                <option key={mapitem.key} value={mapitem.key}>
                                    {mapitem.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="chair-images">

                    <div className="chairs">
                        {
                            items.map(item => (
                                <div className="chair">
                                    <div className="chair-thumb">
                                        <img src={item.logo} alt={item.name} onClick={() => handleClick(item)} />
                                    </div>
                                    <div className="chair-det">
                                        <h3 onClick={() => handleClick(item)}>{item.name}</h3>
                                        <p>{bc.ddtif(item.start_at)}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

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
                        <div className="row px-1">
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
                                <li><i class="fa-solid fa-clock"></i> {bc.ddtif(modal.start_at)}</li>

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