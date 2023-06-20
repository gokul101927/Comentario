import Header from '../components/Header'
import PublicBoards from '../components/PublicBoards'
import YourBoards from '../components/YourBoards'

interface ModalProps {
  modalOpen: boolean;
  isLoggedIn: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleLogout: () => void;
}

const Dashboard: React.FC<ModalProps> = ({handleLogout, isLoggedIn, openModal, closeModal, modalOpen}) => {
  return (
    <div>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} modalOpen={modalOpen} openModal={openModal} closeModal={closeModal}/>
        <YourBoards/>
        <PublicBoards/>
    </div>
  )
}

export default Dashboard