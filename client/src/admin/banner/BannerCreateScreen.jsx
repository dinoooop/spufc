import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './bannerValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useBannerStore from './useBannerStore'

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        title: "test",
        file: "",
    })
    const { error, reset, store } = useBannerStore()

    useEffect(() => { reset() }, [])

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
            const resultAction = await store(newFormData)
            navigate('/admin/banners')
        }
    }

    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Create Banner</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <div className="form-group">
                            <label htmlFor="name">Title</label>
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
                            <label>Upload Banner Image</label>
                            <label htmlFor="file"><i className="fas fa-file icon"></i></label>

                            <input
                                type="file"
                                ref={fileInputRef}
                                id="file"
                                name="file"
                                onChange={onChangeForm}
                                placeholder="test"
                            />
                            <div>{formValues.file?.name || ''}</div>
                            <div className="color-red">{errors.file}</div>
                        </div>



                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/banners" className="btn">Cancel</Link>
                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
