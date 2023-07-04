const DisplayFeedback = () => {
    return (
        <div className='flex flex-row bg-primaryWhite rounded-md p-8 justify-between'>
            <div className="flex gap-8">
                <div>
                    <img src="../src/assets/profile.png"
                        alt="logo"
                        className=" h-16 rounded-full">
                    </img>
                </div>
                <div>
                    <h4 className="text-primaryBlue font-bold text-sm">@iamgokull</h4>
                    <div className="flex items-center gap-2">
                        <h1 className="text-black font-bold">Add image/video upload to feedback</h1>
                        <span className="bg-bgColor rounded-xl text-primaryBlue p-2 text-sm shadow-xl font-bold">Feature</span>
                    </div>

                    <p className="text-black text-sm">Images and screencasts can enhance comments on solutions.</p>
                    <div className="pt-2 flex items-end gap-1">
                        <img src="../src/assets/up-arrow-filled.png"
                            alt="logo"
                            className="h-6">
                        </img>
                        <p className="text-primaryBlue font-bold">22</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <img src="../src/assets/bubble-chat.png"
                    alt="logo"
                    className="h-6">
                </img>
                <p className="text-black font-bold">3</p>
            </div>
        </div>
    )
}

export default DisplayFeedback