package com.sharedrecipebook.app.controller;

import com.sharedrecipebook.app.model.Recipe;
import com.sharedrecipebook.app.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:5173")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public List<Recipe> getAllRecipes() throws Exception {
        return null;
    }

    @GetMapping("/category/{name}")
    public List<Recipe> getByCategory(@PathVariable String name) throws Exception {
        // TODO;
        return null;
    }
}
