<template>
    <article class="categorySelectionBox">
        <h4>
            {{category.name}}
        </h4>
        <button @click="editCategory">
            ✏️
        </button>
        <button @click="deleteCategory">
            🗑️
        </button>
    </article>
</template>

<script>
export default {
    name: "EditCategoryComponent",
    props: {
        category: {
            type: Object,
            required: true
        }
    },
    methods: {
        editCategory() {
            this.$emit('editCategory', this._props.category);
        },
        deleteCategory() {
            this.$emit('deleteCategory', this._props.category);
        },
    }
}
</script>

<style>
.categorySelectionBox {
    display: flex;
    box-shadow: 3px 3px;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    border: 2px solid rgba(32, 81, 15, 0.779);
    margin: 1em;
}

h4 {
    font-size: 1em;
    margin: 1em;
}
</style>