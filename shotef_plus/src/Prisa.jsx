import React from 'react'
import Title from './components/elements/Title'
import Button from './components/elements/Button'
import TableTitle from './components/elements/TableTitle'
import TableRow from './components/elements/TableRow'
import Plus from './assets/plus.png'
import Shekel from './assets/shekel.png'
import Close from './assets/close-X.png'
import Save from './assets/save.png'
import TableSum from './components/elements/TableSum'
import RowFiller from './components/elements/RowFiller'
import { toast } from 'react-toastify'
import InputField from './components/elements/InputField'
import PayTableTitle from './components/elements/PayTableTitle'
import PayTableRow from './components/elements/PayTableRow'


export default function Prisa({ setStat, stat }) {
    const [debtRows, setDebtRows] = React.useState([])
    const [dateToday, setDateToday] = React.useState(new Date())
    const [tRow, setTRow] = React.useState({
        id: 0,
        year: 0,
        month: 0,
        debt: 0
    })
    const [debt, setDebt] = React.useState(0)
    const [dYear, setDYear] = React.useState(new Date().getFullYear())
    const [dMonth, setDMonth] = React.useState(new Date().getMonth() + 1)
    const [dDay, setDDay] = React.useState(new Date().getDay() + 1)
    const [dRowNumber, setDRowNumber] = React.useState(1)
    const [is, setIs] = React.useState(false)
    const [isPaying, setIsPaying] = React.useState(false)
    const [isFinished, setIsFinished] = React.useState(false)
    const [totalDebt, setTotalDebt] = React.useState(0)
    const [totalPayment, setTotalPayment] = React.useState(0)
    const [yielded, setYielded] = React.useState(0)
    const [debtDelay, setDebtDelay] = React.useState(0)
    const [shotef, setShotef] = React.useState(0)
    const [result, setResult] = React.useState([])
    const [hasResult, setHasResult] = React.useState(false)
    const rowFillerSum = React.useRef(0)
    const total = React.useRef(0)


    React.useEffect(() => {
        if (debtRows.length > 0) {
            debtRows.forEach((debt) => {
                const td = totalDebt + parseFloat(debt.debt)
                setTotalDebt(td)
            })
        }
    }, [debtRows])

    function addDebt() {

        if (rowFillerSum.current.value !== '' && rowFillerSum.current.value !== '0') {
            setDRowNumber(last => last + 1)
            setIsPaying(true)

            const trow = {
                id: dRowNumber,
                year: dYear,
                month: dMonth,
                debt: debt
            }
            setTRow(trow)
            setDebtRows([...debtRows, trow])
            rowFillerSum.current.value = '' //zero's the rowFiller component upon completed input
        } else {
            toast('לא הוכנס סכום לגביה', { type: 'warning' })
        }
    }

    function calculate() {
        const tot = parseFloat(total.current.innerText) //סה"כ חובות לגבייה עד כה
        const pay = parseInt(totalPayment) //כמות התשלומים הרצויה
        const sho = parseInt(shotef) // דחיית התשלום הרצויה

        //console.log('shopay :>> ', pay);

        if (pay) {
            var result = Math.floor((tot / pay) * 100) / 100
            setYielded(result) //ממלא את "סכום כל המחאה לתשלום"
        }

        calcDebtDelay()
        calcCheckByDelayAndPaymentDivision(result, sho, pay)
    }

    function calcCheckByDelayAndPaymentDivision(res, sho, pay) {
        var totDelay = 0
        var distDates = []
        var currYear = new Date().getFullYear()
        var currMonth = new Date().getMonth()
        var currDay = new Date().getDate()

        if (sho && res) {
            totDelay = parseInt(sho - debtDelay)
            console.log('totDelay :>> ', totDelay);
        }

        for (let i = 0; i < totDelay; i++) {
            var amountOfDaysInSelectedMonth = checkDaysInCurrentMonth(currYear, currMonth)
            currDay + 1 > amountOfDaysInSelectedMonth ? currDay = 1 : currDay++
            currDay === 1 ? currMonth++ : currMonth
            if (currMonth > 12) {
                currMonth = 1
                currYear++
            }
        }

        if (pay % 2 === 0) { //taking back 15 days since the payment amount is a paired number
            var days = 0
            if (currDay < 16) {
                if (currMonth - 1 === 0) {
                    currMonth = 12
                    currYear--
                    days = checkDaysInCurrentMonth(currYear, currMonth)
                } else {
                    currMonth--
                    days = checkDaysInCurrentMonth(currYear, currMonth)
                }
                currDay = currDay - 15 + days
            } else {
                currDay -= 15
            }
        }
            
        //var midPaymentDivision = new Date(currYear, currMonth, currDay) // from here to count pay/2 back and start pushing 

        for (let index = 0; index < Math.floor(pay / 2); index++) {
            if (currMonth === 1) {
                currMonth = 12
                currYear--
            } else {
                currMonth--
            }
                
        }

        for (let j = 0; j < pay; j++) {
            var datePush = new Date(currYear, currMonth, currDay)
            distDates.push(datePush)
            currMonth++
            if (currMonth > 12) {
                currMonth = 1
                currYear++
            }
        }
            
        setResult(distDates)
        setHasResult(true)
    }

    //console.log('midPaymentDivision :>> ', midPaymentDivision);     // payment dates 
    //console.log('distDates :>> ', distDates);
    //debtDelay = ממוצע שוטף היום
    //sho = שוטף רצוי
    //res = סכום תשלום




    function calcDebtDelay() {
        var yieldedDelayValue = 0

        debtRows.forEach(debtRow => {
            const daysInCurrMonth = checkDaysInCurrentMonth(debtRow.year, debtRow.month - 1)
            const debtDate = new Date(debtRow.year, debtRow.month - 1, daysInCurrMonth)
            //console.log('debtDate :>> ', debtDate);
            const todayDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
            var diff = 0
            //console.log('todayDate > debtDate :>> ', todayDate > debtDate);
            //if (todayDate > debtDate) {
                diff = (todayDate - debtDate) / 86400000
            //}
            const currDebtShotef = diff * parseFloat(debtRow.debt)
            yieldedDelayValue += (currDebtShotef)
        })

        //console.log('yieldDelayValue :>> ', yieldedDelayValue);

        setDebtDelay(Math.floor(yieldedDelayValue / parseFloat(total.current.innerText))) // ממלא את "ממוצע החוב בימים עד כה"


    }

    function checkDaysInCurrentMonth(year, month) {


        var leapYear = false
        var shortMonth = [2, 4, 6, 9, 11]
        if (month === 2) {
            if (year % 4 === 0) {
                if (year % 100 !== 0) {
                    leapYear = true
                } else {
                    if (year % 400 === 0) {
                        leapYear = true
                    }
                }
            }

        }

        if (shortMonth.includes(month)) {
            if (month === 2) {
                if (leapYear) {
                    return 28
                } else {
                    return 29
                }
            } else {
                return 30
            }
        } else {
            return 31
        }
    }

    function saveCalculation() {
        
        return
    }


    return (
        <div className='menu'>
            <Title size={26} text={'פריסת תשלומים'} />
            <div className='table'>
                <Button bgcolor={'transparent'} border={'3px solid #f16c2255'}
                    text={'הוספת תאריך וסכום חוב לפי חודש'}
                    icon={Plus}
                    doFunction={addDebt}
                    clas={isFinished ? 'mute' : ''}
                    toggle={setIs}
                />
                <TableTitle />
                {debtRows.map((debtRow) => (

                    <TableRow rDebt={debtRow.debt} rMonth={debtRow.month} rNum={debtRow.id} rYear={debtRow.year} key={debtRow.id} />
                ))}

                <TableSum titleText={': סה"כ החובות לגבייה עד כה'} total={total} totalDebt={totalDebt} />
                {!isFinished && <RowFiller rowFillerSum={rowFillerSum} setDYear={setDYear} setDDay={setDDay} setDMonth={setDMonth} setDebt={setDebt} />}

                {isPaying && <Button
                    icon={Shekel}
                    text={'המשך לשלב פריסת התשלומים'}
                    bgcolor={'transparent'}
                    border={'solid 3px #20f42255'}
                    doFunction={() => {
                        setIsFinished(true)
                        calculate()
                    }}
                    toggle={setIs}
                    clas={isFinished ? 'mute' : ''}

                />}

                {isFinished && <InputField
                    doFunction={calculate}
                    icon={'💵'} label={'כמות התשלומים הרצויה'}
                    type={'number'} id={'short'}
                    setText={setTotalPayment}
                />}
                {isFinished && <InputField
                    doFunction={calculate}
                    icon={'🔢'} label={'(בימים) דחיית התשלום הרצויה'}
                    type={'number'} id={'short'}
                    setText={setShotef}

                />}
                {/* {isFinished && <Button
                    icon={Equal}
                    text={' חשב '}
                    bgcolor={'#2041FA55'}
                    border={'solid 3px #2022fa55'}
                    doFunction={() => { return }}
                    toggle={setIs}

                />}
 */}
                {isFinished && <TableSum titleText={'סכום כל המחאה לתשלום'} totalDebt={yielded} />}
                {isFinished && <TableSum titleText={'ממוצע החוב בימים עד כה'} totalDebt={debtDelay} />}

                {hasResult && <PayTableTitle />}
                {hasResult && result.map((line,i) => (
                    <PayTableRow date={
                        line <= dateToday? `${line.toLocaleDateString('he-il')} (מזומן)`:`${line.toLocaleDateString('he-il')}` 
                    } num={i} sum={yielded} key={i} />
                ))}

                {hasResult && ((shotef && totalPayment)||totalPayment) &&<Button
                    size={16}
                    border={'2px solid transparent'}
                    bgcolor={'#20f42255'}
                    text={'שמירה'}
                    icon={Save}
                    clas={'mg-top'}
                    doFunction={saveCalculation}
                    toggle={setIs}
                />}


                <Button
                    size={16}
                    border={'2px solid transparent'}
                    bgcolor={'#ff6c00'}
                    text={'חזור'}
                    icon={Close}
                    clas={'mg-top'}
                    doFunction={() => { setStat('') }}
                    toggle={setIs}
                />


            </div>
        </div>
    )

};
