import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Layout from './Layout'
import Auth from './pages/Auth'
import { useState } from 'react'

interface State {
  modalOpen: boolean;
}

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
            <Route path="/sign-in" element={<Auth modalOpen={modalOpen} openModal={openModal} closeModal={closeModal}/>} />
            <Route path="/sign-up" element={<Auth />} />
            <Route path="*" element={<Navigate to="/dashboard"/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
