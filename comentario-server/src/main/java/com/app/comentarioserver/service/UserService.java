package com.app.comentarioserver.service;

import com.app.comentarioserver.controller.AuthRequest;
import com.app.comentarioserver.controller.UserRequest;
import com.app.comentarioserver.entity.Token;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.exception.InvalidCredentialsException;
import com.app.comentarioserver.exception.UserAlreadyExistsException;
import com.app.comentarioserver.jwt.JwtTokenProvider;
import com.app.comentarioserver.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final JavaMailSender mailSender;

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    public User addUser(UserRequest userRequest) {
        if (checkIfUserExists(userRequest.getMailId())) {
            throw new UserAlreadyExistsException("User already exists with email: " + userRequest.getMailId());
        }

        User user = new User(userRequest.getFullName(), userRequest.getUserName(), userRequest.getMailId(), encoder().encode(userRequest.getPassword()));
        user.setRoles(List.of(new SimpleGrantedAuthority("User")));
        user.setVerified(false);
        String verificationTokenValue = user.getVerificationToken().getUserToken();
        String to = user.getMailId();
        String subject = "Welcome, " + user.getFullName();
        String htmlContent = """
                <html>
                <body>
                <h1>Welcome</h1>
                <p>Please click the below button to verify your account</p>""" +
                "<a href=\"http://localhost:8080/users/verify-register-token?token=" + verificationTokenValue + "&email=" + user.getMailId() + "\">Verify Email</a>" +
                """
                </body>
                </html>""";

        sendEmail(to, subject, htmlContent);

        return userRepository.save(user);
    }

    private void sendEmail(String to, String subject, String htmlContent) {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper;
        try {
            mimeMessageHelper = new MimeMessageHelper(message, true, "UTF-8");
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setText(htmlContent, true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        mailSender.send(message);
    }

    private boolean checkIfUserExists(String mailId) {
        return userRepository.findByMailId(mailId).isPresent();
    }

    public String fetchPasswordResetOtp(String mailId) {
        Random rnd = new Random();
        int number = rnd.nextInt(999999);
        String verificationTokenValue = String.format("%06d", number);

        String subject = "Password reset";
        String htmlContent = """
                <html>
                <body>
                <h1>Welcome</h1>
                <p>Here is your one time token for password reset</p>
                <p>It'll expire in a day, kindly don't share it with anyone</p>""" +
                verificationTokenValue +
                """
                </body>
                </html>
                        """;
        sendEmail(mailId, subject, htmlContent);
        return verificationTokenValue;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public String loginUser(AuthRequest authRequest, Authentication authentication) {

        String token = jwtTokenProvider.createToken(authentication);

        log.info(token);
        if (!checkUserVerification(authRequest.getIdentifier())) {
            return "User not verified";
        }
        return token;
    }

    public boolean checkUserVerification(String identifier) {
        User user;
        if (Pattern.compile("^(.+)@(\\S+)$").matcher(identifier).matches()) {
            user = userRepository.findByMailId(identifier).orElseThrow();
        } else {
            user = userRepository.findByUserName(identifier).orElseThrow();
        }

        return user.isEnabled();
    }

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        if (Pattern.compile("^(.+)@(\\S+)$").matcher(identifier).matches()) {
            return userRepository.findByMailId(identifier).orElseThrow();
        } else {
            return userRepository.findByUserName(identifier).orElseThrow();
        }
    }

    public boolean validateVerificationToken(String token, String mailId) {
        User user = userRepository.findByMailId(mailId).orElseThrow();
        Token verificationToken = user.getVerificationToken();

        if (!Objects.equals(token, verificationToken.getUserToken())) {
            log.info(("token not matching"));
            return false;
        }

        if (verificationToken.getExpiryDate().before(new Date())) {
            log.info(("token expired"));
            return false;
        }

        user.setVerified(true);
        updateUser(user);

        return true;
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public User loadByMailId(String mailId) {
        Optional<User> optionalUser = userRepository.findByMailId(mailId);
        if (optionalUser.isEmpty()) {
            throw new InvalidCredentialsException("Account doesn't exist with mail: " + mailId);
        }

        return optionalUser.get();
    }
}
