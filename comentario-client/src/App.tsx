import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Layout from './Layout'
import NotFound from './pages/NotFound'
import Auth from './pages/Auth'

function App() {

  return (
    <main>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Auth />} />
            <Route path="*" element={<NotFound/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
