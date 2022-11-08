<!-- Created referencing: 
https://www.w3schools.com/howto/howto_js_popup.asp;
https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle;
https://www.w3schools.com/howto/howto_js_popup_form.asp;
https://vuejs.org/guide/components/slots.html#named-slots; -->

<template>
    <div class="popup">
        <button @click="togglePopup">
            {{openButton}}
        </button>
        <span class="backdrop" id="myPopup">
            <span class="popupBox" >
                <h3>
                    {{header}}
                </h3>
                <section v-if="!category" class="createForm">
                    <CreateCategoryForm 
                        v-on:newCategory="newCategory"
                    />
                    <button class="closeButton" @click="togglePopup">
                        Close
                    </button>
                </section>
                <section v-else> 
                    <h4>
                        Add followed users to custom category {{category.name}}
                    </h4>
                    <section class="formWrapper">
                        <SelectUserComponent 
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
import SelectUserComponent from '@/components/common/SelectUserComponent.vue';
import CreateCategoryForm from '@/components/Category/CreateCategoryForm.vue';

export default {
    name: "CategoryPopup",
    components: {SelectUserComponent, CreateCategoryForm},
    data() {
        return {
            openButton: "➕",
            header: "Create New Category",
            closeButton: "Save Category",
            category: null,
            selections: [],
        }
    },
    methods: {
        togglePopup() {
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
            this.$store.commit('refreshCategories');

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
        newCategory(category) {
            this.category = category;
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

.createForm {
    margin: 2em;
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