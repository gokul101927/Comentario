package com.app.comentarioserver.controller;

import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.service.UpVoteService;
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
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class UpVoteControllerTest {

    @InjectMocks
    private UpVoteController upVoteController;

    @Mock
    private UpVoteService upVoteService;

    @Test
    void test_check_up_vote() {
        String feedbackId = "123";
        Authentication authentication = Mockito.mock(Authentication.class);
        User user = new User();
        user.setMailId("gokul@gmail.com");
        user.setId("1");

        Mockito.when(authentication.getPrincipal()).thenReturn(user);

        Map<Boolean, Integer> result = new HashMap<>();
        result.put(true, 5);
        Mockito.when(upVoteService.checkUpVote(user.getMailId(), feedbackId)).thenReturn(result);

        ResponseEntity<Map<Boolean, Integer>> response = upVoteController.checkUpVote(feedbackId, authentication);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(result).isEqualTo(response.getBody());

    }

    @Test
    void test_add_up_vote() {
        String feedbackId = "123";
        Authentication authentication = Mockito.mock(Authentication.class);
        User user = new User();
        user.setMailId("gokul@gmail.com");
        user.setId("1");

        Mockito.when(authentication.getPrincipal()).thenReturn(user);

        Feedback feedback = new Feedback();
        feedback.setBoardId("board_1");
        feedback.setTitle("Test feedback");
        Mockito.when(upVoteService.upVote(user.getMailId(), feedbackId)).thenReturn(feedback);

        ResponseEntity<Feedback> response = upVoteController.addUpVote(feedbackId, authentication);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(feedback).isEqualTo(response.getBody());

    }

    @Test
    void test_delete_up_vote() {
        String feedbackId = "123";
        Authentication authentication = Mockito.mock(Authentication.class);
        User user = new User();
        user.setMailId("gokul@gmail.com");
        user.setId("1");

        Mockito.when(authentication.getPrincipal()).thenReturn(user);

        Feedback feedback = new Feedback();
        feedback.setBoardId("board_1");
        feedback.setTitle("Test feedback");
        Mockito.when(upVoteService.removeUpVote(user.getMailId(), feedbackId)).thenReturn(feedback);


        ResponseEntity<Feedback> response = upVoteController.deleteUpVote(feedbackId, authentication);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(feedback).isEqualTo(response.getBody());

    }
}