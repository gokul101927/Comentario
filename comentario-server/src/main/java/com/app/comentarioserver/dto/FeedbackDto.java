package com.app.comentarioserver.dto;

import com.app.comentarioserver.entity.Category;

public record FeedbackDto(String title, Category category, String description, String boardId) {
}


