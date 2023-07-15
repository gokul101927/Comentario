import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Board, UserState } from '../interfaces/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../api/apiConfig';

interface ModalProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: UserState | null;
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
            
            <div className='container mx-auto p-2 pt-8 flex flex-col gap-4 lg:flex-row'>
            <div className="bg-primaryWhite shadow flex flex-col items-center space-y-2 w-full lg:w-2/6 p-4 rounded-md">
                    <div className=''>
                        <img
                            src={board?.coverImageUrl}
                            alt="image"
                            className="rounded-md object-center object-cover h-44 w-full"
                        />
                        <div className="flex flex-col justify-between mt-4">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1 items-center">
                                    <h3 className="text-black font-bold py-2">{board?.title}</h3>
                                    {board?.self &&
                                        <img
                                            src="../src/assets/self.png"
                                            alt="self icon"
                                            className=" h-4"
                                        />}
                                </div>
                            </div>
                            <p className="text-black break-words">{board?.description}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full text-black font-bold bg-primaryWhite shadow h-full p-4 rounded-md'>You have total {board?.feedbacks.length} feedbacks.</div>
            </div>
        </motion.div>
    )
}

export default MyBoard