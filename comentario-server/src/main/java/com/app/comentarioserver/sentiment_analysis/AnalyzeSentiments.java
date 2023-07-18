package com.app.comentarioserver.sentiment_analysis;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import uk.ac.wlv.sentistrength.SentiStrength;

import java.net.URL;
import java.util.List;

@Configuration
@Slf4j
public class AnalyzeSentiments {

    private final SentiStrength sentiStrength;

    private static final String RESOURCE_FOLDER = "SentiStrength_Data/";

    public String getSentiStrengthDataFolderPath() {
        ClassLoader classLoader = getClass().getClassLoader();
        // Get the resource URL for the folder
        URL folderUrl = classLoader.getResource(RESOURCE_FOLDER);
        // Convert the URL to a path and return it as a string
        assert folderUrl != null;
        return folderUrl.getPath();
    }


    public AnalyzeSentiments() {
        log.info(getSentiStrengthDataFolderPath());
        String[] sentiStrengthLanguagePath = {"sentidata",getSentiStrengthDataFolderPath(), "explain"};
        this.sentiStrength = new SentiStrength();
        sentiStrength.initialise(sentiStrengthLanguagePath);
    }

    public int getSentimentScore(String text) {
        String sentiments = sentiStrength.computeSentimentScores(text);

        String[] scores =  sentiments.split(" ");
        int positiveScore = Integer.parseInt(scores[0]);
        int negativeScore = Integer.parseInt(scores[1]);

        return positiveScore - (negativeScore * -1);

    }

}
