import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { check, reset } from '../auth/authSlice';
import { getStock } from '../general/generalSlice';
import { useNavigate } from 'react-router-dom';

// Authenticated user not allowed to visit this page
export default function (props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(reset())
        if (user) {
            navigate('/admin/banners')
        }
    }, [dispatch, user])

    return (
        <div>
            <div className="container-blank">
                {props.children}
            </div>
        </div>
    );
}