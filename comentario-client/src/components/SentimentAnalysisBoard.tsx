import { useEffect, useState } from "react";
import { Feedback, Comment, SentimentType } from "../interfaces/types"
import DisplayFeedbacksBasedOnConditions from "./DisplayFeedbacksBasedOnConditions"
import SentimentAnalysisBarChart from "./SentimentAnalysisBarChart";

interface Props {
    feedbacks: Feedback[] | undefined;
    comments: Comment[] | undefined;
}

const SentimentAnalysisBoard:React.FC<Props> = ({feedbacks, comments}) => {
   

    return (
        <div className="bg-primaryWhite h-full shadow space-y-4 w-full rounded-md p-8 ">
            <h1 className="text-gray-500 font-bold">Overall sentiment analysis</h1>
            <SentimentAnalysisBarChart feedbacks={feedbacks} />

            <DisplayFeedbacksBasedOnConditions feedbacks={feedbacks} sortType={undefined} tagType={undefined} displayEditPlan={true} isSentimentBoard={true}/>

        </div>
    )
}

export default SentimentAnalysisBoard