import { FolderHeart, Trash2 } from "lucide-react";

export default function CollectionSidebar({
    collections,
    activeCollection,
    onSelect,
    onDelete,
}) {
    return (
        <aside className="animate-fade-up rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-500">My collections</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-950">Curated shelves</h2>
            <div className="mt-6 space-y-3">
                {collections.map((collection, index) => {
                    const isActive = activeCollection?.collName === collection.collName;

                    return (
                        <article
                            key={collection.collName}
                            className={[
                                "flex items-center gap-3 rounded-[24px] px-3 py-3 transition duration-300 animate-fade-up",
                                isActive
                                    ? "bg-brand-500 text-white shadow-soft"
                                    : "border border-brand-200 bg-brand-50 text-brand-800 hover:border-brand-500 hover:bg-brand-100",
                            ].join(" ")}
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            <button
                                type="button"
                                onClick={() => onSelect(collection)}
                                className="flex flex-1 items-center gap-3 text-left"
                            >
                                <FolderHeart className="h-4 w-4" />
                                <span className="font-medium">{collection.collName}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => onDelete(collection.collName)}
                                className={`rounded-full p-2 transition ${isActive ? "hover:bg-white/20" : "hover:bg-white"}`}
                                aria-label={`Delete ${collection.collName}`}
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </article>
                    );
                })}
            </div>
        </aside>
    );
}
