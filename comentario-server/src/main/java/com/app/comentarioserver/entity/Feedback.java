package com.app.comentarioserver.entity;

import com.app.comentarioserver.dto.FeedbackDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
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

    @DBRef
    private List<UpVote> upVotes;

    private List<Comment> comments;

    private String boardId;

    private String username;

    private String profileUrl;

    public void setComments(Comment comment) {
        this.comments.add(comment);
    }

    public void addUpVote(UpVote upVote) {
        this.upVotes.add(upVote);
    }

    public void removeUpVote(UpVote upVote) {
        this.upVotes.remove(upVote);
    }


    public Feedback(FeedbackDto feedbackDto) {
        this.title = feedbackDto.title();
        this.category = feedbackDto.category();
        this.description = feedbackDto.description();
        this.upVotes = new ArrayList<>();
        this.comments = new LinkedList<>();
        this.boardId = feedbackDto.boardId();
        this.username = feedbackDto.username();
        this.profileUrl = feedbackDto.profileUrl();
    }
}
