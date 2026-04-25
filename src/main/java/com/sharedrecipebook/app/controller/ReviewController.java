package com.sharedrecipebook.app.controller;

import com.sharedrecipebook.app.model.Review;
import com.sharedrecipebook.app.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public void addReview(@RequestBody Review review) throws Exception {
        reviewService.addReview(review);
    }

    public void editReview(@RequestBody Review review) throws Exception {
        reviewService.editReview(review);
    }

    @GetMapping("/{recId}")
    public List<Review> getReviewsByRecipe(@PathVariable int recId) throws Exception {
        return reviewService.getReviewsByRecipe(recId);
    }

    public List<Review> getReviewsByUser(int usrId) throws Exception {
        return reviewService.getReviewsByUser(usrId);
    }

    public void deleteReview(Review review) throws Exception {
        reviewService.deleteReview(review);
    }
}
