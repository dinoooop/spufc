import { bc } from '../../helpers/bc';

import SideNavButton from './SideNavButton';

export default function () {

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Users" icon="fa-solid fa-user" href="/admin/users" />
                <SideNavButton title="Banners" icon="fa-solid fa-user" href="/admin/banners" />
                
            </ul>
        </div >
    );
}