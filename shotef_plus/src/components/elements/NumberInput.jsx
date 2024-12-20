export default function NumberInput({ type, setText, disabled, doFunction, id}) {

    return (
        <div className='inpt-div'>

            <input
                id={id}
                type={type}
                className='inpt'
                name='inpt'
                onChange={(e => setText(e.target.value))}
                onKeyUp={e => doFunction(e)}
                disabled={disabled}
            />
        </div>
    )
};
