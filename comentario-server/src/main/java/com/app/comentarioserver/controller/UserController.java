package com.app.comentarioserver.controller;

import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.exception.InvalidCredentialsException;
import com.app.comentarioserver.exception.UserNotEnabledException;
import com.app.comentarioserver.jwt.JwtTokenProvider;
import com.app.comentarioserver.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
    private final ObjectMapper objectMapper;
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
        String username = userService.getUsernameFromToken(token);
        return new ResponseEntity<>(userService.loadUserByUsername(username), HttpStatus.OK);
    }

    @PutMapping("/user/update")
    public ResponseEntity<User> updateUser(@RequestHeader(name = "Authorization") String token, @RequestBody UserRequest userRequest){
        String username = userService.getUsernameFromToken(token);
        return new ResponseEntity<>(userService.updateUser(username, userRequest), HttpStatus.OK);
    }

//    @PutMapping(value = "/user/update-profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<User> updateProfileImage(@RequestHeader(name = "Authorization") String token, @RequestParam("file") MultipartFile file) {
//        String username = userService.getUsernameFromToken(token);
//        return new ResponseEntity<>(userService.updateProfileImage(username, file), HttpStatus.OK);
//    }

}
