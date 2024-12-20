import il from '../assets/il.png'
import uk from '../assets/uk.png'
import us from '../assets/us.png'
import eu from '../assets/eu.png'
import ca from '../assets/ca.png'
import Label from './elements/Label'
import Button from './elements/Button'
import React from 'react'


export default function Ratio({ currency, rate }) {
    const [repRate, setRepRate] = React.useState(true)
    const localC = [il, 'שקל']
    let flag = []
    if (currency === 'USD') {
        flag.push(us)
        flag.push('דולר')
    } else if (currency === 'GBP') {
        flag.push(uk)
        flag.push('לירה סטרלינג')
    } else if (currency === 'EUR') {
        flag.push(eu)
        flag.push('יורו')
    } else if (currency === 'CAD') {
        flag.push(ca)
        flag.push('דולר קנדי')
    }

    function dummyFunction() {
        return
    }

    return (
        <div className='ratio'>
            <div className='vs-div'>
                {repRate && <Label text={localC[1]} size={'16'} bgcolor={'#303f34'} icon={localC[0]} border={'none'} />}
                {!repRate && <Label text={flag[1]} size={'16'} bgcolor={'#3f3a30'} icon={flag[0]} border={'none'} />}
                <Button text={'⇆'} size={'20'} bgcolor={'#3f3a30'} border={'none'} toggle={setRepRate} doFunction={dummyFunction}/>
                {repRate && <Label text={flag[1]} size={'16'} bgcolor={'#303f34'} icon={flag[0]} border={'none'} />}
                {!repRate && <Label text={localC[1]} size={'16'} bgcolor={'#3f3a30'} icon={localC[0]} border={'none'} />}
            </div>
            <div className='vs-div'>
                {!repRate && <Label text={(rate).toFixed(4)} size={'16'} bgcolor={'transparent'} border={'2px solid #303f34'} />}
                {repRate && <Label text={(1 / rate).toFixed(4)} size={'16'} bgcolor={'transparent'} border={'2px solid #3f3a30'} />}
                <Label text={'≈'} size={'25'} bgcolor={'transparent'} border={'none'} />
                {!repRate && <Label text={'1'} size={'16'} bgcolor={'transparent'} border={'2px solid #303f34'} />}
                {repRate && <Label text={'1'} size={'16'} bgcolor={'transparent'} border={'2px solid #3f3a30'} />}
            </div>
        </div>

    )
};
