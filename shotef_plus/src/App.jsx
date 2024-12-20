import './App.css'
import Menu from './components/Menu'
import Maam from './Maam'
import Gviya from './Gviya'
import Prisa from './Prisa'
import SettingsBtn from './components/elements/SettingsBtn'
import TimeP from './components/elements/TimeP'
import Title from './components/elements/Title'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React from 'react'



function App() {
  const [showMaam, setShowMaam] = React.useState(undefined)
  const [showGviya,setShowGviya] = React.useState(undefined)
  const [showPrisa,setShowPrisa] = React.useState(undefined)
  const [logedInUser, setLogedInUser] = React.useState(false)
  const [stat, setStat] = React.useState('menu')
  const [screen,setScreen] = React.useState('')
  
  function selectScreen() {
    if (stat === 'Maam') {
      setScreen(<Maam setShowMaam={setShowMaam} setStat={setStat} stat={stat}/>)
    } else if (stat === 'Gviya') {
      setScreen(<Gviya setShowGviya={setShowGviya} setStat={ setStat} stat={stat} />)
    } else if (stat === 'Prisa'){
      setScreen(<Prisa setShowGviya={setShowGviya} setStat={ setStat} stat={stat} />)
    } else if (stat === ''){
      setScreen('')
    }
  }

  React.useEffect(() => {
    selectScreen()
  },[stat])


  return (
    <div className='App' id='App'>
      <div className='top-bar'>
      {/* <SettingsBtn /> */}
      <TimeP />
      </div>
      <Title text='➕שוטף' size='40' />

      {screen}
      
      {/* {showMaam ?
        <Maam setShowMaam={setShowMaam} setStat={setStat} stat={stat}/> :''
      }
      {showGviya ?
        <Gviya setShowGviya={setShowGviya} /> :''
      } */}
      {!screen && <Menu
        setShowGviya={setShowGviya} showGviya={showGviya}
        setShowMaam={setShowMaam} showMaam={showMaam}
        setShowPrisa={setShowPrisa} showPrisa={showPrisa}
        logedInUser={logedInUser} setLogedInUser={setLogedInUser}
        setStat={setStat} stat={stat}

      />}


      
      <ToastContainer position='top-center' theme='dark' closeOnClick={true} />
    </div>
  )
}

export default App
