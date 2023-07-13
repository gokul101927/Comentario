package com.app.comentarioserver.repository;

import com.app.comentarioserver.entity.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback, String> {

    Optional<Feedback> findByUsername(String username);
}
