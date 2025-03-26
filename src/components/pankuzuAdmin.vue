<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { textString } from "@/plugins/const";

const props = defineProps<{
  pageName: "";
}>();

const router = useRouter();
const pankuzu = ref([
  { title: "HOME", href: router.resolve({ name: "List" }).href },
]);
pankuzu.value.push({ title: props.pageName, href: "" });
</script>
<template>
  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
</template>
<style lang="scss"></style>
