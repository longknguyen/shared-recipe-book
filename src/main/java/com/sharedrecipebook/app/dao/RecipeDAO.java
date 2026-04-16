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

    public List<Recipe> getAllRecipes() throws SQLException {
        // TODO; you can rely on the Lombok dependency to build a new object instead of calling getters and setters manually each time.
        return null;
    }
}
