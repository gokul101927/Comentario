package com.app.comentarioserver.dto;

public record BoardDto(String coverImageUrl, String title, String description, String url, boolean isSelf,
                       String username) {

}
