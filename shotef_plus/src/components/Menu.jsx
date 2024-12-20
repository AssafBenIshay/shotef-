import React from 'react';
import LogIn from '../LogIn';
import Button from './elements/Button';
import Daily from './Daily';
import Title from './elements/Title';
import closeX from '../assets/close-X.png'
import {toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Menu({setShowGviya,setShowMaam,setShowPrisa,logedInUser,setLogedInUser,setStat}) {
    const [is,setIs] = React.useState(false)
    //*true if the users email and password matches what stored in local storage
    //* being set in the LogIn.jsx

    function dummyFunc() {
        return
    }

    React.useEffect(() => {
        //^ adding the condition (showMaam===undefined) prevents from toast to popup every time user returns to main menu
        //^ from th maam screen
        // logedInUser && (showMaam === undefined) && toast.dark('נכנסת בהצלחה     .   . . .  🤸‍♂️ ',{type:'success'}) 
        // logedInUser && (showGviya===undefined)&&toast.dark('success',{type:'success'})
    },[logedInUser])


    function bye() {
        toast.dark('עד הפעם הבאה 💬 ')
        setTimeout(() => {
            setLogedInUser(false)
            window.close()
            const App = document.getElementById('App')
            document.body.remove(App)
        }, 2500)
    }


    return (
        <>
            <div className='menu'>
                {logedInUser && <>
                    <Title text='תפריט' size='25' />
                    <Button size={16} bgcolor={'#646cff'} text={'מחשבון מע"מ'}
                        toggle={setShowMaam} doFunction={dummyFunc} setStat={setStat} stat={'Maam'}/>
                    <Button size={16} bgcolor={'#646cff'} text={'גביה'} 
                        toggle={setShowGviya} doFunction={dummyFunc} setStat={setStat} stat={'Gviya'}
                    />
                    <Button size={16} bgcolor={'#646cff'} text={'פריסת תשלום'} 
                        toggle={setShowPrisa} doFunction={dummyFunc} setStat={setStat} stat={'Prisa'}
                    />
                </>}
                {!logedInUser && <LogIn setLogedInUser={setLogedInUser} />}
                <Button size={16} bgcolor={'#ff6c00'} text={'יציאה'} margin={'30px 10px'} toggle={setIs} icon={closeX} doFunction={bye} />
            </div>

            <Daily />
        </>

    )
};
