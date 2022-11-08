<!-- Form for deleting account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteAccountForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'DELETE',
      setUsername: true,
      title: 'Delete account',
      fields: [],
      content: 'Deleting your account is permanent and irreversible. Proceed only if you understand these consequences.',
      callback: () => {
        this.$router.push({name: 'Home'}); // Goes to Home page after deleting account
        this.$store.commit('alert', {
          message: 'Your account has been deleted!', status: 'success'
        });
      }
    };
  }
};
</script>


<style scoped>
form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border: 1px solid rgb(71, 94, 44);
  border-radius: 0.5em;
  margin: 0.5em;
  background-color: white;
  box-shadow: 3px 3px;
}

article > div {
  display: flex;
  flex-direction: column;
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}

button {
  background-color: rgb(251, 132, 132);
}
</style>