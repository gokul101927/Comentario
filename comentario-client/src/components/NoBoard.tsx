const NoBoard = () => {
    return (
        <div className='container bg-primaryWhite rounded-md flex flex-col gap-2 items-center p-20'>
            <img
                src="../src/assets/no-feedback.png"
                alt="noe feedback icon"
                className=" h-32"
            />
            <h1 className="text-gray-600 text-center font-bold text-xl">There is no board yet.</h1>
            <p className="text-gray-500 text-center">Got a software or an app which needs feedbacks? Give Commentario a go.</p>
        </div>
    )
}

export default NoBoard