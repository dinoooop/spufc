import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { validateForm } from './eventValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useEventStore from './useEventStore'
import processData from '../../helpers/processData'
import { bc } from '../../helpers/bc'

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const params = useParams()

    const { reset, show, item, update, error } = useEventStore()
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    

    useEffect(() => {
        reset();
        show(params.id);
    }, [params.id])

    useEffect(() => {
        setFormValues({
            _id: item._id,
            name: item.name,
            description: item.description,
            logo: item.logo,
            photos: item.photos,
            start_at: bc.convertToISO8601ShortFormat(item.start_at),
            type: item.type,
            website: item.website,
            phone: item.phone,
            address: item.address,
            email: item.email,
            longitude: item.longitude,
            latitude: item.latitude,
            offers: item.offers,
            payment_link: item.payment_link,
        })
        setFormValues(prev => ({ ...prev, logo_url: item.logo, photos_urls: item.photos }))
    }, [item])

    useEffect(() => {
        reset()
        setFormValues(prev => ({ ...prev, logo_url: formValues.logo }))
        setFormValues(prev => ({ ...prev, photos_urls: formValues.photos }))
    }, [])

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = vr.submitFile(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                const resultAction = await update(newFormData)
                navigate('/admin/events')
            } catch (error) {
                console.error(error)
            }
        }
    }



    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Edit Event</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
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
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control input-field"
                                id="description"
                                value={formValues.description || ''}
                                name="description"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.description}</div>
                        </div>

                        <div className="form-group">
                            <label>Logo</label>
                            <label htmlFor="logo"><i className="fas fa-file icon"></i></label>

                            <input
                                type="file"
                                ref={fileInputRef}
                                id="logo"
                                name="logo"
                                onChange={onChangeForm}
                                placeholder="test"
                            />
                            <div className="uploaded-images">
                                {formValues.logo_url && <img src={formValues.logo_url} alt="logo Preview" />}
                            </div>
                            <div className="color-red">{errors?.logo}</div>
                        </div>

                        <div className="form-group">
                            <label>Other Photos</label>
                            <label htmlFor="photos"><i className="fas fa-file icon"></i></label>

                            <input
                                type="file"
                                ref={fileInputRef}
                                id="photos"
                                name="photos"
                                onChange={onChangeForm}
                                placeholder="test"
                                multiple={true}
                            />
                            <div className="uploaded-images">
                                {
                                    formValues.photos_urls &&
                                    formValues.photos_urls.map((photos_url, index) => (
                                        <img key={index} src={photos_url} alt="photos Preview" />
                                    ))
                                }
                            </div>
                            <div className="color-red">{errors?.photos}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="start_at">Start At</label>
                            <input type="datetime-local"
                                className="form-control input-field"
                                id="start_at"
                                value={formValues.start_at || ''}
                                name="start_at"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.start_at}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <select
                                id="type"
                                name="type"
                                onChange={onChangeForm}
                                value={formValues.type}
                                className="form-control"
                            >
                                {
                                    processData.eventTypes.map(mapitem => (
                                        <option key={mapitem.key} value={mapitem.key}>
                                            {mapitem.name}
                                        </option>
                                    ))
                                }
                            </select>
                            <div className="color-red">{errors.type}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <input type="text"
                                className="form-control input-field"
                                id="website"
                                value={formValues.website || ''}
                                name="website"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.website}</div>
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
                            <label htmlFor="address">Address</label>
                            <input type="text"
                                className="form-control input-field"
                                id="address"
                                value={formValues.address || ''}
                                name="address"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.address}</div>
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
                            <label htmlFor="offers">Offers</label>
                            <input type="text"
                                className="form-control input-field"
                                id="offers"
                                value={formValues.offers || ''}
                                name="offers"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.offers}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="payment_link">Payment Link</label>
                            <input type="text"
                                className="form-control input-field"
                                id="payment_link"
                                value={formValues.payment_link || ''}
                                name="payment_link"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.payment_link}</div>
                        </div>

                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/events" className="btn">Cancel</Link>
                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
