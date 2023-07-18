package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.*;
import com.app.comentarioserver.pojo.Comment;
import com.app.comentarioserver.repository.FeedbackRepository;
import com.app.comentarioserver.sentiment_analysis.AnalyzeSentiments;
import com.app.comentarioserver.types.Roadmap;
import com.app.comentarioserver.types.Sentiment;
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

    private final AnalyzeSentiments sentiments;

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Feedback getFeedbackFormId(String id) {
        return feedbackRepository.findById(id). orElseThrow();
    }

    public Feedback addFeedback(Feedback feedback) {
        feedback.setSentiment(calculateSentiment(feedback.getTitle(), feedback.getDescription()));
        Feedback newFeedback = feedbackRepository.save(feedback);
        boardService.addFeedbackToTheBoard(newFeedback.getBoardId(), newFeedback);
        return newFeedback;
    }

    public Feedback postComment(String id, Comment comment) {
        comment.setSentiment(calculateSentiment(comment.getCommentTitle(), null));
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

    public Sentiment calculateSentiment(String title, String description) {

        int titleScore = sentiments.getSentimentScore(title);

        int descriptionScore = sentiments.getSentimentScore(description != null ? description : title);

        int score = (titleScore + descriptionScore)/2;

        if (score >= 3) {
            return Sentiment.VERY_POSITIVE;
        } else if (score > 0) {
            return Sentiment.POSITIVE;
        } else if (score == 0) {
            return Sentiment.NEUTRAL;
        } else if (score > -3) {
            return Sentiment.NEGATIVE;
        } else {
            return Sentiment.VERY_NEGATIVE;
        }
    }
}
