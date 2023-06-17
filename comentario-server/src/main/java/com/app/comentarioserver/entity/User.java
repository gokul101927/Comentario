package com.app.comentarioserver.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.app.comentarioserver.configuration.GrantedAuthorityDeserializer;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Document(collection = "users")
@Getter
@Setter
public class User implements UserDetails {

    @Id
    private ObjectId id;

    @NotEmpty
    private String firstname;

    @NotEmpty
    private String lastname;

    @NotEmpty
    private String username;

    @NotEmpty
    @Email
    private String emailId;

    @NotEmpty
    private String password;

    private boolean isVerified;

    @JsonDeserialize(using = GrantedAuthorityDeserializer.class)
    private Collection<? extends GrantedAuthority> roles;

    public User() {
        super();
        this.isVerified = false;
    }

    public User(String emailId, String password) {
        this.emailId = emailId;
        this.password = password;
    }

    public User(String firstname, String lastname, String username, String emailId, String password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.emailId = emailId;
        this.password = password;
        this.isVerified = false;
        this.roles = List.of(new SimpleGrantedAuthority("User"));
    }

    public User(String firstname, String lastname, String username, String emailId, String password, Collection<? extends GrantedAuthority> roles, boolean isVerified) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.emailId = emailId;
        this.password = password;
        this.isVerified = isVerified;
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        assert this.roles != null;
        return this.roles.stream().toList();
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.isVerified;
    }
}
