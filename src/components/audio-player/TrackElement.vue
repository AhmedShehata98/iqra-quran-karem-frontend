<template>
  <div class="track-element">
    <figure class="track-picture">
      <img :src="props.trackThumbnail" alt="thumbnail.png" />
    </figure>

    <span class="track-content">
      <b>{{ props.trackName }}</b>
      <small class="text-light-secondary-400">{{
        props.isMekkia === 1 ? 'مكية' : 'مدنية'
      }}</small>
    </span>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(['trackThumbnail', 'trackName', 'isMekkia'])
</script>
<style scoped>
.track-element {
  width: 100%;
  display: flex;
  gap: 0.5rem;
}
.track-element > .track-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px;
}
.track-element > .track-picture > img {
  width: 80%;
  object-fit: cover;
  object-position: center;
}
.track-element > .track-content {
  display: flex;
  flex-direction: column;
}
</style>
