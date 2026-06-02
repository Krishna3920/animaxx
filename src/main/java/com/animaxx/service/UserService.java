package com.animaxx.service;

import java.util.List;
import com.animaxx.entity.User;
import com.animaxx.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }
}
