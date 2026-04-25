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
        // ensure password is secure
        if (user.getPassword().length() <= 6 || user.getPassword().equals(user.getUsername())){
            throw new Exception("Password must be at least 6 characters and not the same as your username.");
        }
        userDAO.createUser(user);
    }

    public User login(String username, String password) throws Exception {
        int usrId = userDAO.getUsrIdFromUsername(username);
        if (usrId == -1){
            throw new Exception("Invalid username or password.");
        }
        User user = userDAO.checkPassword(usrId, password);
        if (user == null) {
            throw new Exception("Invalid username or password.");
        }
        return user;
    }

    public User getUser(int id) throws Exception {
        return userDAO.getUserById(id);
    }

    public void changePassword(int id, String oldPassword, String newPassword) throws Exception {
        userDAO.changePassword(id, oldPassword, newPassword);
    }

    public void editUserInfo(User user) throws Exception {
        userDAO.editUserInfo(user);
    }

    public void deleteUser(int usrId, String password) throws Exception {
        userDAO.deleteUser(usrId, password);
    }
}
