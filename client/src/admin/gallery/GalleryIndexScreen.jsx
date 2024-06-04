import AppIcon from '../components/AppIcon'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useGalleryStore from './useGalleryStore'
import processData from '../../helpers/processData'
import { bc } from '../../helpers/bc'

export default function () {

    const store = useGalleryStore()
    const [formValues, setFormValues] = useState({
        type: ""
    });

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        store.index(data)
    }, [formValues])

    const handleDelete = (gallery) => {
        store.remove(gallery)
        store.destroy(gallery)
    }

    const handleFilter = e => {
        setFormValues(prev => ({ ...prev, type: e.target.value }))
    }

    return (
        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Galleries</h1>
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
                                            <td><Link to={`/admin/galleries/${item._id}`}>{item.name}</Link></td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
                                                <AppIcon to={`/admin/galleries/${item._id}`} icon="edit" />
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