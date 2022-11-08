<template>
    <article class="userSelectionBox">
        <h4>
            {{username}}
        </h4>
        <button v-if="selected" @click="submit">
            ✅
        </button>
        <button v-else @click="submit">
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
    data() {
        return {
            url: '',
            method: 'PUT',
            hasBody: false,
            callback: () => {
                this.toggleSelection();
            }
        }
    },
    methods: {
        toggleSelection() {
            this.$emit("toggleSelection", this._props.username);
        },
        async submit() {
            const operation = this.selected ? "delete" : "add";
            const url = `${this.url}?operation=${operation}`;

            const options = {
                method: this.method,
                headers: {'Content-Type': 'application/json'},
                credentials: 'same-origin' // Sends express-session credentials with request
            };
            if (this.hasBody) {
                options.body = JSON.stringify(Object.fromEntries(
                this.fields.map(field => {
                    const {id, value} = field;
                    field.value = '';
                    return [id, value];
                })
                ));
            }

            try {
                const r = await fetch(url, options);
                const res = await r.json();
                if (!r.ok) {
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