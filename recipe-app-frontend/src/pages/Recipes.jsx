import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import StatusBanner from "../components/common/StatusBanner.jsx";
import AppShell from "../components/layout/AppShell.jsx";
import RecipeComposer from "../components/recipes/RecipeComposer.jsx";
import RecipeFilters from "../components/recipes/RecipeFilters.jsx";
import RecipeGrid from "../components/recipes/RecipeGrid.jsx";
import {
    createRecipe,
    deleteRecipe,
    getAllRecipes,
    getDrinkRecipes,
    getPublishedRecipes,
    getQuickRecipes,
    getRecipesByCategory,
    getRecipesWithoutAllergen,
    searchRecipes,
    getSlowCookedSolids,
} from "../services/recipes.js";
import { getCurrentUser } from "../utils/auth.js";

export default function Recipes() {
    const [searchParams] = useSearchParams();
    const currentUser = getCurrentUser();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState(searchParams.get("query") || "");
    const [category, setCategory] = useState("");
    const [allergen, setAllergen] = useState("");
    const [composerOpen, setComposerOpen] = useState(false);
    const [submittingRecipe, setSubmittingRecipe] = useState(false);
    const [deletingRecipeId, setDeletingRecipeId] = useState(null);
    const [ownedRecipeIds, setOwnedRecipeIds] = useState([]);

    async function loadRecipes({ cancelled = false } = {}) {
        try {
            setLoading(true);
            setError("");

            let data;

            if (search.trim()) {
                data = await searchRecipes(search.trim());
            } else if (category.trim()) {
                data = await getRecipesByCategory(category.trim());
            } else if (allergen.trim()) {
                data = await getRecipesWithoutAllergen(allergen.trim());
            } else if (filter === "quick") {
                data = await getQuickRecipes();
            } else if (filter === "drinks") {
                data = await getDrinkRecipes();
            } else if (filter === "solids") {
                data = await getSlowCookedSolids();
            } else {
                data = await getAllRecipes();
            }

            if (!cancelled) {
                setRecipes(data);
            }
        } catch (loadError) {
            if (!cancelled) {
                setError(loadError.message);
            }
        } finally {
            if (!cancelled) {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        let cancelled = false;
        const timer = window.setTimeout(() => {
            void loadRecipes({ cancelled });
        }, 0);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, search, category, allergen]);

    useEffect(() => {
        let cancelled = false;
        const timer = window.setTimeout(async () => {
            try {
                if (!currentUser?.usrID) {
                    if (!cancelled) {
                        setOwnedRecipeIds([]);
                    }
                    return;
                }

                const publishedRecipes = await getPublishedRecipes(currentUser.usrID);
                if (!cancelled) {
                    setOwnedRecipeIds(publishedRecipes.map((recipe) => recipe.recID));
                }
            } catch {
                if (!cancelled) {
                    setOwnedRecipeIds([]);
                }
            }
        }, 0);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [currentUser?.usrID]);

    const heroLabel = useMemo(() => {
        if (search.trim()) {
            return `Search results for "${search.trim()}"`;
        }
        if (category.trim()) {
            return `Category: ${category.trim()}`;
        }
        if (allergen.trim()) {
            return `Recipes without ${allergen.trim()}`;
        }

        return {
            all: "All recipes",
            quick: "Quick recipes",
            drinks: "Alcoholic drinks",
            solids: "Slow-cooked solids",
        }[filter];
    }, [allergen, category, filter, search]);

    const nextRecipeId = useMemo(() => {
        if (!recipes.length) {
            return 1;
        }

        return Math.max(...recipes.map((recipe) => Number(recipe.recID) || 0)) + 1;
    }, [recipes]);

    const handleCreateRecipe = async (recipeInfo) => {
        try {
            setSubmittingRecipe(true);
            setError("");

            const allRecipes = await getAllRecipes();
            const recId = allRecipes.length
                ? Math.max(...allRecipes.map((recipe) => Number(recipe.recID) || 0)) + 1
                : 1;

            await createRecipe({
                ...recipeInfo,
                recipe: {
                    ...recipeInfo.recipe,
                    recID: recId,
                },
                ingredients: recipeInfo.ingredients.map((ingredient) => ({
                    ...ingredient,
                    recId,
                })),
                published: {
                    ...recipeInfo.published,
                    recId,
                },
                drink: recipeInfo.drink ? { ...recipeInfo.drink, recId } : null,
                solid: recipeInfo.solid ? { ...recipeInfo.solid, recId } : null,
            });

            setComposerOpen(false);
            setOwnedRecipeIds((current) => [...current, recId]);
            await loadRecipes();
        } catch (submitError) {
            setError(submitError.message);
        } finally {
            setSubmittingRecipe(false);
        }
    };

    const handleDeleteRecipe = async (recId) => {
        try {
            if (!currentUser?.usrID) {
                setError("You need to be logged in to delete a recipe.");
                return;
            }

            setDeletingRecipeId(recId);
            setError("");
            await deleteRecipe(recId, currentUser.usrID);
            setOwnedRecipeIds((current) => current.filter((id) => id !== recId));
            await loadRecipes();
        } catch (deleteError) {
            setError(deleteError.message);
        } finally {
            setDeletingRecipeId(null);
        }
    };

    return (
        <AppShell accent="warm">
            <div className="space-y-6">
                <RecipeComposer
                    open={composerOpen}
                    onClose={() => setComposerOpen(false)}
                    onSubmit={handleCreateRecipe}
                    nextRecipeId={nextRecipeId}
                    currentUser={currentUser}
                    submitting={submittingRecipe}
                />
                <RecipeFilters
                    filter={filter}
                    setFilter={setFilter}
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    allergen={allergen}
                    setAllergen={setAllergen}
                />

                <section className="animate-fade-up rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-soft">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Results</p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-brand-950">{heroLabel}</h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            {!loading ? (
                                <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
                                    {recipes.length} recipe{recipes.length === 1 ? "" : "s"}
                                </div>
                            ) : null}
                            <button
                                type="button"
                                onClick={() => setComposerOpen(true)}
                                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
                            >
                                <Plus className="h-4 w-4" />
                                Add recipe
                            </button>
                        </div>
                    </div>
                    <div className="mt-5">
                        <StatusBanner tone="danger" message={error} />
                    </div>
                </section>

                {loading ? (
                    <LoadingState label="Loading recipes" />
                ) : error ? (
                    <EmptyState
                        title="We couldn't load recipes"
                        description="Something went wrong while loading recipes. Try again in a moment."
                    />
                ) : (
                    <RecipeGrid
                        recipes={recipes}
                        emptyTitle="No recipes matched"
                        emptyDescription="Try clearing one of the filters or searching with a broader term."
                        canRemove={(recipe) => ownedRecipeIds.includes(recipe.recID)}
                        onRemove={handleDeleteRecipe}
                        deletingRecipeId={deletingRecipeId}
                        badgeResolver={(recipe) => {
                            if (allergen.trim()) {
                                return "Allergen-safe";
                            }
                            if (filter === "quick") {
                                return "Quick";
                            }
                            if (filter === "drinks") {
                                return "Drink";
                            }
                            if (filter === "solids") {
                                return "Slow-cooked";
                            }
                            if (category.trim()) {
                                return category.trim();
                            }
                            if (ownedRecipeIds.includes(recipe.recID)) {
                                return "Published by you";
                            }
                            return null;
                        }}
                    />
                )}
            </div>
        </AppShell>
    );
}
