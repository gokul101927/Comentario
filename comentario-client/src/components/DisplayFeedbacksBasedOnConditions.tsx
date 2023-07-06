import { Feedback } from "../interfaces/types"
import DisplayFeedback from "./DisplayFeedback"

interface Props {
    feedbacks: Feedback[] | undefined;
}

const DisplayFeedbacksBasedOnConditions: React.FC<Props> = ({ feedbacks }) => {
    return (
        <div className="flex flex-col gap-4">
            {feedbacks ? feedbacks.reverse().map((feedback, index) =>
                <DisplayFeedback key={index} feedback={feedback} />)
                : <h1 className="text-black font-bold">No boards currently</h1>}
        </div>
    )
}

export default DisplayFeedbacksBasedOnConditions