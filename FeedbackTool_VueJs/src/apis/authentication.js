import router from "../routes";
import store from "../store";

export const handleResponse = async(response) => {
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        store.commit('SET_TOKEN', '');
        store.commit('SET_AUTHENICATION', false)
            // location.reload();
        router.push({ name: "login" });
    }
    return await response.json();
};