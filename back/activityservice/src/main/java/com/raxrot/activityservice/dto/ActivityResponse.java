package com.raxrot.activityservice.dto;

import com.raxrot.activityservice.model.ActivityType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityResponse {
    private String id;
    private String userId;
    private ActivityType type;
    private Integer duration;
    private Integer caloriesBurned;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
