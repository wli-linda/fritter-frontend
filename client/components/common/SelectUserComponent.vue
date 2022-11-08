<template>
    <article class="userSelectionBox">
        <h4>
            {{username}}
        </h4>
        <button v-if="selected" @click="toggleSelection">
            ✅
        </button>
        <button v-else @click="toggleSelection">
            ➕
        </button>
    </article>
</template>

<script>
export default {
    name: "SelectUserComponent",
    props: {
        username: {
            type: String,
            required: true
        },
        selected: {
            type: Boolean,
            required: true
        },
    },
    methods: {
        toggleSelection() {
            this.$emit("toggleSelection", this._props.username);
        },
        
    }
}
</script>

<style>
.userSelectionBox {
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