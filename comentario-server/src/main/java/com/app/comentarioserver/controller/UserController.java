package com.app.comentarioserver.controller;

import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.exception.InvalidCredentialsException;
import com.app.comentarioserver.exception.UserNotEnabledException;
import com.app.comentarioserver.jwt.JwtTokenProvider;
import com.app.comentarioserver.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URISyntaxException;
import java.util.List;

import static com.app.comentarioserver.jwt.JwtTokenFilter.HEADER_PREFIX;

@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authorization")
@RequiredArgsConstructor
@RequestMapping(path = "/users", produces = "application/json")
public class UserController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<User> registerUser(@RequestBody UserRequest userRequest) {
        return new ResponseEntity<>(userService.addUser(userRequest), HttpStatus.OK);
    }

    @GetMapping("/verify-register-token")
    public RedirectView verifyRegisterToken(@RequestParam("token") String token, @RequestParam("email") String email) throws URISyntaxException {
        log.info("verification started");
        if (userService.validateVerificationToken(token, email)) {
            return new RedirectView("http://localhost:5173/sign-in");
        } else {
            return new RedirectView("http://localhost:5173/sign-up");
        }
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

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam("mailId") String mailId) {

        if (userService.loadByMailId(mailId).isEnabled()) {
            return new ResponseEntity<>(userService.fetchPasswordResetOtp(mailId), HttpStatus.OK);
        } else {
            throw new UserNotEnabledException("Kindly verify your email.");
        }

    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken() {
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDetails> getUserFromToken(@RequestHeader(name = "Authorization") String token) {
        log.info("Validation started");
        String username = userService.getUsernameFromToken(token);
        return new ResponseEntity<>(userService.loadUserByUsername(username), HttpStatus.OK);
    }

}
