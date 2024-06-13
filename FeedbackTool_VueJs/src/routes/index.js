import { createWebHistory, createRouter } from "vue-router";
const Layout = () =>
    import ('../layouts/Layout.vue');
const Products = () =>
    import ('../pages/Products.vue');
const Feedbacks = () =>
    import ('../pages/Feedbacks.vue');
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';

import {
    auth,
} from "../middlewares/authMiddleware";

function generateMeta(title, breadcrumb, requiresPermission) {
    return {
        title,
        breadcrumb,
        requiresPermission,
    };
}

function createRoute(path, name, component, meta = {}, beforeEnter = [auth]) {
    return {
        path,
        name,
        component,
        meta,
        beforeEnter,
    };
}

const baseLayout = {
    path: '/',
    component: Layout,
    children: [
        createRoute('', 'products', Products, generateMeta('Products', 'Products'), [auth]),
        createRoute('product/:slug/feedbacks', 'product-feedbacks', Feedbacks, generateMeta('Product Feedbacks', 'Product Feedbacks'), [auth]),
    ],
};

const loginRoute = createRoute('/login', 'login', Login, {}, [auth]);
const registerRoute = createRoute('/register', 'register', Register, {}, [auth]);

const routes = [
    baseLayout,
    loginRoute,
    registerRoute,
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;