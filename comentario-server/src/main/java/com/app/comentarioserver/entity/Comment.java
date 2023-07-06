package com.app.comentarioserver.entity;

import lombok.Data;

@Data
public class Comment {
    private String profileUrl;
    private String username;
    private String commentTitle;
}
