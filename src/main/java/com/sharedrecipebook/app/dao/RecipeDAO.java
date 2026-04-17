package com.sharedrecipebook.app.dao;

import com.sharedrecipebook.app.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.List;

@Repository
public class RecipeDAO {
    @Autowired
    private DataSource dataSource;

    public List<Recipe> getRecipesByCategory(String categoryName) throws SQLException {
        // TODO;
        return null;
    }

    public void addRecipeToCollection(int recID, int usrID, String collName) throws SQLException {
        // TODO;
    }

    public List<Recipe> getAllRecipes() throws SQLException {
        // TODO; you can rely on the Lombok dependency to build a new object instead of calling getters and setters manually each time.
        /**
         * Example:
         * var rs = stmt.executeQuery();
         * Recipe.builder() <-- builder instance used to construct the object
         * .prepTime(rs.getInt("prep_time"))
         * .dishName(rs.getString("dish_name"))
         * .directions(rs.getString("direction")) <-- intermediate calls are from the field names of the POJO
         * .build()
         */
        return null;
    }

    public List<Recipe> getReviewsByRecipe(int recID) throws SQLException {
        // TODO;
        return null;
    }
}
