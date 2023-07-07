package com.app.comentarioserver.controller;

import com.app.comentarioserver.dto.FeedbackDto;
import com.app.comentarioserver.entity.Comment;
import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.service.FeedbackService;
import com.app.comentarioserver.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authorization")
@RequiredArgsConstructor
@RequestMapping(path = "/feedbacks", produces = "application/json")
public class FeedbackController {

    private final FeedbackService feedbackService;

    private final UserService userService;

    @DeleteMapping("/delete-all")
    public void deleteAllFeedbacks() {
        feedbackService.deleteAll();
    }

    @GetMapping("/all-feedbacks")
    public ResponseEntity<List<Feedback>> allBoards() {
        return new ResponseEntity<>(feedbackService.getAllFeedbacks(), HttpStatus.OK);
    }

    @GetMapping("/feedback/{feedbackId}")
    public ResponseEntity<Feedback> getFeedback(@PathVariable String feedbackId) {
        return new ResponseEntity<>(feedbackService.getFeedbackFormId(feedbackId), HttpStatus.OK);
    }

    @PostMapping(value = "/add", consumes = "application/json")
    public ResponseEntity<Feedback> addFeedback(@RequestBody FeedbackDto feedbackDto) {

        Feedback feedback = new Feedback(feedbackDto);
        return new ResponseEntity<>(feedbackService.addFeedback(feedback), HttpStatus.OK);
    }

    @PutMapping(value = "/comment/post")
    public  ResponseEntity<Feedback> postComment(@RequestParam("id") String id, @RequestBody Comment comment) {
        return new ResponseEntity<>(feedbackService.postComment(id, comment), HttpStatus.OK);
    }
}
