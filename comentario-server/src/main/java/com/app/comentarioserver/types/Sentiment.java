package com.app.comentarioserver.types;

public enum Sentiment {
    VERY_POSITIVE("Very positive"),
    POSITIVE("Positive"),
    NEUTRAL("Neutral"),
    NEGATIVE("Negative"),
    VERY_NEGATIVE("Very negative");

    private final String sentiments;

    Sentiment(String sentiment) {
        this.sentiments = sentiment;
    }

    public String getRoadmaps() {
        return this.sentiments;
    }
}
