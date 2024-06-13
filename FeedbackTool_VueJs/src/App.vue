<template>
  <router-view></router-view>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions(["checkAuth"]),
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  created() {
    this.checkAuth();
    if (this.$store.state.authentication.isAuthenticate) {
      const userData = JSON.parse(localStorage.getItem('user'));
    }
  }
};
</script>