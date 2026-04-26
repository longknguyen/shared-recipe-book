import { MessageSquareText } from "lucide-react";
import { formatDate } from "../../utils/formatters";
import EmptyState from "../common/EmptyState.jsx";

export default function ReviewList({
    reviews,
    currentUser,
    onEdit,
    onDelete,
    showOwnerActions = true,
}) {
    if (!reviews.length) {
        return (
            <EmptyState
                title="No reviews yet"
                description="Be the first person to leave a note about how this recipe turned out."
            />
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review, index) => {
                const isOwner = showOwnerActions && currentUser?.usrID === review.usrId;

                return (
                    <article
                        key={`${review.usrId}-${review.recId}-${review.date}-${review.time}`}
                        className="animate-fade-up rounded-[26px] border border-white/70 bg-white/80 p-5 shadow-soft"
                        style={{ animationDelay: `${index * 90}ms` }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-brand-950">
                                    <MessageSquareText className="h-4 w-4 text-brand-500" />
                                    <p className="font-semibold">User #{review.usrId}</p>
                                </div>
                                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-brand-500">{formatDate(review.date)}</p>
                            </div>
                            {isOwner ? (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(review)}
                                        className="rounded-full border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-700 transition duration-300 hover:border-brand-500 hover:bg-brand-100"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDelete(review)}
                                        className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 transition duration-300 hover:bg-rose-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : null}
                        </div>
                        <p className="mt-4 text-sm leading-7 text-brand-700">{review.content}</p>
                    </article>
                );
            })}
        </div>
    );
}
