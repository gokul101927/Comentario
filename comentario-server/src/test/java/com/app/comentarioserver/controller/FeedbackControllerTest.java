package com.app.comentarioserver.controller;

import com.app.comentarioserver.dto.FeedbackDto;
import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.service.CommentService;
import com.app.comentarioserver.service.FeedbackService;
import com.app.comentarioserver.types.Category;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class FeedbackControllerTest {

    @InjectMocks
    private FeedbackController feedbackController;

    @Mock
    private FeedbackService feedbackService;

    @Mock
    private CommentService commentService;

    @Test
    void test_get_feedback() {
        Feedback feedback = new Feedback();
        feedback.setBoardId("board_1");
        feedback.setTitle("Test feedback");
        feedback.setId("123");
        Mockito.when(feedbackService.getFeedbackFormId(feedback.getId())).thenReturn(feedback);

        ResponseEntity<Feedback> response = feedbackController.getFeedback(feedback.getId());

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(feedback);
    }


    @Test
    void postComment() {
    }

    @Test
    void addRoadmap() {
    }

    @Test
    void deleteComment() {
    }
}