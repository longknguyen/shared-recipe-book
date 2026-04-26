import { Clock3, Eye, NotebookTabs } from "lucide-react";
import { Link } from "react-router-dom";
import { formatMinutes, getRecipeSummary } from "../../utils/formatters";

export default function RecipeCard({ recipe, badge, delay = 0 }) {
    return (
        <article
            className="animate-fade-up group flex h-full flex-col rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    {badge ? (
                        <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
                            {badge}
                        </span>
                    ) : null}
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-brand-950">{recipe.dishName}</h3>
                </div>
                <div className="rounded-2xl bg-brand-50 p-3 text-brand-600 transition duration-300 group-hover:bg-brand-500 group-hover:text-white">
                    <NotebookTabs className="h-5 w-5" />
                </div>
            </div>

            <p className="mt-4 flex-1 text-sm leading-7 text-brand-700">{getRecipeSummary(recipe.directions)}</p>

            <div className="mt-6 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-2 text-sm text-brand-700">
                    <Clock3 className="h-4 w-4" />
                    {formatMinutes(recipe.prepTime)}
                </div>
                <Link
                    to={`/recipes/${recipe.recID}`}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 transition duration-300 hover:border-brand-500 hover:bg-brand-100 hover:text-brand-950"
                >
                    <Eye className="h-4 w-4" />
                    Open recipe
                </Link>
            </div>
        </article>
    );
}
