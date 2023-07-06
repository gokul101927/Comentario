package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.Comment;
import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.entity.UpVote;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.repository.FeedbackRepository;
import com.app.comentarioserver.repository.UpVoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    private final UpVoteRepository upVoteRepository;

    private final BoardService boardService;

    private final UserService userService;

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Feedback getFeedbackFormId(String id) {
        return feedbackRepository.findById(id).orElseThrow();
    }

    public Feedback addFeedback(Feedback feedback) {
        Feedback newFeedback = feedbackRepository.save(feedback);
        boardService.addFeedbackToTheBoard(newFeedback.getBoardId(), newFeedback);
        return newFeedback;
    }

    public boolean checkUpVote(String username, String feedbackId) {
        User user = userService.loadByIdentifier(username);
        Feedback feedback = getFeedbackFormId(feedbackId);
        return upVoteRepository.findByUserAndFeedback(user, feedback).isPresent();
    }

    public Feedback upVote(String username, String feedbackId) {
        User user = userService.loadByIdentifier(username);
        Feedback feedback = getFeedbackFormId(feedbackId);

        UpVote upVote = new UpVote();
        upVote.setUser(user);
        upVote.setFeedback(feedback);
        upVoteRepository.save(upVote);

        feedback.addUpVote(upVote);
        return feedbackRepository.save(feedback);
    }

    public Feedback removeUpVote(String username, String feedbackId) {
        User user = userService.loadByIdentifier(username);
        Feedback feedback = getFeedbackFormId(feedbackId);
        UpVote upVote = upVoteRepository.findByUserAndFeedback(user, feedback).orElseThrow();
        upVoteRepository.delete(upVote);
        feedback.removeUpVote(upVote);
        return feedbackRepository.save(feedback);
    }

    public Feedback postComment(String id, Comment comment) {
        Feedback feedback = feedbackRepository.findById(id).orElseThrow();
        feedback.setComments(comment);
        return feedbackRepository.save(feedback);
    }
    public void deleteAll() {
        feedbackRepository.deleteAll();
    }
}
