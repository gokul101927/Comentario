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

    const hasData = chartData.labels.length > 0 && chartData.data.length > 0;

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                data: chartData.data,
                backgroundColor: hasData ? chartData.labels.map((label) => colorMap[label]) : 'transparent',
                borderWith: hasData ? 1 : 2,
                borderColor: hasData ? chartData.labels.map((label) => colorMap[label]) : 'transparent',
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
        <div className='w-full h-48 flex items-center gap-4 mt-4'>
            {hasData ? <Doughnut data={data} options={options} /> :
            <div className='w-full h-44 flex justify-center items-center border-8 border-solid border-gray-300 rounded-full'></div>}
            <div className='grid grid-cols-2 w-full items-end flex-col'>
                <div className='flex flex-col items-center'>
                    <div className='flex items-center gap-1'>
                        <div className='bg-primaryBlue w-2 h-2 rounded-full'></div>
                        <div className='text-gray-400 text-xs'>ALL</div>
                    </div>
                    <div className='text-black text-xs font-bold'>{feedbacks?.length}</div>
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
                        <div className="text-black text-xs font-bold">{dataMapping[label]}</div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default AllFeedbackChart