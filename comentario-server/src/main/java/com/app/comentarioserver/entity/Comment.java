package com.app.comentarioserver.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Comment {
    private String profileUrl;
    private String username;
    private String commentTitle;
}
