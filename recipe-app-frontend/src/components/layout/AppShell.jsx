import { ChefHat, FolderHeart, Home, ScrollText, UserCircle2 } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { clearCurrentUser, getCurrentUser } from "../../utils/auth";

const publicLinks = [{ to: "/", label: "Home", icon: Home }];

const protectedLinks = [
    { to: "/recipes", label: "Recipes", icon: ChefHat },
    { to: "/collections", label: "Collections", icon: FolderHeart },
    { to: "/profile", label: "Profile", icon: UserCircle2 },
];

export default function AppShell({ children, accent = "warm" }) {
    const user = getCurrentUser();
    const links = user ? [...publicLinks, ...protectedLinks] : publicLinks;

    return (
        <div className="min-h-screen bg-brand-cream text-brand-900">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className={`absolute -left-16 top-0 h-72 w-72 rounded-full blur-3xl ${accent === "warm" ? "bg-brand-200/70" : "bg-brand-blush/60"}`} />
                <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-brand-sand/60 blur-3xl" />
                <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-white/60 blur-3xl" />
            </div>

            <header className="sticky top-0 z-20 border-b border-white/60 bg-brand-cream/85 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
                    <Link to="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]">
                        <div className="rounded-2xl bg-brand-500 p-3 text-white shadow-soft">
                            <ScrollText className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-display text-2xl tracking-tight text-brand-950">Foodie</p>
                            <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Shared Recipe Book</p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/70 p-2 shadow-soft md:flex">
                        {links.map((link) => {
                            const IconComponent = link.icon;

                            return (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        [
                                            "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-300",
                                            isActive
                                                ? "bg-brand-500 text-white shadow-soft"
                                                : "text-brand-700 hover:bg-brand-100 hover:text-brand-950",
                                        ].join(" ")
                                    }
                                >
                                    <IconComponent className="h-4 w-4" />
                                    {link.label}
                                </NavLink>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <div className="hidden text-right sm:block">
                                    <p className="text-sm font-semibold text-brand-950">{user.username}</p>
                                    <p className="text-xs text-brand-600">{user.occupation || "Home cook"}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        clearCurrentUser();
                                        window.location.href = "/";
                                    }}
                                    className="rounded-full border border-brand-300 px-4 py-2 text-sm font-medium text-brand-700 transition duration-300 hover:border-brand-500 hover:bg-brand-100 hover:text-brand-950"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="rounded-full border border-brand-300 px-4 py-2 text-sm font-medium text-brand-700 transition duration-300 hover:border-brand-500 hover:bg-brand-100 hover:text-brand-950"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600"
                                >
                                    Join
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="relative mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">{children}</main>
        </div>
    );
}
