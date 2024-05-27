export function Input(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.key}>{props.label}</label>
            <input type="text"
                className="form-control input-field"
                id={props.key}
                value={props.value || ''}
                name={props.key}
                onChange={props.onChange}
            />
            <div className="color-red">{props.error}</div>
        </div>
    )
}