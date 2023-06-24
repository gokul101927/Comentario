import Header from '../components/Header'
import PublicBoards from '../components/PublicBoards'
import YourBoards from '../components/YourBoards'

interface ModalProps {
  modalOpen: boolean;
  isLoggedIn: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleLogout: () => void;
  loggedInUser: object;
}

const Dashboard: React.FC<ModalProps> = ({handleLogout, isLoggedIn, openModal, closeModal, modalOpen, loggedInUser}) => {
  return (
    <div>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser}/>
        <YourBoards modalOpen={modalOpen} openModal={openModal} closeModal={closeModal} isLoggedIn={isLoggedIn}/>
        <PublicBoards/>
    </div>
  )
}

export default Dashboard