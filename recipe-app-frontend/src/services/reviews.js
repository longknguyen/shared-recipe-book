import api from "./api";

export async function getRecipeReviews(recId) {
    const { data } = await api.get(`/reviews/${recId}`);
    return data;
}

export async function getUserReviews(usrId) {
    const { data } = await api.get(`/reviews/user/${usrId}`);
    return data;
}

export async function addReview(review) {
    await api.post("/reviews", review);
}

export async function updateReview(review) {
    await api.put("/reviews", review);
}

export async function deleteReview(review) {
    await api.delete("/reviews", {
        data: review,
    });
}
