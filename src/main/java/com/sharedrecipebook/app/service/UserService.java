package com.sharedrecipebook.app.service;

import com.sharedrecipebook.app.dao.UserDAO;
import com.sharedrecipebook.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;

    public User getUser(int id) throws Exception {
        // TODO;
        return null;
    }
}
