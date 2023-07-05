import React from "react"
import { Feedback } from "../interfaces/types"

interface Props {
    feedback: Feedback;
    username: string;
}

const DisplayFeedback:React.FC<Props> = ({feedback, username}) => {
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
                    <h4 className="text-primaryBlue font-bold text-sm">@{username}</h4>
                    <div className="flex items-center gap-2">
                        <h1 className="text-black font-bold">{feedback.title}</h1>
                        <span className="bg-bgColor rounded-xl text-primaryBlue p-2 text-sm shadow-xl font-bold">{feedback.category}</span>
                    </div>

                    <p className="text-black text-sm">{feedback.description}</p>
                    <div className="pt-2 flex items-end gap-1">
                        <img src="../src/assets/up-arrow-filled.png"
                            alt="logo"
                            className="h-6">
                        </img>
                        <p className="text-primaryBlue font-bold">{feedback.upVotes}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <img src="../src/assets/bubble-chat.png"
                    alt="logo"
                    className="h-6">
                </img>
                <p className="text-black font-bold">{feedback.comments?.length}</p>
            </div>
        </div>
    )
}

export default DisplayFeedback