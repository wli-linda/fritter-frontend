<template>
    <section v-if="$store.state.username">
        <div v-if="$store.state.categories.length">
            <button @click="fetchAllFollowedFreets">
                All Followed Users
            </button>
            <CategoryButton 
                v-for="category in $store.state.categories"
                :key="category.id"
                :category="category"
                v-on:fetchFreets="handleSelectCategory"
            />
        </div>
        
        <header>
            <h2 v-if="this.category">
                Viewing freets from custom category {{this.category.name}}
            </h2>
            <h2 v-else>
                Viewing freets from all followed users
            </h2>
        </header>

        <section v-if="this.freetsInCategory.length">
            <FreetsSection :freets="this.freetsInCategory"/>
        </section>
    </section>
</template>

<script>
import CategoryButton from '@/components/Category/CategoryButton.vue';
import FreetsSection from '@/components/Freet/FreetsSection.vue';

export default {
    name: 'CategoryTab',
    components: {CategoryButton, FreetsSection},
    data() {
        return {
            category: null,
            freetsInCategory: [],
            alerts: {} // Displays success/error messages encountered during comment modification
        };
    },
    mounted() {
        if (this.$store.state.username) {
            this.fetchAllFollowedFreets();
            console.log(this.freetsInCategory);
        }
    },
    methods: {
        fetchAllFollowedFreets() {
            const params = {
                url: '/api/follows/freets',
                callback: () => {    
                    this.$store.commit('alert', {
                    message: `Showing freets from all followed users!`, status: 'success'
                    });
                }
            };
            this.category = null;
            this.request(params);
        },

        fetchFreetsInCategory() {
            const params = {
                url: `/api/categories/${this.category._id}/freets`,
                callback: () => {    
                    this.$store.commit('alert', {
                    message: `Showing freets in category ${category.name}!`, status: 'success'
                    });
                }
            };
            this.request(params);
        },

        async request(params) {
            const options = {
            method: params.method, headers: {'Content-Type': 'application/json'}
            };
            if (params.body) {
            options.body = params.body;
            }
    
            try {
                const r = await fetch(params.url, options);
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
        },

        handleSelectCategory(category) {
            this.category = category;
            this.fetchFreetsInCategory();
        },
      }
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

div {
  display: flex;
  flex-direction: row;
}

button {
    margin-right: 10px;
}

button:focus {
  background-color: white;
}
</style>
