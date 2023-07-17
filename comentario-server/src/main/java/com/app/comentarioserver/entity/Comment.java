package com.app.comentarioserver.entity;

import com.app.comentarioserver.sentiment.analysis.AnalyzeSentiments;

import lombok.Data;

@Data
public class Comment {
    private String profileUrl;
    private String username;
    private String commentTitle;
    private Sentiment sentiment;

    public Comment(String profileUrl, String username, String commentTitle) {
        this.profileUrl = profileUrl;
        this.username = username;
        this.commentTitle = commentTitle;
        this.sentiment = calculateSentiment(commentTitle);
    }

    public Sentiment calculateSentiment(String text) {
        int score = AnalyzeSentiments.getSentiment(text);

        if (score >= 3) {
            return Sentiment.VERY_POSITIVE;
        } else if (score > 0) {
            return Sentiment.POSITIVE;
        } else if (score == 0) {
            return Sentiment.NEUTRAL;
        } else if (score > -3) {
            return Sentiment.NEGATIVE;
        } else {
            return Sentiment.VERY_NEGATIVE;
        }
    }
}
