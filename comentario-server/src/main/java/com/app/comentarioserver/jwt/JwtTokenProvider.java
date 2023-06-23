package com.app.comentarioserver.jwt;

import com.app.comentarioserver.entity.User;
import com.app.comentarioserver.exception.InvalidTokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import static com.app.comentarioserver.jwt.JwtTokenFilter.HEADER_PREFIX;


@Slf4j
@Component
public class JwtTokenProvider {

    private static final String AUTHORITIES_KEY = "roles";

    private SecretKey secretKey;

    @Value("${app.secretKey}")
    private String key;

    @Value("${app.jwtValidity}")
    private long validityMs;

    @PostConstruct
    public void init() {
        this.secretKey = Keys.hmacShaKeyFor(Base64.getEncoder().encodeToString(key.getBytes()).getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(Authentication authentication) {
        String email = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        Claims claims = Jwts.claims().setSubject(email);

        if (!authorities.isEmpty()) {
            claims.put(AUTHORITIES_KEY, authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")));
        }

        Date now = new Date();
        Date expiration = new Date(now.getTime() + validityMs);

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(this.secretKey, SignatureAlgorithm.HS256)
                .compact();

        return HEADER_PREFIX + token; // Include the "Bearer" prefix
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(this.secretKey)
                .build().parseClaimsJws(token)
                .getBody();

        Object authoritiesClaims = claims.get(AUTHORITIES_KEY);

        Collection<? extends GrantedAuthority> authorities = authoritiesClaims == null ? AuthorityUtils.NO_AUTHORITIES : AuthorityUtils.commaSeparatedStringToAuthorityList(authoritiesClaims.toString());

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public boolean validateToken(String token) {

        JwtParser parser = Jwts.parserBuilder().setSigningKey(this.secretKey).build();
        try {

            parser.parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            throw new InvalidTokenException("Token is expired", e);
        } catch (JwtException | IllegalArgumentException e) {
            throw new InvalidTokenException("Token is invalid", e);
        }
    }

    public String getUsernameFromToken(String token) {
        return getClaims(token).getSubject();
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(this.secretKey).build().parseClaimsJws(token).getBody();
    }
}
