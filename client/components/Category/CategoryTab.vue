<template>
    <section v-if="$store.state.username">
        <section v-if="$store.state.categories.length">
            <button>
                All Followed Users
            </button>
            <CategoryComponent 
                v-for="category in $store.state.categories"
                :key="category.id"
                :category="category"
            />
        </section>
        
        <!-- <section>
            <section v-if="this.freetsInCategory.length">
                <FreetsSection :freets="this.freetsInCategory"/>
            </section>
        </section> -->
    </section>
</template>

<script>
import CategoryComponent from '@/components/Category/CategoryComponent.vue';

export default {
    name: 'CategoryTab',
    components: {CategoryComponent},
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: row;
}

button {
    margin-right: 10px;
}
</style>
