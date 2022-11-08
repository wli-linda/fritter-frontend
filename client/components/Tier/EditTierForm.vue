<template>
  <form>
    <h3>{{ title }}</h3>
    <article>
      <p>{{ content }}</p>
    </article>
    <EditTierPopup />
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
import EditTierPopup from '@/components/Tier/EditTierPopup.vue';

export default {
  name: 'EditTierForm',
  components: {EditTierPopup},
  data() {
    return {
      title: "Edit tiered followers system",
      content: "Add manual overrides so new followers can also engage with you!",
      alerts: {},
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