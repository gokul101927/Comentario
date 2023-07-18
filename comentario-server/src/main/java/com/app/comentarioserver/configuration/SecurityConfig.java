package com.app.comentarioserver.configuration;

import com.app.comentarioserver.exception.InvalidCredentialsException;
import com.app.comentarioserver.exception.UserNotEnabledException;
import com.app.comentarioserver.jwt.JwtTokenFilter;
import com.app.comentarioserver.jwt.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, JwtTokenProvider jwtTokenProvider) throws Exception {
        return httpSecurity
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(httpSecurityCoresConfigure -> corsConfigurationSource())
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/users/login", "/users/register", "/users/verify-email", "/users/reset-password", "/users/verify-register-token", "/users/all-users", "/users/delete-all").permitAll()
                        .requestMatchers( "/boards/delete-all", "/boards/all-boards", "/boards/board/{boardId}", "/update/url-click/{boardId}").permitAll()
                        .requestMatchers( "/feedbacks/delete-all", "/feedbacks/all-feedbacks", "/feedbacks/feedback/{feedbackId}").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtTokenFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .build();

    }


    @Bean
    public AuthenticationManager authenticationManagerBean(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        return authentication -> {
            String identifier =  String.valueOf(authentication.getPrincipal());
            String password = String.valueOf(authentication.getCredentials());
            UserDetails userDetails = userDetailsService.loadUserByUsername(identifier);

            if (!passwordEncoder.matches(password, userDetails.getPassword())) {
                throw new InvalidCredentialsException("Password is wrong");
            }

            if (!userDetails.isEnabled()) {
                throw new UserNotEnabledException("User not verified");
            }

            return new UsernamePasswordAuthenticationToken(identifier, password, userDetails.getAuthorities());
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
