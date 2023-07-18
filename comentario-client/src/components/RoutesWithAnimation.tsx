import { useLocation, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Layout from '../Layout'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import MyProfile from '../pages/MyProfile'
import { UserState } from '../interfaces/types'
import Feedback from '../pages/Feedback'
import Comment from '../pages/Comment'
import Roadmap from '../pages/Roadmap'
import MyDashboard from '../pages/MyDashboard'
import MyBoard from '../pages/MyBoard'

interface ModalProps {
    modalOpen: boolean;
    isLoggedIn: boolean;
    openModal: () => void;
    closeModal: () => void;
    handleLogout: () => void;
    handleLogin: (token: string) => void;
    loggedInUser: UserState | undefined;

}

const RoutesWithAnimation: React.FC<ModalProps> = ({handleLogout, isLoggedIn, openModal, closeModal, modalOpen, handleLogin, loggedInUser}) => {

    const location = useLocation();

    return (
        <Routes location={location} key={location.key}>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} loggedInUser={loggedInUser} />} />
                <Route path="/sign-in" element={<Signin modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} handleLogin={handleLogin} />} />
                <Route path="/sign-up" element={<Signup closeModal={closeModal}/>} />
                <Route path="/my-profile" element={<MyProfile isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} closeModal={closeModal}/>} />
                <Route path="/my-dashboard" element={<MyDashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} closeModal={closeModal}/>} />
                <Route path="/board/:boardId" element={<Feedback isLoggedIn={isLoggedIn} handleLogout={handleLogout} modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} loggedInUser={loggedInUser}/>} />
                <Route path="/my-board/:boardId" element={<MyBoard isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser}/>} />
                <Route path="/feedback/:feedbackId" element={<Comment isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser}/>} />
                <Route path="/roadmap/:boardId" element={<Roadmap isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser}/>} />
                <Route path="*" element={<Navigate to="/dashboard" />}></Route>
            </Route>
        </Routes>
    )
}

export default RoutesWithAnimation