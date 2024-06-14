import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './sponsorValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useSponsorStore from './useSponsorStore'
import processData from '../../helpers/processData'
import { pbc } from '../../helpers/pbc'
import InputField from '../../formc/InputField'
import InputFile from '../../formc/InputFile'
import InputFileMulti from '../../formc/InputFileMulti'
import TextArea from '../../formc/TextArea'
import Radio from '../../formc/Radio'
import Submit from '../../formc/Submit'

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const store = useSponsorStore()
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState(pbc.dummy("sponsor"))

    useEffect(() => {
        store.reset()
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
                const resultAction = await store.store(newFormData)
                navigate('/admin/sponsors')
            } catch (error) {
                console.error(error)
            }
        }
    }



    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Create Sponsor</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {store.error && <p className='red-alert'>{store.error}</p>}

                        <InputFile name="logo" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputFileMulti name="photos" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <TextArea name="description" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Radio name="type" optionType="sponsor-type" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="website" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="phone" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="offers" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <TextArea name="address" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="email" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Radio name="status" optionType="sponsor-status" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/sponsors" />

                    </form>
                </div>
            </div>
        </ProtectedLayout>
    )
}
