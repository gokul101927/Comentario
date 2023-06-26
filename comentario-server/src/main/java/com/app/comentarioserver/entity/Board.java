package com.app.comentarioserver.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

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

    @DBRef
    private User user;
}
