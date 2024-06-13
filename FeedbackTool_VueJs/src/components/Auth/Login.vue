<template>
    <section class="bg-light py-3 py-md-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-8">
                    <div class="card border border-light-subtle rounded-3 shadow-sm">
                        <div class="card-body p-3 p-md-4 p-xl-5">
                            <h2 class="fs-6 fw-normal text-center text-secondary mb-4">
                                Sign in to your account
                            </h2>
                            <form @submit.prevent="loginUser">
                                <div class="row gy-2 overflow-hidden">
                                    <div class="col-12">
                                        <div class="form-floating mb-3">
                                            <input type="email" name="email" class="form-control" v-model="email" id="email" placeholder="Your email address" required autocomplete="off">
                                            <label for="email" class="form-label">Email</label>
                                        </div>
                                        <div v-if="getAuthValidationError.length !== 0">
                                            <div v-if="getAuthValidationError.email">
                                                <span class="text-danger text-sm">
                                                    {{
                                                        getAuthValidationError.email[0]
                                                    }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating mb-3">
                                            <input type="password" name="password" class="form-control" v-model="password" id="password" placeholder="Password" autocomplete="current-password" required>
                                            <label for="password" class="form-label">Password</label>
                                        </div>
                                        <div v-if="getAuthValidationError.length !== 0">
                                            <div v-if="getAuthValidationError.password">
                                                <span class="text-danger text-sm">
                                                    {{
                                                        getAuthValidationError.password[0]
                                                    }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-grid my-3">
                                            <button class="btn btn-primary btn-lg" type="submit">
                                                <span v-if="isLoading">
                                                    <Loader />
                                                </span>
                                                <span v-else>
                                                    Sign in
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <p class="m-0 text-secondary text-center">
                                            Don't have an account?
                                            <router-link class="link-primary text-decoration-none" :to="{ name: 'register' }">
                                                Sign Up
                                            </router-link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../../utils/Loader.vue";

export default {
    components: { Loader },
    data() {
        return {
            email: "",
            password: "",
        };
    },
    computed: {
        ...mapGetters(["getAuthValidationError"]),
        isLoading() {
            return this.$store.state.authentication.isLoading;
        },
    },
    created() {
        this.handleCleanUp();
    },
    methods: {
        ...mapActions(["login", "cleanUp"]),
        async loginUser(e) {
            try {
                e.preventDefault();
                const data = {
                    email: this.email,
                    password: this.password,
                };
                await this.login(data);
                const success = this.$store.state.authentication.isSuccess;
                if (success) {
                    this.$router.push({ name: "products" });
                } else {
                    this.cleanUp();
                    this.$router.push({ name: "login" });
                }
            } catch (error) {
                console.error(error);
            }
        },
        handleCleanUp() {
            this.cleanUp();
        },
    },
};
</script>
