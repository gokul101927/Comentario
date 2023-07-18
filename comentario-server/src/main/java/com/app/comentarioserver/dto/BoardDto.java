package com.app.comentarioserver.dto;

import com.app.comentarioserver.pojo.ImageData;

public record BoardDto(String title, String description, String url, boolean isSelf,
                       String username) {

}
