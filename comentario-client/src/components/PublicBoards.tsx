import Board from "./Board"

const PublicBoards = () => {
    return (
        <div className="container mx-auto pt-8 p-2 flex flex-col">
            <h5 className='text-black py-4'>Public Boards</h5>
            <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-4">
                <Board />
                <Board />
                <Board />
                <Board />
            </div>

        </div>
    )
}

export default PublicBoards