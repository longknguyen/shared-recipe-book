import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell.jsx";
import FeatureStrip from "../components/home/FeatureStrip.jsx";
import HeroSearch from "../components/home/HeroSearch.jsx";

export default function Home() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();

        if (!query.trim()) {
            navigate("/recipes");
            return;
        }

        navigate(`/recipes?query=${encodeURIComponent(query.trim())}`);
    };

    return (
        <AppShell accent="warm">
            <section className="grid items-center gap-8 pb-10 pt-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="animate-fade-up">
                    <p className="text-sm uppercase tracking-[0.35em] text-brand-500">Shared Recipe Book</p>
                    <h1 className="mt-5 max-w-3xl font-display text-5xl leading-tight text-brand-950 md:text-7xl">
                        Search, save and revisit recipes through one connected kitchen workspace.
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-brand-700">
                        Discover ideas faster, keep your favourite dishes organised and move through a calmer cooking flow with
                        collections, reviews and your personal profile.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            to="/recipes"
                            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
                        >
                            Browse recipes
                        </Link>
                        <Link
                            to="/collections"
                            className="rounded-full border border-brand-300 px-6 py-3 text-sm font-semibold text-brand-800 transition duration-300 hover:border-brand-500 hover:bg-brand-100"
                        >
                            Open collections
                        </Link>
                    </div>
                </div>

                <div className="animate-fade-in rounded-[40px] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur md:p-8">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[28px] bg-brand-950 p-6 text-white">
                            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Discover</p>
                            <h2 className="mt-4 text-3xl font-semibold">Smart recipe search</h2>
                            <p className="mt-3 text-sm leading-7 text-white/80">Jump from the landing page straight into filtered results and find something good quickly.</p>
                        </div>
                        <div className="rounded-[28px] bg-brand-sand p-6 text-brand-950">
                            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Personal space</p>
                            <h2 className="mt-4 text-3xl font-semibold">Collections</h2>
                            <p className="mt-3 text-sm leading-7 text-brand-800">Organise favourites into thoughtful shelves for weeknights, parties and comfort meals.</p>
                        </div>
                        <div className="sm:col-span-2">
                            <HeroSearch query={query} onChange={(event) => setQuery(event.target.value)} onSubmit={handleSearch} />
                        </div>
                    </div>
                </div>
            </section>

            <FeatureStrip />
        </AppShell>
    );
}
