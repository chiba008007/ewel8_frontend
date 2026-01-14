<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreUser } from "@/store/user";

const router = useRouter();
const route = useRoute();
const customer_id = Number(route.params.editid);
interface Props {
  type?: string;
  partnerid?: string | string[];
  customerid?: string | string[];
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
  customerid: undefined,
});

const user = useStoreUser();
const pankuzu = ref();
let obj = {};
pankuzu.value = [];

if (user.userdata.type == "admin") {
  pankuzu.value.push({
    title: user.home,
    href: router.resolve({ name: "List" }).href,
  });
}
if (
  (route.name == "uploadView" && customer_id != 0) ||
  (route.name != "uploadView" && customer_id != 0)
) {
  // 常に表示する顧客情報一覧パンくず
  pankuzu.value.push({
    title: user.customerInfoList,
    href: router.resolve({
      name: "customerList",
      params: {
        id: props.partnerid ?? user.getSession("partner_id"),
      },
    }).href,
  });
}

// adminhref（動的パンくず）
if (props.adminhref?.pageName) {
  obj = props.adminhref.params
    ? { name: props.adminhref.href, params: props.adminhref.params }
    : { name: props.adminhref.href };
  pankuzu.value.push({
    title: (user as any)[props.adminhref.pageName],
    href: router.resolve(obj).href,
  });
}

// adminhref2
if (props.adminhref2?.pageName) {
  obj = props.adminhref2.params
    ? { name: props.adminhref2.href, params: props.adminhref2.params }
    : { name: props.adminhref2.href };

  pankuzu.value.push({
    title: (user as any)[props.adminhref2.pageName],
    href: router.resolve(obj).href,
  });
}

// adminhref3
if (props.adminhref3?.pageName) {
  pankuzu.value.push({
    title: (user as any)[props.adminhref3.pageName],
    href: router.resolve({ name: props.adminhref3.href }).href,
  });
}

// adminhref4
if (props.adminhref4?.pageName) {
  pankuzu.value.push({
    title: (user as any)[props.adminhref4.pageName],
    href: router.resolve({ name: props.adminhref4.href }).href,
  });
}
</script>
<template>
  <v-breadcrumbs :items="pankuzu" class="pt-0 mt-2"></v-breadcrumbs>
</template>
<style lang="scss"></style>
