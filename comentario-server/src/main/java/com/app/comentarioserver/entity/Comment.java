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
    }

}
