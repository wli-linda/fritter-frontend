<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <CreateFreetForm />

      <div>
        <button class="feedTab" @click="setDisplayCategories(false)">
            All Freets
        </button>
        <button class="feedTab" @click="setDisplayCategories(true)">
            Feed
        </button>
      </div>
      <section v-if="displayCategories">
        <CategoryTab />
      </section>
      <section v-else>
        <AllFreetsTab />
      </section>
    </section>

    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to create, edit, and delete freets.
        </h3>
      </article>
      <AllFreetsTab />
    </section>
  </main>
</template>

<script>
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import AllFreetsTab from '@/components/Freet/AllFreetsTab.vue';
import CategoryTab from '@/components/Category/CategoryTab.vue';

export default {
  name: 'FreetPage',
  components: {CreateFreetForm, AllFreetsTab, CategoryTab},
  data() {
    return {
      displayCategories: false,
    }
  },
  mounted() {
    if (this.$store.state.username) {
      this.$store.commit('refreshFollows');
      this.$store.commit('refreshCategories');
    }
  },
  methods: {
    setDisplayCategories(boolean) {
      this.displayCategories = boolean;
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

div {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

button {
    margin-right: 10px;
    box-shadow: 0px 0px;
    font-size: 1em;
    background-color: rgb(233, 239, 236);
}

button:hover {
  color: rgb(77, 183, 42);
  transition: 0.5s;
}

button:focus {
  color: rgb(77, 183, 42);
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
