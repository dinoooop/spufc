import { useDispatch, useSelector } from 'react-redux'
import AppIcon from '../components/AppIcon'
import { destroy, index, remove, update } from './sponsorSlice'
import { useEffect, useState } from 'react'
import SortArrow from '../components/SortArrow'
import Pagination from "react-js-pagination"
import { Link } from 'react-router-dom'
import ProtectedLayout from '../layouts/ProtectedLayout'
import StatusIcon from '../components/StatusIcon'

export default function () {

    const dispatch = useDispatch()
    const { items } = useSelector(state => state.sponsor)
    const [formValues, setFormValues] = useState({})

    

    useEffect(() => {
        
        dispatch(index())

    }, [dispatch, formValues])

    const handleDelete = (sponsor) => {
        dispatch(remove(sponsor))
        dispatch(destroy(sponsor))
    }

    

    const handleSearch = e => {
        setFormValues({ search: e.target.value })
    }

    const handleSort = (order, name) => {
        setFormValues(prev => ({ ...prev, so: order, sb: name }))
    }

    const handlePagination = number => {
        setFormValues(prev => ({ ...prev, page: number }))
    }

    return (
        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Sponsors</h1>
                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
                </div>
            </div>

            <div className="row">
                <div className='cardbody'>
                    <div className="index-table-container">

                        <table className="index-table">
                            <thead>
                                <tr>
                                    <th>Name <SortArrow onClick={handleSort} column="title" /></th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items &&
                                    items.map((item) => (
                                        <tr key={item._id}>
                                            <td><Link to={`/admin/sponsors/${item._id}`}>{item.name}</Link></td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
                                                <AppIcon to={`/admin/sponsors/${item._id}`} icon="edit" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                    
                </div>
            </div>

        </ProtectedLayout>


    )
}