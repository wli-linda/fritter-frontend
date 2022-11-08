<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
    name: "CreateCategoryForm",
    mixins: [BlockForm],
    data() {
        return {
            url: "/api/categories",
            method: 'POST',
            hasBody: true,
            fields: [
                {id: 'name', label: 'Category Name', value: ''}
            ],
            title: 'Name new category',
            callback: (res) => {
                const message = 'Successfully created a category!';
                this.$set(this.alerts, message, 'success');
                setTimeout(() => this.$delete(this.alerts, message), 3000);
                this.$emit("newCategory", res.category);
            },
        }
    },
    methods: {
        async submit() {
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
                const r = await fetch(this.url, options);
                const res = await r.json();
                if (!r.ok) {
                    throw new Error(res.error);
                }

                if (this.callback) {
                    this.callback(res);
                }
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
    }
}
</script>

