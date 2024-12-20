export default function TableTitle({ rNum, rYear, rMonth,rDay, rDebt }) {
    
    return (
        <div className={rDay ? 'table-row-pay' : 'table-row'}>
            <div className='t-r'><p>{ rDebt}</p></div>
            {rDay ? <div className='t-r'><p>{rDay}</p></div> : ''}
            <div className='t-r'><p>{rMonth}</p></div>
            <div className='t-r'><p>{rYear}</p></div>
            <div className='t-r'><p>{ rNum}</p></div>
        </div>
    )
};
