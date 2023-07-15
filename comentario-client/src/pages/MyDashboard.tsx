import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DashboardSortTypes, UserState } from '../interfaces/types';

import DisplayBoardsBasedOnKeyword from '../components/DisplayBoardsBasedOnKeyword';

interface ModalProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: UserState | null;
    closeModal: () => void;
}

const MyDashboard: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser }) => {

    const navigate = useNavigate();
    const [sortType, setSortType] = useState<DashboardSortTypes>();
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/sign-in")
        }
    }, [isLoggedIn, navigate])

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
            <div className="container h-screen mx-auto p-2 pt-8 flex flex-col gap-4">
                <div className="container p-4 md:p-8 w-full h-16 shadow-xl bg-primaryWhite rounded-lg flex justify-between items-center">
                    <div className="hidden lg:flex items-center gap-2 md:gap-4">
                        <img
                            src="../src/assets/opinion.png"
                            alt="feedback icon"
                            className="h-6 md:h-8"
                        />
                        <h1 className="text-black font-bold text-base md:text-xl" >{loggedInUser?.boards.length} Boards</h1>
                    </div>

                    <div className="flex flex-col lg:items-center md:flex-row">
                        <label htmlFor="sort" className=" text-black text-sm">Sort by: </label>
                        <select onChange={(e) => setSortType(e.target.value as DashboardSortTypes)} id="sort" className="font-bold cursor-pointer text-black bg-transparent border-0 border-gray-200 appearance-none focus:outline-none focus:ring-0 peer">
                            {Object.values(DashboardSortTypes).map((type) => (
                                <option key={type} value={type} >{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <div className="flex relative items-center">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search title"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                className={`bg-gray-100 p-2 w-52 md:w-80 rounded-xl text-black border-2 border-gray-200 focus:border-gray-100 focus:outline-none focus:shadow-xl focus:bg-primaryWhite}`}
                            ></input>
                        </div>
                    </div>
                    
                </div>
                <DisplayBoardsBasedOnKeyword boards={loggedInUser?.boards} keyword={searchKeyword} sortType={sortType} isYourDashboard={true}/>
            </div>
            
        </motion.div>
    )
}

export default MyDashboard