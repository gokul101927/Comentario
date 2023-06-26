package com.app.comentarioserver.configuration;

import com.app.comentarioserver.entity.Board;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;

public class BoardDeserializer extends StdDeserializer<Board> {

    public BoardDeserializer() {
        this(null);
    }

    public BoardDeserializer(Class<?> ve) {
        super(ve);
    }

    @Override
    public Board deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
        String boardId = p.readValueAs(String.class);
        return new Board(boardId);
    }
}
