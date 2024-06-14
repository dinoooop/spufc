import { useEffect, useState } from 'react';
import { validateForm } from './settingValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import useSettingStore from './useSettingStore';
import Editor from 'react-simple-wysiwyg';
import Submit from '../../formc/Submit';
import InputField from '../../formc/InputField';
import TextArea from '../../formc/TextArea';
import InputFile from '../../formc/InputFile';

export default function () {

    const { show, settings, store, error } = useSettingStore()
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => { show() }, [])

    useEffect(() => {
        setFormValues({
            facebook: settings.facebook,
            instagram: settings.instagram,
            email: settings.email,
            phone: settings.phone,
            title: settings.title,
            description: settings.description,
            more: settings.more,
            file: settings.file
        })
        setFormValues(prev => ({ ...prev, file_url: settings.file }))
    }, [settings])

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
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Settings</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <InputFile name="file" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="title" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <TextArea name="description" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />

                        <div className="form-group">
                            <label htmlFor="more">Detailed Description</label>
                            <Editor value={formValues.more} name="more" onChange={onChangeForm} />
                            <div className="color-red">{errors.more}</div>
                        </div>

                        <InputField name="facebook" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="instagram" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="email" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="phone" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit label="Save" />

                    </form>
                </div>
            </div>
        </ProtectedLayout>
    )
}
