const api = {
    /* AUTH */
    authentication: {
        login: {
            endpoint: "login",
            method: "POST",
        },
        register: {
            endpoint: "register",
            method: "POST",
        },
        logout: {
            endpoint: "logout",
            method: "POST",
        },
    },

    /* USER */
    user: {
        get: {
            endpoint: "user",
            method: "GET",
        },
    },

    /* PRODUCTS */
    products: {
        get: {
            endpoint: "products",
            method: "GET",
        },
    },

    /* FEEDBACKS */
    feedbacks: {
        get: {
            endpoint: "feedbacks",
            method: "GET",
        },
        post: {
            endpoint: "feedbacks/add",
            method: "POST",
        },
        user: {
            endpoint: "feedback/user/get",
            method: "GET",
        }
    },

    /* COMMENTS */
    comments: {
        get: {
            endpoint: "comments",
            method: "GET",
        },
        post: {
            endpoint: "comments/add",
            method: "POST",
        },
    },
};

export default api;