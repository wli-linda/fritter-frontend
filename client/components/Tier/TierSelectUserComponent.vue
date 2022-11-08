<script>
import SelectUserComponent from '@/components/common/SelectUserComponent.vue';

export default {
    name: "TierSelectUserComponent",
    mixins: [SelectUserComponent],
    props: {
        tier: {
            type: Object,
            required: true
        },
    },
    mounted() {
        console.log(this._props);
    },
    data() {
        return {
            url: `/api/tiers/${this._props.username}/${this.$store.state.username}`
        }
    }
}
</script>