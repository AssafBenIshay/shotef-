export default function PayTableRow({ date, sum ,num}) {
    return (
        <div className={'table-row-dist'}>
            <div className='p-r'><p>{sum}</p></div>
            <div className='p-r'><p>{date}</p></div>
            <div className='p-r'><p>{num}</p></div>
        </div>

    )
};
