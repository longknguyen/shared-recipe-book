import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import StatusBanner from "../components/common/StatusBanner.jsx";
import AppShell from "../components/layout/AppShell.jsx";
import RecipeFilters from "../components/recipes/RecipeFilters.jsx";
import RecipeGrid from "../components/recipes/RecipeGrid.jsx";
import {
    getAllRecipes,
    getDrinkRecipes,
    getQuickRecipes,
    getRecipesByCategory,
    getRecipesWithoutAllergen,
    searchRecipes,
    getSlowCookedSolids,
} from "../services/recipes.js";

export default function Recipes() {
    const [searchParams] = useSearchParams();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState(searchParams.get("query") || "");
    const [category, setCategory] = useState("");
    const [allergen, setAllergen] = useState("");

    useEffect(() => {
        let cancelled = false;

        const loadRecipes = async () => {
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
        };

        loadRecipes();

        return () => {
            cancelled = true;
        };
    }, [filter, search, category, allergen]);

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

    return (
        <AppShell accent="warm">
            <div className="space-y-6">
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
                        {!loading ? (
                            <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
                                {recipes.length} recipe{recipes.length === 1 ? "" : "s"}
                            </div>
                        ) : null}
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
                        badgeResolver={() => {
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
                            return null;
                        }}
                    />
                )}
            </div>
        </AppShell>
    );
}
