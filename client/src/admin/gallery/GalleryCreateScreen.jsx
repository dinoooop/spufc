import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './galleryValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useGalleryStore from './useGalleryStore'
import processData from '../../helpers/processData'


export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const {error, store, reset} = useGalleryStore()
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({})

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
                const resultAction = await store(newFormData)
                navigate('/admin/galleries')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Create Gallery</h1>
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

                        

                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/events" className="btn">Cancel</Link>
                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
