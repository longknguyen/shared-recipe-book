package com.sharedrecipebook.app.model;

import lombok.*;


/**
 * Represents a Recipe entity that can store information about a recipe.
 * <p>
 * This class is a part of the shared recipe book application and serves as a model
 * for storing recipe-related data. It uses Lombok annotations to generate boilerplate
 * code such as getters, setters, constructors, and hashCode/equals methods.
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {
    private int recID;
    private int prepTime;
    private String dishName;
    private String directions;
}
