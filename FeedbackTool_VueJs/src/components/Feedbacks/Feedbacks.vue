<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <h2 class="text-center mb-4">{{ getUserFeedback !== null ? 'Your' : 'Submit' }} Feedback</h2>
                <div v-if="!getUserFeedback" class="col-md-10 offset-lg-1 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <AddFeedbackForm />
                        </div>
                    </div>
                </div>
                <div v-else class="col-md-10 offset-lg-1 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-text">{{ getUserFeedback.title }}</p>
                            <p class="card-text"><strong>Category:</strong> {{ getUserFeedback.category }}</p>
                            <p class="card-text">{{ getUserFeedback.description }}</p>
                            <button class="btn btn-outline-primary btn-sm mb-2 mx-3"
                                @click="viewComments(getUserFeedback)">
                                {{ getUserFeedback.showComments === false ? 'View' : 'Hide' }} Comments
                            </button>
                            <button class="btn btn-outline-primary btn-sm mb-2" @click="addComment(getUserFeedback)">Add
                                Comment</button>
                            <AddCommentForm v-if="getUserFeedback.showCommentForm" :feedback="getUserFeedback" />
                        </div>

                        <ul class="list-group list-group-flush" v-if="getUserFeedback.showComments">
                            <li v-for="comment in getUserFeedback.comments" :key="comment.id" class="list-group-item">
                                <strong>{{ comment.user.name }}:</strong> <span v-html="comment.content"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mt-5">
                <h2 class="text-center mb-4">{{ getFeedbacks.length > 0 ? getFeedbacks[0].product.name : '' }} Users
                    Feedbacks
                </h2>
                <!-- Pagination controls -->
                <Pagination />
                <div v-for="feedback in getFeedbacks" :key="feedback.id" class="col-md-10 offset-lg-1 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">{{ feedback.user.name }}</h6>
                            <p class="card-text">{{ feedback.title }}</p>
                            <p class="card-text"><strong>Category:</strong> {{ feedback.category }}</p>
                            <button class="btn btn-outline-primary btn-sm mb-2 mx-3" @click="viewComments(feedback)">
                                {{ feedback.showComments === false ? 'View' : 'Hide' }} Comments
                            </button>
                            <button class="btn btn-outline-primary btn-sm mb-2" @click="addComment(feedback)">Add
                                Comment</button>
                            <AddCommentForm v-if="feedback.showCommentForm" :feedback="feedback" />
                        </div>
                        <ul class="list-group list-group-flush" v-if="feedback.showComments">
                            <li v-for="comment in feedback.comments" :key="comment.id" class="list-group-item">
                                <strong>{{ comment.user.name }}:</strong> <span v-html="comment.content"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Pagination controls -->
        <Pagination />
    </div>

</template>
<script>
import { mapGetters } from "vuex";
import Pagination from './Pagination.vue';
import AddFeedbackForm from './AddFeedbackForm.vue';
import AddCommentForm from './AddCommentForm.vue';
export default {
    components: {
        Pagination,
        AddFeedbackForm,
        AddCommentForm,
    },
    computed: {
        ...mapGetters(["getFeedbacks", "getUserFeedback", "getCurrentPage"]),
    },
    methods: {
        viewComments(feedback) {
            feedback.showComments = !feedback.showComments;
        },
        addComment(feedback) {
            feedback.showCommentForm = !feedback.showCommentForm;
        },
    },
};
</script>

<style>
.mt-5 {
    margin-top: 5rem;
}
</style>
