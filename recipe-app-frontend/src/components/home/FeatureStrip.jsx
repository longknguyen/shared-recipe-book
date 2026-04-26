import { Blend, FolderHeart, Soup, Sparkles } from "lucide-react";

const features = [
    {
        title: "Search by real kitchen intent",
        description: "Browse quick meals, drinks, slower comfort dishes, category-based picks and allergen-aware ideas in one place.",
        icon: Sparkles,
    },
    {
        title: "Save recipes into collections",
        description: "Organise dinners, brunch ideas and weeknight favourites into reusable personal shelves.",
        icon: FolderHeart,
    },
    {
        title: "Review and revisit dishes",
        description: "Each recipe detail page shows allergens and community notes.",
        icon: Soup,
    },
    {
        title: "Built to grow with your kitchen",
        description: "Whether you’re saving one recipe or hundreds, everything stays fast, smooth and easy to navigate.",
        icon: Blend,
    },
];

export default function FeatureStrip() {
    return (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
                const IconComponent = feature.icon;

                return (
                    <article
                        key={feature.title}
                        className="animate-fade-up rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur"
                        style={{ animationDelay: `${index * 120}ms` }}
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                            <IconComponent className="h-5 w-5" />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-brand-950">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-brand-700">{feature.description}</p>
                    </article>
                );
            })}
        </section>
    );
}
