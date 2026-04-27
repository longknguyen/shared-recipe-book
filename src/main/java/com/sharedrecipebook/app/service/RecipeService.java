package com.sharedrecipebook.app.service;

import com.sharedrecipebook.app.dao.RecipeDAO;
import com.sharedrecipebook.app.model.Recipe;
import com.sharedrecipebook.app.model.RecipeInfo;
import com.sharedrecipebook.app.model.RecipeIngredient;
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

    public List<Recipe> getRecipesInCollection(int usrId, String collName) throws SQLException {
        return recipeDAO.getRecipesInCollection(usrId, collName);
    }

    public List<Recipe> getRecipesWithoutAllergen(String allergenName) throws SQLException {
        return recipeDAO.getRecipesWithoutAllergen(allergenName);
    }

    public List<String> getAllergensInRecipe(int recId) throws SQLException {
        return recipeDAO.getAllergensInRecipe(recId);
    }

    public List<Recipe> getAlcoholicDrinks() throws SQLException {
        return recipeDAO.getAlcoholicDrinks();
    }

    public List<Recipe> getSolidsByMinCookTime(int minCookTime) throws SQLException {
        return recipeDAO.getSolidsByMinCookTime(minCookTime);
    }

    public List<Recipe> getRecipesByMaxPrepTime(int maxPrepTime) throws SQLException {
        return recipeDAO.getRecipesByMaxPrepTime(maxPrepTime);
    }

    public List<Recipe> getRecipesPublishedByUser(int usrId) throws SQLException {
        return recipeDAO.getRecipesPublishedByUser(usrId);
    }

    public void addRecipeToCollection(int recId, int usrId, String collName) throws SQLException {
        recipeDAO.addRecipeToCollection(recId, usrId, collName);
    }

    public void deleteRecipeFromCollection(int recId, int usrId, String collName) throws SQLException {
        recipeDAO.deleteRecipeFromCollection(recId, usrId, collName);
    }

    public void addRecipe(RecipeInfo recipeInfo) throws SQLException {
        recipeDAO.addRecipe(recipeInfo);
    }

    public List<RecipeIngredient> getRecipeIngredients(int recId) throws SQLException {
        return recipeDAO.getRecipeIngredients(recId);
    }

    public void deleteRecipe(int recId, int usrId) throws SQLException {
        recipeDAO.deleteRecipeIfPublishedByUser(recId, usrId);
    }
}
