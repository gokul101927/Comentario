package com.app.comentarioserver.dto;

import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.entity.Token;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public record UserDto(String fullName, String username, String mailId, String password, Token verificationToken,
                      String profileImageUrl, boolean isVerified, List<Board> boards,
                      Collection<? extends GrantedAuthority> roles) {

}
