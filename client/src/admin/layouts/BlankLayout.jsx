
import { useSelector } from 'react-redux';

export default function (props) {

    let theme = useSelector(state => state.auth.theme);

    return (
        <div className="back">
            <div className="container-blank">
                {props.children}
            </div>
        </div>
    );
}