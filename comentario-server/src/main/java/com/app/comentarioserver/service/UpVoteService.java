package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.entity.UpVote;
import com.app.comentarioserver.entity.User;

import com.app.comentarioserver.repository.FeedbackRepository;
import com.app.comentarioserver.repository.UpVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpVoteService {

    private final UserService userService;
    private final FeedbackService feedbackService;
    private final UpVoteRepository upVoteRepository;
    private final FeedbackRepository feedbackRepository;

    public boolean checkUpVote(String username, String feedbackId) {
        User user = userService.loadByIdentifier(username);
        Feedback feedback = feedbackService.getFeedbackFormId(feedbackId);
        return upVoteRepository.findByUserAndFeedback(user, feedback).isPresent();
    }

    public Feedback upVote(String username, String feedbackId) {
        User user = userService.loadByIdentifier(username);
        Feedback feedback =feedbackService. getFeedbackFormId(feedbackId);

        UpVote upVote = upVoteRepository.save(new UpVote(user, feedback));

        feedback.addUpVote(upVote);
        return feedbackRepository.save(feedback);
    }

    public Feedback removeUpVote(String username, String feedbackId) {
        User user = userService.loadByIdentifier(username);
        Feedback feedback = feedbackService.getFeedbackFormId(feedbackId);
        UpVote upVote = upVoteRepository.findByUserAndFeedback(user, feedback).orElseThrow();
        upVoteRepository.delete(upVote);
        feedback.removeUpVote(upVote);
        return feedbackRepository.save(feedback);
    }
}
