package com.sharedrecipebook.app.dao;

import com.sharedrecipebook.app.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ReviewDAO {
    @Autowired
    private DataSource dataSource;

    public void addReview(Review review) throws SQLException {
        // TODO;
    }

    public List<Review> getReviewsByRecipe(int recId) throws SQLException {
        // TODO;
        return null;
    }
}
