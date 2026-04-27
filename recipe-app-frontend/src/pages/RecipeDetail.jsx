import { useEffect, useState } from "react";
import { AlertTriangle, Clock3, FolderPlus, ShieldAlert } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import StatusBanner from "../components/common/StatusBanner.jsx";
import AppShell from "../components/layout/AppShell.jsx";
import ReviewComposer from "../components/recipes/ReviewComposer.jsx";
import ReviewList from "../components/recipes/ReviewList.jsx";
import { getCollections } from "../services/collections.js";
import { addReview, deleteReview, getRecipeReviews, updateReview } from "../services/reviews.js";
import {addRecipeToCollection, getAllRecipes, getRecipeAllergens, getRecipeIngredients} from "../services/recipes.js";
import { getCurrentUser } from "../utils/auth.js";
import { formatMinutes } from "../utils/formatters.js";

export default function RecipeDetail() {
    const { recipeId } = useParams();
    const currentUser = getCurrentUser();
    const [recipe, setRecipe] = useState(null);
    const [allergens, setAllergens] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [ingredients, setIngredients] = useState(null);
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState("");
    const [editingReview, setEditingReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [savingReview, setSavingReview] = useState(false);
    const [savingCollection, setSavingCollection] = useState(false);
    const [status, setStatus] = useState({ tone: "info", message: "" });

    const loadPage = async () => {
        try {
            setLoading(true);
            setStatus({ tone: "info", message: "" });
            const [allRecipes, allergenData, reviewData, ingredientData] = await Promise.all([
                getAllRecipes(),
                getRecipeAllergens(recipeId),
                getRecipeReviews(recipeId),
                getRecipeIngredients(recipeId),
            ]);

            const matched = allRecipes.find((item) => String(item.recID) === String(recipeId));
            setRecipe(matched || null);
            setAllergens(allergenData);
            setReviews(reviewData);
            setIngredients(ingredientData.join(", "));

            if (currentUser) {
                const collectionData = await getCollections(currentUser.usrID);
                setCollections(collectionData);
                setSelectedCollection(collectionData[0]?.collName || "");
            }
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = window.setTimeout(() => {
            void loadPage();
        }, 0);

        return () => window.clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeId]);

    const handleReviewSubmit = async (content) => {
        if (!currentUser) {
            setStatus({ tone: "danger", message: "Log in to leave a review." });
            return;
        }

        try {
            setSavingReview(true);
            const now = new Date();
            const payload = {
                usrId: currentUser.usrID,
                recId: Number(recipeId),
                date: now.toISOString().slice(0, 10),
                time: now.toTimeString().slice(0, 8),
                content,
            };

            if (editingReview) {
                await updateReview({
                    ...editingReview,
                    content,
                });
                setEditingReview(null);
            } else {
                await addReview(payload);
            }

            setStatus({ tone: "success", message: "Review saved." });
            await loadPage();
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        } finally {
            setSavingReview(false);
        }
    };

    const handleDeleteReview = async (review) => {
        try {
            await deleteReview(review);
            setStatus({ tone: "success", message: "Review deleted." });
            await loadPage();
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        }
    };

    const handleSaveToCollection = async () => {
        if (!currentUser) {
            setStatus({ tone: "danger", message: "Log in to save recipes to a collection." });
            return;
        }

        if (!selectedCollection) {
            setStatus({ tone: "danger", message: "Create a collection first or choose one from the list." });
            return;
        }

        try {
            setSavingCollection(true);
            await addRecipeToCollection({
                recId: Number(recipeId),
                usrId: currentUser.usrID,
                collName: selectedCollection,
            });
            setStatus({ tone: "success", message: `Saved to ${selectedCollection}.` });
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        } finally {
            setSavingCollection(false);
        }
    };

    return (
        <AppShell accent="soft">
            {loading ? (
                <LoadingState label="Loading recipe details" />
            ) : !recipe ? (
                <EmptyState
                    title="Recipe not found"
                    description="We couldn't find that recipe. Try heading back to the recipe list."
                    action={
                        <Link
                            to="/recipes"
                            className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600"
                        >
                            Back to recipes
                        </Link>
                    }
                />
            ) : (
                <div className="space-y-6">
                    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <article
                            className="animate-fade-up rounded-[34px] border border-white/70 bg-white/80 p-8 shadow-soft">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.35em] text-brand-500">Recipe detail</p>
                                    <h1 className="mt-3 text-5xl font-semibold tracking-tight text-brand-950">{recipe.dishName}</h1>
                                </div>
                                <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
                                    Recipe #{recipe.recID}
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <div
                                    className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm text-brand-700">
                                    <Clock3 className="h-4 w-4"/>
                                    Prep time: {formatMinutes(recipe.prepTime)}
                                </div>
                                <div
                                    className="inline-flex items-center gap-2 rounded-full bg-brand-sand px-4 py-2 text-sm text-brand-900">
                                    <ShieldAlert className="h-4 w-4"/>
                                    {allergens.length ? `${allergens.length} allergen tags` : "No allergen tags"}
                                </div>
                            </div>
                            <div className="mt-8 rounded-[28px] bg-brand-50 p-6">
                                <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Ingredients</p>
                                <p className="mt-4 whitespace-pre-line text-sm leading-8 text-brand-800">{ingredients}</p>
                            </div>
                            <div className="mt-8 rounded-[28px] bg-brand-50 p-6">
                                <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Directions</p>
                                <p className="mt-4 whitespace-pre-line text-sm leading-8 text-brand-800">{recipe.directions}</p>
                            </div>
                        </article>

                        <aside className="space-y-6">
                            <section
                                className="animate-fade-up rounded-[34px] border border-white/70 bg-white/80 p-6 shadow-soft">
                                <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Allergens</p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {allergens.length ? (
                                        allergens.map((item) => (
                                            <span key={item} className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700">
                                                {item}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-brand-700">No allergens were listed for this recipe.</p>
                                    )}
                                </div>
                            </section>

                            <section className="animate-fade-up rounded-[34px] border border-white/70 bg-white/80 p-6 shadow-soft">
                                <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Save to collection</p>
                                {currentUser ? (
                                    <>
                                        <select
                                            value={selectedCollection}
                                            onChange={(event) => setSelectedCollection(event.target.value)}
                                            className="mt-4 w-full rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        >
                                            <option value="">Select a collection</option>
                                            {collections.map((item) => (
                                                <option key={item.collName} value={item.collName}>
                                                    {item.collName}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            disabled={savingCollection}
                                            onClick={handleSaveToCollection}
                                            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <FolderPlus className="h-4 w-4" />
                                            {savingCollection ? "Saving..." : "Save recipe"}
                                        </button>
                                    </>
                                ) : (
                                    <p className="mt-4 text-sm leading-7 text-brand-700">
                                        Log in to save this recipe into one of your collections.
                                    </p>
                                )}
                            </section>
                        </aside>
                    </section>

                    <StatusBanner tone={status.tone} message={status.message} />

                    {currentUser ? (
                        <ReviewComposer
                            key={editingReview ? `${editingReview.usrId}-${editingReview.recId}` : "new-review"}
                            initialReview={editingReview}
                            onSubmit={handleReviewSubmit}
                            onCancel={() => setEditingReview(null)}
                            disabled={savingReview}
                        />
                    ) : (
                        <div className="animate-fade-up rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 shadow-soft">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Log in if you want to leave a review on this recipe.
                            </div>
                        </div>
                    )}

                    <section>
                        <div className="mb-5 animate-fade-up">
                            <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Community notes</p>
                            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-950">Reviews</h2>
                        </div>
                        <ReviewList
                            reviews={reviews}
                            currentUser={currentUser}
                            onEdit={setEditingReview}
                            onDelete={handleDeleteReview}
                        />
                    </section>
                </div>
            )}
        </AppShell>
    );
}
