import store from "..";
import api from "../../apis";
import { handleResponse } from "../../apis/authentication";
import config from "../../config";
import { getAuthHeader } from "../../utils/AuthHeader";
import axios from "axios";

const feedbacks = {
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async addComment({ commit }, data) {
            try {
                const response = await fetch(
                    `${config.API_BASE_URL + api.comments.post.endpoint}`, {
                        method: api.comments.post.method,
                        headers: getAuthHeader(),
                        body: JSON.stringify(data),
                    }
                );
                const status = response.status;
                const responseBody = await handleResponse(response);
                if (status === 200) {
                    const feedback = store.getters.getFeedbacks.find(f => f.id === data.feedback_id);
                    if (feedback) {
                        feedback.comments.push(responseBody.data);
                    }
                    return true;
                }
            } catch (error) {
                console.error('Error fetching comment:', error);
            }
        },
    },
};

export default feedbacks;