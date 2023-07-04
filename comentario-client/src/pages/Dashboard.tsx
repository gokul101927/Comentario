import { motion } from 'framer-motion';
import Header from '../components/Header'
import PublicBoards from '../components/PublicBoards'
import YourBoards from '../components/YourBoards'
import { UserState } from '../interfaces/types';

interface ModalProps {
  modalOpen: boolean;
  isLoggedIn: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleLogout: () => void;
  loggedInUser: UserState | null;
}

const Dashboard: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, openModal, closeModal, modalOpen, loggedInUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
      { !isLoggedIn && <YourBoards modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}/>}
      <PublicBoards />
    </motion.div>
  )
}

export default Dashboard