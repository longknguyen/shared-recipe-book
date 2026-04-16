package com.sharedrecipebook.app.service;

import com.sharedrecipebook.app.dao.RecipeDAO;
import com.sharedrecipebook.app.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    @Autowired
    private RecipeDAO recipeDAO;

    public List<Recipe> getAllRecipes() throws Exception {
        // TODO;
        return null;
    }
}
