import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './eventValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useEventStore from './useEventStore'
import processData from '../../helpers/processData'
import { dummyEvent } from '../../helpers/dummyData'
import InputField from '../../formc/InputField'
import TextArea from '../../formc/TextArea'
import InputFileMulti from '../../formc/InputFileMulti'
import InputFile from '../../formc/InputFile'
import Select from '../../formc/Select'
import Submit from '../../formc/Submit'

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const { error, store, reset } = useEventStore()
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState(dummyEvent[0])



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
                navigate('/admin/events')
            } catch (error) {
                console.error(error)
            }
        }
    }



    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Create Event</h1>
            </div>



            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <InputField name="name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <TextArea name="description" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputFile name="logo" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputFileMulti name="photos" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="start_at" type="datetime-local" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Select name="type" optionType="event-type" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="website" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="phone" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <TextArea name="address" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="email" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="offers" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="payment_link" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/events" />

                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
