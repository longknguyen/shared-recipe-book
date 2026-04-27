import { useState } from "react";
import { Plus, X } from "lucide-react";
import StatusBanner from "../common/StatusBanner.jsx";

function parseCsv(value) {
    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

function parsePositiveIntegers(value) {
    return parseCsv(value)
        .map((item) => Number(item))
        .filter((item) => Number.isInteger(item) && item > 0);
}

export default function RecipeComposer({
    open,
    onClose,
    onSubmit,
    nextRecipeId,
    currentUser,
    submitting,
}) {
    const [form, setForm] = useState({
        dishName: "",
        prepTime: "",
        directions: "",
        ingredients: "",
        categoryIds: "",
        allergenIds: "",
        alcoholPercent: "",
        cookTime: "",
    });
    const [error, setError] = useState("");

    if (!open) {
        return null;
    }

    const handleChange = (field) => (event) => {
        setForm((current) => ({
            ...current,
            [field]: event.target.value,
        }));
    };

    const handleClose = () => {
        setError("");
        onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!currentUser?.usrID) {
            setError("You need to be logged in to add a recipe.");
            return;
        }

        if (!form.dishName.trim() || !form.prepTime || !form.directions.trim()) {
            setError("Dish name, prep time, and directions are required.");
            return;
        }

        const prepTime = Number(form.prepTime);
        const alcoholPercent = form.alcoholPercent ? Number(form.alcoholPercent) : null;
        const cookTime = form.cookTime ? Number(form.cookTime) : null;

        if (Number.isNaN(prepTime) || prepTime < 0) {
            setError("Prep time must be a valid number.");
            return;
        }

        if (form.alcoholPercent && Number.isNaN(alcoholPercent)) {
            setError("Alcohol percent must be a valid number.");
            return;
        }

        if (form.cookTime && Number.isNaN(cookTime)) {
            setError("Cook time must be a valid number.");
            return;
        }

        if (form.cookTime != null && form.alcoholPercent != null){
            setError("Recipe cannot have both an alcohol% and a cook time.");
            return;
        }

        const recId = nextRecipeId;
        const ingredients = parseCsv(form.ingredients).map((ingredient) => ({
            recId,
            ingredient,
        }));
        const categories = parsePositiveIntegers(form.categoryIds).map((catId) => ({ catId }));
        const allergens = parsePositiveIntegers(form.allergenIds).map((allId) => ({ allId }));

        setError("");

        await onSubmit({
            recipe: {
                recID: recId,
                prepTime,
                dishName: form.dishName.trim(),
                directions: form.directions.trim(),
            },
            ingredients,
            published: {
                recId,
                usrId: currentUser.usrID,
                date: new Date().toISOString().slice(0, 10),
            },
            categories,
            allergens,
            drink: alcoholPercent !== null ? { recId, alcPerc: alcoholPercent } : null,
            solid: cookTime !== null ? { recId, cookTime } : null,
        });

        setForm({
            dishName: "",
            prepTime: "",
            directions: "",
            ingredients: "",
            categoryIds: "",
            allergenIds: "",
            alcoholPercent: "",
            cookTime: "",
        });
        setError("");
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-brand-950/45 px-4 backdrop-blur-sm">
            <div className="animate-fade-up w-full max-w-3xl rounded-[34px] border border-white/70 bg-white p-6 shadow-soft md:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-brand-500">New recipe</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-950">Add a recipe</h2>
                        <p className="mt-2 text-sm leading-7 text-brand-700">
                            Fill in the core recipe details below. Category and allergen fields accept numeric ids separated by commas.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-full border border-brand-200 p-3 text-brand-700 transition duration-300 hover:border-brand-500 hover:bg-brand-100"
                        aria-label="Close add recipe dialog"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            value={form.dishName}
                            onChange={handleChange("dishName")}
                            placeholder="Dish name"
                            className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                        />
                        <input
                            type="number"
                            min="0"
                            value={form.prepTime}
                            onChange={handleChange("prepTime")}
                            placeholder="Prep time in minutes"
                            className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                        />
                    </div>

                    <textarea
                        rows={5}
                        value={form.directions}
                        onChange={handleChange("directions")}
                        placeholder="Directions"
                        className="w-full rounded-[24px] border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-7 text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            value={form.ingredients}
                            onChange={handleChange("ingredients")}
                            placeholder="Ingredients, comma-separated"
                            className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                        />
                        <input
                            value={form.categoryIds}
                            onChange={handleChange("categoryIds")}
                            placeholder="Category ids, comma-separated"
                            className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <input
                            value={form.allergenIds}
                            onChange={handleChange("allergenIds")}
                            placeholder="Allergen ids"
                            className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                        />
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={form.alcoholPercent}
                            onChange={handleChange("alcoholPercent")}
                            placeholder="Alcohol % (optional)"
                            className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                        />
                        <input
                            type="number"
                            min="0"
                            value={form.cookTime}
                            onChange={handleChange("cookTime")}
                            placeholder="Cook time (optional)"
                            className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                        />
                    </div>

                    <div className="rounded-[24px] bg-brand-50 px-4 py-3 text-sm text-brand-700">
                        This recipe will be created with id <span className="font-semibold text-brand-950">#{nextRecipeId}</span>.
                    </div>

                    <StatusBanner tone="danger" message={error} />

                    <div className="flex flex-wrap items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-full border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 transition duration-300 hover:border-brand-500 hover:bg-brand-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Plus className="h-4 w-4" />
                            {submitting ? "Adding..." : "Add recipe"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
