package com.app.comentarioserver.repository;

import com.app.comentarioserver.entity.Board;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends MongoRepository<Board, String> {

    Optional<Board> findByUsername(String username);
}
