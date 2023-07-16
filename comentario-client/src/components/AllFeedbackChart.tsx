import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'
import { Feedback } from '../interfaces/types';
Chart.register(ArcElement);

export interface ChartData {
    labels: string[];
    data: number[];
}

interface Props {
    feedbacks: Feedback[] | undefined;
}

const processChartData = (data: Feedback[] | undefined) => {
    const categories: { [key: string]: number } = {};
    const excludedCategories = ["All"];

    data?.forEach((item) => {
        const { category } = item;
        if (!excludedCategories.includes(category)) {
            categories[category] = (categories[category] || 0) + 1;
        }
    });

    return {
        labels: Object.keys(categories),
        data: Object.values(categories),
    };
};


const assignColors = (labels: string[]) => {
    const colorArray = [
        '#F87171',
        '#34D399',
        '#60A5FA',
        '#FBBF24',
        '#A78BFA',
        // Add more colors if needed
    ];

    const colorMap: { [label: string]: string } = {};
    labels.forEach((label, index) => {
        colorMap[label] = colorArray[index % colorArray.length];
    });

    return colorMap;
};

const AllFeedbackChart: React.FC<Props> = ({ feedbacks }) => {

    const chartData = processChartData(feedbacks);
    const colorMap = assignColors(chartData.labels);



    const data = {
        labels: chartData.labels,
        datasets: [
            {
                data: chartData.data,
                backgroundColor: chartData.labels.map((label) => colorMap[label]),
                borderWith: 1
            }
        ]
    }

    const dataMapping: { [label: string]: number } = {};
    chartData.labels.forEach((label, index) => {
        dataMapping[label] = chartData.data[index];
    });

    const options = {
        responsive: true,
        cutout: "70%",
    }

    return (
        <div className='w-48 h-48 flex items-center gap-4'>
            <Doughnut data={data} options={options} />
            <div className='flex flex-col max-w-xs items-center'>
                <div className='flex flex-col items-center'>
                    <div className='flex items-center gap-1'>
                        <div className='bg-primaryBlue w-2 h-2 rounded-full'></div>
                        <div className='text-gray-400 text-xs'>ALL</div>
                    </div>
                    <div className='text-black text-sx font-bold'>{feedbacks?.length}</div>
                </div>

                {chartData.labels.map((label, index) => (
                    <div key={index} className="flex flex-col items-center mt-4">
                        <div className="flex items-center gap-1" >
                            <div
                                className="bg-primaryBlue w-2 h-2 rounded-full"
                                style={{ backgroundColor: colorMap[label] }}
                            ></div>
                            <div className="text-gray-400 text-xs">{label}</div>
                        </div>
                        <div className="text-black text-sx font-bold">{dataMapping[label]}</div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default AllFeedbackChart