package com.app.comentarioserver.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "feedbacks")
@Getter
@Setter
@NoArgsConstructor
public class Feedback {
}
