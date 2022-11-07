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
                <slot name="Form" />
                <button class="closeButton" @click="togglePopup">
                    {{closeButton}}
                </button>
            </span>
        </span>
    </div>
</template>

<script>
export default {
    name: "PopupComponent",
    data() {
        return {
            openButton: "Open",
            header: "Header",
            closeButton: "Close",
        }
    },
    methods: {
        togglePopup() {
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
            // popup.style.display = "flex";
        }
    }
}
</script>

<style>
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