import { Link, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import { Board, UserState, FeedbackSortTypes, Category, Roadmaptype } from '../interfaces/types';
import Header from "../components/Header";
import api from "../api/apiConfig";
import AddFeedbackModal from "../components/AddFeedbackModal";
import { useEffect, useState } from "react";
import DisplayFeedbacksBasedOnConditions from "../components/DisplayFeedbacksBasedOnConditions";

interface ModalProps {
    modalOpen: boolean;
    isLoggedIn: boolean;
    openModal: () => void;
    closeModal: () => void;
    handleLogout: () => void;
    loggedInUser: UserState | undefined;
}

const Feedback: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser, modalOpen, closeModal, openModal }) => {

    const params = useParams();
    const boardId = params.boardId;

    const [board, setBoard] = useState<Board>();
    const [feedbackAdded, setFeedbackAdded] = useState(false);

    const [sortType, setSortType] = useState<FeedbackSortTypes>(FeedbackSortTypes.MostUpVotes);
    const [tagType, setTagType] = useState<Category>(Category.All);

    const [planned, setPlanned] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [live, setLive] = useState(0);

    useEffect(() => {
        api.get(`/boards/board/${boardId}`)
            .then((response) => {
                console.log(response.data);
                setBoard(response.data);

            })
            .catch(err => {
                console.error(err)
            })

    }, [feedbackAdded, boardId, sortType])

    useEffect(() => {
        if (board)
            setPlanned(board.feedbacks.filter((feedback => feedback.roadmap === Roadmaptype.PLANNED)).length);
        if (board)
            setInProgress(board.feedbacks.filter((feedback => feedback.roadmap === Roadmaptype.INPROGRESS)).length);
        if (board)
            setLive(board.feedbacks.filter((feedback => feedback.roadmap === Roadmaptype.LIVE)).length);
       
    }, [planned, board, inProgress, live])

    const handleFeedbackAdd = () => {
        setFeedbackAdded(true);
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
            <div className="container h-screen mx-auto p-2 pt-8 flex flex-col gap-4 xl:flex-row">
                <div className="hidden md:grid md:grid-cols-3 xl:flex xl:flex-row justify-between xl:justify-start gap-4 xl:flex-col xl:w-auto">
                    <Link target="_blank" rel="noopener noreferrer" to={board ? board.url : "#"}>
                        <div className="flex flex-1 flex-col px-6 py-4 justify-end rounded-xl bg-primaryWhite bg-gradient-to-r from-primaryBlue to-primaryWhite w-full xl:w-72 h-44">
                            <h1 className="font-bold word-wrap max-w-[210px]">{board?.title}</h1>
                            <h4 className="drop-shadow-xl text-sm">@{board?.username}</h4>
                        </div>
                    </Link>

                    <div className="flex flex-1 rounded-xl bg-primaryWhite w-full xl:w-72 h-44">
                        <div className="p-4 pt-8 flex flex-wrap gap-2">
                            {Object.values(Category).map((category, index) => (
                                <button key={index} className={`${tagType === category && "text-primaryWhite bg-primaryBlue"} bg-bgColor text-primaryBlue transition ease-in-out delay-150 duration-300 rounded-xl p-2 px-4 text-sm font-bold hover:text-primaryWhite hover:bg-primaryBlue`} onClick={() => {
                                    setTagType(category)
                                }}>{category}</button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-1 rounded-xl bg-primaryWhite w-full xl:w-72 h-44">
                        <div className="p-4 space-y-4 w-full">
                            <Link to={`/roadmap/${board?.id}`} className="text-primaryBlue font-bold text-sm hover:underline">View roadmap</Link>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                                    <p className="text-black text-sm">Planned</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold">{planned}</h4>
                                </div>

                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 bg-pink-500 rounded-full"></div>
                                    <p className="text-black text-sm">In progress</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold">{inProgress}</h4>
                                </div>

                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                    <p className="text-black text-sm">Live</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold">{live}</h4>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="container md:top-56 xl:top-0 p-4 md:p-8 w-full h-16 shadow-xl bg-primaryWhite rounded-lg flex justify-between items-center">
                        <div className="hidden md:flex items-center gap-2 md:gap-4">
                            <img
                                src="../src/assets/opinion.png"
                                alt="feedback icon"
                                className="h-6 md:h-8"
                            />
                            <h1 className="text-black font-bold text-base md:text-xl" >{board?.feedbacks.length} Feedbacks</h1>
                        </div>
                        <div className="flex flex-col lg:items-center md:flex-row">
                            <label htmlFor="sort" className=" text-black text-sm">Sort by: </label>
                            <select onChange={(e) =>{

                             setSortType(e.target.value as FeedbackSortTypes)
                             console.log(sortType)
                             }} id="sort" className="font-bold cursor-pointer text-black bg-transparent border-0 border-gray-200 appearance-none focus:outline-none focus:ring-0 peer">
                                {Object.values(FeedbackSortTypes).map((type) => (
                                    <option key={type} value={type} >{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col md:hidden">
                            <label htmlFor="sort" className=" text-black text-sm">Tags: </label>
                            <select onChange={(e) => setTagType(e.target.value as Category)} id="sort" className="font-bold cursor-pointer text-black bg-transparent border-0 border-gray-200 appearance-none focus:outline-none focus:ring-0 peer">
                                {Object.values(Category).map((category) => (
                                    <option key={category} value={category} >{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="text-sm font-bold text-white bg-primaryBlue rounded-md p-2 w-full hover:brightness-125"
                                onClick={openModal}
                                disabled={!isLoggedIn}>
                                + Add feedback
                            </button>
                        </div>
                    </div>
                    <div className="block md:hidden px-2">
                        <Link to={`/roadmap/${board?.id}`} className="text-primaryBlue font-bold text-sm hover:underline">View roadmap</Link>
                    </div>
                    <div className="container">
                        <DisplayFeedbacksBasedOnConditions feedbacks={board?.feedbacks} sortType={sortType} tagType={tagType} displayEditPlan={board?.username === loggedInUser?.username} isSentimentBoard={false}/>
                    </div>
                </div>
                {modalOpen && <AddFeedbackModal closeModal={closeModal} boardId={board?.id} username={loggedInUser?.username} profileUrl={loggedInUser?.profileImageUrl} handleFeedbackAdd={handleFeedbackAdd} />}
            </div>

        </motion.div>
    )
}

export default Feedback