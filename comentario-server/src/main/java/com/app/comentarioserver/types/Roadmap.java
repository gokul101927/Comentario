package com.app.comentarioserver.types;

public enum Roadmap {
    NONE("None"),
    PLANNED("Planned"),
    INPROGRESS("InProgress"),
    LIVE("Live");

    private final String roadmaps;

    Roadmap(String roadmaps) {
        this.roadmaps = roadmaps;
    }

    public String getRoadmaps() {
        return this.roadmaps;
    }
}
