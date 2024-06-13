
<template>
    <Products />
</template>

<script>
import Products from '../components/Products/Products.vue';
import ContentLoader from '../utils/ContentLoader.vue';
export default {
    components: {
        Products,
        ContentLoader
    },
    computed: {
        isContentLoading() {
            return this.$store.state.isContentLoading;
        },
    },
    mounted() {
        this.$store.dispatch('fetchProducts');
    }
}
</script>