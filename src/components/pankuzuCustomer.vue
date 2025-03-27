<script setup lang="ts">
import { ref, defineProps, withDefaults } from "vue";
import { useRouter } from "vue-router";
import { useStoreUser } from "../store/user";

interface Props {
  pageName?: string;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  pageName: "",
  name: "",
});

const router = useRouter();
const user = useStoreUser();
const pankuzu = ref();
if ((user.userdata as any).type === "partner") {
  pankuzu.value = [
    { title: user.home, href: router.resolve({ name: "customerList" }).href },
  ];
  if (props.pageName) pankuzu.value.push({ title: props.pageName, href: "" });
} else {
  pankuzu.value = [
    { title: user.home, href: router.resolve({ name: "List" }).href },
    {
      title: user.customerInfoList,
    },
  ];
  if (props.name) {
    pankuzu.value[1]["href"] = router.resolve({ name: props.name }).href;
  }

  if (props.pageName) pankuzu.value.push({ title: props.pageName, href: "" });
}
</script>
<template>
  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
</template>
<style lang="scss"></style>
