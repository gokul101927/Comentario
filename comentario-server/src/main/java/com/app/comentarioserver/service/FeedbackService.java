package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
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

    public List<Feedback> getAllFeedbacksFromId(String id) {
        return feedbackRepository.findAllById(Collections.singleton(id));
    }

    public Feedback addFeedback(Feedback feedback) {
        boardService.addFeedbackToTheBoard(feedback.getBoardId(), feedback);
        return feedbackRepository.save(feedback);
    }

    public void deleteAll() {
        feedbackRepository.deleteAll();
    }
}
