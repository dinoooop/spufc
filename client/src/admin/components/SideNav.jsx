import { bc } from '../../helpers/bc';

import SideNavButton from './SideNavButton';

export default function () {

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Banners" icon="fa-solid fa-image" href="/admin/banners" />
                <SideNavButton title="Sponsers" icon="fa-solid fa-hand-holding-heart" href="/admin/sponsors" />
                <SideNavButton title="Settings" icon="fa-solid fa-gears" href="/admin/settings" />
            </ul>
        </div >
    );
}