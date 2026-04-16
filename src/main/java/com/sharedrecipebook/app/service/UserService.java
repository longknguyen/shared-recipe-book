package com.sharedrecipebook.app.service;

import com.sharedrecipebook.app.dao.UserDAO;
import com.sharedrecipebook.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;

    public void registerUser(User user) throws Exception {
        // TODO;
    }

    public User login(String username, String password) throws Exception {
        // TODO;
        return null;
    }

    public User getUser(int id) throws Exception {
        // TODO;
        return null;
    }
}
