export default function () {

    const items = [
        {
            title: "Beaufort",
            content: "description",
            logo: "/images/sponsers/beaufort.jpg",
            type: "gold",
            website: "www.beaufort.com",
        }
    ]
    return (
        <div className="wrapper badges">
            <h2 className="sub-heading">SPONSORS</h2>
            <h2 className="sub-sub-heading">GOLD</h2>
            <div className="badge-collection">
                <div className="badge-image">
                    <img src="/images/sponsers/beaufort.jpg" />
                </div>
                <div className="badge-image">
                    <img src="/images/sponsers/hpright-1.jpg" />
                </div>
                <div className="badge-image">
                    <img src="/images/sponsers/signhere-logo.jpg" />
                </div>
            </div>
            <h2 className="sub-sub-heading">SILVER</h2>
            <div className="silver-collection">
                <img src="/images/sponsers/thai-orchid-logo.jpg" />
                <img src="/images/sponsers/cullen-co-logo.jpg" />
                <img src="/images/sponsers/perthwellness.jpg" />
                <img src="/images/sponsers/logo-pegasus.jpg" />
                <img src="/images/sponsers/lyan.jpg" />
            </div>
        </div>
    )
}