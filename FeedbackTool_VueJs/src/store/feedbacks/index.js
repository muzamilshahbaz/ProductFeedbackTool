import api from "../../apis";
import { handleResponse } from "../../apis/authentication";
import config from "../../config";
import { getAuthHeader } from "../../utils/AuthHeader";
import axios from "axios";

const feedbacks = {
    state: {
        feedbacks: [],
        userFeedback: null,
        feedback: null,
        isLoading: false,
        isContentLoading: false,
        isSuccess: false,
        currentPage: 1,
        totalPages: null,
    },
    getters: {
        getCurrentPage(state) {
            return state.currentPage;
        },
        getTotalPages(state) {
            return state.totalPages;
        },
        getFeedbacks(state) {
            return state.feedbacks;
        },
        getFeedback(state) {
            return state.feedback;
        },
        getUserFeedback(state) {
            return state.userFeedback;
        },
    },
    mutations: {
        SET_FEEDBACKS(state, data) {
            state.feedbacks = data;
        },
        SET_FEEDBACK(state, data) {
            state.feedback = data;
        },
        SET_CURRENT_PAGE(state, data) {
            state.currentPage = data;
        },
        SET_TOTAL_PAGES(state, data) {
            state.totalPages = data;
        },
        SET_USER_FEEDBACK(state, data) {
            state.userFeedback = data;
        },
    },
    actions: {
        async fetchFeedbacks({ commit }, { productSlug, page = 1 }) {
            try {
                commit('SET_FEEDBACKS', []);
                // const pageNo = page ?? 1;
                const response = await fetch(
                    `${config.API_BASE_URL + api.feedbacks.get.endpoint}?product_slug=${productSlug}&page=${page}`, {
                        method: api.feedbacks.get.method,
                        headers: getAuthHeader(),
                    }
                );
                const status = response.status;
                const responseBody = await handleResponse(response);
                if (status === 200) {
                    if (responseBody.data.length <= 0) {
                        // dangerToast("No FEEDBACKS found");
                        commit('SET_FEEDBACKS', []);
                    } else {
                        commit('SET_CURRENT_PAGE', responseBody.data.current_page);
                        const totalPages = Math.ceil(responseBody.data.total / responseBody.data.per_page);
                        commit('SET_TOTAL_PAGES', totalPages);
                        const feedbacks = responseBody.data.data.map(feedback => ({
                            ...feedback,
                            showComments: false,
                            showCommentForm: false,
                        }));
                        commit('SET_FEEDBACKS', feedbacks);
                    }
                }
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        },
        async fetchUserProductFeedback({ commit }, { productSlug }) {
            try {
                commit('SET_USER_FEEDBACK', null);
                const response = await fetch(
                    `${config.API_BASE_URL + api.feedbacks.user.endpoint}?product_slug=${productSlug}`, {
                        method: api.feedbacks.user.method,
                        headers: getAuthHeader(),
                    }
                );
                const status = response.status;
                const responseBody = await handleResponse(response);
                if (status === 200) {
                    if (responseBody.data) {
                        const feedback = responseBody.data;
                        feedback.showComments = false;
                        feedback.showCommentForm = false;
                        commit('SET_USER_FEEDBACK', feedback);
                    } else {
                        // dangerToast("No FEEDBACKS found");
                        commit('SET_USER_FEEDBACK', null);
                    }
                }
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        },

        async addUserFeedback({ commit }, data) {
            try {
                const response = await fetch(
                    `${config.API_BASE_URL + api.feedbacks.post.endpoint}`, {
                        method: api.feedbacks.post.method,
                        headers: getAuthHeader(),
                        body: JSON.stringify(data),
                    }
                );
                const status = response.status;
                const responseBody = await handleResponse(response);
                if (status === 200) {
                    commit('SET_USER_FEEDBACK', data);
                    return true;
                }
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        },
    },
};

export default feedbacks;