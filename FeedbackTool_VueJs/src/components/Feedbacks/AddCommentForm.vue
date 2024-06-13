<template>
  <div class="mt-3">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="commentContent">Comment:</label>
        <textarea id="commentContent" v-model="commentContent" rows="5" ref="editor" required></textarea>
      </div>
      <div class="form-group mt-3">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['feedback'],
  
  data() {
    return {
      commentContent: '',
      editorInstance: null,
    };
  },
  computed: {
    ...mapGetters(['getAuthUser']),
  },
  methods: {
    ...mapActions(['addComment']),
    async submitForm() {    
      try {
        const data = {
          feedback_id: this.feedback.id,
          content: this.commentContent,
          user_id: this.getAuthUser.id,
        };
        await this.addComment(data);
        this.feedback.showCommentForm = !this.feedback.showCommentForm;
        this.commentContent = '';
        this.editorInstance.setData('');
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    ClassicEditor.create(this.$refs.editor, {
      toolbar: [ 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
    })
      .then(editor => {
        this.editorInstance = editor;
        editor.model.document.on('change:data', () => {
          this.commentContent = editor.getData();
        });
        // Apply height directly to the editor container
        editor.editing.view.change(writer => {
          writer.setStyle('height', '150px', editor.editing.view.document.getRoot());
        });
      })
      .catch(error => {
        console.error('Error initializing CKEditor:', error);
      });
  },
  beforeDestroy() {
    if (this.editorInstance) {
      this.editorInstance.destroy()
        .catch(error => console.error('Error destroying CKEditor:', error));
    }
  },
};
</script>

<style scoped>
/* Ensure the height is set for the editor container */
.ck-editor__editable {
  min-height: 300px;
}
</style>
