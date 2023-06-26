import { motion } from 'framer-motion';
import Header from '../components/Header'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import EditProfile from '../components/EditProfile';

interface ModalProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: User;
}

interface User {
    id: {
        timestamp: number;
        date: string;
    };
    fullName: string;
    mailId: string;
    password: string;
    verificationToken: {
        userToken: string;
        expiryDate: string;
    };
    roles: Array<{
        authority: string;
    }>;
    profileImageUrl: string;
    enabled: boolean;
    verified: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    username: string;
    authorities: Array<{
        authority: string;
    }>;
}

const MyProfile: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            // navigate("/sign-in")
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
                <ProfileCard profileImageUrl={loggedInUser.profileImageUrl}/>
                <EditProfile />
            </div>
        </motion.div>
    )
}

export default MyProfile