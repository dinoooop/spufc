import { useEffect, useState } from "react";
import { vr } from "../../helpers/vr";
import { enquiryValidation } from "../validations/homeValidation";
import useGeneralStore from "../pages/useGeneralStore";

export default function () {



    const [errors, setErrors] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [formValues, setFormValues] = useState({
        name: "test",
        email: "test@mail.com",
        phone: "+123 56568",
        enquiries: "Hello",
    })

    const { error, success, contact } = useGeneralStore()

    useEffect(() => { }, [])

    const onChangeForm = (e) => {
        const validated = vr.validate(e, enquiryValidation, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = vr.submit(formValues, enquiryValidation)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                // const resultAction = await enquiry(newFormData)
                setShowModal(false)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="wrapper gallery enquiry">
            <h2 className="sub-heading">ENQUIRY</h2>
            <div className="gallery-images">
                <div className="gallery-image"><img src="/images/players/117973167_2797692040451657_6387273032090062872_n.jpeg" /></div>
                <div className="gallery-image"><img src="/images/players/118297062_2797691933785001_6027705447372122578_n.jpeg" /></div>
                <div className="gallery-image"><img src="/images/players/118058077_2797691740451687_6063247122535352340_n.jpeg" /></div>
                <div className="gallery-image"><img src="/images/players/1st-ream-1.jpg" /></div>
                <div className="gallery-image"><img src="/images/players/metros-1-768x576-1.jpg" /></div>
                <div className="gallery-image"><img src="/images/players/IMG_2423.jpeg" /></div>
            </div>

            <button onClick={() => setShowModal(!showModal)} className="fbtn fbtn-big">ENQUIRY</button>

            {
                showModal &&
                <div className="modal">

                    <div className="modal-close-screen" onClick={() => setShowModal(false)}></div>

                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>General Contact</h2>
                            <i className="fa-solid fa-circle-xmark " onClick={() => setShowModal(!showModal)}></i>
                        </div>

                        <form onSubmit={handleSubmit}>

                            {error && <p className='red-alert'>{error}</p>}

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    className="form-control input-field"
                                    id="name"
                                    value={formValues.name || ''}
                                    name="name"
                                    onChange={onChangeForm}
                                />
                                <div className="color-red">{errors.name}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text"
                                    className="form-control input-field"
                                    id="email"
                                    value={formValues.email || ''}
                                    name="email"
                                    onChange={onChangeForm}
                                />
                                <div className="color-red">{errors.email}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="text"
                                    className="form-control input-field"
                                    id="phone"
                                    value={formValues.phone || ''}
                                    name="phone"
                                    onChange={onChangeForm}
                                />
                                <div className="color-red">{errors.phone}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="enquiries">Enquiries</label>
                                <textarea
                                    className="form-control input-field"
                                    id="enquiries"
                                    value={formValues.enquiries || ''}
                                    name="enquiries"
                                    onChange={onChangeForm}
                                />
                                <div className="color-red">{errors.enquiries}</div>
                            </div>

                            <button className="fbtn">Submit</button>

                        </form>
                    </div>

                </div>
            }
        </div>
    )
}