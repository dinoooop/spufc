import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './bannerValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useBannerStore from './useBannerStore'
import InputFile from '../../formc/InputFile'
import InputField from '../../formc/InputField'
import Submit from '../../formc/Submit'

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

                        <InputField name="name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputFile name="file" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/banners" />
                        
                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
