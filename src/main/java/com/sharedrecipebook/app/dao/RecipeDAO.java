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
                SELECT r.rec_id, r.prep_time, r.dish_name, r.directions
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
                    out.add(mapRecipe(rs));
                }
                return out;
            }
        }
    }

    public void addRecipeToCollection(int recID, int usrID, String collName) throws SQLException {
        String sql = "INSERT INTO saved_in (rec_id, usr_id, coll_name) VALUES (?, ?, ?)";
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, recID);
            ps.setInt(2, usrID);
            ps.setString(3, collName);
            ps.executeUpdate();
        }
    }

    public List<Recipe> getAllRecipes() throws SQLException {
        String sql = "SELECT rec_id, prep_time, dish_name, directions FROM recipe ORDER BY dish_name";
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<Recipe> out = new ArrayList<>();
            while (rs.next()) {
                out.add(mapRecipe(rs));
            }
            return out;
        }
    }

    public List<Recipe> searchByDishName(String query) throws SQLException {
        String sql = """
                SELECT rec_id, prep_time, dish_name, directions
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
                    out.add(mapRecipe(rs));
                }
                return out;
            }
        }
    }

    public List<Recipe> getReviewsByRecipe(int recID) throws SQLException {
        String sql = """
                SELECT DISTINCT r.rec_id, r.prep_time, r.dish_name, r.directions
                FROM recipe r
                JOIN review rv ON rv.rec_id = r.rec_id
                WHERE r.rec_id = ?
                """;
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, recID);
            try (ResultSet rs = ps.executeQuery()) {
                List<Recipe> out = new ArrayList<>();
                while (rs.next()) {
                    out.add(mapRecipe(rs));
                }
                return out;
            }
        }
    }

    public List<Recipe> getRecipesInCollection(int usrId, String collName) throws SQLException {
        String sql = """
                SELECT r.rec_id, r.prep_time, r.dish_name, r.directions
                FROM recipe r
                JOIN saved_in s ON s.rec_id = r.rec_id
                WHERE s.usr_id = ? AND s.coll_name = ?
                ORDER BY r.dish_name
                """;
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, usrId);
            ps.setString(2, collName);
            try (ResultSet rs = ps.executeQuery()) {
                List<Recipe> out = new ArrayList<>();
                while (rs.next()) {
                    out.add(mapRecipe(rs));
                }
                return out;
            }
        }
    }

    public List<Recipe> getRecipesWithoutAllergen(String allergenName) throws SQLException {
        String sql = """
                SELECT r.rec_id, r.prep_time, r.dish_name, r.directions
                FROM recipe r
                WHERE r.rec_id NOT IN (
                    SELECT c.rec_id
                    FROM contains c
                    JOIN allergen a ON a.all_id = c.all_id
                    WHERE a.name = ?
                )
                ORDER BY r.dish_name
                """;
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, allergenName);
            try (ResultSet rs = ps.executeQuery()) {
                List<Recipe> out = new ArrayList<>();
                while (rs.next()) {
                    out.add(mapRecipe(rs));
                }
                return out;
            }
        }
    }

    public List<String> getAllergensInRecipe(int recId) throws SQLException {
        String sql = """
                SELECT a.name
                FROM contains c
                JOIN allergen a ON a.all_id = c.all_id
                WHERE c.rec_id = ?
                ORDER BY a.name
                """;
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, recId);
            try (ResultSet rs = ps.executeQuery()) {
                List<String> out = new ArrayList<>();
                while (rs.next()) {
                    out.add(rs.getString("name"));
                }
                return out;
            }
        }
    }

    public List<Recipe> getAlcoholicDrinks() throws SQLException {
        String sql = """
                SELECT r.rec_id, r.prep_time, r.dish_name, r.directions
                FROM recipe r
                JOIN drink d ON d.rec_id = r.rec_id
                WHERE d.alc_perc > 0
                ORDER BY r.dish_name
                """;
        return runRecipeListQuery(sql);
    }

    public List<Recipe> getSolidsByMinCookTime(int minCookTime) throws SQLException {
        String sql = """
                SELECT r.rec_id, r.prep_time, r.dish_name, r.directions
                FROM recipe r
                JOIN solids s ON s.rec_id = r.rec_id
                WHERE s.cook_time > ?
                ORDER BY r.dish_name
                """;
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, minCookTime);
            try (ResultSet rs = ps.executeQuery()) {
                List<Recipe> out = new ArrayList<>();
                while (rs.next()) {
                    out.add(mapRecipe(rs));
                }
                return out;
            }
        }
    }

    public List<Recipe> getRecipesByMaxPrepTime(int maxPrepTime) throws SQLException {
        String sql = """
                SELECT rec_id, prep_time, dish_name, directions
                FROM recipe
                WHERE prep_time <= ?
                ORDER BY dish_name
                """;
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, maxPrepTime);
            try (ResultSet rs = ps.executeQuery()) {
                List<Recipe> out = new ArrayList<>();
                while (rs.next()) {
                    out.add(mapRecipe(rs));
                }
                return out;
            }
        }
    }

    public List<Recipe> getRecipesPublishedByUser(int usrId) throws SQLException {
        String sql = """
                SELECT r.rec_id, r.prep_time, r.dish_name, r.directions
                FROM recipe r
                JOIN published p ON p.rec_id = r.rec_id
                WHERE p.usr_id = ?
                ORDER BY r.dish_name
                """;
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, usrId);
            try (ResultSet rs = ps.executeQuery()) {
                List<Recipe> out = new ArrayList<>();
                while (rs.next()) {
                    out.add(mapRecipe(rs));
                }
                return out;
            }
        }
    }

    public void deleteRecipeCascade(int recId) throws SQLException {
        Connection con = dataSource.getConnection();
        try {
            con.setAutoCommit(false);
            String[] deleteSql = {
                    "DELETE FROM belongs WHERE rec_id = ?",
                    "DELETE FROM contains WHERE rec_id = ?",
                    "DELETE FROM drink WHERE rec_id = ?",
                    "DELETE FROM published WHERE rec_id = ?",
                    "DELETE FROM recipe_ingredients WHERE rec_id = ?",
                    "DELETE FROM review WHERE rec_id = ?",
                    "DELETE FROM saved_in WHERE rec_id = ?",
                    "DELETE FROM solids WHERE rec_id = ?",
                    "DELETE FROM recipe WHERE rec_id = ?"
            };

            for (String sql : deleteSql) {
                try (PreparedStatement ps = con.prepareStatement(sql)) {
                    ps.setInt(1, recId);
                    ps.executeUpdate();
                }
            }
            con.commit();
        } catch (SQLException e) {
            con.rollback();
            throw e;
        } finally {
            con.setAutoCommit(true);
            con.close();
        }
    }

    private List<Recipe> runRecipeListQuery(String sql) throws SQLException {
        try (Connection con = dataSource.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<Recipe> out = new ArrayList<>();
            while (rs.next()) {
                out.add(mapRecipe(rs));
            }
            return out;
        }
    }

    private Recipe mapRecipe(ResultSet rs) throws SQLException {
        return Recipe.builder()
                .recID(rs.getInt("rec_id"))
                .prepTime(rs.getInt("prep_time"))
                .dishName(rs.getString("dish_name"))
                .directions(rs.getString("directions"))
                .build();
    }
}
