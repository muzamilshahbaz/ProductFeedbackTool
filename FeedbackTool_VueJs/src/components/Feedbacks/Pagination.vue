<template>
    <nav aria-label="Feedbacks pagination">
        <ul class="pagination justify-content-center mt-4">
            <li class="page-item" :class="{ 'disabled': getCurrentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="fetchFeedbacks(getCurrentPage - 1)">Previous</a>
            </li>
            <li class="page-item" v-for="page in getTotalPages" :key="page"
                :class="{ 'active': page === getCurrentPage }">
                <a class="page-link" href="#" @click.prevent="fetchFeedbacks(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled': getCurrentPage === getTotalPages }">
                <a class="page-link" href="#" @click.prevent="fetchFeedbacks(getCurrentPage + 1)">Next</a>
            </li>
        </ul>
    </nav>
</template>
<script>
import { mapGetters } from "vuex"

export default {
    computed: {
        ...mapGetters(["getTotalPages", "getCurrentPage"]),
    },
    methods: {
        async fetchFeedbacks(page) {
            try {
                const productSlug = this.$route.params.slug;
                this.$store.dispatch('fetchFeedbacks', { productSlug: productSlug, page: page });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>