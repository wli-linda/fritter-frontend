<template>
    <div class="popup">
        <button @click="togglePopup">
            {{openButton}}
        </button>
        <span class="backdrop" id="popup-editCategory">
            <span class="popupBox" >
                <h3>
                    {{header}}
                </h3>
                <section v-if="!category" class="editForm">
                    <EditCategoryComponent 
                        v-for="originalCategory in $store.state.categories"
                        :category="originalCategory"
                        v-on:editCategory="selectCategory"
                        v-on:deleteCategory="deleteCategory"
                    />
                    <button class="closeButton" @click="togglePopup">
                        Close
                    </button>
                </section>
                <section v-else> 
                    <h4>
                        Edit followed users in custom category {{category.name}}
                    </h4>
                    <section class="formWrapper">
                        <CategorySelectUserComponent 
                            v-for="follow in $store.state.follows" 
                            :username="follow" 
                            :selected="selections.includes(follow)"
                            :category="category"
                            v-on:toggleSelection="toggleSelection"
                        />
                    </section>
                    <button class="closeButton" @click="togglePopup">
                        {{closeButton}}
                    </button>
                </section>
            </span>
        </span>
    </div>
</template>

<script>
import EditCategoryComponent from '@/components/Category/EditCategoryComponent.vue';
import CategorySelectUserComponent from '@/components/Category/CategorySelectUserComponent.vue';

export default {
    name: "EditCategoryPopup",
    components: {EditCategoryComponent, CategorySelectUserComponent},
    data() {
        return {
            openButton: "⚙️",
            header: "Update Existing Categories",
            closeButton: "Save Category",
            category: null,
            selections: [],
        }
    },
    methods: {
        togglePopup() {
            var popup = document.getElementById("popup-editCategory");
            popup.classList.toggle("show");
            this.$store.commit('refreshCategories');
            this.category = null;
            this.selections = [];
        },
        toggleSelection(username) {
            const selections = this.selections;
            if (selections.includes(username)) {
                const index = selections.indexOf(username);
                selections.splice(index, 1);
            } else {
                selections.push(username);
            }
        },
        getSelections(category) {
            this.selections = category.items;
        },
        selectCategory(category) {
            this.category = category;
            this.getSelections(category);
        },
        deleteCategory(category) {
            const params = {
                url: `/api/categories/${category._id}`,
                method: 'DELETE',
                callback: () => {    
                        this.$store.commit('alert', {
                        message: `Successfully deleted category ${category.name}!`, status: 'success'
                    });
                this.$store.commit('refreshCategories');
                }
            };
            this.request(params);
        },
        async request(params) {
            const options = {
                method: params.method, 
                headers: {'Content-Type': 'application/json'}
            };
    
            try {
                const r = await fetch(params.url, options);
                const res = await r.json();
                if (!r.ok) {
                    throw new Error(res.error);
                }
                params.callback(res);
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
    }
}
</script>

<style scoped>
.popup {
  position: relative;
  display: inline-block;
}

.backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    visibility: hidden;
}

.popup .popupBox {
    width: 80vw;
    height: 70vh;
    background: #FFFFFF;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 1em;
}

h3 {
    margin-top: 1.5em;
    margin-left: 1.5em;
}

.editForm {
    width: 70vw;
    display: flex;
    flex-wrap: wrap;
    margin: 0.5em 2em;
}

h4 {
    margin-top: 1.5em;
    margin-left: 2em;
}

.formWrapper {
    width: 70vw;
    display: flex;
    flex-wrap: wrap;
    margin: 0.5em 2em;
}

.closeButton {
    position: absolute;
    right: 12vw;
    bottom: 17vh;
}

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.show {
  visibility: visible;
}
</style>