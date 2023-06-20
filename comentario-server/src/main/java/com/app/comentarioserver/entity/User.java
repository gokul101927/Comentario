package com.app.comentarioserver.entity;

import com.app.comentarioserver.configuration.GrantedAuthorityDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    private ObjectId id;

    @NotEmpty
    private String fullName;

    @NotEmpty
    private String userName;

    @NotEmpty
    @Email
    private String mailId;

    @NotEmpty
    private String password;

    @Transient
    private Token verificationToken;

    private boolean isVerified;

    @JsonDeserialize(using = GrantedAuthorityDeserializer.class)
    private Collection<? extends GrantedAuthority> roles;

    public User(String fullName, String userName, String mailId, String password) {
        this.fullName = fullName;
        this.userName = userName;
        this.mailId = mailId;
        this.password = password;
        this.roles = List.of(new SimpleGrantedAuthority("USER"));
        this.isVerified = false;
        this.verificationToken = new Token();
    }

    public User(String mailId, String password, Collection<? extends GrantedAuthority> roles) {
        this.mailId = mailId;
        this.password = password;
        this.roles = roles;

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        assert  this.roles != null;
        return this.roles.stream().toList();
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    @Transient
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @Transient
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @Transient
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.isVerified;
    }
}
