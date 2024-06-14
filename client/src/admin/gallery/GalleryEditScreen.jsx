import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { validateForm } from './galleryValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useGalleryStore from './useGalleryStore'
import processData from '../../helpers/processData'
import { bc } from '../../helpers/bc'
import InputField from '../../formc/InputField'
import InputFile from '../../formc/InputFile'
import InputFileMulti from '../../formc/InputFileMulti'
import Submit from '../../formc/Submit'

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const params = useParams()

    const { reset, show, item, update, error } = useGalleryStore()
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
            logo: item.logo,
            photos: item.photos,
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
                navigate('/admin/galleries')
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
