package com.app.comentarioserver.controller;

import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.service.FeedbackService;
import com.app.comentarioserver.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authorization")
@RequiredArgsConstructor
@RequestMapping(path = "/feedbacks/upvote", produces = "application/json")
public class UpVoteController {

    private final FeedbackService feedbackService;

    private final UserService userService;

    @GetMapping(value = "/{feedbackId}")
    public ResponseEntity<Boolean> checkUpVote(@PathVariable String feedbackId, @CurrentSecurityContext(expression = "authentication.principal")
    Principal principal) {
        log.info(principal.getName());
        return new ResponseEntity<>(feedbackService.checkUpVote(principal.getName(), feedbackId), HttpStatus.OK);
    }

    @PutMapping(value = "/add/{feedbackId}")
    public ResponseEntity<Feedback> upVoteFeedback(@PathVariable String feedbackId, @RequestHeader(name = "Authorization") String token) {
        String username = userService.getUsernameFromToken(token);
        return new ResponseEntity<>(feedbackService.upVote(username, feedbackId), HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{feedbackId}")
    public ResponseEntity<Feedback> deleteUpVote(@PathVariable String feedbackId, @RequestHeader(name = "Authorization") String token) {
        String username = userService.getUsernameFromToken(token);
        return new ResponseEntity<>(feedbackService.removeUpVote(username, feedbackId), HttpStatus.OK);
    }
}
