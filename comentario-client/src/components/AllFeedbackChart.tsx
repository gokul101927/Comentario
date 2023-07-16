import { Doughnut } from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import { Feedback } from '../interfaces/types';
Chart.register(ArcElement);

interface Props {
    feedbacks: Feedback[] | undefined;
}

const AllFeedbackChart: React.FC<Props> = ({ feedbacks }) => {
    const data = {
        labels: ["UI", "UX", "Feature", "Bug", "Enhancement"],
        datasets: [
            {
                data: [10, 20, 30, 25, 15],
                backgroundColor: [
                    "#F87171",
                    "#34D399",
                    "#60A5FA",
                    "#FBBF24",
                    "#A78BFA"
                ],
                borderWith: 1
            }
        ]
    }

    const options = {
        responsive: true,
        cutout: "70%",
    }

    return (
        <div className='w-48 h-48 flex items-center gap-4'>
            <Doughnut data={data} options={options}/>
            <div className='text-black text-xs'>ALL</div>
        </div>
    )
}

export default AllFeedbackChart