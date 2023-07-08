import { useEffect, useState } from "react"
import api from "../api/apiConfig"
import { Board } from "../interfaces/types"
import DisplayBoardsBasedOnKeyword from "./DisplayBoardsBasedOnKeyword"


const PublicBoards = () => {

    const [allBoards, setAllBoards] = useState<Board[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        api.get('/boards/all-boards')
            .then(response => {
                setAllBoards(response.data);
            })
    }, []);

    return (
        <div className="container mx-auto py-8 p-2 flex flex-col">
            <div className="flex my-4">
                <h5 className='text-black p-2'>Public Boards</h5>
                <div className="flex relative items-center">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search title"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className={`bg-gray-100 p-2 w-52 md:w-80 rounded-xl text-black border-2 border-primaryBlue focus:border-gray-100 focus:outline-none focus:shadow-xl focus:bg-primaryWhite}`}
                    ></input>
                </div>
            </div>

            <div >
                <DisplayBoardsBasedOnKeyword boards={allBoards} keyword={searchKeyword} />
            </div>
        </div>
    )
}

export default PublicBoards