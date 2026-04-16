package com.sharedrecipebook.app.controller;

import com.sharedrecipebook.app.model.User;
import com.sharedrecipebook.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "") // TODO;
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) throws Exception {
        return null;
    }

    @PostMapping("/register")
    public void register(@RequestBody User user) throws Exception {
        userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) throws Exception {
        // TODO;
        return null;
    }
}
