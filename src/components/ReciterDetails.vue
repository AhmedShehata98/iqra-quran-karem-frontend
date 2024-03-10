<template>
  <div class="reciter-details">
    <figure class="reciter-image">
      <img :src="props.data.img" alt="reciter-image" />
    </figure>
    <div class="content">
      <h3>{{ props.data.reciterName }}</h3>
      <p>
        {{ props.data.reciterInfo }}
      </p>
      <b>{{ props.data.reciterCountry }}</b>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
type Props = {
  data: {
    reciterName: string;
    reciterInfo: string;
    reciterCountry: string;
    img: string;
  };
  moshaf: Moshaf[] | undefined;
};
const props = defineProps<Props>();
</script>

<style scoped lang="css">
.reciter-details {
  width: calc(33.3% - 1.7rem);
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  border-radius: 18px;
  @apply bg-light-primary-100 shadow-md;
}
@media screen and (max-width: 992px) {
  .reciter-details {
    width: 40%;
  }
}
@media screen and (max-width: 768px) {
  .reciter-details {
    width: 100%;
    height: fit-content;
  }
}
.reciter-details > .reciter-image {
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 4 / 3;
  margin-bottom: 0px;
}
.reciter-details > .reciter-image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
}
.reciter-details .content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.reciter-details .content > h3 {
  font-weight: 700;
  font-size: 2rem;
  margin-top: 1rem;
  text-transform: uppercase;
  @apply text-light-secondary-600;
}
.reciter-details .content > p {
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 0.5rem;
  @apply text-gray-600;
}
.reciter-details .content > b {
  font-weight: 500;
  text-transform: capitalize;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  @apply text-light-secondary-700;
}
</style>
