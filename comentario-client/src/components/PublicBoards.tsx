import { useEffect, useState } from "react"
import DisplayBoard from "./DisplayBoard"
import api from "../api/apiConfig"
import { Board } from "../interfaces/types"


const PublicBoards = () => {

    const [allBoards, setAllBoards] = useState<Board[]>([]);

    useEffect(() => {
        api.get('/boards/all-boards')
          .then(response => {
            setAllBoards(response.data);
          })
      }, []);

    return (
        <div className="container mx-auto py-8 p-2 flex flex-col">
            <h5 className='text-black py-4'>Public Boards</h5>
            <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-4">
                {allBoards.length > 0 ? allBoards.map((board, index) =>
                    <DisplayBoard board={board} key={index}/>
                ) : <h1 className="text-black font-bold">No boards currently</h1>}
            </div>
        </div>
    )
}

export default PublicBoards