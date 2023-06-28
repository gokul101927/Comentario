package com.app.comentarioserver.controller;


import lombok.Data;

@Data
public class UserRequest {

    private String fullName;

    private String username;

    private String mailId;

    private String password;

}
