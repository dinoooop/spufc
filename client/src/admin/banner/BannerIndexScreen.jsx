import { useDispatch, useSelector } from 'react-redux'
import AppIcon from '../components/AppIcon'
import { destroy, index, remove, update } from './bannerSlice'
import { useEffect, useState } from 'react'
import SortArrow from '../components/SortArrow'
import Pagination from "react-js-pagination"
import { Link } from 'react-router-dom'
import ProtectedLayout from '../layouts/ProtectedLayout'
import StatusIcon from '../components/StatusIcon'

export default function () {

    const dispatch = useDispatch()
    const { items, perPage, total } = useSelector(state => state.banner)
    const [formValues, setFormValues] = useState({ search: "", so: "", sb: "", page: 1 })

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        dispatch(index(data))

    }, [dispatch, formValues])

    const handleDelete = (banner) => {
        dispatch(remove(banner))
        dispatch(destroy(banner))
    }

    const handleStatus = (id, status) => {
        const data = { id, status }
        dispatch(update(data))
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
                <h1>Banners</h1>
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
                                    items.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
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