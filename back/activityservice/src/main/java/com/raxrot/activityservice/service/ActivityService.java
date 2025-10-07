package com.raxrot.activityservice.service;

import com.raxrot.activityservice.dto.ActivityRequest;
import com.raxrot.activityservice.dto.ActivityResponse;
import com.raxrot.activityservice.model.Activity;
import com.raxrot.activityservice.model.ActivityType;
import com.raxrot.activityservice.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;

    public ActivityResponse trackActivity(ActivityRequest activityRequest) {
        Activity activity = Activity.builder()
                .userId(activityRequest.getUserId())
                .type(activityRequest.getActivityType())
                .duration(activityRequest.getDuration())
                .build();

        Integer caloriesBurned= (int) (getMetValue(activity.getType())*70*activity.getDuration()/60);
        activity.setCaloriesBurned(caloriesBurned);

        Activity savedActivity = activityRepository.save(activity);
        return mapToResponse(savedActivity);
    }

    private ActivityResponse mapToResponse(Activity activity) {
        ActivityResponse activityResponse = new ActivityResponse();
        activityResponse.setId(activity.getId());
        activityResponse.setUserId(activity.getUserId());
        activityResponse.setType(activity.getType());
        activityResponse.setDuration(activity.getDuration());
        activityResponse.setCaloriesBurned(activity.getCaloriesBurned());
        activityResponse.setCreatedAt(activity.getCreatedAt());
        activityResponse.setUpdatedAt(activity.getUpdatedAt());
        return activityResponse;
    }

    //calories = getMetValue(activityType) * 70 * (durationMinutes / 60);
    private double getMetValue(ActivityType activityType) {
        return switch (activityType) {
            case RUNNING -> 9.8;
            case WALKING -> 3.5;
            case CYCLING -> 7.5;
            case SWIMMING -> 6.0;
            case WEIGHT_TRAINING -> 5.0;
            case YOGA -> 3.0;
            case CARDIO -> 8.0;
            case DANCING -> 5.5;
            case HIKING -> 6.5;
            case STRETCHING -> 2.5;
        };
    }

    public List<ActivityResponse> getUserActivities(String userId) {
        List<Activity>activityList = activityRepository.findByUserId(userId);
        List<ActivityResponse> activityResponseList = activityList.stream()
                .map(activity -> mapToResponse(activity))
                .collect(Collectors.toList());
        return activityResponseList;
    }

    public ActivityResponse getActivityById(String activityId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(()->new RuntimeException("Activity not found"));
        return mapToResponse(activity);
    }
}
