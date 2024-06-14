import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { validateForm } from './userValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { unwrapResult } from '@reduxjs/toolkit';
import { bc } from '../../helpers/bc';
import { sv } from '../../helpers/sv';
import InputField from '../../formc/InputField';
import Submit from '../../formc/Submit';
import useUserStore from './useUserStore';

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { update, show, error, item } = useUserStore();

    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        show(params.id)
    }, [params.id])

    useEffect(() => {
        setFormValues({
            id: item.id,
            name: item.name,
            email: item.email,
            roles: bc.pluckIds(item.roles),
            password: "",
            status: item.status,
        })
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
                const resultAction = await update(newFormData)
                unwrapResult(resultAction)
                navigate('/admin/users')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (

        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Edit User</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <InputField name="name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="email" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="password" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/users" />

                    </form>
                </div>
            </div>
        </ProtectedLayout>

    )
}
