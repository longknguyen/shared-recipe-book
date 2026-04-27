import api from "./api";

export async function registerUser(user) {
    await api.post("/users/register", user);
}

export async function usernameExists(username) {
    const { data } = await api.get(`/users/exist/${encodeURIComponent(username)}`);
    return data;
}

export async function loginUser(credentials) {
    const { data } = await api.post("/users/login", credentials);
    return data;
}

export async function getUser(id) {
    const { data } = await api.get(`/users/${id}`);
    return data;
}

export async function updateUser(user) {
    await api.put("/users", user);
}

export async function changePassword(payload) {
    await api.put("/users/password", payload);
}

export async function deleteAccount(payload) {
    await api.delete("/users", {
        data: payload,
    });
}
