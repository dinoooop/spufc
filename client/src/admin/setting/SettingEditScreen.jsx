import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateForm } from './settingValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRef } from 'react';
import useSettingStore from './useSettingStore';

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef()

    const { show, item, store, error } = useSettingStore()
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        show()
    }, [])

    useEffect(() => {
        setFormValues({
            facebook: item.facebook,
            instagram: item.instagram,
            email: item.email,
            phone: item.phone,
            title: item.title,
            description: item.description,
            file: item.file
        })
        setFormValues(prev => ({ ...prev, file_url: item.file }))
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
                const resultAction = await store(newFormData)
            } catch (error) {
                console.error(error)
            }
        }
    }


    return (

        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Edit Setting</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <div className="form-group">
                            <label>Image</label>
                            <label htmlFor="file"><i className="fas fa-file icon"></i></label>

                            <input
                                type="file"
                                ref={fileInputRef}
                                id="file"
                                name="file"
                                onChange={onChangeForm}
                                placeholder="test"
                            />
                            <div className="uploaded-images">
                                {formValues.file_url && <img src={formValues.file_url} alt="file Preview" />}
                            </div>
                            <div className="color-red">{errors?.file}</div>
                        </div>


                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text"
                                className="form-control input-field"
                                id="title"
                                value={formValues.title || ''}
                                name="title"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.title}</div>
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
                            <label htmlFor="facebook">Facebook</label>
                            <input type="text"
                                className="form-control input-field"
                                id="facebook"
                                value={formValues.facebook || ''}
                                name="facebook"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.facebook}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="instagram">Instagram</label>
                            <input type="text"
                                className="form-control input-field"
                                id="instagram"
                                value={formValues.instagram || ''}
                                name="instagram"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.instagram}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                className="form-control input-field"
                                id="email"
                                value={formValues.email || ''}
                                name="email"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.email}</div>
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

                        <button type='submit' className="btn submit">Save</button>
                        
                    </form>
                </div>
            </div>
        </ProtectedLayout>

    )
}
