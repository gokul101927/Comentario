package com.app.comentarioserver.sentiment.analysis;

import com.app.comentarioserver.entity.Sentiment;
import uk.ac.wlv.sentistrength.SentiStrength;

import java.util.List;

public class AnalyzeSentiments {

    private AnalyzeSentiments() {}

    public static int getSentiment(String text) {
        String[] sentiStrengthLanguagePath = {"sentidata", "/Users/m_890974/Desktop/SentiStrength_Data/", "explain"};
        SentiStrength sentiStrength = new SentiStrength();
        sentiStrength.initialise(sentiStrengthLanguagePath);

        String sentiments = sentiStrength.computeSentimentScores(text);

        String[] scores =  sentiments.split(" ");
        int positiveScore = Integer.parseInt(scores[0]);
        int negativeScore = Integer.parseInt(scores[1]);

        return positiveScore - (negativeScore * -1);

    }

}
