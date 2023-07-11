import React, { useEffect, useState } from 'react'
import { Board } from '../interfaces/types';
import DisplayBoard from './DisplayBoard';
import NoBoard from './NoBoard';

interface Props {
    boards: Board[] | undefined;
    keyword: string;
}

const DisplayBoardsBasedOnKeyword: React.FC<Props> = ({ boards, keyword }) => {

    const [boardList, setboardList] = useState<Board[] | undefined>(boards);

    useEffect(() => {
        const board = boards?.filter((board) => board.title.includes(keyword));
        setboardList(board);
    }, [boards, keyword])

    return (
        <div>
            <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-4">
                {boardList && boardList.map((board, index) =>
                    <DisplayBoard key={index} board={board} isYourBoard={false} handleEditModal={() => undefined}/>)
                }
            </div>
            {boardList?.length === 0 && <NoBoard />}
        </div>

    )
}

export default DisplayBoardsBasedOnKeyword