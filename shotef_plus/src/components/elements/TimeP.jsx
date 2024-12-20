export default function TimeP(params) {
    const timeP = new Date().toLocaleDateString('he-il')
    return (
        <p className='time-p'>{timeP}</p>
    )
};
