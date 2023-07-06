import React, { useState } from "react"

interface Props {
    handleComment: (comment: string) => void;
    isLoggedIn: boolean;
}


const PostComment:React.FC<Props> = ({handleComment, isLoggedIn}) => {

    const [comment, setComment] = useState("");
    
    if (!isLoggedIn) {
        return;
    }

    return (
        <div className='container flex flex-col bg-primaryWhite rounded-md p-8 gap-4 mb-4'>
            <h1 className="text-black font-bold">Add Comment</h1>
            <div className="flex flex-col">
                <textarea
                    name="comment"
                    rows={4}
                    id="comment"
                    placeholder="Type your comments here"
                    className="bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
            
            <div className="flex justify-end">
                <button disabled={comment.length <= 0} className="text-sm font-small text-white rounded-md p-2 font-bold bg-primaryBlue hover:brightness-125" type="button" onClick={() => handleComment(comment)}>Post comment</button>
            </div>
        </div>
    )
}

export default PostComment