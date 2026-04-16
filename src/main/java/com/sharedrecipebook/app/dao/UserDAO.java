package com.sharedrecipebook.app.dao;

import com.sharedrecipebook.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.SQLException;

@Repository
public class UserDAO {
    @Autowired
    private DataSource dataSource;

    public void createUser(User user) throws SQLException {
        // TODO;
    }

    public User getUserById(int id) throws SQLException {
        // TODO;
        return null;
    }
}
