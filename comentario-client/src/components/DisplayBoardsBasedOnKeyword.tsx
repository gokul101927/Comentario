import React, { useEffect, useState } from 'react'
import { Board, DashboardSortTypes } from '../interfaces/types';
import DisplayBoard from './DisplayBoard';
import NoBoard from './NoBoard';

interface Props {
    boards: Board[] | undefined;
    keyword: string;
    sortType: DashboardSortTypes | undefined;
    isYourDashboard: boolean;
}

const DisplayBoardsBasedOnKeyword: React.FC<Props> = ({ boards, keyword, sortType, isYourDashboard }) => {

    const [boardList, setboardList] = useState<Board[] | undefined>(boards);

    useEffect(() => {
        const board = boards?.filter((board) => board.title.includes(keyword));
        setboardList(board);
    }, [boards, keyword])

    useEffect(() => {
        if (sortType === DashboardSortTypes.Oldest) {
            const oldest = boards?.reverse();
            setboardList(oldest);
        } else if (sortType === DashboardSortTypes.MostFeedbacks) {
            const sortedByFeedbacks = boards?.sort((a, b) => b.feedbacks.length - a.feedbacks.length);
            setboardList(sortedByFeedbacks);
        } else if (sortType === DashboardSortTypes.LeastFeedbacks) {
            const reverseSortedByComments = boards?.sort((a, b) => a.feedbacks.length - b.feedbacks.length);
            setboardList(reverseSortedByComments);
        } else if (sortType === DashboardSortTypes.Latest) {
            setboardList(boards);
        } else {
            setboardList(boards);
        }
    }, [sortType, boards])

    return (
        <div>
            <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-4">
                {boardList && boardList.map((board, index) =>
                    <DisplayBoard key={index} board={board} isYourBoard={false} isYourDashboard={isYourDashboard} handleEditModal={() => undefined}/>)
                }
            </div>
            {boardList?.length === 0 && <NoBoard />}
        </div>

    )
}

export default DisplayBoardsBasedOnKeyword