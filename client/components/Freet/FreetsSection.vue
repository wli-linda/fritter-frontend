<template>
    <section
        v-if="freets.length"
      >
        <FreetComponent
          v-for="freet in freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
    name: "FreetsSection",
    components: {FreetComponent},
    props: {
        freets: {
            type: Array,
            required: true,
        }
    }
}
</script>