package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.exception.FeedbackNotFoundException;
import com.app.comentarioserver.repository.FeedbackRepository;
import com.app.comentarioserver.sentiment_analysis.AnalyzeSentiments;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class FeedbackServiceTest {

    @InjectMocks
    private FeedbackService feedbackService;

    @Mock
    private FeedbackRepository feedbackRepository;

    @Mock
    private UserService userService;

    @Mock
    private BoardService boardService;

    @Mock
    private AnalyzeSentiments sentiments;

    @Test
    void test_get_all_feedbacks() {
        Feedback feedback1 = new Feedback();
        feedback1.setId("1");
        feedback1.setTitle("Feedback 1");
        feedback1.setUsername("User 1");

        Feedback feedback2 = new Feedback();
        feedback2.setId("2");
        feedback2.setTitle("Feedback 2");
        feedback2.setUsername("User 2");

        List<Feedback> allFeedbacks = List.of(feedback1, feedback2);

        Mockito.when(feedbackRepository.findAll()).thenReturn(allFeedbacks);

        List<Feedback> result = feedbackService.getAllFeedbacks();

        assertThat(result).hasSameSizeAs(allFeedbacks);
        assertThat(result.get(0).getTitle()).isEqualTo(feedback1.getTitle());
        assertThat(result.get(1).getId()).isEqualTo(feedback2.getId());
    }

    @Test
    void test_get_feedback_from_id() {
        Feedback feedback = new Feedback();
        feedback.setId("1");
        feedback.setTitle("Feedback 1");
        feedback.setUsername("User 1");

        String id = "1";

        Mockito.when(feedbackRepository.findById(id)).thenReturn(Optional.of(feedback));

        Feedback result = feedbackService.getFeedbackFormId(id);

        assertThat(result.getTitle()).isEqualTo("Feedback 1");

    }

    @Test
    void test_get_feedback_from_id_not_found() {
        Feedback feedback = new Feedback();
        feedback.setId("1");
        feedback.setTitle("Feedback 1");

        String id = "1";

        Mockito.when(feedbackRepository.findById(id)).thenReturn(Optional.empty());
        Exception exception = assertThrows(FeedbackNotFoundException.class, () -> feedbackService.getFeedbackFormId(id));
        assertThat(exception.getMessage()).isEqualTo("Unable to find feedback with id: " + id);

    }

    @Test
    void addFeedback() {
        Feedback feedback = new Feedback();
        feedback.setId("1");
        feedback.setTitle("Test feedback");
        feedback.setBoardId("1");
        feedback.setUsername("User");

        Mockito.when(feedbackRepository.save(Mockito.any(Feedback.class))).thenReturn(feedback);

        

    }

    @Test
    void postComment() {
    }

    @Test
    void deleteAll() {
    }

    @Test
    void addFeedbackToRoadmap() {
    }

    @Test
    void deleteComment() {
    }

    @Test
    void calculateSentiment() {
    }
}