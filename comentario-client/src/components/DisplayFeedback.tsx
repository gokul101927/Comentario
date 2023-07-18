import React, { useEffect, useState } from "react"
import { Feedback, Roadmaptype } from "../interfaces/types"
import { useNavigate } from "react-router-dom";
import api from "../api/apiConfig";
import SentimentAnalysisBoard from "./SentimentAnalysisBoard";

interface Props {
    feedback: Feedback | undefined;
    displayEditPlan: boolean;
    isSentimentBoard: boolean;
}

const DisplayFeedback: React.FC<Props> = ({ feedback, displayEditPlan, isSentimentBoard }) => {
    const navigate = useNavigate();
    const [upVote, setUpVote] = useState(false);
    const [upVoteCount, setUpVoteCount] = useState(0);

    const [displayCommentsSentiment, setDisplayCommentsSentiment] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const config = {
                headers: {
                    Authorization: token,
                }
            };
            if (feedback) {
                api.get(`/feedbacks/upvote/${feedback.id}`, config)
                .then(response => {
                    console.log(response.data)
                    const propertyNames = Object.keys(response.data);
                    const key = propertyNames[0];
                    const value = response.data[key];
                    if (key==="true") {
                        setUpVote(true);
                    } else {
                        setUpVote(false);
                    }
                    setUpVoteCount(value);
                })
                .catch(error => {
                    console.error(error);
                })
            }
            
        }
        

    }, [upVote, upVoteCount, feedback])

    const handleAddToPlan = (type: Roadmaptype) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const config = {
                headers: {
                    Authorization: token,
                }
            };

            api.put(`feedbacks/feedback/add-plan?id=${feedback?.id}`, type, config)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }


    const handleUpVote = () => {
        const token = localStorage.getItem('jwt');
        if (token) {

            const config = {
                headers: {
                    'Authorization': token,
                }
            };
            if (upVote) {
                api
                    .delete(`/feedbacks/upvote/delete/${feedback?.id}`, config)
                    .then(response => {
                        console.log('Delete Response:', response.data);
                        setUpVote(false);
                        setUpVoteCount(response.data.upVoteCount);
                    })
                    .catch(error => {
                        console.error('Delete Error:', error);
                    });
            } else {
                api
                    .put(`/feedbacks/upvote/add/${feedback?.id}`, null, config)
                    .then(response => {
                        console.log('Add Response:', response.data);
                        setUpVote(true);
                        setUpVoteCount(response.data.upVoteCount);
                    })
                    .catch(error => {
                        console.error('Add Error:', error);
                    });
            }
        } else {
            console.error('Token is null or empty');
        }
    }

    const handlefeedbackClick = () => {
        if (isSentimentBoard) {
            setDisplayCommentsSentiment(!displayCommentsSentiment);
        } else {
            navigate(`/feedback/${feedback?.id}`)
        }
    }

    return (
        <div>
        <div className='container relative flex z-0 flex-row bg-primaryWhite rounded-md p-8 justify-between'>
            {displayEditPlan && feedback?.roadmap !== Roadmaptype.LIVE &&
            <div className="absolute top-5 text-gray-600 right-5 flex items-center justify-center cursor-pointer bg-bgColor hover:bg-primaryBlue hover:text-primaryWhite rounded-full p-2">
                <p onClick={() => handleAddToPlan(Roadmaptype.PLANNED)} className=" font-bold text-xs">{feedback?.roadmap === Roadmaptype.NONE && "Add to planned"}</p>
                <p onClick={() => handleAddToPlan(Roadmaptype.INPROGRESS)} className=" font-bold text-xs">{feedback?.roadmap === Roadmaptype.PLANNED && "Move to In-progress"}</p>
                <p onClick={() => handleAddToPlan(Roadmaptype.LIVE)} className=" font-bold text-xs">{feedback?.roadmap === Roadmaptype.INPROGRESS && "Move to Live"}</p>
            </div>}
            {feedback?.roadmap === Roadmaptype.LIVE &&  <div  className="absolute top-5 text-gray-600 right-5 flex items-center justify-center cursor-pointer bg-bgColor rounded-full p-2">
            <p className=" font-bold text-xs">Live</p></div>}
            <div className="flex md:gap-8">
                <div className="w-16 md:w-auto">
                    <img src={feedback?.profileUrl}
                        alt="profile Image"
                        className="h-12 w-12 md:h-16 md:w-16 object-center object-cover rounded-full">
                    </img>
                </div>
                <div>
                    <h4 className="text-primaryBlue font-bold text-sm">@{feedback?.username}</h4>
                    <div className="mt-1">
                        <div className="flex items-center gap-2">
                            <div onClick={handlefeedbackClick}>
                                <h1 className="text-black font-bold cursor-pointer">{feedback?.title}</h1>
                            </div>

                            <span className="bg-bgColor rounded-xl text-primaryBlue p-2 text-sm shadow-xl font-bold">{feedback?.category}</span>
                        </div>

                        <p className="text-black text-sm">{feedback?.description}</p>
                    </div>

                    <div className="pt-4 flex items-end gap-1">
                        <img src={`${upVote ? "../src/assets/up-arrow-filled.png" : "../src/assets/up-arrow.png"} `}
                            alt="logo"
                            className="h-6 cursor-pointer"
                            onClick={handleUpVote}>
                        </img>
                        <p className={`${upVote ? "text-primaryBlue" : "text-black"}  font-bold`}>{upVoteCount}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <img src="../src/assets/bubble-chat.png"
                    alt="logo"
                    className="h-6">
                </img>
                <p className="text-black font-bold">{feedback?.comments?.length}</p>
            </div>
        </div>
        {displayCommentsSentiment && <SentimentAnalysisBoard comments={feedback?.comments} feedbacks={undefined} isCommentsSentiment={true}/>}
        </div>
    )
}

export default DisplayFeedback