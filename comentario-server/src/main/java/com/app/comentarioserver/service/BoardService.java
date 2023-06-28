package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.repository.BoardRepository;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.exceptions.*;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    private final ImageKit imageKit;

    private final UserService userService;

    public List<Board> allBoards() {
        return boardRepository.findAll();
    }

    public Board addBoard(Board board) {
        Board newBoard = boardRepository.save(board);
        userService.addBoardToTheUser(newBoard, board.getMailId());
        return newBoard;
    }

    public Board getBoard(ObjectId id) {
        return boardRepository.findById(id).orElseThrow();
    }

    public void deleteAll() {
        boardRepository.deleteAll();
    }

    public String uploadImage(MultipartFile image) throws IOException, ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException {
        byte[] imageBytes = image.getBytes();
        FileCreateRequest fileCreateRequest = new FileCreateRequest(imageBytes, "filename");
        Result result = imageKit.upload(fileCreateRequest);
        
        return result.getUrl();
    }
}