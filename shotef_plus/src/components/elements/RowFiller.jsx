import React from 'react';
import './rowfiller.css';
import Plus from '../../assets/plus.png';

export default function RowFiller({ dMonth, setDebt, setDYear, setDMonth, setDDay, setRow, rowFillerSum, isPaying }) {
    const appBody = document.body
    const [year, setYear] = React.useState(new Date().getFullYear())
    const [day, setDay] = React.useState(new Date().getDate())
    const [month, setMonth] = React.useState(new Date().getMonth())
    const [t1, setT1] = React.useState((month - 2) < 0 ? month + 12 - 2 : month - 2)
    const [t2, setT2] = React.useState((month - 1) < 0 ? month + 12 - 1 : month - 1)
    const [m, setM] = React.useState(month)
    const [b2, setB2] = React.useState((month + 1) > 11 ? month - 12 + 1 : month + 1)
    const [b1, setB1] = React.useState((month + 2) > 11 ? month - 12 + 2 : month + 2)
    const [months, setMonths] = React.useState(['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
        'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'])
    const [daysDisplay, setDaysDisplay] = React.useState([day - 2, day - 1, day, day + 1, day + 2])

    React.useEffect(() => {
        setDYear(year)
    }, [year])
    React.useEffect(() => {
        setDDay(day)
    }, [day])


    function rollYear(e) {
        if (e.deltaY > 0) {
            setYear(last => last + 1)
        } else if (e.deltaY < 0) {
            setYear(last => last - 1)
        }

    }
    function rollDay(e) {
        var daysInCurrMonth = checkDaysInCurrentMonth()
        if (e.deltaY > 0) {

            if (day === daysInCurrMonth - 2) {

                setDay(last => last + 1)
                setDaysDisplay([daysInCurrMonth - 3, daysInCurrMonth - 2, daysInCurrMonth - 1, daysInCurrMonth, 1])
            } else if (day === daysInCurrMonth - 1) {
                setDay(last => last + 1)
                setDaysDisplay([daysInCurrMonth - 2, daysInCurrMonth - 1, daysInCurrMonth, 1, 2])
            } else if (day === daysInCurrMonth) {
                setDay(1)
                setDaysDisplay([daysInCurrMonth - 1, daysInCurrMonth, 1, 2, 3])
            } else if (day === 1) {
                setDay(last => last + 1)
                setDaysDisplay([daysInCurrMonth, 1, 2, 3, 4])
            } else {
                setDay(last => last + 1)
                setDaysDisplay([day - 1, day , day+1, day + 2, day + 3])
            }

        } else if (e.deltaY < 0) {
            if (day === 3) {
                setDay(last=>last-1)
                setDaysDisplay([daysInCurrMonth, 1, 2, 3, 4])
            } else if (day === 2) {
                setDay(last => last - 1)
                setDaysDisplay([daysInCurrMonth - 1, daysInCurrMonth, 1 , 2, 3])
            }
            else if (day === 1) {
                setDay(daysInCurrMonth)
                setDaysDisplay([daysInCurrMonth - 2, daysInCurrMonth - 1, daysInCurrMonth, 1, 2])
            } else if (day === daysInCurrMonth) {
                setDay(last => last - 1)
                setDaysDisplay([daysInCurrMonth - 3, daysInCurrMonth - 2, daysInCurrMonth - 1, daysInCurrMonth, 1])
            }
            else {
                setDay(last => last - 1)
                setDaysDisplay([day - 3, day - 2, day-1, day, day + 1])
            }
        }

    }

    function checkDaysInCurrentMonth() {
        var leapYear = false
        var shortMonth = [2, 4, 6, 9, 11]
        if (dMonth === 2) {
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

        if (shortMonth.includes(dMonth)) {
            if (dMonth === 2) {
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


    function rollMonth(e) {
        
        if (e.deltaY > 0) {
            const monthShift = months.shift()
            const monthConcat = months.concat([monthShift])
            setMonths(monthConcat)
            setMonth(last => last > 11 ? last - 12 + 1 : last++)
            setDMonth(last => last > 11 ? 1 : last + 1)
            setT1((month - 2) < 0 ? month + 12 - 2 : month - 2)
            setT2((month - 1) < 0 ? month + 12 - 1 : month - 1)
            setM(month)
            setB2((month + 1) > 11 ? month - 12 + 1 : month + 1)
            setB1((month + 2) > 11 ? month - 12 + 2 : month + 2)
            
            var daysInCurrMonth = checkDaysInCurrentMonth()
            if(day >=daysInCurrMonth){setDay(1)}
        }
        else if (e.deltaY < 0) {

            setMonth(last => last < 0 ? last + 12 - 1 : last--)
            setDMonth(last => last <= 1 ? 12 : last - 1)
            setT1((month - 2) < 0 ? month + 12 - 2 : month - 2)
            setT2((month - 1) < 0 ? month + 12 - 1 : month - 1)
            setM(month)
            setB2((month + 1) > 11 ? month - 12 + 1 : month + 1)
            setB1((month + 2) > 11 ? month - 12 + 2 : month + 2)

            const str = [months[11]]
            const mnths = months
            mnths.pop()
            const newArr = str.concat(mnths)
            setMonths(newArr)
        }
    }

    function preventScrolling(e) {
        appBody.style.borderRight = `17px solid gray`
        appBody.style.overflowY = 'hidden'
    }
    function returnScrolling(e) {
        appBody.style.overflowY = 'scroll'
        appBody.style.borderRight = 'none'
    }

    return (
        <div className={isPaying ? 'row-filler-day' : 'row-filler'} onMouseOver={preventScrolling} onMouseLeave={returnScrolling}>
            <div className='month' onWheel={(e) => rollMonth(e)}>
                <div className='t1'>{months[t1]}</div>
                <div className='t2'>{months[t2]}</div>
                <div className='m'>{months[m]}</div>
                <div className='b2'>{months[b2]}</div>
                <div className='b1'>{months[b1]}</div>
            </div>
            <input type='number' className='rf-inpt' ref={rowFillerSum}
                onChange={(e) => setDebt(e.target.value)} />
            <div className='year' onWheel={(e) => rollYear(e)}>
                <div className='t1'>{year - 2}</div>
                <div className='t2'>{year - 1}</div>
                <div id='dYearLbl' className='m'>{year}</div>
                <div className='b2'>{year + 1}</div>
                <div className='b1'>{year + 2}</div>

            </div>
            {isPaying && <div className='year' onWheel={(e) => rollDay(e)}>
                <div className='t1'>{daysDisplay[0]}</div>
                <div className='t2'>{daysDisplay[1]}</div>
                <div id='dDayLbl' className='m'>{daysDisplay[2]}</div>
                <div className='b2'>{daysDisplay[3]}</div>
                <div className='b1'>{daysDisplay[4]}</div>

            </div>}

            {/* <button className='add-row'><img src={Plus} /></button> */}
        </div>
    )
};
