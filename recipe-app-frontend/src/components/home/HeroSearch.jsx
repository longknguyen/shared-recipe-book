import { Search } from "lucide-react";

export default function HeroSearch({ query, onChange, onSubmit }) {
    return (
        <form
            onSubmit={onSubmit}
            className="animate-fade-up flex w-full max-w-2xl items-center gap-3 rounded-[30px] border border-white/60 bg-white/85 p-3 shadow-soft backdrop-blur"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                <Search className="h-5 w-5" />
            </div>
            <input
                type="search"
                value={query}
                onChange={onChange}
                placeholder="Search by dish name..."
                className="w-full bg-transparent text-base text-brand-950 outline-none placeholder:text-brand-500"
            />
            <button
                type="submit"
                className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
            >
                Explore
            </button>
        </form>
    );
}
