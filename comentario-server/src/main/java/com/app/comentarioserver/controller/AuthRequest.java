package com.app.comentarioserver.controller;

import lombok.Data;

import java.io.Serializable;

@Data
public class AuthRequest implements Serializable {
    private String identifier;
    private String password;
}
