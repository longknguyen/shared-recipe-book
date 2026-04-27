import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import StatusBanner from "../components/common/StatusBanner.jsx";
import AppShell from "../components/layout/AppShell.jsx";
import ProfileOverview from "../components/profile/ProfileOverview.jsx";
import {
    ChangePasswordForm,
    DeleteAccountForm,
    EditProfileForm,
} from "../components/profile/ProfileForms.jsx";
import RecipeGrid from "../components/recipes/RecipeGrid.jsx";
import ReviewList from "../components/recipes/ReviewList.jsx";
import { deleteRecipe, getPublishedRecipes } from "../services/recipes.js";
import { deleteAccount, changePassword, getUser, updateUser } from "../services/users.js";
import { getUserReviews } from "../services/reviews.js";
import { clearCurrentUser, getCurrentUser, setCurrentUser } from "../utils/auth.js";

export default function Profile() {
    const cachedUser = getCurrentUser();
    const [user, setUser] = useState(cachedUser);
    const [publishedRecipes, setPublishedRecipes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(Boolean(cachedUser));
    const [status, setStatus] = useState({ tone: "info", message: "" });
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deletingRecipeId, setDeletingRecipeId] = useState(null);

    const loadProfile = async () => {
        if (!cachedUser) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const [freshUser, publishedData, reviewData] = await Promise.all([
                getUser(cachedUser.usrID),
                getPublishedRecipes(cachedUser.usrID),
                getUserReviews(cachedUser.usrID),
            ]);

            setUser(freshUser);
            setCurrentUser(freshUser);
            setPublishedRecipes(publishedData);
            setReviews(reviewData);
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = window.setTimeout(() => {
            void loadProfile();
        }, 0);

        return () => window.clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSaveProfile = async (payload) => {
        try {
            setSavingProfile(true);
            await updateUser(payload);
            setStatus({ tone: "success", message: "Profile details updated." });
            await loadProfile();
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        } finally {
            setSavingProfile(false);
        }
    };

    const handleChangePassword = async (payload) => {
        try {
            setSavingPassword(true);
            await changePassword(payload);
            setStatus({ tone: "success", message: "Password updated." });
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        } finally {
            setSavingPassword(false);
        }
    };

    const handleDelete = async (payload) => {
        try {
            setDeleting(true);
            await deleteAccount(payload);
            clearCurrentUser();
            window.location.href = "/";
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        } finally {
            setDeleting(false);
        }
    };

    const handleDeletePublishedRecipe = async (recId) => {
        try {
            setDeletingRecipeId(recId);
            await deleteRecipe(recId, user.usrID);
            setStatus({ tone: "success", message: "Published recipe deleted." });
            await loadProfile();
        } catch (error) {
            setStatus({ tone: "danger", message: error.message });
        } finally {
            setDeletingRecipeId(null);
        }
    };

    if (!cachedUser) {
        return (
            <AppShell accent="soft">
                <EmptyState
                    title="You need to log in first"
                    description="The profile page loads user details, published recipes, and reviews from your stored account."
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

    if (loading || !user) {
        return (
            <AppShell accent="soft">
                <LoadingState label="Loading profile" />
            </AppShell>
        );
    }

    return (
        <AppShell accent="soft">
            <div className="space-y-6">
                <div className="animate-fade-up rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-soft">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Account center</p>
                    <h1 className="mt-2 text-4xl font-semibold tracking-tight text-brand-950">Manage your profile</h1>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-700">
                        Update your details, keep your account secure, and look back at the recipes and reviews tied to your profile.
                    </p>
                    <div className="mt-5">
                        <StatusBanner tone={status.tone} message={status.message} />
                    </div>
                </div>

                <ProfileOverview user={user} />

                <section className="grid gap-6 xl:grid-cols-3">
                    <EditProfileForm user={user} onSave={handleSaveProfile} saving={savingProfile} />
                    <ChangePasswordForm user={user} onSave={handleChangePassword} saving={savingPassword} />
                    <DeleteAccountForm user={user} onDelete={handleDelete} deleting={deleting} />
                </section>

                <section className="space-y-5">
                    <div className="animate-fade-up">
                        <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Published recipes</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-950">Recipes you published</h2>
                    </div>
                    <RecipeGrid
                        recipes={publishedRecipes}
                        emptyTitle="No published recipes found"
                        emptyDescription="You haven't published any recipes yet."
                        badgeResolver={() => "Published"}
                        canRemove={() => true}
                        onRemove={handleDeletePublishedRecipe}
                        deletingRecipeId={deletingRecipeId}
                    />
                </section>

                <section className="space-y-5">
                    <div className="animate-fade-up">
                        <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Your reviews</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-950">Recent feedback you left</h2>
                    </div>
                    <ReviewList
                        reviews={reviews}
                        currentUser={user}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        showOwnerActions={false}
                    />
                </section>
            </div>
        </AppShell>
    );
}
