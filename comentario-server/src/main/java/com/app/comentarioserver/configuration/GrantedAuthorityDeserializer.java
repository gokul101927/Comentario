package com.app.comentarioserver.configuration;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class GrantedAuthorityDeserializer extends JsonDeserializer<Collection<? extends GrantedAuthority>> {

    @Override
    public Collection<? extends GrantedAuthority> deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
            String authority = jsonParser.readValueAs(String.class);
            authorities.add(new SimpleGrantedAuthority(authority));
        }
        return authorities;
    }
}
