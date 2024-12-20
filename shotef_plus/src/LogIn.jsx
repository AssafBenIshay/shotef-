import React from 'react';
import Button from './components/elements/Button';
import InputField from './components/elements/InputField';
import { toast } from 'react-toastify';
import Label from './components/elements/Label';
import user from './assets/user.png';
import peppy from './assets/peppyUser.png';
import usersJson from './DB/users.json';
import userscopyJson from './DB/userscopy.json'
import closeX from './assets/close-X.png'
import * as fs from 'node:fs'

export default function LogIn({ setLogedInUser }) {
    const [uName, setUName] = React.useState('')
    const [isRegisteredUser, setIsRegisteredUser] = React.useState(true)
    const [nameInput, setNameInput] = React.useState('')
    const [emailInput, setEmailInput] = React.useState('')
    const [pwdInput, setPwdInput] = React.useState('')
    const [pwdValidInput, setPwdValidInput] = React.useState('')
    const [is, setIs] = React.useState() // dummy state
    const [usersArray, setUsersArray] = React.useState([])

    function someFunction() {
        console.log('somefunction');
    }

    function preRegistrationMessage() { //* when pressing הרשמה fire a toast
        toast('ברוך הבא ,יש להכניס את כל פרטי ההרשמה באנגלית בלבד! שימוש נעים.', { type: 'info', rtl: true })
    }

    //^ ---------------------------------------------------Array init------------------------------------------------------------
    React.useEffect(() => {
        let demoArr = initUsersArrayFromDBJson()

        if (demoArr === null) { //the localstorage is filled with users
            fillUsersArray()
        }
    }, [])

    function initUsersArrayFromDBJson() {  //if LS empty put fake users
        let lSLen = localStorage.length

        if (lSLen === 0) {
            let demoArr = JSON.stringify(usersJson)
            localStorage.setItem('users', demoArr)
            return demoArr
        } else {
            return null
        }
    }

    function fillUsersArray() {//fill the state of array of Locallystoraged users
        let arr = []
        arr = JSON.parse(localStorage.getItem('users'))
        setUsersArray(arr)
    }
    //^------------------------------------------------------------------------------------------------------------------------------
    //&---------------------------------------------user sign in---------------------------------------------------------------------    
    function signIn() {

        let emailEntered = validateInputType(emailInput, 'email')
        let passwordEntered = validateInputType(pwdInput, 'password')

        //console.log('usersArray :>> ', usersArray[0].user.email);
        if (emailEntered) {
        } else {
            toast(':נדרש כתובת אימייל בפורמט תקין!  לדוגמה "myEmail@somthing.com" ', { type: 'warning' })
        }
        if (passwordEntered) {

            searchUser(emailInput, pwdInput)
        } else {
            toast('תבנית הסיסמה שגוייה! על הסיסמה להיות ארוכה יותר משמונה תוים, באנגלית וספרות בלבד, וחייבת להכיל לפחות אות אחת גדולה וסיפרה אחת', { theme: 'dark', type: 'warning', closeOnClick: true })
        }
    }

    function validateInputType(input, type) {
        if (type === 'email') {
            const regex1 = new RegExp(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, 'gm')
            if (regex1.exec(input) !== null) {
                return true
            } else {
                toast(`יש להכניס כתובת דואר אלקטרונית תקינה, לדוגמה : "name@domain.com"`, { theme: 'dark', type: 'error', autoClose: 2800 })
                return false
            }
        } else if (type === 'name') {
            const regex2 = new RegExp(/^(?=.{3,20}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/, 'gs')
            if (regex2.exec(input) !== null) {
                return true
            } else {
                toast(`יש להכניס שם משתמש תקין ללא תוים מיוחדים באורך של 3 עד 20 תוים, לדוגמה : "Assaf_Ben-Ishay"`, { theme: 'dark', type: 'error', autoClose: 2800 })
                return false
            }
        } else if (type === 'password') {
            const regex3 = new RegExp(/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/, 'gs')
            if (regex3.exec(input) !== null) {
                return true
            } else {
                toast(`יש להכניס סיסמה בעלת מינימום 8 תוים באנגלית עם אות אחת גדולה לפחות ועם ספרה אחת לפחות`, { theme: 'dark', type: 'error', autoClose: 2800 })
                return false
            }
        }

    }

    function searchUser(email, pwd) { //comparing all registers with user input after validation

        for (let i = 0; i < usersArray.length; i++) {
            let uEmail = usersArray[i].user.email;
            let uPwd = usersArray[i].user.password;
            let uIddatecreated = usersArray[i].user.iddatecreated

            if (email === uEmail && pwd === uPwd) {
                updateLoginDate(uIddatecreated, i)
                setLogedInUser(true) //! release after check
            }
        }
    }

    function updateLoginDate(id, index) {
        // 1: get and put selected users row in a var ✔
        // 2: put new date on the var ✔
        // 3: get the storage and parse on a variable ✔
        // 4: filter out the selected user from the downloaded ls ✔
        // 5: push the user to downloaded pardsed array ✔
        // 6: put the users array back at localstorage ✔

        var signedInUser = usersArray[index]

        signedInUser.user.logindate = new Date().toLocaleDateString('he-il');

        var stringifiedLS = localStorage.getItem('users')
        var parsedSLS = JSON.parse(stringifiedLS)

        var filteredOutUsersList = parsedSLS.filter((u) => {
            if (u.user.iddatecreated !== id)
                return u
        })

        filteredOutUsersList.push(signedInUser)
        var newList = filteredOutUsersList

        localStorage.setItem("users", JSON.stringify(newList))
    }

    function sessionRunningSignIn() { //if the user already loged in earlier today and the email correct
        //while typing ,the user will be logged in
        //! remove this function after finishing the app
        if (emailInput === '321') {                  //!
            setLogedInUser(true)                     //!
        }                                            //!
        //! remove this function after finishing the app


        for (let i = 0; i < usersArray.length; i++) {
            if (usersArray[i].user.email === emailInput) {
                var dateToday = new Date().toLocaleDateString('he-il')
                if (dateToday.toString() === usersArray[i].user.logindate) {
                    setLogedInUser(true)
                    toast(`ברוך שובך ${usersArray[i].user.uname}`)
                }
            }
        }
    }

    //&------------------------------------------------------------------------------------------------------------------------------

    //*---------------------------------------------------new user validation and proccessing ---------------------------------------
    function validateNewUserData() {
        let validName = validateInputType(nameInput, 'name')
        let validEmail = validateInputType(emailInput, 'email')
        let validPassword = validateInputType(pwdInput, 'password')

        if (validName && validEmail && validPassword) {
            if (pwdInput === pwdValidInput) {
                saveNewUserToLocalStorage()
            }
        }
    }

    function saveNewUserToLocalStorage() {
        const timeId = new Date().valueOf()
        const dateToday = new Date().toLocaleDateString('he-il')
        var newUser = {
            "user": {
                "iddatecreated": `${timeId}`,
                "uname": `${nameInput}`,
                "email": `${emailInput}`,
                "logindate": `${dateToday}`,
                "password": `${pwdInput}`,
                "settings": {
                    "theme": "light",
                    "font": "novio",
                    "fontsize": "14",
                    "subscription": "VIP"
                }
            }
        }

        var arr = [...usersArray, newUser]
        localStorage.setItem("users", JSON.stringify(arr))

        setUsersArray(arr)
        setIsRegisteredUser(true)

        // const currentUsersData = fs.readFileSync(userscopyJson)
        // const jsonData = JSON.parse(currentUsersData)

        // jsonData.push(newUser)

        // fs.writeFileSync(userscopyJson, JSON.stringify(jsonData), 'utf-8', (err) => {
        //     if (err) throw err; 
        //     console.log('data added to file');
        // })

        toast(`יצרת חשבון חדש בהצלחה! ברוך הבא ${nameInput}`, { type: 'success', rtl: true, icon: peppy })

    }

    //*------------------------------------------------------------------------------------------------------------------------------

    function addUserToJson(userObj) {
        const currentUsersData = fs.readFileSync(userscopyJson)
        const jsonData = JSON.parse(currentUsersData)

        jsonData.push(userObj)

        fs.writeFileSync(userscopyJson, JSON.stringify(jsonData), 'utf-8', (err) => {
            if (err) throw err; 
            console.log('data added to file');
        })
    }


    return (
        <div className='login-container'>
            {/* <Label size={20} bgcolor={'transparent'} icon={user} text={' הוספת משתמש חדש'} border={'2px solid #d3d3d3'} clas={'vs-div'} /> */}
            {uName && isRegisteredUser &&
                <Label size={20} bgcolor={'transparent'} icon={peppy} text={`!${uName} שלום וברוך שובך `} border={'2px solid #d3d3d3'} clas={'vs-div'} />}
            {!isRegisteredUser &&
                <Label size={20} bgcolor={'transparent'} icon={user} text={' הרשמת משתמש חדש'} border={'2px solid #d3d3d3'} clas={'vs-div'} />
            }


            {!isRegisteredUser && <InputField
                type='text'
                label='שם משתמש'
                icon={'👤'}
                setText={setNameInput}
                id={'userName'}
            />}
            <InputField
                type='email'
                label='דואר אלקטרוני'
                icon={'📧'}
                setText={setEmailInput}
                doFunction={sessionRunningSignIn}
                id={'userEmail'}
            />
            <InputField
                type='password'
                label='סיסמה'
                icon={'🔑'}
                setText={setPwdInput}
                id={'userPwd'}
            />
            {isRegisteredUser && <div className='link'><a >שכחתי סיסמה</a></div>}
            {!isRegisteredUser && <InputField
                type='password'
                label='אשר את סיסמה'
                icon={'🔐'}
                setText={setPwdValidInput}
                id={'userPwd2'}
            />}

            {isRegisteredUser ?
                <Button
                    size={16}
                    text={'כניסה עם דוא"ל וסיסמה'}
                    icon={peppy} clas={'center-self'}
                    doFunction={signIn}
                    toggle={setIs}
                /> :
                <Button
                    size={16}
                    text={'יצירת משתמש חדש'}
                    icon={peppy} clas={'center-self'}
                    toggle={setIs}
                    doFunction={validateNewUserData}
                />}
            {isRegisteredUser ?
                <Button
                    size={16}
                    border={'2px solid #ff6c00'}
                    bgcolor={'transparent'}
                    text={'הרשמה'}
                    icon={peppy}
                    clas={'center-self'}
                    toggle={setIsRegisteredUser}
                    doFunction={preRegistrationMessage}

                /> :
                <Button
                    size={16}
                    border={'2px solid #ff6c00'}
                    bgcolor={'transparent'}
                    text={'חזור'}
                    icon={closeX}
                    clas={'center-self'}
                    toggle={setIs} />
            }

        </div>
    )
};

