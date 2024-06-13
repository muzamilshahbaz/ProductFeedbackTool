import store from "../store";

/* CHECK USER AUTHENICATE */
export const isAuthenticate = () => {
  return store.state.authentication.isAuthenticate;
};

/* CHECK USER IS LOGGED IN */
export const login = () => {};

/* LOGOUT */
export const logout = () => {};

export const checkAuthorized = () => {
  return store.state.authentication.authorized;
};
