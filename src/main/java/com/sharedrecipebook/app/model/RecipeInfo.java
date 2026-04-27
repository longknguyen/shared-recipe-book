package com.sharedrecipebook.app.model;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeInfo {
    private Recipe recipe;
    private List<RecipeIngredient> ingredients;
    private Published published;
    private List<Category> categories;
    private List<Allergen> allergens;
    private Drink drink;
    private Solid solid;
}
