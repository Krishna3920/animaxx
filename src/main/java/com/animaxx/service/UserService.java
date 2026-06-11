package com.animaxx.service;

import com.animaxx.entity.User;
import com.animaxx.repository.UserRepository;
import com.animaxx.security.JwtUtil;

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
                passwordEncoder.encode(
                        user.getPassword()));

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

    public User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElse(null);

    }

    public String loginUser(
            String email,
            String password) {

        Optional<User> user = userRepository.findByEmail(email);

        System.out.println(
                "Email entered: " + email);

        System.out.println(
                "Password entered: " + password);

        if (user.isPresent()) {

            System.out.println("User found");

            System.out.println(
                    "Stored Hash: "
                            + user.get().getPassword());

            if (passwordEncoder.matches(
                    password,
                    user.get().getPassword())) {

                return JwtUtil.generateToken(email);

            }

        }

        return "Invalid Email or Password";

    }

}