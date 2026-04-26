import { Search, Soup, TimerReset, Wine } from "lucide-react";

const filterButtons = [
    { id: "all", label: "All recipes", icon: Search },
    { id: "quick", label: "Quick", icon: TimerReset },
    { id: "drinks", label: "Drinks", icon: Wine },
    { id: "solids", label: "Slow-cooked", icon: Soup },
];

export default function RecipeFilters({
    filter,
    setFilter,
    search,
    setSearch,
    category,
    setCategory,
    allergen,
    setAllergen,
}) {
    return (
        <section className="animate-fade-up rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-soft">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Recipe explorer</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-950">Query the cookbook your way</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-700">
                        Mix and match search, categories, cooking pace and allergen preferences to narrow in on the right dish.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                    {filterButtons.map((button) => {
                        const IconComponent = button.icon;

                        return (
                            <button
                                key={button.id}
                                type="button"
                                onClick={() => setFilter(button.id)}
                                className={[
                                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-300",
                                    filter === button.id
                                        ? "bg-brand-500 text-white shadow-soft"
                                        : "border border-brand-200 bg-brand-50 text-brand-700 hover:border-brand-500 hover:bg-brand-100",
                                ].join(" ")}
                            >
                                <IconComponent className="h-4 w-4" />
                                {button.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search dish name"
                    className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                />
                <input
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    placeholder="Category name"
                    className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                />
                <input
                    value={allergen}
                    onChange={(event) => setAllergen(event.target.value)}
                    placeholder="Exclude allergen"
                    className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                />
                <div className="rounded-[24px] bg-brand-950 px-5 py-4 text-sm text-white">
                    <p className="font-semibold">Filter priority</p>
                    <p className="mt-1 text-white/75">Search and category take precedence, then allergen, then the selected shortcut view.</p>
                </div>
            </div>
        </section>
    );
}
