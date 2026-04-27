import api from "./api";

export async function getAllRecipes() {
    const { data } = await api.get("/recipes");
    return data;
}

export async function searchRecipes(query) {
    const { data } = await api.get("/recipes/search", {
        params: { query },
    });
    return data;
}

export async function getRecipesByCategory(category) {
    const { data } = await api.get(`/recipes/category/${encodeURIComponent(category)}`);
    return data;
}

export async function getQuickRecipes(maxPrepTime = 15) {
    const { data } = await api.get("/recipes/quick", {
        params: { maxPrepTime },
    });
    return data;
}

export async function getDrinkRecipes() {
    const { data } = await api.get("/recipes/drinks");
    return data;
}

export async function getSlowCookedSolids(minCookTime = 60) {
    const { data } = await api.get("/recipes/solids", {
        params: { minCookTime },
    });
    return data;
}

export async function getRecipesWithoutAllergen(allergenName) {
    const { data } = await api.get("/recipes/exclude-allergen", {
        params: { allergenName },
    });
    return data;
}

export async function getCollectionRecipes(usrId, collName) {
    const { data } = await api.get("/recipes/collection", {
        params: { usrId, collName },
    });
    return data;
}

export async function getPublishedRecipes(usrId) {
    const { data } = await api.get(`/recipes/published/${usrId}`);
    return data;
}

export async function getRecipeAllergens(recId) {
    const { data } = await api.get(`/recipes/${recId}/allergens`);
    return data;
}

export async function addRecipeToCollection({ recId, usrId, collName }) {
    await api.post("/recipes/collection", { recId, usrId, collName });
}

export async function createRecipe(recipeInfo) {
    await api.post("/recipes", recipeInfo);
}

export async function deleteRecipe(recId, usrId) {
    await api.delete(`/recipes/${recId}`, {
        params: { usrId },
    });
}

export async function deleteRecipeFromCollection(usrId,recId,collName){
    await api.post("/recipes/collection/remove", { usrId, recId, collName });
}

export async function getRecipeIngredients(recId) {
    const { data } = await api.get(`/recipes/${recId}/ingredients`);
    return data;
}
