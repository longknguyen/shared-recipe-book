package com.sharedrecipebook.app.controller;

import com.sharedrecipebook.app.model.User;
import com.sharedrecipebook.app.service.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

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

    @PutMapping("/password")
    public void changePassword(@RequestBody ChangePasswordRequest request) throws Exception {
        userService.changePassword(request.getId(), request.getOldPassword(), request.getNewPassword());
    }

    @PutMapping
    public void editInfo(@RequestBody User user) throws Exception {
        userService.editUserInfo(user);
    }

    @DeleteMapping
    public void deleteAccount(@RequestBody DeleteAccountRequest request) throws Exception {
        userService.deleteUser(request.getId(), request.getPassword());
    }

    @Getter
    private static class ChangePasswordRequest {
        private int id;
        private String oldPassword;
        private String newPassword;
    }

    @Getter
    private static class DeleteAccountRequest {
        private int id;
        private String password;
    }


    @GetMapping("/exist/{username}")
    public boolean usernameExists(@PathVariable String username) throws SQLException {
        return userService.usernameExists(username);
    }
}
