import './App.css'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { useEffect, useState } from 'react'
import Context from './util/Context'
import { toast } from 'react-toastify'
import axios from 'axios'
import UrlList from './components/app/UrlList'
import useSWR from 'swr'
import fetcher from './util/fetcher'
const ENV = import.meta.env

function App() {
  const [session, setSession] = useState(null)

  const getSession = async () => {
    try {
      const { data } = await useSWR('/api/session', fetcher)

      setSession(data)
      return data
    } catch (err) {
      console.error(
        'Session failed:',
        err.response?.data?.message || err.message
      )
      return null
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  return (
    <>
      <Context.Provider value={{ session, setSession }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/url-list' element={<UrlList />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  )
}

export default App
