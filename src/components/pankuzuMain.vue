<script setup lang="ts">
import { ref, defineProps, withDefaults } from "vue";
import { useRouter } from "vue-router";
import { useStoreUser } from "@/store/user";

const router = useRouter();

interface Props {
  type?: string;
  partnerid?: string | string[];
  pageName?: string;
  href?: { pageName?: string; href?: string };
  adminhref?: { pageName?: string; href?: string; params?: object };
  adminhref2?: { pageName?: string; href?: string; params?: object };
  adminhref3?: { pageName?: string; href?: string; params?: object };
  adminhref4?: { pageName?: string; href?: string; params?: object };
  partnerhref?: { pageName?: string; href?: string; params?: object };
  partnerhref2?: { pageName?: string; href?: string; params?: object };
  partnerhref3?: { pageName?: string; href?: string; params?: object };
  partnerhref4?: { pageName?: string; href?: string; params?: object };
}

const props = withDefaults(defineProps<Props>(), {
  pageName: "",
  type: undefined,
  href: undefined,
  adminhref: undefined,
  adminhref2: undefined,
  partnerhref: undefined,
  partnerhref2: undefined,
});

const user = useStoreUser();
const pankuzu = ref();

let obj = {};
pankuzu.value = [
  { title: user.home, href: router.resolve({ name: "List" }).href },

  {
    title: user.customerInfoList,
    href: router.resolve({
      name: "customerList",
      params: {
        id: props.partnerid ? props.partnerid : user.getSession("partner_id"),
      },
    }).href,
  },
];

if (props.adminhref && props.adminhref.pageName) {
  if (props.adminhref.params) {
    obj = {
      name: props.adminhref.href,
      params: props.adminhref.params,
    };
  } else {
    obj = { name: props.adminhref.href };
  }
  pankuzu.value.push({
    title: (user as any)[props.adminhref.pageName],
    href: router.resolve(obj).href,
  });
}
if (props.adminhref2 && props.adminhref2.pageName) {
  if (props.adminhref2.params) {
    obj = {
      name: props.adminhref2.href,
      params: props.adminhref2.params,
    };
  } else {
    obj = { name: props.adminhref2.href };
  }

  pankuzu.value.push({
    title: (user as any)[props.adminhref2.pageName],
    href: router.resolve(obj).href,
  });
}
if (props.adminhref3 && props.adminhref3.pageName) {
  pankuzu.value.push({
    title: (user as any)[props.adminhref3.pageName],
    href: router.resolve({
      name: props.adminhref3.href,
    }).href,
  });
}
if (props.adminhref4 && props.adminhref4.pageName) {
  pankuzu.value.push({
    title: (user as any)[props.adminhref4.pageName],
    href: router.resolve({
      name: props.adminhref4.href,
    }).href,
  });
}
</script>
<template>
  <v-breadcrumbs :items="pankuzu" class="pt-0 mt-2"></v-breadcrumbs>
</template>
<style lang="scss"></style>
