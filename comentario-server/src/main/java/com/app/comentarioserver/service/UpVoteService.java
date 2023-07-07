package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.Feedback;

import com.app.comentarioserver.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UpVoteService {

    private final UserService userService;
    private final FeedbackService feedbackService;

    private final FeedbackRepository feedbackRepository;

    public Map<Boolean, Integer> checkUpVote(String username, String feedbackId) {
        Map<Boolean, Integer> map = new HashMap<>();
        Feedback feedback = feedbackService.getFeedbackFormId(feedbackId);
        map.put(feedback.hasUpVoted(username), feedback.getUpVoteCount());
        return map;
    }

    public Feedback upVote(String username, String feedbackId) {
        Feedback feedback =feedbackService. getFeedbackFormId(feedbackId);

        feedback.addUpVote(username);
        return feedbackRepository.save(feedback);
    }

    public Feedback removeUpVote(String username, String feedbackId) {
        Feedback feedback = feedbackService.getFeedbackFormId(feedbackId);
        feedback.removeUpVote(username);
        return feedbackRepository.save(feedback);
    }
}
