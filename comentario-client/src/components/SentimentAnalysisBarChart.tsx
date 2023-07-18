import React, { useEffect, useState } from 'react'
import { Feedback, SentimentType } from '../interfaces/types'
import { Bar } from 'react-chartjs-2';

interface Props {
    feedbacks: Feedback[] | undefined;
}

const SentimentAnalysisBarChart: React.FC<Props> = ({ feedbacks }) => {

    const [veryPositivePercentage, setVeryPositivePercentage] = useState(0);
    const [positivePercentage, setPositivePercentage] = useState(0);
    const [neutralPercentage, setNeutralPercentagePercentage] = useState(0);
    const [negativePercentage, setNegativePercentage] = useState(0);
    const [veryNegativePercentage, setVeryNegativePercentage] = useState(0);


    useEffect(() => {
        if (!feedbacks) return;
        const veryPositiveFeedbacks = feedbacks.filter((feedback) => feedback.sentiment === SentimentType.VERY_POSITIVE).length;
        setVeryPositivePercentage((veryPositiveFeedbacks / feedbacks.length) * 100);

        const positiveFeedbacks = feedbacks.filter((feedback) => feedback.sentiment === SentimentType.POSITIVE).length;
        setPositivePercentage((positiveFeedbacks / feedbacks.length) * 100);

        const neutralFeedbacks = feedbacks.filter((feedback) => feedback.sentiment === SentimentType.NEUTRAL).length;
        setNeutralPercentagePercentage((neutralFeedbacks / feedbacks.length) * 100);

        const negativeFeedbacks = feedbacks.filter((feedback) => feedback.sentiment === SentimentType.NEGATIVE).length;
        setNegativePercentage((negativeFeedbacks / feedbacks.length) * 100);

        const veryNegativeFeedbacks = feedbacks.filter((feedback) => feedback.sentiment === SentimentType.VERY_NEGATIVE).length;
        setVeryNegativePercentage((veryNegativeFeedbacks / feedbacks.length) * 100);
    }, [feedbacks])

    const data = {
        labels: Object.values(SentimentType),
        datasets: [
            {
                label: "Sentiment Analysis",
                data: [veryPositivePercentage, positivePercentage, neutralPercentage, negativePercentage, positivePercentage, negativePercentage, veryNegativePercentage],
                backgroundColor: ["#2e80ec"],
                borderWith: 1
            }
        ]
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }

    return (
        <div>
            <Bar id='bar-chart' data={data} options={options} />
        </div>
    )
}

export default SentimentAnalysisBarChart