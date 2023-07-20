package com.app.comentarioserver.exception;

public class URLNotValidException extends RuntimeException {

    public URLNotValidException(String message) {
        super(message);
    }

    public URLNotValidException(String message, Throwable cause) {
        super(message, cause);
    }
}

