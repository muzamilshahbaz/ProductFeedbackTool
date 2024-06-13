<template>
    <div class="container mt-100">
    <div class="row">
        <div class="col-md-4 col-sm-6" v-for="product in getProducts" :key="product.id">
            <div class="card mb-30">
                <a class="card-img-tiles" href="#" data-abc="true">
                    <div class="inner">
                        <div class="main-img">
                            <img :src="baseUrl + product.image" alt="Category" class="img-fluid">
                        </div>
                    </div>
                </a>
                <div class="card-body text-center">
                    <h4 class="card-title">{{ product.name }}</h4>
                    <p class="text-muted">Total Feedbacks: {{product.feedbacks_count}}</p>
                    <button class="btn btn-outline-primary btn-sm" @click="getFeedbacks(product)" data-abc="true">View Feedbacks</button>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import { mapActions, mapGetters } from "vuex";
import config from "../../config";

export default {
    data() {
        return {
            baseUrl: config.BASE_URL,
        };
    },

    computed: {
        ...mapGetters(['getProducts'])
    },

    methods: {
        ...mapActions(['setProduct']),
        getFeedbacks(product) {
            const slug = product.slug;
            this.$router.push({ name: "product-feedbacks", params: {slug} });
        }
    }
}
</script>