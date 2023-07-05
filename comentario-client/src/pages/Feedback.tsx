import { Link, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import { Board, UserState } from '../interfaces/types';
import Header from "../components/Header";
import DisplayFeedback from "../components/DisplayFeedback";
import api from "../api/apiConfig";
import AddFeedbackModal from "../components/AddFeedbackModal";
import { useEffect, useState } from "react";

interface ModalProps {
    modalOpen: boolean;
    isLoggedIn: boolean;
    openModal: () => void;
    closeModal: () => void;
    handleLogout: () => void;
    loggedInUser: UserState | null;
}

const Feedback: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser, modalOpen, closeModal, openModal }) => {

    const params = useParams();
    const boardId = params.boardId;

    const [board, setBoard] = useState<Board>();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const config = {
                headers: {
                    Authorization: token
                }
            };
            api.get(`/boards/board/${boardId}`, config)
                .then((response) => {
                    console.log(response.data);
                    setBoard(response.data);
                })
                .catch(err => {
                    console.error(err)
                    localStorage.removeItem('jwt');
                    console.log("logged out")
                })
        }

    }, [boardId])

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
            <div className="container mx-auto p-2 pt-8 flex flex-col gap-4 xl:flex-row">
                <div className="hidden md:flex flex-row justify-between gap-4 xl:flex-col w-full xl:w-auto">
                    <div className="container flex flex-col px-6 py-4 justify-end rounded-xl bg-primaryWhite bg-gradient-to-r from-primaryBlue to-primaryWhite w-72 h-44">
                        <h1 className="font-bold word-wrap max-w-[210px]">Title for this software</h1>
                        <h4 className="drop-shadow-xl text-sm">@iamgokull</h4>
                    </div>
                    <div className="container rounded-xl bg-primaryWhite w-72 h-44">
                        <div className="p-4 pt-8 flex flex-wrap gap-2">
                            <button className="transition ease-in-out delay-150 duration-300 bg-bgColor rounded-xl text-primaryBlue p-2 px-4 text-sm font-bold hover:text-primaryWhite hover:bg-primaryBlue">All</button>
                            <button className="transition ease-in-out delay-150 duration-300 bg-bgColor rounded-xl text-primaryBlue p-2 px-4 text-sm font-bold hover:text-primaryWhite hover:bg-primaryBlue">UI</button>
                            <button className="transition ease-in-out delay-150 duration-300 bg-bgColor rounded-xl text-primaryBlue p-2 px-4 text-sm font-bold hover:text-primaryWhite hover:bg-primaryBlue">UX</button>
                            <button className="transition ease-in-out delay-150 duration-300 bg-bgColor rounded-xl text-primaryBlue p-2 px-4 text-sm font-bold hover:text-primaryWhite hover:bg-primaryBlue">Enhancement</button>
                            <button className="transition ease-in-out delay-150 duration-300 bg-bgColor rounded-xl text-primaryBlue p-2 px-4 text-sm font-bold hover:text-primaryWhite hover:bg-primaryBlue">Feature</button>
                            <button className="transition ease-in-out delay-150 duration-300 bg-bgColor rounded-xl text-primaryBlue p-2 px-4 text-sm font-bold hover:text-primaryWhite hover:bg-primaryBlue">Bug</button>
                        </div>
                    </div>
                    <div className="container rounded-xl bg-primaryWhite w-72 h-44">
                        <div className="p-4 space-y-4">
                            <Link to="#" className="text-primaryBlue font-bold text-sm hover:underline">View roadmap</Link>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                                    <p className="text-black text-sm">Planned</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold">2</h4>
                                </div>

                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 bg-pink-500 rounded-full"></div>
                                    <p className="text-black text-sm">In progress</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold">3</h4>
                                </div>

                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                    <p className="text-black text-sm">Live</p>
                                </div>
                                <div>
                                    <h4 className="text-black font-bold">2</h4>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="container p-8 w-full h-16 shadow-xl bg-primaryWhite rounded-lg flex justify-between items-center">
                        <div className="hidden md:flex items-center gap-4">
                            <img
                                src="../src/assets/opinion.png"
                                alt="feedback icon"
                                className=" h-8"
                            />
                            <h1 className="text-black font-bold text-xl">12 Feedbacks</h1>
                        </div>

                        <div>
                            <label htmlFor="sort" className="text-black text-sm">Sort by: </label>
                            <select id="sort" className="font-bold cursor-pointer text-black bg-transparent border-0 border-gray-200 appearance-none focus:outline-none focus:ring-0 peer">
                                <option value="most-upvotes" selected>Most upvotes</option>
                                <option value="least-upvotes">Least upvotes</option>
                                <option value="most-comments">Most comments</option>
                                <option value="least-comments">Least comments</option>
                            </select>
                        </div>
                        <div>
                            <button
                                type="button"
                                className=" font-bold text-white bg-primaryBlue rounded-md p-2 w-full hover:brightness-125" onClick={openModal}>
                                + Add feedback
                            </button>
                        </div>

                    </div>

                    {board?.feedbacks ? board?.feedbacks.map((feedback, index) =>
                        <DisplayFeedback key={index} feedback={feedback} username={board.username}/>)
                        : <h1 className="text-black font-bold">No boards currently</h1>}

                </div>
                {modalOpen && <AddFeedbackModal closeModal={closeModal} boardId={board?.id} />}
            </div>
        </motion.div>
    )
}

export default Feedback