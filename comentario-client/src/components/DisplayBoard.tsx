import { Board } from "../interfaces/types"
import { Link, useNavigate } from "react-router-dom"

interface Props {
    board: Board
}

const DisplayBoard: React.FC<Props> = ({ board }) => {

    const navigate = useNavigate();

    if (!board) return;

    return (
        <div className="bg-primaryWhite w-full p-6 rounded-md shadow flex flex-col space-y-3">
            <Link to={`/feedback/${board.id}`}>
            <img
                src={board.coverImageUrl}
                alt="image"
                className="rounded-md object-center object-cover h-44 w-full"
            />
            </Link>
            
            <div className="flex justify-between">
                <h3 className="text-black font-bold">{board.title}</h3>
                <div className="flex gap-1 items-end">
                    <img
                        src="../src/assets/authored-by-icon.png"
                        alt="feedback icon"
                        className=" h-5"
                    />
                    <h3 className="text-sm font-small font-bold text-gray-500">{board.username}</h3>
                </div>
            </div>
            <p className="text-black">{board.description}</p>
            <div className="flex justify-between">
                <button className="text-sm font-small text-white bg-primaryBlue rounded-md p-2 hover:brightness-125" onClick={() => navigate(`/feedback/${board.id}`)}>Provide feedback</button>
                <div className="flex gap-2 items-center">
                    <img
                        src="../src/assets/feedback-icon.png"
                        alt="feedback icon"
                        className="logo-image h-6"
                    />
                    <span className="text-black">{board.feedbacks === null ? 0 : board.feedbacks.length}</span>
                </div>
            </div>
        </div>
    )
}

export default DisplayBoard