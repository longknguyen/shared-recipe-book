import { BriefcaseBusiness, Cake, PencilLine, ShieldCheck } from "lucide-react";

export default function ProfileOverview({ user }) {
    const cards = [
        { label: "Username", value: user.username, icon: ShieldCheck },
        { label: "Age", value: user.age || "Not set", icon: Cake },
        { label: "Occupation", value: user.occupation || "Not set", icon: BriefcaseBusiness },
        { label: "Profile status", value: "Ready to cook", icon: PencilLine },
    ];

    return (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card, index) => {
                const IconComponent = card.icon;

                return (
                    <article
                        key={card.label}
                        className="animate-fade-up rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-soft"
                        style={{ animationDelay: `${index * 90}ms` }}
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                            <IconComponent className="h-5 w-5" />
                        </div>
                        <p className="mt-5 text-sm uppercase tracking-[0.2em] text-brand-500">{card.label}</p>
                        <p className="mt-2 text-2xl font-semibold text-brand-950">{card.value}</p>
                    </article>
                );
            })}
        </section>
    );
}
