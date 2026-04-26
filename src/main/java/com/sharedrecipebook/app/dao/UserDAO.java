package com.sharedrecipebook.app.dao;

import com.sharedrecipebook.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.sharedrecipebook.app.util.PasswordUtil;

@Repository
public class UserDAO {
    @Autowired
    private DataSource dataSource;

    public void createUser(User user) throws SQLException {
        String sql = "INSERT INTO users (usr_id, username, age, pw, occupation) VALUES (?, ?, ?, ?, ?)";
        String hashedPassword = PasswordUtil.hashPassword(user.getPassword());
        try (Connection conn = dataSource.getConnection();
        PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1,user.getUsrID());
            ps.setString(2,user.getUsername());
            ps.setInt(3,user.getAge());
            ps.setString(4,hashedPassword);
            ps.setString(5,user.getOccupation());
            ps.executeUpdate();
        }
    }

    public User getUserById(int id) throws SQLException {
        String sql = "SELECT usr_id, username, age, occupation FROM users WHERE usr_id = ?";
        try (Connection conn = dataSource.getConnection();
        PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1,id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                User user = new User();
                user.setUsrID(rs.getInt("usr_id"));
                user.setUsername(rs.getString("username"));
                user.setAge(rs.getInt("age"));
                user.setOccupation(rs.getString("occupation"));
                return user;
            }
        }
        return null;
    }

    public int getUsrIdFromUsername(String username) throws SQLException {
        String sql = "SELECT usr_id FROM users WHERE username = ?";
        try (Connection conn = dataSource.getConnection();
        PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1,username);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt("usr_id");
            }else{
                return -1;
            }
        }
    }

    public User checkPassword(int usrId, String password) throws SQLException {
        String sql = "SELECT pw FROM users WHERE usr_id = ?";
        try (Connection conn = dataSource.getConnection();
        PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1,usrId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                if (PasswordUtil.checkPassword(password, rs.getString("pw"))) {
                    return getUserById(usrId);
                }
            }
            return null;
        }
    }

    public void changePassword(int usrId, String oldPassword, String newPassword) throws SQLException {
        if (checkPassword(usrId,oldPassword) != null){
            String sql = "UPDATE users SET pw = ? WHERE usr_id = ?";
            try (Connection conn = dataSource.getConnection();
                 PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setString(1, PasswordUtil.hashPassword(newPassword));
                ps.setInt(2,usrId);
                ps.executeUpdate();
            }
        }else{
            throw new SQLException("Incorrect Password");
        }
    }

    public void editUserInfo(User user) throws SQLException {
        String sql = "UPDATE users SET age = ?, occupation = ? WHERE usr_id = ?";
        try (Connection conn = dataSource.getConnection();
        PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1,user.getAge());
            ps.setString(2,user.getOccupation());
            ps.setInt(3,user.getUsrID());
            ps.executeUpdate();
        }
    }

    public void deleteUser(int usrId, String password) throws SQLException {
        Connection con = dataSource.getConnection();
        if (checkPassword(usrId,password) != null){
            con.setAutoCommit(false);
            try (PreparedStatement delSaved = con.prepareStatement("DELETE FROM saved_in WHERE usr_id = ?")) {
                delSaved.setInt(1, usrId);
                delSaved.executeUpdate();
            }catch (SQLException e) {
                con.rollback();
                throw e;
            }
            try (PreparedStatement delColl = con.prepareStatement("DELETE FROM collection WHERE usr_id = ?")) {
                delColl.setInt(1, usrId);
                delColl.executeUpdate();
            }catch (SQLException e) {
                con.rollback();
                throw e;
            }
            try (PreparedStatement delReview = con.prepareStatement("DELETE FROM review WHERE usr_id = ?")) {
                delReview.setInt(1, usrId);
                delReview.executeUpdate();
            }catch (SQLException e) {
                con.rollback();
                throw e;
            }
            try (PreparedStatement delUser = con.prepareStatement("DELETE FROM users WHERE usr_id = ?")) {
                delUser.setInt(1, usrId);
                delUser.executeUpdate();
            }catch (SQLException e) {
                con.rollback();
                throw e;
            }
            con.commit();
        }else{
            throw new SQLException("Incorrect Password");
        }
    }
}
