package com.app.comentarioserver.service;

import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.entity.Feedback;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.repository.BoardRepository;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.exceptions.*;
import io.imagekit.sdk.models.FileCreateRequest;
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

    private final String IMAGE_FOLDER = "Comentario/users/";

    private final BoardRepository boardRepository;

    private final ImageKit imageKit;

    private final UserService userService;

    public List<Board> allBoards() {
        return boardRepository.findAll();
    }

    public Board addBoard(Board board, MultipartFile file) throws ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException, IOException {
        board.setCoverImageUrl(uploadCoverImage(file));
        Board newBoard = boardRepository.save(board);
        userService.addBoardToTheUser(newBoard, board.getUsername());
        return newBoard;
    }

    public Board getBoard(String boardId) {
        return boardRepository.findById(boardId).orElseThrow();
    }

    public void deleteAll() {
        boardRepository.deleteAll();
    }

    public String uploadCoverImage(MultipartFile image) throws IOException, ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException {
        byte[] imageBytes = image.getBytes();
        FileCreateRequest fileCreateRequest = new FileCreateRequest(imageBytes, "filename");
        fileCreateRequest.setFolder("Comentario/");
        return imageKit.upload(fileCreateRequest).getUrl();
    }

    public void addFeedbackToTheBoard(String id, Feedback feedback) {
        Board board = boardRepository.findById(id).orElseThrow();
        board.setFeedbacks(feedback);
        boardRepository.save(board);
    }
}
