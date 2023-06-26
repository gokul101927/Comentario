package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public List<Board> allBoards() {
        return boardRepository.findAll();
    }

    public Board addBoard(Board board) {
        return boardRepository.save(board);
    }

    public Board getBoard(ObjectId id) {
        return boardRepository.findById(id).orElseThrow();
    }
}
