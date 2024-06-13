import store from "../../store";
/*AUTH*/
export const auth = (to, from, next) => {
    if (!store.getters.getAuthenticationStatus) {

        if (to.name === 'login' || to.name === 'register') {
            return next();
        }
        return next({ name: "login" });
    } else {
        if (to.name === 'login' || to.name === 'register') {
            return next({ name: "products" })
        }
        return next();
    }
};