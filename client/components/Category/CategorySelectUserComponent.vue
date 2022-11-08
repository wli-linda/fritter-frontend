<script>
import SelectUserComponent from '@/components/common/SelectUserComponent.vue';

export default {
    name: "CategorySelectUserComponent",
    mixins: [SelectUserComponent],
    props: {
        category: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            url: `/api/categories/${this._props.category.id}/${this._props.username}`
        }
    }
}
</script>