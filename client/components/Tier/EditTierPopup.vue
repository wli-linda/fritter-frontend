<template>
    <div class="popup">
        <button @click="togglePopup">
            {{openButton}}
        </button>
        <span class="backdrop" id="popup-editTier">
            <span class="popupBox" >
                <h3>
                    {{header}}
                </h3>
                <section> 
                    <h4>
                        Edit list of override tiered users
                    </h4>
                    <section class="formWrapper">
                        <TierSelectUserComponent 
                            v-for="follower in combined"
                            :username="follower"
                            :selected="selections.includes(follower) || timedFollowers.includes(follower)"
                            :tier="tier"
                            :disabled="timedFollowers.includes(follower)"
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
import TierSelectUserComponent from '@/components/Tier/TierSelectUserComponent.vue';

export default {
    name: "EditTierPopup",
    components: {TierSelectUserComponent},
    data() {
        return {
            openButton: "⚙️",
            header: "Edit Tiered Followers System",
            closeButton: "Save Tier",
        }
    },
    computed: {
        tier() { return this.$store.state.tier; },
        timedFollowers() { 
            return this.tier ? this.tier.timedFollowers : []; 
        },
        selections() {
            return this.tier ? this.tier.overrideFollowers : []
        },
        combined() {
            const tmp = this.timedFollowers;
            return tmp.concat(this.$store.state.followers);
        }
    },
    methods: {
        togglePopup() {
            var popup = document.getElementById("popup-editTier");
            popup.classList.toggle("show");
            this.$store.commit('refreshTier');
            console.log(this.combined, this.timedFollowers, this.selections);
        },
        toggleSelection(username) {
            
            this.$store.commit('refreshTier');
        },
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