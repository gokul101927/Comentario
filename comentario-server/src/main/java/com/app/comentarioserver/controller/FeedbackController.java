package com.app.comentarioserver.controller;

import com.app.comentarioserver.dto.FeedbackDto;
import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.service.FeedbackService;
import io.imagekit.sdk.exceptions.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authorization")
@RequiredArgsConstructor
@RequestMapping(path = "/feedbacks", produces = "application/json")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @DeleteMapping("/delete-all")
    public void deleteAllFeedbacks() {
        feedbackService.deleteAll();
    }

    @GetMapping("/all-feedbacks")
    public ResponseEntity<List<Feedback>> allBoards() {
        return new ResponseEntity<>(feedbackService.getAllFeedbacks(), HttpStatus.OK);
    }

    @PostMapping(value = "/add", consumes = "application/json")
    public ResponseEntity<Feedback> addFeedback(@RequestBody FeedbackDto feedbackDto) {

        Feedback feedback = new Feedback(feedbackDto);
        log.info(feedback.toString());
        return new ResponseEntity<>(feedbackService.addFeedback(feedback), HttpStatus.OK);
    }
}
