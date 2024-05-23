import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { check, reset } from '../auth/authSlice';
import { getStock } from '../general/generalSlice';
import { useNavigate } from 'react-router-dom';

// Authenticated user not allowed to visit this page
export default function (props) {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { stock } = useSelector(state => state.general)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(reset())

        if(!stock) {
            //dispatch(getStock())
        }

        if (token) {
            // navigate('/admin/banners')
            // window.location.href = '/admin/banners'
        }
    }, [dispatch, token])

    return (
        <div>
            <div className="container-blank">
                {props.children}
            </div>
        </div>
    );
}