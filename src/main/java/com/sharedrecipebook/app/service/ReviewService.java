package com.sharedrecipebook.app.service;

import com.sharedrecipebook.app.dao.ReviewDAO;
import com.sharedrecipebook.app.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    ReviewDAO reviewDAO;

    public void addReview(Review r) throws Exception {
        reviewDAO.addReview(r);
    }

    public List<Review> getReviews(int recId) throws Exception {
        // TODO;
        return null;
    }
}
