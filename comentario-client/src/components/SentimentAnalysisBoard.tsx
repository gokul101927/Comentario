const SentimentAnalysisBoard = () => {
    return (
        <div className="bg-primaryWhite h-full shadow space-y-4 w-full rounded-md p-8 ">
            <h1 className="text-gray-500 font-bold">Overall sentiment analysis</h1>
            <div className="flex items-center justify-center p-4">
                <div className="w-52 h-52">
                    <div className="w-full h-full flex flex-col gap-2">
                            <div className="bg-primaryBlue opacity-30 rounded-full"
                                style={{ width: "100%", height: "100%" }}>
                            </div>
                        <div>
                            <h1 className="text-black">Very positive</h1>
                            <p className="text-black">3 feedbacks: 56%</p>
                        </div>
                    </div>

                </div>
                <div className="w-44 h-44">
                    <div className="w-full h-full flex flex-col gap-2">
                        <div className="bg-primaryBlue opacity-50 rounded-full"
                            style={{ width: "36%", height: "36%" }}>

                        </div>
                        <div>
                            <h1 className="text-black">positive</h1>
                            <p className="text-black">3 feedbacks: 36%</p>
                        </div>
                    </div>
                </div>
                <div className="w-44 h-44">
                    <div className="w-full h-full flex flex-col gap-2">
                        <div className="bg-primaryBlue opacity-70 rounded-full"
                            style={{ width: "10%", height: "10%" }}></div>
                        <div>
                            <h1 className="text-black">Neutral</h1>
                            <p className="text-black">3 feedbacks: 10%</p>
                        </div>
                    </div>

                </div>
                <div className="w-44 h-44">
                    <div className="w-full h-full flex flex-col gap-2">
                        <div className="bg-primaryBlue opacity-80 rounded-full"
                            style={{ width: "20%", height: "20%" }}></div>
                        <div>
                            <h1 className="text-black">Negative</h1>
                            <p className="text-black">3 feedbacks: 20%</p>
                        </div>
                    </div>

                </div>
                <div className="w-44 h-44">
                    <div className="w-full h-full flex flex-col gap-2">
                        <div className="bg-primaryBlue opacity-100 rounded-full"
                            style={{ width: "29%", height: "29%" }}></div>
                        <div>
                            <h1 className="text-black">Very negative</h1>
                            <p className="text-black">3 feedbacks: 29%</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default SentimentAnalysisBoard