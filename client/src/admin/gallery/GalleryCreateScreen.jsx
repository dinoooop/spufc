import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './galleryValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useGalleryStore from './useGalleryStore'
import processData from '../../helpers/processData'
import InputField from '../../formc/InputField'
import Submit from '../../formc/Submit'
import InputFile from '../../formc/InputFile'
import InputFileMulti from '../../formc/InputFileMulti'


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

                        <InputField name="name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputFile name="logo" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputFileMulti name="photos" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/galleries" />

                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
