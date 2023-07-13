import { motion } from 'framer-motion';
import Header from '../components/Header'
import PublicBoards from '../components/PublicBoards'
import YourBoards from '../components/YourBoards'
import { UserState } from '../interfaces/types';
import { useState } from 'react';

interface ModalProps {
  modalOpen: boolean;
  isLoggedIn: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleLogout: () => void;
  loggedInUser: UserState | null;
}

const Dashboard: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, openModal, closeModal, modalOpen, loggedInUser }) => {

  const [publicBoard, setPublicBoard] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
      {isLoggedIn && <div className='flex justify-between md:hidden border-b-2 border-gray-200 container mx-auto w-full'>
        <button
          type="button"
          onClick={() => setPublicBoard(false)}
          className={`p-4 bg-transparent font-bold text-gray-600 w-full ${!publicBoard ? "opacity-100 border-b-4 border-primaryBlue" : "opacity-50"}`}>
          You boards
        </button>
        <button
          type="button"
          onClick={() => setPublicBoard(true)}
          className={`p-4 bg-transparent font-bold text-gray-600 w-full ${publicBoard ? "opacity-100 border-b-4 border-primaryBlue" : "opacity-50"}`}>
          Public boards
        </button>
      </div>}
      <div className='block md:hidden'>
        {!publicBoard ? isLoggedIn && <YourBoards modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} isLoggedIn={isLoggedIn} loggedInUser={loggedInUser} />
          : <PublicBoards />}
      </div>
      <div className='hidden md:block'>
        {isLoggedIn && <YourBoards modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} isLoggedIn={isLoggedIn} loggedInUser={loggedInUser} />}
        <PublicBoards />
      </div>

    </motion.div>
  )
}

export default Dashboard