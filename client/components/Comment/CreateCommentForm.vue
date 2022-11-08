<!-- Form for creating comments (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateCommentForm',
  mixins: [BlockForm],
  props: {
    // Data from the stored comment
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      url: `/api/comments/${this._props.freet._id}`,
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: 'Content', value: ''}
      ],
      title: 'Create a comment',
      callback: () => {
        const message = 'Successfully created a comment!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
        this.$emit("newComment");
      }
    };
  }
};
</script>
