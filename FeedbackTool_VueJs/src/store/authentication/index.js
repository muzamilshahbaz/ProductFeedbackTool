import api from "../../apis";
import config from "../../config";
import { getAuthHeader } from "../../utils/AuthHeader";
import { dangerToast } from "../../utils/toast";
import { handleResponse } from "../../apis/authentication";

const authentication = {
    state: {
        isAuthenticate: false,
        isLoading: false,
        isError: false,
        isSuccess: false,
        userEmail: "",
        authValidationErrors: [],
        user: {},
        token: "",
        authorized: false,
    },
    getters: {
        getAuthenticationStatus(state) {
            return state.isAuthenticate;
        },
        getAuthValidationError(state) {
            return state.authValidationErrors;
        },
        getAuthUser(state) {
            return state.user;
        },
        getToken(state) {
            return state.token || localStorage.getItem("token") || null;
        },
        authorized(state) {
            return state.authorized;
        },
    },
    mutations: {
        SET_AUTHENICATION(state, status) {
            state.isAuthenticate = status;
        },
        SET_LOADING(state, status) {
            state.isLoading = status;
        },
        SET_EMAIL(state, status) {
            state.userEmail = status;
        },
        SET_ERROR(state, status) {
            state.isError = status;
        },
        SET_USER(state, data) {
            state.user = data;
        },
        SET_VALIDATION_ERROR(state, errors) {
            state.authValidationErrors = errors;
        },
        SET_SUCCESS(state, status) {
            state.isSuccess = status;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_AUTHORIZED(state, status) {
            state.authorized = status;
        },
    },
    actions: {
        /* LOGIN */
        async login({ commit }, data) {
            try {
                commit("SET_LOADING", true);
                commit("SET_ERROR", false);
                commit("SET_SUCCESS", false);
                commit("SET_AUTHENICATION", false);
                commit("SET_VALIDATION_ERROR", []);
                commit("SET_USER", {});
                const response = await fetch(
                    config.API_BASE_URL + api.authentication.login.endpoint, {
                        method: api.authentication.login.method,
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );
                const status = response.status;
                const responseBody = await handleResponse(response);

                if (status === 422) {
                    commit("SET_LOADING", false);
                    setTimeout(() => {
                        commit("SET_VALIDATION_ERROR", responseBody.errors);
                    }, 500);
                    // dangerToast("Sorry, something went wrong!");
                } else if (status == 400) {
                    dangerToast(responseBody.message);
                } else if (status === 200) {
                    localStorage.setItem("token", responseBody.data.access_token);
                    localStorage.setItem("user", JSON.stringify(responseBody.data.user));
                    commit("SET_AUTHENICATION", true);
                    commit("SET_SUCCESS", true);
                    commit("SET_TOKEN", responseBody.data.access_token);
                    commit("SET_USER", responseBody.data.user);
                    // successToast("Welcome back " + (responseBody.data.user.name));
                }
                commit("SET_LOADING", false);

            } catch (error) {
                commit("SET_LOADING", false);
                commit("SET_ERROR", true);
                console.error(error);
            }
        },

        /* LOGOUT */
        async logout({ commit }) {
            try {
                commit("SET_SUCCESS", false);
                const response = await fetch(
                    config.API_BASE_URL + api.authentication.logout.endpoint, {
                        method: api.authentication.logout.method,
                        headers: getAuthHeader(),
                    }
                );
                const status = response.status;

                const responseBody = await handleResponse(response);
                if (status === 200) {
                    commit("SET_USER", {});
                    commit("SET_AUTHENICATION", false);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("authorized");
                    commit("SET_SUCCESS", true);
                    location.reload();
                    // successToast(responseBody.message);
                } else {
                    commit("SET_SUCCESS", false);
                    // dangerToast(responseBody.message);
                }
            } catch (error) {
                commit("SET_SUCCESS", false);
                console.error(error);
            }
        },
        /* REGISTER */
        async register({ commit }, data) {
            try {
                commit("SET_LOADING", true);
                commit("SET_ERROR", false);
                commit("SET_SUCCESS", false);
                commit("SET_VALIDATION_ERROR", []);
                const response = await fetch(
                    config.API_BASE_URL + api.authentication.register.endpoint, {
                        method: api.authentication.register.method,
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );

                const status = response.status;
                const responseBody = await handleResponse(response);

                if (status === 422) {
                    commit("SET_LOADING", false);
                    setTimeout(() => {
                        commit("SET_VALIDATION_ERROR", responseBody.errors);
                    }, 500);
                    // dangerToast("Sorry, something went wrong!");
                } else if (status == 400) {
                    commit("SET_LOADING", false);
                    dangerToast(responseBody.message);
                } else if (status === 201) {
                    localStorage.setItem("token", responseBody.data.access_token);
                    localStorage.setItem("user", JSON.stringify(responseBody.data.user));
                    commit("SET_LOADING", false);
                    commit("SET_AUTHENICATION", true);
                    commit("SET_SUCCESS", true);
                    commit("SET_TOKEN", responseBody.data.access_token);
                    commit("SET_USER", responseBody.data.user);
                }

            } catch (error) {
                commit("SET_LOADING", false);
                console.error(error);
            }
        },
        /* CHECK AUTH */
        checkAuth({ commit }) {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            if (token && user) {
                commit("SET_TOKEN", token);
                commit("SET_AUTHENICATION", true);
                commit("SET_USER", JSON.parse(user));
            } else {
                commit("SET_AUTHENICATION", false);
                commit("SET_TOKEN", "");
                commit("SET_USER", {});
            }
        },
        /* CLEANUP */
        cleanUp({ commit }) {
            commit("SET_VALIDATION_ERROR", []);
            commit("SET_SUCCESS", false);
            commit("SET_ERROR", false);
        },
    },
};


export default authentication;