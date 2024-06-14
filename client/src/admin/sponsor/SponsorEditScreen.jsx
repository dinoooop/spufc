import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { validateForm } from './sponsorValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRef } from 'react';
import useSponsorStore from './useSponsorStore';
import processData from '../../helpers/processData';
import InputFile from '../../formc/InputFile';
import InputFileMulti from '../../formc/InputFileMulti';
import TextArea from '../../formc/TextArea';
import Radio from '../../formc/Radio';
import InputField from '../../formc/InputField';
import Submit from '../../formc/Submit';

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef()
    const params = useParams()

    const { show, item, update, error } = useSponsorStore()
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        show(params.id)
    }, [params.id])

    useEffect(() => {
        setFormValues({
            _id: item._id,
            name: item.name,
            description: item.description,
            logo: item.logo,
            photos: item.photos,
            type: item.type,
            website: item.website,
            status: item.status,
            phone: item.phone,
            address: item.address,
            email: item.email,
            offers: item.offers,
        })
        setFormValues(prev => ({ ...prev, logo_url: item.logo, photos_urls: item.photos }))
    }, [item])

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
                unwrapResult(resultAction)
                navigate('/admin/sponsors')
            } catch (error) {
                console.error(error)
            }
        }
    }


    return (

        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Edit Sponsor</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

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
