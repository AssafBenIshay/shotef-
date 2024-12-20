export default function TableTitle({ dDay }) {
    return (
        <div className={dDay ? 'table-pay-title' : 'table-title'}>
            <div className='t-t'><p>חוב</p></div>
            {dDay?<div className='t-t'><p>יום</p></div>:''}
            <div className='t-t'><p>חודש</p></div>
            <div className='t-t'><p>שנה</p></div>
            <div className='t-t'><p>#</p></div>
        </div>
    )
};
