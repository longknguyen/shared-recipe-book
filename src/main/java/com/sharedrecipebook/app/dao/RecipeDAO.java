package com.sharedrecipebook.app.dao;

import com.sharedrecipebook.app.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RecipeDAO {
    @Autowired
    private DataSource dataSource;

    public List<Recipe> getRecipesByCategory(String categoryName) throws SQLException {
        String sql = """
                SELECT r.rec_id, r.prep_time, r.dish_name, r.direction
                FROM recipe r
                JOIN belongs b ON b.rec_id = r.rec_id
                JOIN category c ON c.cat_id = b.cat_id
                WHERE c.name = ?
                ORDER BY r.dish_name
                """;

        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, categoryName);
            try (ResultSet rs = ps.executeQuery()) {
                List<Recipe> out = new ArrayList<>();
                while (rs.next()) {
                    out.add(Recipe.builder()
                            .recID(rs.getInt("rec_id"))
                            .prepTime(rs.getInt("prep_time"))
                            .dishName(rs.getString("dish_name"))
                            .directions(rs.getString("direction"))
                            .build());
                }
                return out;
            }
        }
    }

    public void addRecipeToCollection(int recID, int usrID, String collName) throws SQLException {
        // TODO;
    }

    public List<Recipe> getAllRecipes() throws SQLException {
        String sql = "SELECT rec_id, prep_time, dish_name, direction FROM recipe ORDER BY dish_name";
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<Recipe> out = new ArrayList<>();
            while (rs.next()) {
                out.add(Recipe.builder()
                        .recID(rs.getInt("rec_id"))
                        .prepTime(rs.getInt("prep_time"))
                        .dishName(rs.getString("dish_name"))
                        .directions(rs.getString("direction"))
                        .build());
            }
            return out;
        }
    }

    public List<Recipe> searchByDishName(String query) throws SQLException {
        String sql = """
                SELECT rec_id, prep_time, dish_name, direction
                FROM recipe
                WHERE dish_name LIKE ?
                ORDER BY dish_name
                """;
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, "%" + query + "%");
            try (ResultSet rs = ps.executeQuery()) {
                List<Recipe> out = new ArrayList<>();
                while (rs.next()) {
                    out.add(Recipe.builder()
                            .recID(rs.getInt("rec_id"))
                            .prepTime(rs.getInt("prep_time"))
                            .dishName(rs.getString("dish_name"))
                            .directions(rs.getString("direction"))
                            .build());
                }
                return out;
            }
        }
    }

    public List<Recipe> getReviewsByRecipe(int recID) throws SQLException {
        // TODO;
        return null;
    }
}
