package com.sharedrecipebook.app.dao;

import com.sharedrecipebook.app.model.Review;
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
public class ReviewDAO {
    @Autowired
    private DataSource dataSource;

    public void addReview(Review review) throws SQLException {
        String sql = "INSERT INTO review (usr_id, rec_id, date, time, content) VALUES (?, ?, ?, ?, ?)";
        try (Connection con = dataSource.getConnection();
        PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, review.getUsrId());
            ps.setInt(2, review.getRecId());
            ps.setDate(3, review.getDate());
            ps.setTime(4, review.getTime());
            ps.setString(5, review.getContent());
            ps.executeUpdate();
        }
    }

    public void editReview(Review review) throws SQLException {
        String sql = "UPDATE review SET date=?, time=?, content=? WHERE usr_id=? AND rec_id=?";
        try (Connection con = dataSource.getConnection();
        PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setDate(1, review.getDate());
            ps.setTime(2, review.getTime());
            ps.setString(3, review.getContent());
            ps.setInt(4, review.getUsrId());
            ps.setInt(5, review.getRecId());
            ps.executeUpdate();
        }
    }

    public List<Review> getReviewsByRecipe(int recId) throws SQLException {
        String sql = "SELECT usr_id, rec_id, date, time, content FROM review WHERE rec_id = ? ORDER BY date DESC, time DESC";
        try (Connection con = dataSource.getConnection();
        PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, recId);
            try (ResultSet rs = ps.executeQuery()) {
                List<Review> reviews = new ArrayList<>();
                while (rs.next()) {
                    Review review = new Review();
                    review.setUsrId(rs.getInt("usr_id"));
                    review.setRecId(rs.getInt("rec_id"));
                    review.setDate(rs.getDate("date"));
                    review.setTime(rs.getTime("time"));
                    review.setContent(rs.getString("content"));
                    reviews.add(review);
                }
                return reviews;
            }
        }
    }

    public List<Review> getReviewsByUser(int usrId) throws SQLException {
        String sql = "SELECT usr_id, rec_id, date, time, content FROM review WHERE usr_id = ? ORDER BY date DESC, time DESC";
        try (Connection con = dataSource.getConnection();
        PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, usrId);
            try (ResultSet rs = ps.executeQuery()) {
                List<Review> reviews = new ArrayList<>();
                while (rs.next()) {
                    Review review = new Review();
                    review.setUsrId(rs.getInt("usr_id"));
                    review.setRecId(rs.getInt("rec_id"));
                    review.setDate(rs.getDate("date"));
                    review.setTime(rs.getTime("time"));
                    review.setContent(rs.getString("content"));
                    reviews.add(review);
                }
                return reviews;
            }
        }
    }

    public void deleteReview(Review review) throws SQLException {
        Connection con = dataSource.getConnection();
        con.setAutoCommit(false);
        String sql = "DELETE FROM review WHERE usr_id = ? AND rec_id = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, review.getUsrId());
            ps.setInt(2, review.getRecId());
            ps.executeUpdate();
            con.commit();
        }catch (SQLException e) {
            con.rollback();
            throw e;
        }
    }
}
