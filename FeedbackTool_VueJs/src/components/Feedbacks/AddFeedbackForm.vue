<template>
    <form @submit.prevent="submitFeedback">
        <div class="row">
            <div class="col-6">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="feedbackForm.title" required>
                </div>
            </div>
            <div class="col-6">
                <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <select class="form-select" id="category" v-model="feedbackForm.category" required>
                        <option value="" disabled>Select Category</option>
                        <option v-for="category in getFeedbackCategories" :key="category" :value="category">{{ category
                            }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" rows="3" v-model="feedbackForm.description"
                required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            feedbackForm: {
                title: '',
                category: '',
                description: ''
            },
        };
    },
    computed: {
        ...mapGetters(["getFeedbacks", "getFeedbackCategories", "getAuthUser", "getUserFeedback"]),
    },
    methods: {
        ...mapActions(['addUserFeedback']),
        async submitFeedback() {
            try {
                const data = {
                    title: this.feedbackForm.title,
                    category: this.feedbackForm.category,
                    description: this.feedbackForm.description,
                    user_id: this.getAuthUser.id,
                    product_id: this.getFeedbacks[0].product.id,
                };
                const response = await this.addUserFeedback(data);
                if (response === true) {
                    const productSlug = this.$route.params.slug;
                    this.$store.dispatch('fetchFeedbacks', { productSlug: productSlug });
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>