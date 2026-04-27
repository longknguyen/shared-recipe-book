import EmptyState from "../common/EmptyState.jsx";
import RecipeCard from "./RecipeCard.jsx";

export default function RecipeGrid({
    recipes,
    emptyTitle,
    emptyDescription,
    badgeResolver,
    showRemoveButton = false,
    onRemove,
    deletingRecipeId = null,
    canRemove,
    gridClassName = "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
}) {
    if (!recipes.length) {
        return <EmptyState title={emptyTitle} description={emptyDescription} />;
    }

    return (
        <section className={gridClassName}>
            {recipes.map((recipe, index) => (
                <RecipeCard
                    key={recipe.recID}
                    recipe={recipe}
                    badge={badgeResolver ? badgeResolver(recipe) : null}
                    delay={index * 80}
                    showRemoveButton={showRemoveButton || (canRemove ? canRemove(recipe) : false)}
                    onRemove={onRemove}
                    deleting={deletingRecipeId === recipe.recID}
                />
            ))}
        </section>
    );
}
