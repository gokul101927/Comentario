package com.app.comentarioserver.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "upvotes")
@Getter
@Setter
@NoArgsConstructor
public class UpVote {

    @Id
    private String id;

    @DBRef
    private User user;

    @DBRef
    private Feedback feedback;

    public UpVote(User user, Feedback feedback) {
        this.user = user;
        this.feedback = feedback;
    }
}
