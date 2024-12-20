

export default function Label({ size, text, bgcolor ,border, icon ,clas}) {

    const style = {
        fontSize: `${size}px`,
        backgroundColor: `${bgcolor}`,
        border: `${border}`,
    }

    return (
        <label className={`lbl ${clas}`} style={style} >{text}{icon ?
            <img src={icon} className='flag'/> : ''}</label>

    )
    
};
// 