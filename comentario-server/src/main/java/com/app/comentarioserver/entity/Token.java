package com.app.comentarioserver.entity;

import lombok.Data;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;


@Data
public class Token {
    private static final int TOKEN_EXPIRATION = 60 * 24;

    private String userToken;

    private Date expiryDate;

    private Date calculateExpiryDate(int expiration) {
        final Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Date().getTime());
        cal.add(Calendar.MINUTE, expiration);
        return new Date(cal.getTime().getTime());
    }

    public Token() {
        this.userToken = UUID.randomUUID().toString();
        this.expiryDate = calculateExpiryDate(TOKEN_EXPIRATION);
    }


}
