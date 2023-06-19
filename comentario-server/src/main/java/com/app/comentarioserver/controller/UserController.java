package com.app.comentarioserver.controller;

import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.exception.InvalidCredentialsException;
import com.app.comentarioserver.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authorization")
@RequiredArgsConstructor
@RequestMapping(path = "/users", produces = "application/json")
public class UserController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<User> registerUser(@RequestBody UserRequest userRequest) {
        User user = new User(userRequest.getFullName(), userRequest.getUserName(), userRequest.getMailId(), userRequest.getPassword());
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.OK);
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @DeleteMapping("/delete-all")
    public void deleteAllUsers() {
        userService.deleteAllUsers();
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<String> signIn(@RequestBody AuthRequest authRequest) {
        Authentication authentication;
        try {
            log.info("Authenticated started");
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getIdentifier(), authRequest.getPassword()));
            log.info("Authenticated");
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException(e.getMessage());
        }

        return new ResponseEntity<>(userService.loginUser(authRequest, authentication), HttpStatus.OK);
    }
}
