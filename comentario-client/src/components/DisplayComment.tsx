const DisplayComment = () => {
    return (
        <div className='container flex flex-row bg-primaryWhite rounded-md p-8 justify-between'>
            <div className="flex gap-8">
                <div className="w-16 md:w-auto">
                    <img src="../src/assets/profile.png"
                        alt="logo"
                        className="h-12 md:h-16 rounded-full">
                    </img>
                </div>
                <div>
                    <h4 className="text-primaryBlue font-bold text-sm">@iamgokull</h4>
                    <div className="flex items-center gap-2">
                    <p className="text-black text-sm">Images and screencasts can enhance comments on solutions.</p>
                    </div>

                    <div className="pt-2">
                        <button className="text-primaryBlue font-bold">Reply</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default DisplayComment