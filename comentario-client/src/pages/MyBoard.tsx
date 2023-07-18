import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Board, UserState } from '../interfaces/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../api/apiConfig';
import AllFeedbackChart from '../components/AllFeedbackChart';
import SentimentAnalysisBoard from '../components/SentimentAnalysisBoard';

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
    const [commentCount, setCommentCount] = useState(0);
    const [upvoteCount, setUpvoteCount] = useState(0);

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

    useEffect(() => {
        let overallCommentCount = 0
        let overallUpvoteCount = 0
        board?.feedbacks.forEach((feedback) => {
            overallCommentCount += feedback.comments.length
            overallUpvoteCount += feedback.upVoteCount;
        })
        setCommentCount(overallCommentCount);
        setUpvoteCount(overallUpvoteCount);
    }, [board])

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />

            <div className='container mx-auto p-2 pt-8 flex flex-col gap-4'>
                <div>
                    <h1 className='text-black font-bold text-xl py-1'>{board?.title}</h1>
                    <h4 className='text-gray-400 font-bold text-md '>{board?.description}</h4>
                </div>
                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4'>
                    <div className='text-black font-bold bg-primaryWhite shadow p-4 rounded-md'>
                        <div className='w-full'>
                            <h1 className='text-gray-500 font-bold'>Feedbacks received</h1>
                            <AllFeedbackChart feedbacks={board?.feedbacks} />
                        </div>
                    </div>
                    <div className='text-black font-bold bg-primaryWhite shadow p-4 rounded-md'>
                        <div>
                            <h1 className='text-gray-500 font-bold'>No. of times users viewed your webpage from here.</h1>
                            <h1 className='text-[42px] font-bold text-primaryBlue opacity-70 py-16 text-center'>{board?.urlClickCount} times</h1>
                        </div>
                    </div>
                    <div className='text-black font-bold bg-primaryWhite shadow p-4 rounded-md'>
                        <div>
                            <h1 className='text-gray-500 font-bold'>Your board received.</h1>
                            <h1 className='text-[28px] leading-10 font-bold text-primaryBlue opacity-70  py-12 text-center'>{upvoteCount} upvotes and {commentCount} comments from {board?.feedbacks.length} feedbacks.</h1>
                        </div>
                    </div>

                </div>
                <div>
                    <SentimentAnalysisBoard feedbacks={board?.feedbacks} comments={undefined} isCommentsSentiment={false}/>
                </div>
            </div>
        </motion.div>
    )
}

export default MyBoard