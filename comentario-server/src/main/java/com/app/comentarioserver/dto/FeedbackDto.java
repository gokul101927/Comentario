package com.app.comentarioserver.dto;

import com.app.comentarioserver.types.Category;

public record FeedbackDto(String title, Category category, String description, String boardId, String username, String profileUrl) {
}


