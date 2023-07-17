import { Feedback, Comment } from "../interfaces/types"
import DisplayFeedbacksBasedOnConditions from "./DisplayFeedbacksBasedOnConditions"

interface Props {
    feedbacks: Feedback[] | undefined;
    comments: Comment[] | undefined;
}

const SentimentAnalysisBoard:React.FC<Props> = ({feedbacks, comments}) => {
    return (
        <div className="bg-primaryWhite h-full shadow space-y-4 w-full rounded-md p-8 ">
            <h1 className="text-gray-500 font-bold">Overall sentiment analysis</h1>
            <div className="flex flex-col md:flex-row items-center justify-center p-4">
                    <div className="w-full h-full flex flex-col gap-2 items-center">
                            <div className={`bg-primaryBlue opacity-30 rounded-full w-[156px] h-[156px]`}>
                            </div>
                        <div>
                            <h1 className="text-black text-sm font-bold">Very positive</h1>
                            <p className="text-gray-400 text-sm">3 feedbacks: 56%</p>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col gap-2 items-center">
                    <div className={`bg-primaryBlue opacity-50 rounded-full w-[136px] h-[136px]`}>
                            </div>
                        <div>
                            <h1 className="text-black text-sm font-bold">positive</h1>
                            <p className="text-gray-400 text-sm">3 feedbacks: 36%</p>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col gap-2 items-center">
                    <div className={`bg-primaryBlue opacity-70 rounded-full w-[110px] h-[110px]`}>
                            </div>
                        <div>
                            <h1 className="text-black text-sm font-bold">Neutral</h1>
                            <p className="text-gray-400 text-sm">3 feedbacks: 10%</p>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col gap-2 items-center">
                    <div className={`bg-primaryBlue opacity-85 rounded-full w-[120px] h-[120px]`}>
                            </div>
                        <div>
                            <h1 className="text-black text-sm font-bold">Negative</h1>
                            <p className="text-gray-400 text-sm">3 feedbacks: 20%</p>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col gap-2 items-center">
                    <div className={`bg-primaryBlue opacity-100 rounded-full w-[129px] h-[129px]`}>
                            </div>
                        <div>
                            <h1 className="text-black text-sm font-bold">Very negative</h1>
                            <p className="text-gray-400 text-sm">3 feedbacks: 29%</p>
                        </div>
                </div>
            </div>
            <DisplayFeedbacksBasedOnConditions feedbacks={feedbacks} sortType={undefined} tagType={undefined} displayEditPlan={true} isSentimentBoard={true}/>

        </div>
    )
}

export default SentimentAnalysisBoard