<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  pageName: "" | string;
  pagehref?: string;
  pageName2?: "" | string;
}>();

const router = useRouter();
const pankuzu = ref([
  { title: "HOME", href: router.resolve({ name: "List" }).href },
]);

pankuzu.value.push({
  title: props.pageName,
  href: router.resolve({ name: props.pagehref ?? "" }).href,
});
if (props.pageName2) {
  pankuzu.value.push({
    title: props.pageName2 ?? "",
    href: "",
  });
}
</script>
<template>
  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
</template>
<style lang="scss"></style>
