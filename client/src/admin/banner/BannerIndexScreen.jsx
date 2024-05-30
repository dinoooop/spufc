import AppIcon from '../components/AppIcon'
import { useEffect } from 'react'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useBannerStore from './useBannerStore'

export default function () {
    const { items, index, remove, destroy } = useBannerStore()
    useEffect(() => {
        index()
    }, [])

    const handleDelete = (banner) => {
        remove(banner)
        destroy(banner)
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
                                    <th>Name</th>
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