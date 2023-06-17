const Board = () => {
    return (
        <div className="bg-primaryWhite w-full p-6 rounded-md shadow flex flex-col space-y-3">
            <img
                src="../src/assets/test.png"
                alt="image"
                className="rounded-md object-center object-cover h-44"
            />
            <div className="flex justify-between">
                <h3 className="text-black font-bold">Test title</h3>
                <div className="flex gap-1 items-end">
                    <img
                        src="../src/assets/authored-by-icon.png"
                        alt="feedback icon"
                        className="logo-image h-5"
                    />
                    <h3 className="text-sm font-small font-bold text-gray-500">Gokul L</h3>
                </div>
            </div>
            <p className="text-black">Test description</p>
            <div className="flex justify-between">
                <button className="text-sm font-small text-white bg-primaryBlue rounded-md p-2 hover:brightness-125">Provide feedback</button>
                <div className="flex gap-2 items-center">
                    <img
                        src="../src/assets/feedback-icon.png"
                        alt="feedback icon"
                        className="logo-image h-6"
                    />
                    <span className="text-black">26</span>
                </div>
            </div>
        </div>
    )
}

export default Board