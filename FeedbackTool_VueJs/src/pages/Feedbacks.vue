
<template>
    <Feedbacks/>
</template>

<script>
import { mapGetters } from 'vuex';
import Feedbacks from '../components/Feedbacks/Feedbacks.vue';
export default {
    components: {
        Feedbacks,
    },
    computed: {
        ...mapGetters(['getProduct']),
        isContentLoading() {
            // return this.$store.state.isContentLoading;
        },
    },
    mounted() {
        const productSlug = this.$route.params.slug;
        this.$store.dispatch('fetchUserProductFeedback', {productSlug: productSlug});
        this.$store.dispatch('fetchFeedbacks', {productSlug: productSlug});
    }
}
</script>