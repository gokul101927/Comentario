package com.app.comentarioserver.exception;

public class UserNotEnabledException extends RuntimeException {

    public UserNotEnabledException(String message) {
        super(message);
    }

    public UserNotEnabledException(String message, Throwable cause) {
        super(message, cause);
    }
}
