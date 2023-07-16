import { useEffect, useState } from "react";
import { Feedback, FeedbackSortTypes, Category } from "../interfaces/types"
import DisplayFeedback from "./DisplayFeedback"
import NoFeedback from "./NoFeedback";

interface Props {
    feedbacks: Feedback[] | undefined;
    sortType: FeedbackSortTypes;
    tagType: Category;
    displayEditPlan: boolean;
}

const DisplayFeedbacksBasedOnConditions: React.FC<Props> = ({ feedbacks, sortType, tagType, displayEditPlan }) => {

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
    }, [sortType, feedbacks])

    useEffect(() => {
        if (tagType === Category.UI) {
            const uiFeedbacks = feedbacks?.filter((feedback) => feedback.category.includes(Category.UI));
            setFeedbackList(uiFeedbacks);
        } else if (tagType === Category.UX) {
            const uxFeedbacks = feedbacks?.filter((feedback) => feedback.category.includes(Category.UX));
            setFeedbackList(uxFeedbacks);
        } else if (tagType === Category.Feature) {
            const featureFeedbacks = feedbacks?.filter((feedback) => feedback.category.includes(Category.Feature));
            setFeedbackList(featureFeedbacks);
        } else if (tagType === Category.Enhancement) {
            const enhancementFeedbacks = feedbacks?.filter((feedback) => feedback.category.includes(Category.Enhancement));
            setFeedbackList(enhancementFeedbacks);
        } else if (tagType === Category.Bug) {
            const bugFeedbacks = feedbacks?.filter((feedback) => feedback.category.includes(Category.Bug));
            setFeedbackList(bugFeedbacks);
        } else if (tagType === Category.All) {
            setFeedbackList(feedbacks);
        } else {
            setFeedbackList(feedbacks);
        }

    }, [tagType, feedbacks])

    return (
        <div className="flex flex-col gap-4">
            {feedbackList && feedbackList.map((feedback, index) =>
                <DisplayFeedback key={index} feedback={feedback} displayEditPlan={displayEditPlan}/>)
                }
            {feedbackList?.length === 0 && <NoFeedback />}
        </div>
    )
}

export default DisplayFeedbacksBasedOnConditions