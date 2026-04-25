package com.sharedrecipebook.app.controller;

import com.sharedrecipebook.app.model.User;
import com.sharedrecipebook.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) throws Exception {
        return userService.getUser(id);
    }

    @PostMapping("/register")
    public void register(@RequestBody User user) throws Exception {
        userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) throws Exception {
        return userService.login(user.getUsername(), user.getPassword());
    }

    public void changePassword(@RequestBody int id, String oldPassword, String newPassword) throws Exception {
        userService.changePassword(id, oldPassword, newPassword);
    }

    public void editInfo(@RequestBody User user) throws Exception {
        userService.editUserInfo(user);
    }

    public void deleteAccount(@RequestBody int id, String password) throws Exception {
        userService.deleteUser(id, password);
    }
}
