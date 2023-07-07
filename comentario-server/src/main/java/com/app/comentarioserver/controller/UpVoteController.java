package com.app.comentarioserver.controller;

import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.service.UpVoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authorization")
@RequiredArgsConstructor
@RequestMapping(path = "/feedbacks/upvote", produces = "application/json")
public class UpVoteController {

    private final UpVoteService upVoteService;

    @GetMapping(value = "/{feedbackId}")
    public ResponseEntity<Map<Boolean, Integer>> checkUpVote(@PathVariable String feedbackId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return new ResponseEntity<>(upVoteService.checkUpVote(
                user.getMailId(), feedbackId), HttpStatus.OK);
    }


    @PutMapping(value = "/add/{feedbackId}")
    public ResponseEntity<Feedback> addUpVote(@PathVariable String feedbackId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return new ResponseEntity<>(upVoteService.upVote(user.getMailId(), feedbackId), HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{feedbackId}")
    public ResponseEntity<Feedback> deleteUpVote(@PathVariable String feedbackId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return new ResponseEntity<>(upVoteService.removeUpVote(user.getMailId(), feedbackId), HttpStatus.OK);
    }
}
