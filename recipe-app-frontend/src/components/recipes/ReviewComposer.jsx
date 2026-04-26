import { useState } from "react";
import StatusBanner from "../common/StatusBanner.jsx";

export default function ReviewComposer({ initialReview, onSubmit, onCancel, disabled }) {
    const [content, setContent] = useState(initialReview?.content || "");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!content.trim()) {
            setError("Write a short review before submitting.");
            return;
        }

        setError("");
        await onSubmit(content.trim());
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="animate-fade-up rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-500">
                        {initialReview ? "Edit review" : "Add review"}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-brand-950">
                        {initialReview ? "Refine your feedback" : "Share how it turned out"}
                    </h3>
                </div>
                {initialReview ? (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 transition duration-300 hover:border-brand-500 hover:bg-brand-100"
                    >
                        Cancel
                    </button>
                ) : null}
            </div>

            <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={5}
                placeholder="What worked, what you changed, or what you'd cook with it next time..."
                className="mt-5 w-full rounded-[24px] border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-7 text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
            />
            <StatusBanner tone="danger" message={error} />
            <button
                type="submit"
                disabled={disabled}
                className="mt-4 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {disabled ? "Saving..." : initialReview ? "Save review" : "Post review"}
            </button>
        </form>
    );
}
