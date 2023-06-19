package com.app.comentarioserver.service;

import com.app.comentarioserver.controller.AuthRequest;
import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.jwt.JwtTokenProvider;
import com.app.comentarioserver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    public User addUser(User user) {
        String encodedPassword = encoder().encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setRoles(List.of(new SimpleGrantedAuthority("User")));
        user.setVerified(false);
        return userRepository.save(user);
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

}
