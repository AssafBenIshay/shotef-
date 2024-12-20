export default function TableSum({total,totalDebt,titleText}) {
    return (
        <div className='table-sum' id='table-sum-debt'>
            <p className='underline' ref={total}>{totalDebt}</p><h5>{titleText}</h5>
        </div>
    )
    
};
