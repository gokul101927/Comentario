import { motion } from 'framer-motion';
import Header from "../components/Header";
import { Feedback, UserState } from '../interfaces/types';
import { useNavigate, useParams } from 'react-router-dom';
import DisplayFeedback from '../components/DisplayFeedback';
import DisplayComment from '../components/DisplayComment';
import PostComment from '../components/PostComment';
import api from '../api/apiConfig';
import { useEffect, useState } from 'react';


interface ModalProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: UserState | undefined;
}

const Comment: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser }) => {
    const navigate = useNavigate();

    const params = useParams();
    const feedbackId = params.feedbackId;

    const [feedback, setFeedback] = useState<Feedback>();
    const [comment, commentAdded] = useState(false);

    useEffect(() => {
        api.get(`/feedbacks/feedback/${feedbackId}`)
            .then(response => {
                setFeedback(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })

    }, [feedbackId, comment]);

    const handleComment = (comment: string) => {
        const token = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: token,
            }
        };

        const requestBody = {
            profileUrl: loggedInUser?.imageData.imageUrl,
            username: loggedInUser?.username,
            commentTitle: comment
        }

        api.put(`/feedbacks/comment/post?id=${feedbackId}`, requestBody, config)
            .then(response => {
                console.log(response.data);
                commentAdded(true);
            })
            .catch(error => {
                console.error(error);
            })

    }

    const deleteComment = (commentId: string) => {
        console.log(commentId)
        const token = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: token,
            }
        };

        api.delete(`/feedbacks/${feedbackId}/delete-comment/${commentId}`, config)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
        
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
            <div className="container mx-auto  p-2 pt-8 flex flex-col gap-4">
                <div className='cursor-pointer flex gap-2 items-center text-black hover:text-primaryBlue' onClick={() => navigate(-1)}>
                    <img
                        src="../src/assets/previous.png"
                        alt="feedback icon"
                        className=" h-5"
                    />
                    Go back</div>
                <div className='w-full md:w-10/12 mx-auto flex flex-col gap-4'>
                    <div className='shadow-xl '>
                        <DisplayFeedback feedback={feedback} displayEditPlan={false} isSentimentBoard={false}/>
                    </div>
                    <div className='container bg-primaryWhite rounded-md p-8 justify-between'>
                        <h1 className='text-black font-bold'>{feedback?.comments.length} Comments</h1>
                        <div className="flex flex-col gap-4">

                            {feedback?.comments && feedback.comments.map((comment, index) =>
                                <DisplayComment loggedInUser={loggedInUser} key={index} comment={comment} deleteComment={deleteComment}/>)}
                        </div>
                    </div>
                    <PostComment handleComment={handleComment} isLoggedIn={isLoggedIn} />
                </div>

            </div>
        </motion.div>
    )
}

export default Comment