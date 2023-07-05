import { motion } from 'framer-motion';
import Header from "../components/Header";
import { UserState } from '../interfaces/types';
import { useNavigate } from 'react-router-dom';
import DisplayFeedback from '../components/DisplayFeedback';
import DisplayComment from '../components/DisplayComment';


interface ModalProps {
    modalOpen: boolean;
    isLoggedIn: boolean;
    openModal: () => void;
    closeModal: () => void;
    handleLogout: () => void;
    loggedInUser: UserState | null;
}

const Comment: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser, modalOpen, closeModal, openModal }) => {
    const navigate = useNavigate();
    const goBack = "< Go back";

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
            <div className="container mx-auto  p-2 pt-8 flex flex-col gap-4">
                <div className='cursor-pointer text-black hover:text-primaryBlue' onClick={() => navigate(-1)}> {goBack}</div>
                <div className='w-full md:w-10/12 mx-auto flex flex-col gap-4'>
                    <div className='shadow-xl '>
                        {/* <DisplayFeedback /> */}
                    </div>
                    <div className='container bg-primaryWhite rounded-md p-8 justify-between'>
                        <h1 className='text-black'>2 comments</h1>
                        <DisplayComment />
                    </div>
                    
                </div>

            </div>
        </motion.div>
    )
}

export default Comment