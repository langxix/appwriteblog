import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-white w-full'>
      <div className='w-full block'>
        <Header />
        <main>
        <h1 className=" mt-4 inline-block rounded-full bg-gray-50 px-3 py-1 text-lg font-semibold text-black"> POSTS </h1> 
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App