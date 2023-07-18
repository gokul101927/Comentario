package com.app.comentarioserver.pojo;

import com.app.comentarioserver.types.Sentiment;
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
