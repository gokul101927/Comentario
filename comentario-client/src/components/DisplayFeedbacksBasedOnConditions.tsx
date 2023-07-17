import { useEffect, useState } from "react";
import { Feedback, FeedbackSortTypes, Category } from "../interfaces/types"
import DisplayFeedback from "./DisplayFeedback"
import NoFeedback from "./NoFeedback";

interface Props {
    feedbacks: Feedback[] | undefined;
    sortType: FeedbackSortTypes | undefined;
    tagType: Category | undefined;
    displayEditPlan: boolean;
    isSentimentBoard: boolean;
}

const DisplayFeedbacksBasedOnConditions: React.FC<Props> = ({ feedbacks, sortType, tagType, displayEditPlan, isSentimentBoard }) => {

    const [feedbackList, setFeedbackList] = useState<Feedback[] | undefined>();

    useEffect(() => {
        if (!feedbacks) return;

        let sortedFeedbacks = [...feedbacks];

        if (sortType === FeedbackSortTypes.MostUpVotes) {
            sortedFeedbacks = sortedFeedbacks.sort((a, b) => b.upVoteCount - a.upVoteCount);
        } else if (sortType === FeedbackSortTypes.LeastUpVotes) {
            sortedFeedbacks = sortedFeedbacks.sort((a, b) => a.upVoteCount - b.upVoteCount);
        } else if (sortType === FeedbackSortTypes.MostComments) {
            sortedFeedbacks = sortedFeedbacks.sort((a, b) => b.comments.length - a.comments.length);
        } else if (sortType === FeedbackSortTypes.LeastComments) {
            sortedFeedbacks = sortedFeedbacks.sort((a, b) => a.comments.length - b.comments.length);
        }

        let filteredFeedbacks = sortedFeedbacks;

        if (tagType === Category.UI) {
            filteredFeedbacks = sortedFeedbacks.filter((feedback) => feedback.category.includes(Category.UI));
        } else if (tagType === Category.UX) {
            filteredFeedbacks = sortedFeedbacks.filter((feedback) => feedback.category.includes(Category.UX));
        } else if (tagType === Category.Feature) {
            filteredFeedbacks = sortedFeedbacks.filter((feedback) => feedback.category.includes(Category.Feature));
        } else if (tagType === Category.Enhancement) {
            filteredFeedbacks = sortedFeedbacks.filter((feedback) => feedback.category.includes(Category.Enhancement));
        } else if (tagType === Category.Bug) {
            filteredFeedbacks = sortedFeedbacks.filter((feedback) => feedback.category.includes(Category.Bug));
        }

        setFeedbackList(filteredFeedbacks);
    }, [feedbacks, sortType, tagType]);

    return (
        <div className="flex flex-col gap-4">
            {feedbackList && feedbackList.map((feedback, index) =>
                <DisplayFeedback key={index} feedback={feedback} displayEditPlan={displayEditPlan} isSentimentBoard={isSentimentBoard}/>)
                }
            {feedbackList?.length === 0 && <NoFeedback />}
        </div>
    )
}

export default DisplayFeedbacksBasedOnConditions