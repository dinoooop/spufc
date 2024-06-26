import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './userValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import { unwrapResult } from '@reduxjs/toolkit'
import { sv } from '../../helpers/sv'
import useUserStore from './useUserStore'
import Submit from '../../formc/Submit'
import InputField from '../../formc/InputField'

export default function () {

    const navigate = useNavigate()
    const { store, reset, error } = useUserStore();
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        name: "test",
        email: "test@mail.com",
        roles: [sv.role("subscriber")],
        password: "welcome",
        status: sv.status("active"),
    })

    useEffect(() => { reset() }, [])

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
                const resultAction = await store(newFormData)
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
                <h1>Create User</h1>
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
