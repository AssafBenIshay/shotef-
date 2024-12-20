import React from 'react'
import Title from './components/elements/Title'
import Button from './components/elements/Button'
import TableTitle from './components/elements/TableTitle'
import TableRow from './components/elements/TableRow'
import Plus from './assets/plus.png'
import Shekel from './assets/shekel.png'
import Equal from './assets/equal.png'
import Again from './assets/again.png'
import Close from './assets/close-X.png'
import TableSum from './components/elements/TableSum'
import RowFiller from './components/elements/RowFiller'
import { toast } from 'react-toastify'

export default function Gviya({ setStat, stat }) {
    const [debtRows, setDebtRows] = React.useState([])
    const [paymentRows, setPaymentRows] = React.useState([])
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
    const [pRowNumber, setPRowNumber] = React.useState(1)
    const [is, setIs] = React.useState(false)
    const [isPaying, setIsPaying] = React.useState(false)
    const [isCalculating, setIsCalculating] = React.useState(false)
    const [totalDebt, setTotalDebt] = React.useState(0)
    const [totalPayment, setTotalPayment] = React.useState(0)
    const [shotef, setShotef] = React.useState(0)
    const total = React.useRef(0)
    const rowFillerSum = React.useRef(0)

    React.useEffect(() => {


        if (debtRows.length > 0) {
            debtRows.forEach((debt) => {
                const td = totalDebt + parseFloat(debt.debt)
                setTotalDebt(td)
            })
        }
    }, [debtRows])

    React.useEffect(() => {


        if (paymentRows.length > 0) {
            paymentRows.forEach((payment) => {
                const tp = totalPayment + parseFloat(payment.debt)
                setTotalPayment(tp)
            })
        }

    }, [paymentRows])

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


    function calculatePayments() {
        //console.log('----------- calculatePayments ---------------');
        if (paymentRows.length > 0) {
            setIsCalculating(true)
            var payAccum = 0
            const deb = []
            const pay = []


            for (let i = 0; i < debtRows.length; i++) {
                deb.push(parseFloat(debtRows[i].debt))
            }
            for (let j = 0; j < paymentRows.length; j++) {
                pay.push(parseFloat(paymentRows[j].debt))
            }

            //console.log('deb pay :>> ', deb,pay);
            for (let i = 0; i < deb.length; i++) {
                for (let j = 0; j < pay.length; j++) {
                    const d = deb[i]
                    const p = pay[j]
                    const daysCalc = checkDaysInCurrentMonth(debtRows[i].year, debtRows[i].month)
                    const debtDate = new Date(debtRows[i].year, debtRows[i].month - 1, daysCalc)
                    const payDate = new Date(paymentRows[j].year, paymentRows[j].month - 1, paymentRows[j].day)
                    const daysDiff = (payDate - debtDate) / 86400000

                    if ((d - p) >= 0) {

                        deb[i] = (d - p)

                        payAccum += (p * daysDiff)
                    } else if ((d - p) < 0) {
                        pay[j] = (p - d)

                        payAccum += ((p - d) * daysDiff)
                    }
                }
            }

            //console.log(`----------- deb ${deb[0].debt} ---------------`);
            //console.log(`----------- debtrows ${debtRows[0].debt} ---------------`);

            setShotef(Math.floor(payAccum / totalPayment))
        } else {
            toast('לא ניתן לחשב ממוצע שוטף כאשר עדיין לא הוכנס תשלום', { type: 'error' })
        }
    }


    // function calculatePayments() { //! working version with bugs
    //     console.log('----------- calculatePayments ---------------');

    //     var payAccum = 0
    //     const deb = []
    //     const pay = []


    //     for (let i = 0; i < debtRows.length; i++){
    //         deb.push(debtRows[i])
    //     }
    //     for (let j = 0; j < paymentRows.length; j++){
    //         pay.push(paymentRows[j])
    //     }


    //         for (let i = 0; i < deb.length; i++) {
    //             for (let j = 0; j < pay.length; j++) {
    //                 const d = parseFloat(deb[i].debt)
    //                 const p = parseFloat(pay[j].debt)
    //                 const daysCalc = checkDaysInCurrentMonth(deb[i].year, deb[i].month)
    //                 const debtDate = new Date(deb[i].year, deb[i].month - 1, daysCalc)
    //                 const payDate = new Date(pay[j].year, pay[j].month - 1, pay[j].day)
    //                 const daysDiff = (payDate - debtDate) / 86400000

    //                 if ((d - p) >= 0) {

    //                     deb[i].debt = (d - p).toString() //!!!!

    //                     payAccum += (p * daysDiff)
    //                 } else if ((d - p) < 0) {
    //                     pay[j].debt = (p - d).toString()

    //                     payAccum += ((p - d) * daysDiff)
    //                 }
    //             }
    //         }

    //     console.log(`----------- deb ${deb[0].debt} ---------------`);
    //     console.log(`----------- debtrows ${debtRows[0].debt} ---------------`);

    //     setShotef(Math.floor(payAccum / totalPayment))
    // }


    function addPayment() {

        setIsPaying(true)
        //console.log('rowFillerSum.current :>> ', rowFillerSum.current.value);
        if (rowFillerSum.current.value !== '' && rowFillerSum.current.value !== '0') {
            setPRowNumber(last => last + 1)
            const debtT = rowFillerSum.current.value
            const trow = {
                id: pRowNumber,
                year: dYear,
                month: dMonth,
                day: dDay,
                //debt: debt
                debt: debtT
            }
            //console.log('trow.debt :>> ', trow.debt);
            setTRow(trow)
            //console.log('trow :>> ', trow);
            setPaymentRows([...paymentRows, trow])
            //console.log('paymentRows :>> ', paymentRows);
            rowFillerSum.current.value = '' //zero's the rowFiller component upon completed input
        } else {
            toast('לא הוכנס סכום לתשלום', { type: 'warning' })
        }
    }

    function addDebt() {


        if (rowFillerSum.current.value !== '' && rowFillerSum.current.value !== '0') {
            setDRowNumber(last => last + 1)

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
            toast('לא הוכנס סכום לגבייה', { type: 'warning' })
        }
    }

    function resetCalculation() {


        setDebtRows([])
        setPaymentRows([])
        setDebt(0)
        setDYear(new Date().getFullYear())
        setDMonth(new Date().getMonth() + 1)
        setDDay(new Date().getDay() + 1)
        setDRowNumber(1)
        setPRowNumber(1)
        setIs(false)
        setIsPaying(false)
        setIsCalculating(false)
        setTotalDebt(0)
        setTotalPayment(0)
        shotef ? setShotef(0) : null
        total = React.useRef(0)
        rowFillerSum = React.useRef(0)
        setTRow({
            id: 0,
            year: 0,
            month: 0,
            debt: 0
        })

    }
    return (
        <div className='menu'>
            <Title size={26} text={'גבייה'} />
            <div className='table'>
                <Button bgcolor={'transparent'} border={'3px solid #f16c2255'}
                    text={'הוספת תאריך וסכום חוב לפי חודש'} doFunction={addDebt}
                    icon={Plus}
                    toggle={setIs}
                    setStat={setStat}
                    stat={stat}
                    clas={isPaying ? 'mute' : ''}
                />
                <TableTitle />
                {debtRows.map((debtRow) => (

                    <TableRow rDebt={debtRow.debt} rMonth={debtRow.month} rNum={debtRow.id} rYear={debtRow.year} key={debtRow.id} />
                ))}

                <TableSum totalDebt={totalDebt} total={total} titleText={': סה"כ החובות לגבייה עד כה'} />
                <RowFiller dMonth={dMonth} setDebt={setDebt} setDYear={setDYear} setDMonth={setDMonth} setDDay={setDDay} isPaying={isPaying} rowFillerSum={rowFillerSum} />
                {(debtRows.length > 0) && <Button bgcolor={'transparent'} border={'solid 3px #20f42255'}
                    text={'הוספת תאריך וסכום ההמחאה ששולמה לפי חודש'} doFunction={addPayment}
                    icon={Shekel}
                    toggle={setIs}
                    setStat={setStat}
                    stat={stat}
                    clas={isCalculating ? 'mute' : ''}
                />}
                {isPaying && <TableTitle dDay={dDay ? dDay : ''} />}
                {isPaying &&
                    paymentRows.map((paymentRow) => (
                        <TableRow rDebt={paymentRow.debt} rMonth={paymentRow.month} rNum={paymentRow.id} rYear={paymentRow.year} rDay={paymentRow.day} key={paymentRow.id} />
                    ))
                }

                {isPaying && <TableSum totalDebt={totalPayment} total={total} titleText={': סה"כ התשלומים עד כה'} />}
                {isPaying && <TableSum totalDebt={totalDebt - totalPayment} total={total}
                    titleText={(totalDebt - totalPayment) >= 0 ? 'יתרת חוב לחישוב זה' : ': יתרת זכות לחישוב זה'} />}
                {isPaying && <Button bgcolor={'transparent'} border={'1px solid #646cff'}
                    text={'חישוב הממוצע השוטף'} doFunction={calculatePayments}
                    icon={Equal}
                    toggle={setIs}
                    setStat={setStat}
                    stat={stat}
                />}
                {isPaying && <p>
                    {shotef}
                </p>}
                {isPaying && <Button bgcolor={'#457a5ea0'} border={'1px solid #646cff'}
                    text={'  התחל חישוב מחדש'} doFunction={resetCalculation}
                    icon={Again}
                    toggle={setIs}
                    setStat={setStat}
                    stat={stat} />}
            </div>
            <Button
                size={16}
                border={'2px solid transparent'}
                bgcolor={'#ff6c00'}
                text={'חזור'}
                icon={Close}
                clas={'mg-bottom'}
                doFunction={() => { setStat('') }}
                toggle={setIs}
            />
        </div>
    )
};
