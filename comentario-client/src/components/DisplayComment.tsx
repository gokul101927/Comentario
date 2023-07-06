import { Comment } from "../interfaces/types";

interface Props {
    comment: Comment | undefined;
}

const DisplayComment:React.FC<Props> = ({comment}) => {

    return (
        <div className="container flex flex-col bg-primaryWhite rounded-md p-4">
            <div className="flex flex-row justify-between">
                <div className="flex md:gap-8 items-center">
                    <div className="w-16 md:w-auto">
                        <img src={comment?.profileUrl}
                            alt="logo"
                            className="h-12 w-12 object-center object-cover rounded-full">
                        </img>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-primaryBlue font-bold text-sm">@{comment?.username}</h4>
                        <p className="text-gray-600 text-sm font-bold">{comment?.commentTitle}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayComment