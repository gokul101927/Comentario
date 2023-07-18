package com.app.comentarioserver.dto;


import com.app.comentarioserver.pojo.ImageData;
import lombok.Data;

@Data
public class UserRequest {

    private ImageData imageData;

    private String fullName;

    private String username;

    private String mailId;

    private String password;

    public UserRequest(String fullName, String username, String mailId, String password) {
        this.imageData = new ImageData("https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y", "default");
        this.fullName = fullName;
        this.username = username;
        this.mailId = mailId;
        this.password = password;
    }
}
