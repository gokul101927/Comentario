package com.app.comentarioserver.controller;

import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authorization")
@RequiredArgsConstructor
@RequestMapping(path = "/boards", produces = "application/json")
public class BoardController {

    private final BoardService boardService;

    @PostMapping(value = "/add", consumes = "application/json")
    public ResponseEntity<Board> addBoard(@RequestBody Board board) {
        return new ResponseEntity<>(boardService.addBoard(board), HttpStatus.OK);
    }

    @GetMapping("/all-boards")
    public ResponseEntity<List<Board>> allBoards() {
        return new ResponseEntity<>(boardService.allBoards(), HttpStatus.OK);
    }

    @GetMapping("/boards/{id}")
    public ResponseEntity<Board> allBoards(@RequestParam("id") ObjectId id) {
        return new ResponseEntity<>(boardService.getBoard(id), HttpStatus.OK);
    }

    @DeleteMapping("/delete-all")
    public void deleteAllBaords() {
        boardService.deleteAll();
    }
}
