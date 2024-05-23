import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardLayout from './DashboardLayout'
import NotFoundScreen from '../general/NotFoundScreen'
import { check } from '../../admin/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { bc } from '../../helpers/bc'

export default function ProtectedLayout({ roles, children, error = false }) {


    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate()



    useEffect(() => {
        // dispatch(check())
        if (!token) { 
            // navigate('/login') 
            window.location.href = '/login'
        }
    }, [dispatch])


    return (
        <>
            {

                <DashboardLayout>
                    {children}
                </DashboardLayout>

            }
        </>
    )
}
