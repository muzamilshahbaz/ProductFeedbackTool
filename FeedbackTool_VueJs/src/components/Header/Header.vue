<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Feedback Tool</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" :to="{name: 'products'}">Products</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">User: {{name}}</a>
                    </li>
                </ul>
                <form @submit="userLogout">
                    <button class="btn btn-danger" type="submit">Logout</button>
                </form>
            </div>
        </div>
    </nav>
</template>
<script>
import { mapActions } from "vuex";
import router from "../../routes";
export default {
    data() {
        return {
            name: this.$store.state.authentication.user.name,
        };
    },
    methods: {
        ...mapActions(["logout"]),
        async userLogout(e) {
            try {
                e.preventDefault();
                await this.logout();
                const success = this.$store.state.authentication.isSuccess;
                if (success) {
                    this.$router.push({ name: "login" });
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
