package com.raxrot.userservice.repository;

import com.raxrot.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    Boolean existsByEmail(String email);
    Boolean existsByKeycloakId(String keycloakId);

    User findByEmail(String email);
}
