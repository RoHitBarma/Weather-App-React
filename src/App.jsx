import { useState } from 'react'
import './App.css'
import Weather from './components/Weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        {/* <h1>Weather App</h1> */}
        <Weather/>
      </div>
    </>
  )
}

export default App
