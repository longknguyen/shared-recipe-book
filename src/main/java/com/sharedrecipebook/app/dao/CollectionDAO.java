package com.sharedrecipebook.app.dao;

import com.sharedrecipebook.app.model.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CollectionDAO {
    @Autowired
    private DataSource dataSource;

    public List<Collection> findByUserId(int usrId) throws SQLException {
        String sql = "SELECT usr_id, coll_name FROM collection WHERE usr_id = ? ORDER BY coll_name";
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, usrId);
            try (ResultSet rs = ps.executeQuery()) {
                List<Collection> out = new ArrayList<>();
                while (rs.next()) {
                    out.add(Collection.builder()
                            .usrId(rs.getInt("usr_id"))
                            .collName(rs.getString("coll_name"))
                            .build());
                }
                return out;
            }
        }
    }

    public void insert(int usrId, String collName) throws SQLException {
        String sql = "INSERT INTO collection (usr_id, coll_name) VALUES (?, ?)";
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, usrId);
            ps.setString(2, collName);
            ps.executeUpdate();
        }
    }

    public void deleteCollection(int usrId, String collName) throws SQLException {
        Connection con = dataSource.getConnection();
        try {
            con.setAutoCommit(false);
            try (PreparedStatement delSaved = con.prepareStatement(
                    "DELETE FROM saved_in WHERE usr_id = ? AND coll_name = ?")) {
                delSaved.setInt(1, usrId);
                delSaved.setString(2, collName);
                delSaved.executeUpdate();
            }
            try (PreparedStatement delColl = con.prepareStatement(
                    "DELETE FROM collection WHERE usr_id = ? AND coll_name = ?")) {
                delColl.setInt(1, usrId);
                delColl.setString(2, collName);
                delColl.executeUpdate();
            }
            con.commit();
        } catch (SQLException e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }
}
