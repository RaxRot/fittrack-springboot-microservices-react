package com.raxrot.activityservice.repository;

import com.raxrot.activityservice.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, String> {
}
