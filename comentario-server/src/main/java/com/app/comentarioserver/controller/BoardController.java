package com.app.comentarioserver.controller;

import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.service.BoardService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.imagekit.sdk.exceptions.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
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
@RequestMapping(path = "/boards", produces = "application/json")
public class BoardController {

    private final BoardService boardService;

    private final ObjectMapper objectMapper;

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Board> addBoard(@RequestParam("file")MultipartFile file, @RequestParam("data") String board) throws IOException, ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException {
        log.info("Accessed");
        Board newBoard = objectMapper.readValue(board, Board.class);
        return new ResponseEntity<>(boardService.addBoard(newBoard, file), HttpStatus.OK);
    }

    @GetMapping("/all-boards")
    public ResponseEntity<List<Board>> allBoards() {
        return new ResponseEntity<>(boardService.allBoards(), HttpStatus.OK);
    }

    @GetMapping("/boards/{id}")
    public ResponseEntity<Board> getBoard(@RequestParam("id") ObjectId id) {
        return new ResponseEntity<>(boardService.getBoard(id), HttpStatus.OK);
    }

    @DeleteMapping("/delete-all")
    public void deleteAllBaords() {
        boardService.deleteAll();
    }
}
