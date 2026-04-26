import { ArrowRight, KeyRound, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBanner from "../common/StatusBanner.jsx";

export default function AuthPanel({
    title,
    subtitle,
    mode,
    onSubmit,
    fields,
    error,
    footerText,
    footerLinkTo,
    footerLinkLabel,
    submitLabel,
}) {
    return (
        <div className="grid min-h-[680px] overflow-hidden rounded-[36px] border border-white/70 bg-white/75 shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative flex flex-col justify-between overflow-hidden bg-brand-950 p-8 text-white md:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_42%),linear-gradient(135deg,_rgba(241,82,74,0.95),_rgba(55,31,28,0.92))]" />
                <div className="relative">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/70">{mode}</p>
                    <h1 className="mt-5 max-w-md font-display text-5xl leading-tight">
                        {mode === "Sign up" ? "Cook together, collect better ideas." : "Pick up right where your recipes left off."}
                    </h1>
                    <p className="mt-5 max-w-md text-sm leading-7 text-white/80">
                        Shared Recipe Book brings your saved dishes, community feedback, and kitchen shortcuts into one place.
                    </p>
                </div>

                <div className="relative grid gap-4">
                    <div className="rounded-[28px] border border-white/20 bg-white/10 p-5 backdrop-blur">
                        <div className="flex items-center gap-3">
                            <UserRound className="h-5 w-5 text-brand-sand" />
                            <p className="font-medium">Flexible profiles</p>
                        </div>
                        <p className="mt-2 text-sm text-white/80">Set up fast now, then manage age, occupation, password, and saved collections later.</p>
                    </div>
                    <div className="rounded-[28px] border border-white/20 bg-white/10 p-5 backdrop-blur">
                        <div className="flex items-center gap-3">
                            <KeyRound className="h-5 w-5 text-brand-sand" />
                            <p className="font-medium">Smooth account setup</p>
                        </div>
                        <p className="mt-2 text-sm text-white/80">Move from sign-up to profile setup in a simple, guided flow that feels clean and easy to follow.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-md animate-fade-up">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-500">{mode}</p>
                    <h2 className="mt-4 text-4xl font-semibold tracking-tight text-brand-950">{title}</h2>
                    <p className="mt-3 text-sm leading-6 text-brand-700">{subtitle}</p>

                    <form onSubmit={onSubmit} className="mt-8 space-y-4">
                        {fields}
                        <StatusBanner tone="danger" message={error} />
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
                        >
                            {submitLabel}
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-brand-700">
                        {footerText}{" "}
                        <Link to={footerLinkTo} className="font-semibold text-brand-950 transition hover:text-brand-500">
                            {footerLinkLabel}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
