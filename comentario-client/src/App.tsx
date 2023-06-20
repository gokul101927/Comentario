import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Layout from './Layout'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import useAuthentication from "./components/useAuthentication";
import api from './api/apiConfig'

import { useEffect, useState } from 'react'

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const { isLoggedIn, login, logout } = useAuthentication();
  const [loggedInUser, setLoggedInUser] = useState({});

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const handleLogin = (token: string): void => {
    login(token);
  };

  const handleLogout = (): void => {
    logout();
  };

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('jwt');
      const config = {
        headers:{
          Authorization: token
        }
      };
      api.get('/users/user', config)
        .then((response) => {
          setLoggedInUser(response.data)})
        .catch(err => {
          console.error(err)
        })
    }
  }, [isLoggedIn])

  return (
    <main>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />}/>
            <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} modalOpen={modalOpen} openModal={openModal} closeModal={closeModal}/>} />
            <Route path="/sign-in" element={<Signin modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} handleLogin={handleLogin}/>} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="*" element={<Navigate to="/dashboard"/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
