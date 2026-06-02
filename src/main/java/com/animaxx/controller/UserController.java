package com.animaxx.controller;

import java.util.List;
import com.animaxx.entity.User;
import com.animaxx.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        return userService.loginUser(
                user.getEmail(),
                user.getPassword());
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String home() {
        return "Welcome to AniMaxx Backend!";
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

}
