<template>
    <section>
        <button @click="fetchFreetsInCategory">
            {{ category.name }}
        </button>
        <section>
            <section v-if="this.freetsInCategory.length">
                <FreetsSection :freets="this.freetsInCategory"/>
            </section>
        </section>
    </section>
</template>

<script>
import FreetsSection from '@/components/Freet/FreetsSection.vue';

export default {
    name: 'CategoryComponent',
    components: {FreetsSection},
    props: {
        category: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            freetsInCategory: [],
            alerts: {} // Displays success/error messages encountered during comment modification
        };
    },
    methods: {
        fetchFreetsInCategory() {
            const params = {
                callback: () => {    
                    this.$store.commit('alert', {
                    message: `Showing freets in category ${category.name}!`, status: 'success'
                    });
                }
            };
            this.request(params);
            console.log("freets in category ", this.category.name);
            console.log(this.freetsInCategory);
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
            const r = await fetch(`/api/categories/${this.category._id}/freets`, options);
            const res = await r.json();
            if (!r.ok) {
            throw new Error(res.error);
            }
            this.freetsInCategory = res;
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
