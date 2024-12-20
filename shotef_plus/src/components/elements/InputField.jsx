export default function InputField({ type,label,icon,setText,disabled,doFunction,id}) {
    
    return (
        <div className={`inpt-div ${id}`}>
            <label
                htmlFor='inptEl'
                className='inpt-lbl'
            >{label}<i className='icon' >{icon}</i></label>
            <input
                //id='inputEl'
                id={id}
                type={type}
                className='inpt'
                name='inpt'
                onChange={(e => setText(e.target.value))}
                onKeyUp={doFunction}
                disabled={disabled}
            />
        </div>
    )
};
