import EmptyState from "../common/EmptyState.jsx";
import RecipeCard from "./RecipeCard.jsx";

export default function RecipeGrid({ recipes, emptyTitle, emptyDescription, badgeResolver }) {
    if (!recipes.length) {
        return <EmptyState title={emptyTitle} description={emptyDescription} />;
    }

    return (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe, index) => (
                <RecipeCard
                    key={recipe.recID}
                    recipe={recipe}
                    badge={badgeResolver ? badgeResolver(recipe) : null}
                    delay={index * 80}
                />
            ))}
        </section>
    );
}
