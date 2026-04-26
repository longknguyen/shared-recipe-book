package com.sharedrecipebook.app.controller;

import com.sharedrecipebook.app.model.Recipe;
import com.sharedrecipebook.app.service.RecipeService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
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
        return recipeService.getAllRecipes();
    }

    @GetMapping("/search")
    public List<Recipe> search(@RequestParam(required = false) String query) throws Exception {
        return recipeService.search(query);
    }

    @GetMapping("/category/{name}")
    public List<Recipe> getByCategory(@PathVariable String name) throws Exception {
        return recipeService.getByCategory(name);
    }

    @GetMapping("/collection")
    public List<Recipe> getByCollection(@RequestParam int usrId, @RequestParam String collName) throws Exception {
        return recipeService.getRecipesInCollection(usrId, collName);
    }

    @GetMapping("/exclude-allergen")
    public List<Recipe> getWithoutAllergen(@RequestParam String allergenName) throws Exception {
        return recipeService.getRecipesWithoutAllergen(allergenName);
    }

    @GetMapping("/{recId}/allergens")
    public List<String> getAllergensInRecipe(@PathVariable int recId) throws Exception {
        return recipeService.getAllergensInRecipe(recId);
    }

    @GetMapping("/drinks")
    public List<Recipe> getAlcoholicDrinks() throws Exception {
        return recipeService.getAlcoholicDrinks();
    }

    @GetMapping("/solids")
    public List<Recipe> getSolidsByCookTime(@RequestParam(defaultValue = "60") int minCookTime) throws Exception {
        return recipeService.getSolidsByMinCookTime(minCookTime);
    }

    @GetMapping("/quick")
    public List<Recipe> getByPrepTime(@RequestParam(defaultValue = "15") int maxPrepTime) throws Exception {
        return recipeService.getRecipesByMaxPrepTime(maxPrepTime);
    }

    @GetMapping("/published/{usrId}")
    public List<Recipe> getPublishedByUser(@PathVariable int usrId) throws Exception {
        return recipeService.getRecipesPublishedByUser(usrId);
    }

    @PostMapping("/collection")
    public void addRecipeToCollection(@RequestBody AddToCollectionRequest request) throws Exception {
        recipeService.addRecipeToCollection(request.getRecId(), request.getUsrId(), request.getCollName());
    }

    @DeleteMapping("/{recId}")
    public void deleteRecipe(@PathVariable int recId) throws Exception {
        recipeService.deleteRecipe(recId);
    }

    @Getter
    private static class AddToCollectionRequest {
        private int recId;
        private int usrId;
        private String collName;
    }
}
