package com.sharedrecipebook.app.controller;

import com.sharedrecipebook.app.model.Review;
import com.sharedrecipebook.app.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public void addReview(@RequestBody Review review) throws Exception {
        // TODO;
    }

    @GetMapping("/{recId}")
    public List<Review> getReviews(@PathVariable int recId) throws Exception {
        // TODO;
        return null;
    }
}
