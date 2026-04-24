package com.sharedrecipebook.app.service;

import com.sharedrecipebook.app.dao.RecipeDAO;
import com.sharedrecipebook.app.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class RecipeService {
    @Autowired
    private RecipeDAO recipeDAO;

    public List<Recipe> getAllRecipes() throws Exception {
        return recipeDAO.getAllRecipes();
    }

    public List<Recipe> search(String query) throws SQLException {
        if (query == null || query.isBlank()) {
            return recipeDAO.getAllRecipes();
        }
        return recipeDAO.searchByDishName(query);
    }

    public List<Recipe> getByCategory(String categoryName) throws SQLException {
        return recipeDAO.getRecipesByCategory(categoryName);
    }
}
