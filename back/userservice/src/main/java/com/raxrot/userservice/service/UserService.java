package com.raxrot.userservice.service;

import com.raxrot.userservice.dto.RegisterRequest;
import com.raxrot.userservice.dto.UserResponse;
import com.raxrot.userservice.model.User;
import com.raxrot.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponse getUserProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return convertUserToResponse(user);
    }

    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            User existingUser=userRepository.findByEmail(request.getEmail());
            UserResponse userResponse=convertUserToResponse(existingUser);
            return userResponse;
        }

        User user=new User();
        user.setKeycloakId(request.getKeycloakId());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User savedUser=userRepository.save(user);

        return convertUserToResponse(savedUser);
    }

    private UserResponse convertUserToResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setKeycloakId(user.getKeycloakId());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setEmail(user.getEmail());
        userResponse.setPassword(user.getPassword());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        return userResponse;
    }

    public Boolean existByUserId(String userId) {
        return userRepository.existsById(userId);
    }

}
