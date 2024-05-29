import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import { validateForm } from './authValidation'
import useAuthStore from './useAuthStore'

export default function () {

    const { user, error, success, reset, show, update } = useAuthStore()
    const [formValues, setFormValues] = useState(user)
    const [errors, setErrors] = useState({})

    useEffect(() => { 
        reset(); 
        // show(); 
    }, []);

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newFormData = vr.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            update(newFormData)
        }
    }

    return (
        <ProtectedLayout roles="all">
            <div className="page-header">
                <h1>My Profile</h1>
            </div>

            <div className='row'>
                <div className='col-md-8'>
                    <div className="cardbody">
                        <form onSubmit={handleSubmit}>

                            {success && <p className='green-alert'>{success}</p>}
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
                                <label htmlFor="email">Email</label>
                                <input type="text"
                                    className="form-control input-field"
                                    id="email"
                                    value={formValues.email || ''}
                                    name="email"
                                    onChange={onChangeForm}
                                />
                                <div className="color-red">{errors.email}</div>
                            </div>


                            <button type='submit' className="btn submit">Submit</button>
                            <Link to="/admin/modules" className="btn">Cancel</Link>

                        </form>
                    </div>
                </div>
            </div>
        </ProtectedLayout>

    )
}
