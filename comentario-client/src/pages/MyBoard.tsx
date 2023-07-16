import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Board, UserState } from '../interfaces/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../api/apiConfig';
import AllFeedbackChart from '../components/AllFeedbackChart';

interface ModalProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: UserState | undefined;
}

const MyBoard: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser }) => {

    const navigate = useNavigate();
    const params = useParams();
    const boardId = params.boardId;

    const [board, setBoard] = useState<Board>();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/sign-in")
        }
    }, [isLoggedIn, navigate])

    useEffect(() => {
        api.get(`/boards/board/${boardId}`)
            .then((response) => {
                console.log(response.data);
                setBoard(response.data);
            })
            .catch(err => {
                console.error(err)
            })

    }, [boardId])

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />

            <div className='container mx-auto p-2 pt-8 flex flex-col gap-4'>
                <div>
                    <h1 className='text-black font-bold underline'>{board?.title}</h1>
                </div>
                <div>
                <div className='w-full text-black font-bold bg-primaryWhite shadow p-4 rounded-md'>
                    <div>
                        <h1 className='text-gray-400 font-bold'>Feedbacks received</h1>
                        <AllFeedbackChart feedbacks={board?.feedbacks}/>
                    </div>
                </div>
                </div>
                
            </div>
        </motion.div>
    )
}

export default MyBoard