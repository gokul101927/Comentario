package com.app.comentarioserver.controller;

import com.app.comentarioserver.dto.AuthRequest;
import com.app.comentarioserver.dto.UserRequest;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.exception.InvalidCredentialsException;
import com.app.comentarioserver.exception.UserNotEnabledException;
import com.app.comentarioserver.service.UserService;
import io.imagekit.sdk.exceptions.*;
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

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authorization")
@RequiredArgsConstructor
@RequestMapping(path = "/users", produces = "application/json")
public class UserController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @DeleteMapping("/delete-all")
    public void deleteAllUsers() {
        userService.deleteAllUsers();
    }

    // Delete everything from above


    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<User> registerUser(@RequestBody UserRequest userRequest) {
        return new ResponseEntity<>(userService.addUser(userRequest), HttpStatus.OK);
    }

    @GetMapping("/verify-register-token")
    public RedirectView verifyRegisterToken(@RequestParam("token") String token, @RequestParam("email") String email) throws URISyntaxException {

        if (userService.validateVerificationToken(token, email)) {
            return new RedirectView("http://localhost:5173/sign-in");
        } else {
            return new RedirectView("http://localhost:5173/sign-up");
        }
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<String> signIn(@RequestBody AuthRequest authRequest) {

        try {
            log.info("Authenticated started");
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getIdentifier(), authRequest.getPassword()));
            log.info("Authenticated");
            return new ResponseEntity<>(userService.loginUser(authRequest, authentication), HttpStatus.OK);
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException(e.getMessage());
        }

    }

    @PutMapping("/reset-password")
    public ResponseEntity<String> forgotPassword(@RequestBody AuthRequest authRequest) {
        boolean status = userService.resetPassword(authRequest.getIdentifier(), authRequest.getPassword());

        if (status) {
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

        return new ResponseEntity<>("Error updating password", HttpStatus.BAD_GATEWAY);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("mailId") String mailId) {
        if (userService.getByMailId(mailId).isEnabled()) {
            return new ResponseEntity<>(userService.fetchPasswordResetOtp(mailId), HttpStatus.OK);
        } else {
            throw new UserNotEnabledException("User not verified");
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken() {
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDetails> getUserFromToken(@RequestHeader("Authorization") String token) {
        String username = userService.getUsernameFromToken(token);
        return new ResponseEntity<>(userService.loadUserByUsername(username), HttpStatus.OK);
    }

    @PutMapping("/user/update")
    public ResponseEntity<User> updateUser(Authentication authentication, @RequestBody UserRequest userRequest){
        User user = (User) authentication.getPrincipal();
        return new ResponseEntity<>(userService.updateUser(user.getMailId(), userRequest), HttpStatus.OK);
    }

    @PutMapping(value = "/user/update-profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> updateProfileImage(Authentication authentication, @RequestParam("file") MultipartFile file) throws ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException, IOException {
        User user = (User) authentication.getPrincipal();
        return new ResponseEntity<>(userService.updateProfileImage(user.getMailId(), file), HttpStatus.OK);
    }



}
