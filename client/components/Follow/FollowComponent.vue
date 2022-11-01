<template>
    <article
      class="follow"
    >
        <section v-if="this.$store.state.follows.includes(this._props.author)">
            <button @click="deleteFollow">
            🗑️ Unfollow
            </button>
        </section>
        <section v-else>
            <button @click="createFollow">
            ➕ Follow
            </button>
        </section>

        <section class="alerts">
        <article
            v-for="(status, alert, index) in alerts"
            :key="index"
            :class="status"
        >
            <p>{{ alert }}</p>
        </article>
        </section>
    </article>
  </template>

<script>
export default {
    name: "FollowComponent",
    props: {
        author: {
            type: String,
            required: true,
        }
    },
    data() {
      return {
        alerts: {} // Displays success/error messages encountered during comment modification
      };
    },
    methods: {
        createFollow() {
            const params = {
                url: `/api/follows/${this._props.author}`,
                method: 'POST',
                callback: (res) => {
                    this.$store.commit('alert', {
                    message: 'Successfully followed user!', status: 'success'
                    });
                    this.$store.commit('addFollow', this._props.author);
                }
            };
            this.request(params);
        },
        deleteFollow() {
            const params = {
                url: `/api/follows/${this._props.author}`,
                method: 'DELETE',
                callback: () => {
                    this.$store.commit('alert', {
                    message: 'Successfully unfollowed user!', status: 'success'
                    });
                    this.$store.commit('removeFollow', this._props.author);
                }
            };
            this.request(params);
        },
        async request(params) {
        /**
         * Submits a request to the comment's endpoint
         * @param params - Options for the request
         * @param params.body - Body for the request, if it exists
         * @param params.callback - Function to run if the the request succeeds
         */
        const options = {
          method: params.method, headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
          options.body = params.body;
        }
  
        try {
          const r = await fetch(params.url, options);
          if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }
  
          this.editing = false;
  
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }
    }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

button {
    margin-right: 10px;
}

</style>