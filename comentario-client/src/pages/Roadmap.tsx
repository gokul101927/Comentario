import { motion } from 'framer-motion';
import Header from '../components/Header';
import { UserState } from '../interfaces/types';

interface ModalProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: UserState | null;
}

const Roadmap: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
            
        </motion.div>
    )
}

export default Roadmap