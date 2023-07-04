import AddBoardModal from "./AddBoardModal";
import { UserState } from "../interfaces/types";
import DisplayBoard from "./DisplayBoard";

interface ModalProps {
  modalOpen: boolean;
  isLoggedIn: boolean;
  openModal: () => void;
  closeModal: () => void;
  loggedInUser: UserState | null;
}

const YourBoards: React.FC<ModalProps> = ({ modalOpen, openModal, closeModal, loggedInUser }) => {
  return (
    <div>
      <div className='container mx-auto p-2 pt-8 flex flex-col'>
        <div className='flex justify-between items-center'>
          <h5 className='text-black'>Your Boards</h5>
          <button className="text-sm font-small font-bold text-white rounded-md p-2 bg-primaryBlue hover:brightness-125" onClick={openModal}>+ Add board</button>
        </div>
        <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-4 py-4">
          {loggedInUser && loggedInUser.boards.length > 0 && loggedInUser.boards.map((board, index) =>
            <DisplayBoard board={board} key={index} />)}
        </div>
        {loggedInUser && !loggedInUser?.boards && 
        <div className='mt-4 py-4 rounded-lg border border-2 border-dashed border-black w-full'>
          <h2 className='text-gray-500 py-12 text-center'>No boards yet.</h2>
        </div>}
      </div>
      
      {modalOpen && <AddBoardModal closeModal={closeModal} username={loggedInUser?.username} />}
    </div>
  )
}

export default YourBoards