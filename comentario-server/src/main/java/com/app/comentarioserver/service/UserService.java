package com.app.comentarioserver.service;

import com.app.comentarioserver.dto.AuthRequest;
import com.app.comentarioserver.dto.UserRequest;
import com.app.comentarioserver.entity.Board;
import com.app.comentarioserver.entity.Token;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.exception.InvalidTokenException;
import com.app.comentarioserver.exception.UserAlreadyExistsException;
import com.app.comentarioserver.exception.UserNotEnabledException;
import com.app.comentarioserver.jwt.JwtTokenProvider;
import com.app.comentarioserver.repository.UserRepository;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.exceptions.*;
import io.imagekit.sdk.models.FileCreateRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.regex.Pattern;

import static com.app.comentarioserver.jwt.JwtTokenFilter.HEADER_PREFIX;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final JavaMailSender mailSender;

    private final ImageKit imageKit;

    private final PasswordEncoder encoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    // Delete everything from above

    public User addUser(UserRequest userRequest) {
        if (checkIfMailIdExists(userRequest.getMailId())) {
            throw new UserAlreadyExistsException("User already exists with this Email");
        }

        if (checkIfUsernameExists(userRequest.getUsername())) {
            throw new UserAlreadyExistsException("User already exists with Username");
        }

        User user = new User(userRequest.getFullName(), userRequest.getUsername(), userRequest.getMailId(), encoder.encode(userRequest.getPassword()), userRequest.getProfileImageUrl());
        user.setRoles(List.of(new SimpleGrantedAuthority("User")));
        user.setVerified(false);
        Token token = new Token();
        user.setVerificationToken(token);

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
            e.printStackTrace();
        }

        mailSender.send(message);
    }

    private boolean checkIfMailIdExists(String mailId) {
        return userRepository.findByMailId(mailId).isPresent();
    }

    private boolean checkIfUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public String fetchPasswordResetOtp(String mailId) {
        int number = new Random().nextInt(999999);
        String otp = String.format("%06d", number);

        String subject = "Password reset";
        String htmlContent = """
                <html>
                <body>
                <h1>Welcome</h1>
                <p>Here is your one time token for password reset</p>
                <p>It'll expire in a day, kindly don't share it with anyone</p>""" +
                otp +
                """
                </body>
                </html>
                        """;
        sendEmail(mailId, subject, htmlContent);
        return otp;
    }

    public boolean resetPassword(String mailId, String password) {
        User user = getByMailId(mailId);
        user.setPassword(encoder.encode(password));
        userRepository.save(user);
        return true;
    }

    public String loginUser(AuthRequest authRequest, Authentication authentication) {

        String jwtToken = jwtTokenProvider.createToken(authentication);

        if (!checkUserVerification(authRequest.getIdentifier())) {
            Token token = new Token();
            User user = loadByIdentifier(authRequest.getIdentifier());
            user.setVerificationToken(token);

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
            userRepository.save(user);
            throw new UserNotEnabledException("User not verified");
        }
        return jwtToken;
    }

    public boolean checkUserVerification(String identifier) {
        User user = loadByIdentifier(identifier);
        return user.isEnabled();
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) {
        return loadByIdentifier(identifier);
    }

    public User loadByIdentifier(String identifier) {
        if (Pattern.compile("^(.+)@(\\S+)$").matcher(identifier).matches()) {
            return getByMailId(identifier);
        } else {
            return getUserByUsername(identifier);
        }
    }

    public String getUsernameFromToken(String token) {
        String jwtToken = token.substring(HEADER_PREFIX.length()).trim();

        if (jwtTokenProvider.validateToken(jwtToken)) {
            return jwtTokenProvider.getUsernameFromToken(jwtToken);
        } else {
            throw new InvalidTokenException("Token is invalid");
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

        updateUserVerification(user);
        return true;
    }

    public void updateUserVerification(User user) {
        user.setVerified(true);
        userRepository.save(user);
    }

    public User updateUser(String username, UserRequest userRequest) {
        User user = loadByIdentifier(username);
        user.setFullName(userRequest.getFullName());
        user.setUsername(userRequest.getUsername());
        user.setMailId(userRequest.getMailId());
        user.setPassword(userRequest.getPassword());
        return userRepository.save(user);
    }

    public User updateProfileImage(String username, MultipartFile file) throws ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException, IOException {
        User user = loadByIdentifier(username);
        user.setProfileImageUrl(uploadImage(file));
        return userRepository.save(user);
    }

    public String uploadImage(MultipartFile image) throws IOException, ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException {
        byte[] imageBytes = image.getBytes();
        FileCreateRequest fileCreateRequest = new FileCreateRequest(imageBytes, "filename");
        fileCreateRequest.setFolder("Comentario/");
        return imageKit.upload(fileCreateRequest).getUrl();
    }

    public User getByMailId(String mailId) {
        Optional<User> optionalUser = userRepository.findByMailId(mailId);
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("Email does not exist");
        }

        return optionalUser.get();
    }

    public User getUserByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("Username does not exist");
        }

        return optionalUser.get();
    }

    public void addBoardToTheUser(Board board, String username) {
        User user = getUserByUsername(username);
        user.setBoards(board);
        userRepository.save(user);
    }

}
