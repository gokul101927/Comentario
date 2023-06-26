package com.app.comentarioserver.repository;

import com.app.comentarioserver.entity.Board;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends MongoRepository<Board, ObjectId> {
}
