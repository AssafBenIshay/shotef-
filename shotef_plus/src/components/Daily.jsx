import React from 'react';
import Title from './elements/Title';
import Ratio from './Ratio';


export default function Daily(params) {
    const fakeData = {
        "result": "success",
        "provider": "https://www.exchangerate-api.com",
        "documentation": "https://www.exchangerate-api.com/docs/free",
        "terms_of_use": "https://www.exchangerate-api.com/terms",
        "time_last_update_unix": 1729814551,
        "time_last_update_utc": "Fri, 25 Oct 2024 00:02:31 +0000",
        "time_next_update_unix": 1729901981,
        "time_next_update_utc": "Sat, 26 Oct 2024 00:19:41 +0000",
        "time_eol_unix": 0,
        "base_code": "ILS",
        "rates": {
            "ILS": 1,
            "AED": 0.970477,
            "AFN": 17.670227,
            "ALL": 24.173516,
            "AMD": 102.874065,
            "ANG": 0.473017,
            "AOA": 249.280915,
            "ARS": 260.642801,
            "AUD": 0.39818,
            "AWG": 0.473017,
            "AZN": 0.449897,
            "BAM": 0.47815,
            "BBD": 0.52851,
            "BDT": 31.534522,
            "BGN": 0.478277,
            "BHD": 0.09936,
            "BIF": 768.292112,
            "BMD": 0.264255,
            "BND": 0.348405,
            "BOB": 1.828039,
            "BRL": 1.505748,
            "BSD": 0.264255,
            "BTN": 22.2151,
            "BWP": 3.54887,
            "BYN": 0.864715,
            "BZD": 0.52851,
            "CAD": 0.365805,
            "CDF": 750.326044,
            "CHF": 0.228788,
            "CLP": 250.090209,
            "CNY": 1.880904,
            "COP": 1141.440276,
            "CRC": 136.23263,
            "CUP": 6.342124,
            "CVE": 26.956977,
            "CZK": 6.179549,
            "DJF": 46.963693,
            "DKK": 1.821813,
            "DOP": 15.945783,
            "DZD": 35.354615,
            "EGP": 12.880752,
            "ERN": 3.963828,
            "ETB": 31.272495,
            "EUR": 0.244475,
            "FJD": 0.579094,
            "FKP": 0.203683,
            "FOK": 1.821849,
            "GBP": 0.203686,
            "GEL": 0.7191,
            "GGP": 0.203683,
            "GHS": 4.334111,
            "GIP": 0.203683,
            "GMD": 18.683388,
            "GNF": 2272.278348,
            "GTQ": 2.045595,
            "GYD": 55.221119,
            "HKD": 2.052842,
            "HNL": 6.662472,
            "HRK": 1.841993,
            "HTG": 34.788146,
            "HUF": 98.719758,
            "IDR": 4129.549199,
            "IMP": 0.203683,
            "INR": 22.233697,
            "IQD": 345.69776,
            "IRR": 11114.374034,
            "ISK": 36.431194,
            "JEP": 0.203683,
            "JMD": 42.009205,
            "JOD": 0.187357,
            "JPY": 40.179652,
            "KES": 34.065356,
            "KGS": 22.434018,
            "KHR": 1076.586327,
            "KID": 0.398188,
            "KMF": 120.273551,
            "KRW": 364.468683,
            "KWD": 0.080856,
            "KYD": 0.220213,
            "KZT": 128.256554,
            "LAK": 5806.097829,
            "LBP": 23650.837655,
            "LKR": 75.923995,
            "LRD": 50.923432,
            "LSL": 4.672174,
            "LYD": 1.271606,
            "MAD": 2.604838,
            "MDL": 4.753055,
            "MGA": 1213.681306,
            "MKD": 15.016584,
            "MMK": 555.275855,
            "MNT": 888.390244,
            "MOP": 2.113753,
            "MRU": 10.522214,
            "MUR": 12.143987,
            "MVR": 4.077326,
            "MWK": 461.174522,
            "MXN": 5.23776,
            "MYR": 1.148181,
            "MZN": 16.838544,
            "NAD": 4.672174,
            "NGN": 435.473076,
            "NIO": 9.731618,
            "NOK": 2.890515,
            "NPR": 35.54416,
            "NZD": 0.439564,
            "OMR": 0.101605,
            "PAB": 0.264255,
            "PEN": 0.991757,
            "PGK": 1.050814,
            "PHP": 15.314775,
            "PKR": 73.312976,
            "PLN": 1.063823,
            "PYG": 2094.14557,
            "QAR": 0.961889,
            "RON": 1.218679,
            "RSD": 28.598897,
            "RUB": 25.453018,
            "RWF": 371.686888,
            "SAR": 0.990957,
            "SBD": 2.177859,
            "SCR": 3.616792,
            "SDG": 135.032912,
            "SEK": 2.792249,
            "SGD": 0.348428,
            "SHP": 0.203683,
            "SLE": 5.983024,
            "SLL": 5983.003252,
            "SOS": 150.882897,
            "SRD": 8.894338,
            "SSP": 909.497667,
            "STN": 5.989624,
            "SYP": 3446.614584,
            "SZL": 4.672174,
            "THB": 8.894399,
            "TJS": 2.825429,
            "TMT": 0.926198,
            "TND": 0.818125,
            "TOP": 0.600301,
            "TRY": 9.059024,
            "TTD": 1.795794,
            "TVD": 0.398188,
            "TWD": 8.456991,
            "TZS": 717.739384,
            "UAH": 10.91259,
            "UGX": 965.728418,
            "USD": 0.264256,
            "UYU": 10.956126,
            "UZS": 3393.581878,
            "VES": 10.80286,
            "VND": 6699.755352,
            "VUV": 30.73384,
            "WST": 0.704081,
            "XAF": 160.364735,
            "XCD": 0.713489,
            "XDR": 0.198464,
            "XOF": 160.364735,
            "XPF": 29.173627,
            "YER": 66.241241,
            "ZAR": 4.672171,
            "ZMW": 6.973168,
            "ZWL": 7.252133
        }
    }
    const [res, setRes] = React.useState(fakeData)
    const [exchange, setExchange] = React.useState([])
    const [currencies, setCurrencies] = React.useState(['USD', 'CAD', 'EUR', 'GBP'])

    //fillSetExchange()

    React.useEffect(() => {
        //getExchangeData()



        async function getExchangeData() {
            const api = 'https://open.er-api.com/v6/latest/ILS';
            try {
                const response = await fetch(api)
                if (!response.ok) {
                    throw new Error(`Response Status: ${response.status}`)
                }

                const data = await response.json()
                setRes(data)

            } catch (error) {
                console.error(error.message)
            }

        }
    }, [])

    return (
        <div className='currency-div'>
            <Title size={22} text={'שערי מטבע'} key={crypto.randomUUID()} />

            {currencies.map((currency) => (

                <Ratio currency={currency} key={crypto.randomUUID()} rate={res?.rates[currency]} />
            ))}

        </div>
    )
};

//rate={res.rates[currency]} 