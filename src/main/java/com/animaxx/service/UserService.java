package com.animaxx.service;

import com.animaxx.entity.User;
import com.animaxx.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public String loginUser(String email, String password) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() &&
                passwordEncoder.matches(
                        password,
                        user.get().getPassword())) {

            return "Login Successful";
        }

        return "Invalid Email or Password";
    }
}