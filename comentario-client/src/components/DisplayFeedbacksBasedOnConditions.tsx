import { useEffect, useState } from "react";
import { Feedback, FeedbackSortTypes } from "../interfaces/types"
import DisplayFeedback from "./DisplayFeedback"

interface Props {
    feedbacks: Feedback[] | undefined;
    sortType: FeedbackSortTypes | "";
}

const DisplayFeedbacksBasedOnConditions: React.FC<Props> = ({ feedbacks, sortType }) => {

    const [feedbackList, setFeedbackList] = useState<Feedback[] | undefined>();

    useEffect(() => {
        if (sortType === FeedbackSortTypes.MostUpVotes) {
            const sortedByUpVotes = feedbacks?.sort((a, b) => b.upVoteCount - a.upVoteCount);
            setFeedbackList(sortedByUpVotes);
        } else if (sortType === FeedbackSortTypes.LeastUpVotes) {
            const reverseSortedByUpVotes = feedbacks?.sort((a, b) => a.upVoteCount - b.upVoteCount);
            setFeedbackList(reverseSortedByUpVotes);
        } else if (sortType === FeedbackSortTypes.MostComments) {
            const sortedByComments = feedbacks?.sort((a, b) => b.comments.length - a.comments.length);
            setFeedbackList(sortedByComments);
        } else if (sortType === FeedbackSortTypes.LeastComments) {
            const reverseSortedByComments = feedbacks?.sort((a, b) => a.comments.length - b.comments.length);
            setFeedbackList(reverseSortedByComments);
        } else {
            setFeedbackList(feedbacks);
        }
        console.log(sortType)
    }, [sortType, feedbacks])

    return (
        <div className="flex flex-col gap-4">
            {feedbackList ? feedbackList.map((feedback, index) =>
                <DisplayFeedback key={index} feedback={feedback} />)
                : <h1 className="text-black font-bold">No boards currently</h1>}
        </div>
    )
}

export default DisplayFeedbacksBasedOnConditions