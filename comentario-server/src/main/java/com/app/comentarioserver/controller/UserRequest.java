package com.app.comentarioserver.controller;


import lombok.Data;

@Data
public class UserRequest {

    private String profileImageUrl;

    private String fullName;

    private String username;

    private String mailId;

    private String password;

    public UserRequest(String fullName, String username, String mailId, String password) {
        this.profileImageUrl = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
        this.fullName = fullName;
        this.username = username;
        this.mailId = mailId;
        this.password = password;
    }
}
