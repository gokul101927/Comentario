import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Layout from './Layout'
import Auth from './pages/Auth'

function App() {

  return (
    <main>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sign-in" element={<Auth />} />
            <Route path="/sign-up" element={<Auth />} />
            <Route path="*" element={<Navigate to="/dashboard"/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
