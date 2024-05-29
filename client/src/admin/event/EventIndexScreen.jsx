import AppIcon from '../components/AppIcon'
import { useEffect, useState } from 'react'
import SortArrow from '../components/SortArrow'
import Pagination from "react-js-pagination"
import { Link } from 'react-router-dom'
import ProtectedLayout from '../layouts/ProtectedLayout'
import StatusIcon from '../components/StatusIcon'
import useEventStore from './useEventStore'

export default function () {

    const store = useEventStore()

    useEffect(() => {
        store.index()
    }, [])

    const handleDelete = (event) => {
        store.remove(event)
        store.destroy(event)
    }

    return (
        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Events</h1>
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
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    store.items.map((item) => (
                                        <tr key={item._id}>
                                            <td><Link to={`/admin/events/${item._id}`}>{item.name}</Link></td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
                                                <AppIcon to={`/admin/events/${item._id}`} icon="edit" />
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