import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Board, Feedback, Roadmaptype, UserState } from '../interfaces/types';
import { useEffect, useState } from 'react';

import api from '../api/apiConfig';
import { useNavigate, useParams } from 'react-router-dom';

interface ModalProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: UserState | undefined;
}

const Roadmap: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser }) => {

    const navigate = useNavigate();
    const params = useParams();
    const boardId = params.boardId;

    const [board, setBoard] = useState<Board>();
    const [plannedFeedbacks, setPlannedFeedbacks] = useState<Feedback[]>();
    const [inProgressFeedbacks, setInProgressFeedbacks] = useState<Feedback[]>();
    const [liveFeedbacks, setLiveFeedbacks] = useState<Feedback[]>();

    const [mobileRoadmapMenu, setMobileRoadmapMenu] = useState<Roadmaptype>(Roadmaptype.PLANNED);

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
        if (board) {
            setPlannedFeedbacks(board.feedbacks.filter((feedback => feedback.roadmap === Roadmaptype.PLANNED)));
            setInProgressFeedbacks(board.feedbacks.filter((feedback => feedback.roadmap === Roadmaptype.INPROGRESS)));
            setLiveFeedbacks(board.feedbacks.filter((feedback => feedback.roadmap === Roadmaptype.LIVE)));
        }
    }, [board])

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
            <div className='container mx-auto'>
                <div className='mt-8 cursor-pointer hidden lg:flex gap-2 items-center text-black hover:text-primaryBlue' onClick={() => navigate(-1)}>
                    <img
                        src="../src/assets/previous.png"
                        alt="feedback icon"
                        className=" h-5"
                    />
                    Go back</div>
                <div className="container mx-auto md:top-56 xl:top-0 p-4 mt-4 md:p-8 w-full h-16 shadow-xl bg-primaryWhite rounded-lg hidden lg:flex justify-between items-center">

                    <div className="flex items-center gap-2 md:gap-4">
                        <img
                            src="../src/assets/opinion.png"
                            alt="feedback icon"
                            className="h-6 md:h-8"
                        />
                        <h1 className="text-black font-bold text-base md:text-xl" >{board?.feedbacks.filter((feedback => feedback.roadmap !== Roadmaptype.NONE)).length} Roadmaps</h1>
                    </div>
                </div>
                <div className='flex justify-between lg:hidden border-b-2 border-gray-200 container mx-auto w-full'>
                    <button
                        type="button"
                        onClick={() => setMobileRoadmapMenu(Roadmaptype.PLANNED)}
                        className={`p-4 bg-transparent font-bold text-gray-600 w-full ${mobileRoadmapMenu === Roadmaptype.PLANNED ? "opacity-100 border-b-4 border-pink-500" : "opacity-50"}`}>
                        Planned
                    </button>
                    <button
                        type="button"
                        onClick={() => setMobileRoadmapMenu(Roadmaptype.INPROGRESS)}
                        className={`p-4 bg-transparent font-bold text-gray-600  w-full ${mobileRoadmapMenu === Roadmaptype.INPROGRESS ? "opacity-100 border-b-4 border-orange-500 " : "opacity-50"}`}>
                        In Progress
                    </button>
                    <button
                        type="button"
                        onClick={() => setMobileRoadmapMenu(Roadmaptype.LIVE)}
                        className={`p-4 bg-transparent font-bold text-gray-600 w-full ${mobileRoadmapMenu === Roadmaptype.LIVE ? "opacity-100 border-b-4 border-green-500" : "opacity-50"}`}>
                        Live
                    </button>
                </div>
                <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-4 py-4 p-2 justify-between">
                    <div className={`${mobileRoadmapMenu === Roadmaptype.PLANNED ? "flex" : "hidden"} lg:flex flex-col gap-2 w-full`}>
                        <h1 className='text-black font-bold'>Planned ({plannedFeedbacks?.length})</h1>
                        <p className='text-gray-500 text-sm'>Ideas prioritised for research</p>
                        {plannedFeedbacks && plannedFeedbacks.map((feedback, index) =>
                            <div key={index} className='bg-primaryWhite border-t-4 border-pink-500 rounded-lg'>
                                <div className="flex md:gap-8">
                                    <div className='p-4'>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-black font-bold">{feedback?.title}</h1>
                                                <span className="bg-bgColor rounded-xl text-primaryBlue p-2 text-sm shadow-xl font-bold">{feedback?.category}</span>
                                            </div>
                                            <p className="text-black text-sm">{feedback?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`${mobileRoadmapMenu === Roadmaptype.INPROGRESS ? "flex" : "hidden"} lg:flex flex-col gap-2 w-full`}>
                        <h1 className='text-black font-bold'>In Progress ({inProgressFeedbacks?.length})</h1>
                        <p className='text-gray-500 text-sm'>Currently being developed</p>
                        {inProgressFeedbacks && inProgressFeedbacks.map((feedback, index) =>
                            <div key={index} className='bg-primaryWhite border-t-4 border-orange-500 rounded-lg'>
                                <div className="flex md:gap-8">
                                    <div className='p-4'>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-black font-bold">{feedback?.title}</h1>
                                                <span className="bg-bgColor rounded-xl text-primaryBlue p-2 text-sm shadow-xl font-bold">{feedback?.category}</span>
                                            </div>
                                            <p className="text-black text-sm">{feedback?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`${mobileRoadmapMenu === Roadmaptype.LIVE ? "flex" : "hidden"} lg:flex flex-col gap-2 w-full`}>
                        <h1 className='text-black font-bold'>Live ({liveFeedbacks?.length})</h1>
                        <p className='text-gray-500 text-sm'>Released features</p>
                        {liveFeedbacks && liveFeedbacks.map((feedback, index) =>
                            <div key={index} className='bg-primaryWhite border-t-4 border-green-500 rounded-lg'>
                                <div className="flex md:gap-8 p-4">
                                    <div className='p-4'>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-black font-bold">{feedback?.title}</h1>
                                                <span className="bg-bgColor rounded-xl text-primaryBlue p-2 text-sm shadow-xl font-bold">{feedback?.category}</span>
                                            </div>
                                            <p className="text-black text-sm">{feedback?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </motion.div>
    )
}

export default Roadmap