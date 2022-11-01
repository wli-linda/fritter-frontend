<template>
    <button @click="fetchFreets">
        {{ category.name }}
    </button>
</template>

<script>
export default {
    name: 'CategoryButton',
    props: {
        category: {
            type: Object,
            required: true
        }
    },
    methods: {
        fetchFreets() {
            this.$emit("fetchFreets", this.category);
        }
    }
};
</script>

<style scoped>
button {
    margin-right: 10px;
}
</style>
