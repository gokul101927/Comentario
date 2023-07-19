import { useState } from "react";
import { Feedback, Comment, SentimentType } from "../interfaces/types"
import DisplayFeedbacksBasedOnConditions from "./DisplayFeedbacksBasedOnConditions"
import SentimentAnalysisBarChart from "./SentimentAnalysisBarChart";
import DisplayComment from "./DisplayComment";

interface Props {
    feedbacks: Feedback[] | undefined;
    comments: Comment[] | undefined;
    isCommentsSentiment: boolean;
}

const SentimentAnalysisBoard: React.FC<Props> = ({ feedbacks, comments, isCommentsSentiment }) => {
    const [sentimentType, setSentimentType] = useState<SentimentType | undefined>();

    const onBarClick = (sentiment: SentimentType) => {
        if (sentimentType) {
            setSentimentType(undefined);
        } else {
            setSentimentType(sentiment);
        }
        
    }


    return (
        <div className="bg-primaryWhite h-full shadow space-y-4 w-full rounded-md p-8 ">
            {isCommentsSentiment ? <div className="md:px-8">
                <h1 className="text-gray-500 font-bold py-4">Overall sentiment analysis for Comments</h1>
                <SentimentAnalysisBarChart feedbacks={undefined} comments={comments} onBarClick={onBarClick} />
                {sentimentType && <div className="flex flex-col gap-4 mt-4">

                    {comments && comments.filter((comment) => comment.sentiment === sentimentType).map((comment, index) =>
                        <DisplayComment loggedInUser={undefined} key={index} comment={comment} deleteComment={() => undefined}/>)}
                </div>}
            </div> :

                <div>
                    <h1 className="text-gray-500 font-bold py-4">Overall sentiment analysis</h1>
                    <SentimentAnalysisBarChart feedbacks={feedbacks} comments={undefined} onBarClick={onBarClick} />

                    {sentimentType && <DisplayFeedbacksBasedOnConditions feedbacks={feedbacks} sortType={undefined} tagType={undefined} displayEditPlan={true} isSentimentBoard={true} sentimentType={sentimentType} />}
                </div>
            }

        </div>
    )
}

export default SentimentAnalysisBoard