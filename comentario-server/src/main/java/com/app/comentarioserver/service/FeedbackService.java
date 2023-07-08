package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.Comment;
import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.entity.Roadmap;
import com.app.comentarioserver.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    private final BoardService boardService;


    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Feedback getFeedbackFormId(String id) {
        return feedbackRepository.findById(id). orElseThrow();
    }

    public Feedback addFeedback(Feedback feedback) {
        Feedback newFeedback = feedbackRepository.save(feedback);
        boardService.addFeedbackToTheBoard(newFeedback.getBoardId(), newFeedback);
        return newFeedback;
    }

    public Feedback postComment(String id, Comment comment) {
        Feedback feedback = feedbackRepository.findById(id).orElseThrow();
        feedback.setComments(comment);
        return feedbackRepository.save(feedback);
    }
    public void deleteAll() {
        feedbackRepository.deleteAll();
    }

    public Feedback addFeedbackToRoadmap(String feedbackId, Roadmap roadmap) {
        Feedback feedback = feedbackRepository.findById(feedbackId).orElseThrow();
        feedback.setRoadmap(roadmap);
        return feedbackRepository.save(feedback);
    }
}
