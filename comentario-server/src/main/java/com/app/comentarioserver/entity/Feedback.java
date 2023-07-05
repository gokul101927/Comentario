package com.app.comentarioserver.entity;

import com.app.comentarioserver.dto.FeedbackDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
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

    private String boardId;

    @Override
    public String toString() {
        return "Feedback{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", category=" + category +
                ", description='" + description + '\'' +
                ", upVotes=" + upVotes +
                ", comments=" + comments +
                ", boardId='" + boardId + '\'' +
                '}';
    }

    public Feedback(FeedbackDto feedbackDto) {
        this.title = feedbackDto.title();
        this.category = feedbackDto.category();
        this.description = feedbackDto.description();
        this.upVotes = 0;
        this.comments = new LinkedList<>();
        this.boardId = feedbackDto.boardId();
    }
}
