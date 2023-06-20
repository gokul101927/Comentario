import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Layout from './Layout'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { useState } from 'react'


function App() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <main>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sign-in" element={<Signin modalOpen={modalOpen} openModal={openModal} closeModal={closeModal}/>} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="*" element={<Navigate to="/dashboard"/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
