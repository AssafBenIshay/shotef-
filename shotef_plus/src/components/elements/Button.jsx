export default function Button({ size, text, bgcolor,border,toggle,margin,icon,clas,doFunction,setStat,stat}) {
    const style = {
        fontSize: `${size}px`,
        backgroundColor: `${bgcolor}`,
        border:`${border}`,
        margin:`${margin}`
    }
    const className = 'btn '+clas
    
    return (
        <button
            style={style}
            className={className}
            onClick={() => {
                doFunction()
                toggle(last => !last)
                { stat ? setStat(stat) : '' }
            }}
            
        >
            
            {text}
            {icon && <img src={icon} className='icon' />}</button>
    )
};
