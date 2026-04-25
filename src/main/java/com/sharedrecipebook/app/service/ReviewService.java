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

    public void editReview(Review r) throws Exception {
        reviewDAO.editReview(r);
    }

    public List<Review> getReviewsByRecipe(int recId) throws Exception {
        return reviewDAO.getReviewsByRecipe(recId);
    }

    public List<Review> getReviewsByUser(int usrId) throws Exception {
        return reviewDAO.getReviewsByUser(usrId);
    }

    public void deleteReview(Review r) throws Exception {
        reviewDAO.deleteReview(r);
    }
}
