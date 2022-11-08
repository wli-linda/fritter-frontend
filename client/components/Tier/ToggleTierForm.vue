<template>
  <form @submit.prevent="submit">
    <h3>{{ title }}</h3>
    <article>
      <p>{{ content }}</p>
    </article>
    <button
      type="submit"
    >
      {{ title }}
    </button>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>
export default {
  name: 'ToggleTierForm',
  data() {
    return {
      url: '/api/tiers/status',
      method: 'PUT',
      callback: () => {
        this.$store.commit('alert', {
          message: `You have updated your tiered followers system!`, status: 'success'
        });
        this.$store.commit('refreshTier');
      },
      alerts: {}, // Displays success/error messages encountered during form submission
    };
  },
  computed: {
    status: function() {
      const tier = this.$store.state.tier;
      return tier ? tier.isEnabled : false;
    },
    title: function() {
      return `${this.status ? "Disable" : "Enable"} tiered followers system`;
    },
    content: function() {
      const res = this.status ? 
          'Taking a break from the tiered follower system? See you later!' :
          'Have more control over who can comment on your freet!';
      return res;
    },
  },
  methods: {
    async submit() {
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };

      try {
        const r = await fetch(this.url, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
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
</style>