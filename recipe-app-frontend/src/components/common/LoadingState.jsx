import { LoaderCircle } from "lucide-react";

export default function LoadingState({
    label = "Loading",
    fullScreen = false,
    compact = false,
}) {
    return (
        <div
            className={[
                "flex items-center justify-center gap-3 text-brand-700",
                fullScreen ? "min-h-screen bg-brand-cream" : "",
                compact ? "py-6" : "rounded-3xl border border-white/60 bg-white/70 px-6 py-10 shadow-soft",
            ].join(" ")}
        >
            <LoaderCircle className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}
