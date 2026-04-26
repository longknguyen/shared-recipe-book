import { useState } from "react";
import StatusBanner from "../common/StatusBanner.jsx";

export default function CollectionCreator({ onCreate, disabled }) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name.trim()) {
            setError("Give the collection a name first.");
            return;
        }

        setError("");
        await onCreate(name.trim());
        setName("");
    };

    return (
        <form onSubmit={handleSubmit} className="animate-fade-up rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Create collection</p>
            <h3 className="mt-2 text-2xl font-semibold text-brand-950">Name a new shelf</h3>
            <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Weeknight winners"
                className="mt-5 w-full rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
            />
            <StatusBanner tone="danger" message={error} />
            <button
                type="submit"
                disabled={disabled}
                className="mt-4 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {disabled ? "Creating..." : "Create collection"}
            </button>
        </form>
    );
}
