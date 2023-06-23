import { useLocation, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Layout from '../Layout'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'

interface ModalProps {
    modalOpen: boolean;
    isLoggedIn: boolean;
    openModal: () => void;
    closeModal: () => void;
    handleLogout: () => void;
    handleLogin: (token: string) => void;
    loggedInUser: object;
}

const RoutesWithAnimation: React.FC<ModalProps> = ({handleLogout, isLoggedIn, openModal, closeModal, modalOpen, handleLogin, loggedInUser}) => {

    const location = useLocation();

    return (
        <Routes location={location} key={location.key}>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} loggedInUser={loggedInUser}/>} />
                <Route path="/sign-in" element={<Signin modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} handleLogin={handleLogin} />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="*" element={<Navigate to="/dashboard" />}></Route>
            </Route>
        </Routes>
    )
}

export default RoutesWithAnimation