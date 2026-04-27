import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CollectionCreator from "../components/collections/CollectionCreator.jsx";
import CollectionSidebar from "../components/collections/CollectionSidebar.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import StatusBanner from "../components/common/StatusBanner.jsx";
import AppShell from "../components/layout/AppShell.jsx";
import RecipeGrid from "../components/recipes/RecipeGrid.jsx";
import { createCollection, deleteCollection, getCollections } from "../services/collections.js";
import { getCollectionRecipes } from "../services/recipes.js";
import { getCurrentUser } from "../utils/auth.js";

export default function Collections() {
    const user = getCurrentUser();
    const [collections, setCollections] = useState([]);
    const [activeCollection, setActiveCollection] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [status, setStatus] = useState({ tone: "info", message: "" });

    const loadCollections = async (nextCollectionName) => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const collectionData = await getCollections(user.usrID);
            setCollections(collectionData);

            const chosen =
                collectionData.find((item) => item.collName === nextCollectionName) ||
                collectionData[0] ||
                null;

            setActiveCollection(chosen);

            if (chosen) {
                const recipeData = await getCollectionRecipes(user.usrID, chosen.collName);
                setRecipes(recipeData);
            } else {
                setRecipes([]);
            }
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = window.setTimeout(() => {
            void loadCollections();
        }, 0);

        return () => window.clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = async (collection) => {
        setActiveCollection(collection);
        try {
            const recipeData = await getCollectionRecipes(user.usrID, collection.collName);
            setRecipes(recipeData);
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        }
    };

    const handleCreate = async (collName) => {
        try {
            setCreating(true);
            await createCollection({
                usrId: user.usrID,
                collName,
            });
            setStatus({ tone: "success", message: `Created ${collName}.` });
            await loadCollections(collName);
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (collName) => {
        try {
            await deleteCollection(user.usrID, collName);
            setStatus({ tone: "success", message: `Deleted ${collName}.` });
            await loadCollections();
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        }
    };

    if (!user) {
        return (
            <AppShell accent="soft">
                <EmptyState
                    title="Collections need an account"
                    description="Log in so we know which user's saved collections to load."
                    action={
                        <Link
                            to="/login"
                            className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600"
                        >
                            Go to login
                        </Link>
                    }
                />
            </AppShell>
        );
    }

    return (
        <AppShell accent="soft">
            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-6">
                    <CollectionCreator onCreate={handleCreate} disabled={creating} />
                    {loading ? (
                        <LoadingState label="Loading collections" />
                    ) : collections.length ? (
                        <CollectionSidebar
                            collections={collections}
                            activeCollection={activeCollection}
                            onSelect={handleSelect}
                            onDelete={handleDelete}
                        />
                    ) : (
                        <EmptyState
                            title="No collections yet"
                            description="Create your first collection to start organising recipes."
                        />
                    )}
                </div>

                <section className="space-y-6 ">
                    <div className="animate-fade-up rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-soft">
                        <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Selected collection</p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-brand-950">
                            {activeCollection?.collName || "Choose a collection"}
                        </h1>
                        <p className="mt-3 text-sm leading-7 text-brand-700">
                            Keep favourite dishes grouped together so planning meals feels easier and more personal.
                        </p>
                        <div className="mt-5">
                            <StatusBanner tone={status.tone} message={status.message} />
                        </div>
                    </div>

                    {loading ? (
                        <LoadingState label="Loading saved recipes" />
                    ) : activeCollection ? (
                        <RecipeGrid
                            recipes={recipes}
                            emptyTitle="Nothing saved here yet"
                            emptyDescription="Open a recipe and add it to this collection from the detail page."
                            badgeResolver={() => activeCollection.collName}
                        />
                    ) : (
                        <EmptyState
                            title="Pick a collection"
                            description="Select a collection on the left to view its recipes."
                        />
                    )}
                </section>
            </div>
        </AppShell>
    );
}
