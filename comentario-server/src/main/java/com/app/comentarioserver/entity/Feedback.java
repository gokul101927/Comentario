package com.app.comentarioserver.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "feedbacks")
@Getter
@Setter
@NoArgsConstructor
public class Feedback {

    @Id
    private String id;

    private String title;

    private Category category;

    private String description;

    private int upVotes;

    private List<Comment> comments;

    public Feedback(String title, Category category, String description, int upVotes, List<Comment> comments) {
        this.title = title;
        this.category = category;
        this.description = description;
        this.upVotes = upVotes;
        this.comments = comments;
    }
}
