<template>
  <section>
    <button @click="toggleComments">
      Show Comments
    </button>
    <section v-if="displayComments">
      <section
        v-if="this.comments"
      >
        <CommentComponent
          v-for="comment in this.comments"
          :key="comment.id"
          :comment="comment"
          v-on:deleteComment="handleDeleteComment"
        />
      </section>
      <section v-if="$store.state.username">
        <CreateCommentForm 
          v-bind:freet="freet"
          v-on:newComment="handleNewComment"
          />
      </section>
    </section>
  </section>
</template>

<script>
import CommentComponent from '@/components/Comment/CommentComponent.vue';
import CreateCommentForm from '@/components/Comment/CreateCommentForm.vue';

export default {
  name: 'CommentSectionComponent',
  components: {CommentComponent, CreateCommentForm},
  props: {
      // Data from the stored freet
      freet: {
      type: Object,
      required: true
      }
  },
  data () {
    return {
      displayComments: false,
      comments: null,
    }
  },
  mounted() {
    this.submit();
  },
  methods: {
    toggleComments() {
      this.displayComments = !this.displayComments;
    },
    async submit() {
      const url = `/api/comments/${this._props.freet._id}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.comments = res;
      } catch (e) {
        console.log(e);
      }
    },

    handleNewComment() {
      this.submit();
    },

    handleDeleteComment() {
      this.submit();
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
  