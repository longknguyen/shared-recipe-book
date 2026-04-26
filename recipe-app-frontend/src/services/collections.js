import api from "./api";

export async function getCollections(usrId) {
    const { data } = await api.get("/collections", {
        params: { usrId },
    });
    return data;
}

export async function createCollection(payload) {
    await api.post("/collections", payload);
}

export async function deleteCollection(usrId, collName) {
    await api.delete("/collections", {
        params: { usrId, collName },
    });
}
