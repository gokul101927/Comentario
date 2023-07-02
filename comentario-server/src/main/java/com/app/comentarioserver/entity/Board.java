package com.app.comentarioserver.entity;

import com.app.comentarioserver.controller.AuthRequest;
import com.app.comentarioserver.controller.UserRequest;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
import java.util.List;

@Document(collection = "boards")
@Getter
@Setter
@NoArgsConstructor
public class Board {

    @Id
    private ObjectId id;

    @NotNull
    private String coverImageUrl;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private String url;

    private boolean isSelf;

    @NotNull
    private String mailId;

    private List<Feedback> feedbacks;

    public Board(String coverImageUrl, String title, String description, String url, boolean isSelf, String mailId) {
        this.coverImageUrl = coverImageUrl;
        this.title = title;
        this.description = description;
        this.url = url;
        this.isSelf = isSelf;
        this.mailId = mailId;
        this.feedbacks = new LinkedList<>();
    }
    
}
