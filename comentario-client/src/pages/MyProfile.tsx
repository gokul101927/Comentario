import { motion } from 'framer-motion';
import Header from '../components/Header'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import EditProfile from '../components/EditProfile';

import { UserState } from '../interfaces/types';

interface ModalProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: UserState | undefined;
    closeModal: () => void;
}

const MyProfile: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser, closeModal }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/sign-in")
        }
    }, [isLoggedIn, navigate])

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
            <div className='container mx-auto p-2 pt-8 flex flex-col gap-4 lg:flex-row'>
                <ProfileCard loggedInUser={loggedInUser} profileImageUrl={loggedInUser?.imageData.imageUrl} closeModal={closeModal}/>
                <EditProfile loggedInUser={loggedInUser} closeModal={closeModal} handleLogout={handleLogout}/>
            </div>
        </motion.div>
    )
}

export default MyProfile