package com.app.comentarioserver.repository;

import com.app.comentarioserver.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByMailId(String mailId);

    Optional<User> findByUsername(String username);

}
