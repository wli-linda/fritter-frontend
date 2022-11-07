<script>
import PopupComponent from '@/components/common/PopupComponent.vue';

export default {
    name: "CategoryPopup",
    mixins: [PopupComponent],
    data() {
        return {
            openButton: "+ Create New Category",
            header: "Create New Category",
            closeButton: "Save Category"
        }
    }
}
</script>