import InputField from './components/elements/InputField';
import Label from './components/elements/Label';
import Title from './components/elements/Title';
import Shekel from './assets/shekel.png'
import Percent from './assets/percent.png'
import NumberInput from './components/elements/NumberInput';
import React from 'react';
import closeX from './assets/close-X.png'
import Button from './components/elements/Button';

export default function Maam({setShowMaam,setStat,stat}) {
    const [nett,setNett] = React.useState(0)
    const [maam, setMaam] = React.useState(0)
    const [is, setIs] = React.useState(false)
    function dummy() {
        return
    }
    
    return (
        <div className='maam'>
            <Title size={25} text={'מחשבון מס ערך מוסף'} />
            <div className='vs-div'>
                <Label text={'מע"מ'} icon={Percent} clas={'lbl'} />
                <Label text={' סכום לחישוב'} icon={Shekel} clas={'lbl'} />
            </div>
            <div className='vs-div'>
                <NumberInput type={'number'} icon={'%'} id={'percent'} doFunction={dummy}  setText={setMaam}/>
                <NumberInput type={'number'} icon={'₪'} id={'shekel'}  doFunction={dummy}  setText={setNett}/>
            </div>
            <div className='maam-results'>
                <div className='maam-res-sub'>
                    <Label text={'סה"כ כולל מע"מ'} size={16} />
                    <Label text={nett?`${Number.parseFloat(nett*(1+maam/100)).toFixed(2)}`:'(⊙﹏⊙)'} size={22} clas={'result'}/>
                </div>
                <div className='maam-res-sub'>
                    <Label text={'כמה רק המע"מ'} size={16} />
                    <Label text={maam?`${Number.parseFloat(nett * maam/100).toFixed(2) }`:'(。>︿<)_θ'} size={22} clas={'result'}/>
                </div>
            </div>
            <Button
                    size={16}
                    border={'2px solid transparent'}
                    bgcolor={'#ff6c00'}
                    text={'חזור'}
                    icon={closeX}
                    clas={'mg-bottom'}
                    toggle={setShowMaam} 
                    doFunction={()=>setStat('')}
                    setStat={setStat}
                    stat={''}
                    />
        </div>
    )

};
