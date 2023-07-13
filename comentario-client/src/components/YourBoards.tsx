import AddBoardModal from "./AddBoardModal";
import { Board, UserState } from "../interfaces/types";
import DisplayBoard from "./DisplayBoard";
import { useState } from "react";
import EditBoardModal from "./EditBoardModal";

interface ModalProps {
  modalOpen: boolean;
  isLoggedIn: boolean;
  openModal: () => void;
  closeModal: () => void;
  loggedInUser: UserState | null;
}

const YourBoards: React.FC<ModalProps> = ({ modalOpen, openModal, closeModal, loggedInUser }) => {
  const [isEditModal, setEditModal] = useState(false);
  const [board, setBoard] = useState<Board>();
  
  const handleEditModal = (board: Board) => {
    setEditModal(true);
    setBoard(board);
    openModal();
  }

  return (
    <div>
      <div className='container mx-auto p-2 pt-8 flex flex-col'>
        <div className='flex justify-between items-center'>
          <h5 className='text-black'>Your Boards</h5>
          <button className="text-sm font-small font-bold text-white rounded-md p-2 bg-primaryBlue hover:brightness-125" onClick={openModal}>+ Add board</button>
        </div>
        <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-4 py-4">
          {loggedInUser && loggedInUser.boards.length > 0 && loggedInUser.boards.map((board, index) =>
            <DisplayBoard board={board} key={index} isYourBoard={true} isYourDashboard={false} handleEditModal={handleEditModal}/>)}
        </div>
        {loggedInUser && loggedInUser?.boards.length < 1 && 
        <div className='mt-4 py-4 rounded-lg border border-2 border-dashed border-black w-full'>
          <h2 className='text-gray-500 py-12 text-center'>No boards yet.</h2>
        </div>}
      </div>
      
      {modalOpen && !isEditModal && <AddBoardModal closeModal={closeModal} username={loggedInUser?.username} />}
      {modalOpen && isEditModal && <EditBoardModal closeModal={closeModal} board={board} />}
    </div>
  )
}

export default YourBoards