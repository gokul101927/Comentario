import { motion } from 'framer-motion';
import Header from '../components/Header'
import PublicBoards from '../components/PublicBoards'
import YourBoards from '../components/YourBoards'

interface ModalProps {
  modalOpen: boolean;
  isLoggedIn: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleLogout: () => void;
  loggedInUser: UserState | null;
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

type UserState = Omit<User, 'password' | 'verificationToken'>;

const Dashboard: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, openModal, closeModal, modalOpen, loggedInUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
      { isLoggedIn && <YourBoards modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} isLoggedIn={isLoggedIn} mailId={loggedInUser?.mailId}/>}
      <PublicBoards />
    </motion.div>
  )
}

export default Dashboard