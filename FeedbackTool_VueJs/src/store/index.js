import { createStore } from "vuex"
import authentication from "./authentication";
import products from "./products";
import feedbacks from "./feedbacks";
import comments from "./comments";

export default createStore({
    state: {
        feedbackCategories: [
            'Product Feedback',
            'Feature Requests',
            'Bug Reports',
            'Customer Reviews & In-app Ratings',
            'Complaints & Questions',
            'Praise & Appreciation Posts',
            'Customer Surveys',
            'Net Promoter Score (NPS) Surveys',
            'Customer Satisfaction Survey',
            'Customer Effort Score Feedback',
            'Sales Objections & Feedback',
            'Customer Feedback',
            'Customer Complain',
        ],
    },
    getters: {
        getFeedbackCategories(state) {
            return state.feedbackCategories;
        }
    },
    mutations: {

    },
    actions: {

    },
    modules: {
        authentication: authentication,
        products: products,
        feedbacks: feedbacks,
        comments: comments,
    },
});