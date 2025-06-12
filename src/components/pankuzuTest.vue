<script setup lang="ts">
import { ref, defineProps, withDefaults, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useStoreUser } from "../store/user";
import UserApiService from "@/services/UserApiService";
import ProgressView from "@/components/ProgressView.vue";

const router = useRouter();
const params = router.currentRoute.value.params;
const emit = defineEmits<{
  (e: "onEnabled", value: boolean): void;
}>();
interface PartnerResponse {
  data: number;
}
interface Props {
  pageName?: string;
  href?: { pageName?: string; href?: string };
  adminhref?: { pageName?: string; href?: string; params?: object };
  adminhref2?: { pageName?: string; href?: string; params?: object };
  adminhref3?: { pageName?: string; href?: string; params?: object };
  partnerhref?: { pageName?: string; href?: string; params?: object };
  partnerhref2?: { pageName?: string; href?: string; params?: object };
  partnerhref3?: { pageName?: string; href?: string; params?: object };
}
const loadingFlag = ref(true);
const props = withDefaults(defineProps<Props>(), {
  pageName: "",
  href: undefined,
  adminhref: undefined,
  adminhref2: undefined,
  partnerhref: undefined,
  partnerhref2: undefined,
});

const user = useStoreUser();
const pankuzu = ref();

let tmp = { id: params?.id, type: "customer" };
UserApiService.getPartnerid(tmp)
  .then((res: PartnerResponse) => {
    if ((user.userdata as any).type === "customer") {
      pankuzu.value = [
        {
          title: user.home,
          href: router.resolve({
            name: "customerList",
            params: { id: res.data },
          }).href,
        },
      ];
      if (props.pageName)
        pankuzu.value.push({ title: props.pageName, href: "" });
    } else if ((user.userdata as any).type === "partner") {
      pankuzu.value = [
        {
          title: user.home,
          href: router.resolve({
            name: "customerList",
            params: { id: res.data },
          }).href,
        },
      ];

      if (props.partnerhref && props.partnerhref.pageName) {
        pankuzu.value.push({
          title: (user as any)[props.partnerhref.pageName],
          href: router.resolve({
            name: props.partnerhref.href,
          }).href,
        });
      }
      if (props.partnerhref2 && props.partnerhref2.pageName) {
        pankuzu.value.push({
          title: (user as any)[props.partnerhref2.pageName],
          href: router.resolve({
            name: props.partnerhref2.href,
          }).href,
        });
      }
      if (props.partnerhref3 && props.partnerhref3.pageName) {
        pankuzu.value.push({
          title: (user as any)[props.partnerhref3.pageName],
          href: router.resolve({
            name: props.partnerhref3.href,
          }).href,
        });
      }
    } else {
      let obj = {};
      pankuzu.value = [
        { title: user.home, href: router.resolve({ name: "List" }).href },

        {
          title: user.customerInfoList,
          href: router.resolve({
            name: "customerList",
            params: { id: res.data },
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
    }

    emit("onEnabled", true);
    loadingFlag.value = false;
  })
  .catch((e) => {
    console.log("TestMenu ERROR " + e);
    //window.location.reload();
    // location.href = "/error";
  });
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <v-breadcrumbs :items="pankuzu" class="pt-0 mt-2"></v-breadcrumbs>
</template>
<style lang="scss"></style>
