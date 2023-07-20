package com.app.comentarioserver.exception;

public class URLAlreadyExistsException extends RuntimeException {

    public URLAlreadyExistsException(String message) {
        super(message);
    }

    public URLAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
