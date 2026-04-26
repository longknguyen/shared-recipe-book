const USER_KEY = "user";
const TEMP_USER_KEY = "temp_user";

export function getCurrentUser() {
    const raw = localStorage.getItem(USER_KEY);

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch {
        localStorage.removeItem(USER_KEY);
        return null;
    }
}

export function setCurrentUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
    localStorage.removeItem(USER_KEY);
}

export function setPendingUser(user) {
    localStorage.setItem(TEMP_USER_KEY, JSON.stringify(user));
}

export function getPendingUser() {
    const raw = localStorage.getItem(TEMP_USER_KEY);

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch {
        localStorage.removeItem(TEMP_USER_KEY);
        return null;
    }
}

export function clearPendingUser() {
    localStorage.removeItem(TEMP_USER_KEY);
}
