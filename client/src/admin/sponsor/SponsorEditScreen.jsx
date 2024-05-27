import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { show, update } from './sponsorSlice';
import { validateForm } from './sponsorValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { unwrapResult } from '@reduxjs/toolkit';
import { bc } from '../../helpers/bc';
import { sv } from '../../helpers/sv';
import config from '../../config';
import { useRef } from 'react';
import { sponserStatus, sponserType } from '../../helpers/dummyData';

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fileInputRef = useRef()
    const params = useParams()


    const { item, error } = useSelector(state => state.sponsor)
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(params.id))
        
    }, [dispatch, params.id])

    useEffect(() => {
        setFormValues({
            name: item.name,
            description: item.description,
            logo: item.logo,
            photos: item.photos,
            type: item.photos,
            website: item.website,
            status: item.status,
            phone: item.phone,
            address: item.address,
            email: item.email,
            offers: item.offers,
        })
        setFormValues(prev => ({ ...prev, logo_url:  item.logo, photos_urls: item.photos}))
    }, [item])

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = vr.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                const resultAction = await dispatch(update(newFormData))
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
                            <label htmlFor="type">Type</label>
                            {
                                sponserType.map(mapitem => (
                                    <label className='radio-control' key={mapitem.key}>
                                        <input type="radio"
                                            value={mapitem.key}
                                            name="type"
                                            onChange={onChangeForm}
                                            checked={formValues.type == mapitem.key || ''}
                                        /> {mapitem.name}
                                    </label>
                                ))
                            }
                            <div className="color-red">{errors.type}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <input type="text"
                                className="form-control input-field"
                                id="website"
                                value={formValues.website || ''}
                                name="website"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.website}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">phone</label>
                            <input type="text"
                                className="form-control input-field"
                                id="phone"
                                value={formValues.phone || ''}
                                name="phone"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.phone}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="offers">offers</label>
                            <input type="text"
                                className="form-control input-field"
                                id="offers"
                                value={formValues.offers || ''}
                                name="offers"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.offers}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">address</label>
                            <input type="text"
                                className="form-control input-field"
                                id="address"
                                value={formValues.address || ''}
                                name="address"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.address}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">email</label>
                            <input type="text"
                                className="form-control input-field"
                                id="email"
                                value={formValues.email || ''}
                                name="email"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.email}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Display</label>
                            {
                                sponserStatus.map(mapitem => (
                                    <label className='radio-control' key={mapitem.key}>
                                        <input type="radio"
                                            value={mapitem.key}
                                            name="status"
                                            onChange={onChangeForm}
                                            checked={formValues.status == mapitem.key || ''}
                                        /> {mapitem.name}
                                    </label>
                                ))
                            }
                            <div className="color-red">{errors.status}</div>
                        </div>

                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/sponsors" className="btn">Cancel</Link>

                    </form>
                </div>
            </div>
        </ProtectedLayout>

    )
}
