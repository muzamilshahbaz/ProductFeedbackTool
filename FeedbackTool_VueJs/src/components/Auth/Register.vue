<template>
  <section class="bg-light py-3 py-md-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6">
          <div class="card border border-light-subtle rounded-3 shadow-sm">
            <div class="card-body p-3 p-md-4 p-xl-5">
              <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Create an account</h2>
              <form @submit.prevent="registerUser" ref="register">
                <div class="row gy-2 overflow-hidden">
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input type="name" class="form-control" name="name" id="name" placeholder="Name" required
                        autocomplete="off">
                      <label for="name" class="form-label">Name</label>
                      <div v-if="getAuthValidationError.length !== 0 && getAuthValidationError.name">
                        <span class="text-danger text-sm">{{ getAuthValidationError.name[0] }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input type="email" class="form-control" name="email" id="email" placeholder="Email Address"
                        required autocomplete="off">
                      <label for="email" class="form-label">Email</label>
                      <div v-if="getAuthValidationError.length !== 0 && getAuthValidationError.email">
                        <span class="text-danger text-sm">{{ getAuthValidationError.email[0] }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input type="password" class="form-control" name="password" id="password" placeholder="Password"
                        required>
                      <label for="password" class="form-label">Password</label>
                      <div v-if="getAuthValidationError.length !== 0 && getAuthValidationError.password">
                        <span class="text-danger text-sm">{{ getAuthValidationError.password[0] }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input type="password" class="form-control" name="password_confirmation"
                        id="password_confirmation" placeholder="Confirm Password" required>
                      <label for="password_confirmation" class="form-label">Confirm Password</label>
                      <div v-if="getAuthValidationError.length !== 0 && getAuthValidationError.password_confirmation">
                        <span class="text-danger text-sm">{{ getAuthValidationError.password_confirmation[0] }}</span>
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
                          Register
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="col-12">
                    <p class="m-0 text-secondary text-center">Already have an account? <router-link :to="{ name: 'login' }"
                        class="link-primary text-decoration-none">Sign in</router-link></p>
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
import { mapGetters, mapActions, mapState } from 'vuex'
import router from "../../routes/index.js"
import Loader from "../../utils/Loader.vue";

export default {
  components: { Loader },
  data() {
    return {};
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
    ...mapActions(["register", "cleanUp"]),
    registerSerializeForm() {
      const formData = new FormData(this.$refs.register);
      const data = {};
      for (const [key, value] of formData.entries()) {
        data[key] = data[key] ? (Array.isArray(data[key]) ? [...data[key], value] : [data[key], value]) : value;
      }
      return data;
    },
    async registerUser(e) {
      try {
        e.preventDefault();
        var data = this.registerSerializeForm();
        await this.register(data);
        const success = this.$store.state.authentication.isSuccess;
        if (success) {
          this.$router.push({ name: "login" });
        }
      }
      catch (error) {
        console.error(error);
      }
    },
    handleCleanUp() {
      this.cleanUp();
    },
  },
};
</script>