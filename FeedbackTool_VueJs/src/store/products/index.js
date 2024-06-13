import api from "../../apis";
import config from "../../config";
import { getAuthHeader } from "../../utils/AuthHeader";
import { handleResponse } from "../../apis/authentication";

const products = {
    state: {
        products: [],
        product: null,
        isLoading: false,
        isContentLoading: false,
        isSuccess: false,
    },
    getters: {
        getProducts(state) {
            return state.products;
        },
        getProduct(state) {
            return state.product;
        },
    },
    mutations: {
        SET_PRODUCTS(state, data) {
            state.products = data;
        },
        SET_PRODUCT(state, data) {
            state.product = data;
        },
    },
    actions: {
        setProduct({ commit }, { product }) {
            commit('SET_PRODUCT', product);
        },
        async fetchProducts({ commit }) {
            try {
                commit('SET_PRODUCTS', []);
                const response = await fetch(
                    `${config.API_BASE_URL}${api.products.get.endpoint}`, {
                        method: api.products.get.method,
                        headers: getAuthHeader(),
                    }
                );
                const status = response.status;
                const responseBody = await handleResponse(response);

                if (status === 200) {
                    if (responseBody.data.length <= 0) {
                        commit('SET_PRODUCTS', []);
                    } else {
                        commit('SET_PRODUCTS', responseBody.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
    },
};

export default products;