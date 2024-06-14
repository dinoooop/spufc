import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { check, reset } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../auth/useAuthStore';

// Authenticated user not allowed to visit this page
export default function (props) {


    const navigate = useNavigate()
    const { user, reset } = useAuthStore()

    useEffect(() => {
        reset()
        if (user) {
            navigate('/admin/banners')
        }
    }, [user])

    return (
        <div>
            <div className="container-blank back">
                {props.children}
            </div>
        </div>
    );
}