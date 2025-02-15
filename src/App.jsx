import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Navbar />
      <div className='min-h-[97]'>
      <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
