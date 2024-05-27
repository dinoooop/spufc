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

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()


    const { item, error } = useSelector(state => state.sponsor)
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show('66507ebf74d40bc60abfdc69'))
        
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
        setFormValues(prev => ({ ...prev, logo_url:  config.uploads + '/hpright-1.jpg'}))
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



                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/sponsors" className="btn">Cancel</Link>

                    </form>
                </div>
            </div>
        </ProtectedLayout>

    )
}
