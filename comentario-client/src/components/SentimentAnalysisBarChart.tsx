import React, { useEffect, useState } from 'react'
import { Feedback, SentimentType, Comment } from '../interfaces/types'
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

interface Props {
    feedbacks: Feedback[] | undefined;
    comments: Comment[] | undefined;
    onBarClick: (sentiment: SentimentType) => void;
}

const SentimentAnalysisBarChart: React.FC<Props> = ({ feedbacks, onBarClick, comments }) => {

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

    useEffect(() => {
        if (!comments) return;
        const veryPositiveFeedbacks = comments.filter((comment) => comment.sentiment === SentimentType.VERY_POSITIVE).length;
        setVeryPositivePercentage((veryPositiveFeedbacks / comments.length) * 100);

        const positiveFeedbacks = comments.filter((comment) => comment.sentiment === SentimentType.POSITIVE).length;
        setPositivePercentage((positiveFeedbacks / comments.length) * 100);

        const neutralFeedbacks = comments.filter((comment) => comment.sentiment === SentimentType.NEUTRAL).length;
        setNeutralPercentagePercentage((neutralFeedbacks / comments.length) * 100);

        const negativeFeedbacks = comments.filter((comment) => comment.sentiment === SentimentType.NEGATIVE).length;
        setNegativePercentage((negativeFeedbacks / comments.length) * 100);

        const veryNegativeFeedbacks = comments.filter((comment) => comment.sentiment === SentimentType.VERY_NEGATIVE).length;
        setVeryNegativePercentage((veryNegativeFeedbacks / comments.length) * 100);
    }, [comments])

    const data = {
        labels: Object.values(SentimentType),
        datasets: [
            {
                label: "Sentiment Analysis",
                data: [veryPositivePercentage, positivePercentage, neutralPercentage, negativePercentage, veryNegativePercentage],
                backgroundColor: ["#2e80ec",
                '#34D399',
                '#F87171',
                '#FBBF24',
                '#A78BFA',],
                borderWith: 1
            }
        ]
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        },
        onClick: (_event: any, elements: any) => {
            if (elements?.length) {
              const index = elements[0].index;
              if (index !== undefined && index >= 0 && index < Object.values(SentimentType).length) {
                const selectedSentiment = Object.values(SentimentType)[index];
                onBarClick(selectedSentiment);
                console.log(selectedSentiment);
              }
            }
          },
    }

    return (
        <div>
            <Bar id='bar-chart' data={data} options={options} />
        </div>
    )
}

export default SentimentAnalysisBarChart