export function formatMinutes(minutes) {
    if (!minutes && minutes !== 0) {
        return "Unknown";
    }

    if (minutes < 60) {
        return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    if (!remaining) {
        return `${hours} hr`;
    }

    return `${hours} hr ${remaining} min`;
}

export function formatDate(dateLike) {
    if (!dateLike) {
        return "Just now";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(dateLike));
}

export function getRecipeSummary(text) {
    if (!text) {
        return "No directions available yet.";
    }

    if (text.length <= 120) {
        return text;
    }

    return `${text.slice(0, 117)}...`;
}
