<script setup lang="ts">
import { ref, defineEmits } from "vue";
import AdminMenu from "../components/AdminMenu.vue";
import UserApiService from "@/services/UserApiService";
import ComponentPartnerRegist from "../components/PartnerRegistForm.vue";
import ComponentButton from "../components/ButtonView.vue";
import ComponentAlert from "../components/AlertView.vue";
import { useRouter } from "vue-router";
import { textString } from "@/plugins/const";
const router = useRouter();
const pankuzu = [
  { title: "HOME", href: router.resolve({ name: "List" }).href },
  { title: textString.CompanyEdit },
];
const settingData = ref();
let data = {
  type: "admin",
};

const user = ref();
UserApiService.getAdmin(data).then((response) => {
  user.value = response;
  settingData.value = user.value;
});

const onBlur = (val: string, type: string, key: number) => {
  settingData.value.data.user[key][type] = val;
};
const alertFlag = ref<boolean>(false);
const onClick = () => {
  UserApiService.editLoginAdmin(settingData.value.data.user).then((res) => {
    alertFlag.value = res.data === 1 ?? true;
  });
};
</script>
<template>
  <v-row align="center" justify="center">
    <AdminMenu />
  </v-row>
  <v-container class="mt-1">
    <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
    <div class="text-h5">{{ textString.CompanyEdit }}</div>
    <ComponentPartnerRegist
      :login_id="user?.data?.user[0].login_id"
      :person="user?.data?.user[0].person"
      :personAddress="user?.data?.user[0].person_address"
      @onBlur="(ev, type) => onBlur(ev, type, 0)"
    />
    <hr />
    <ComponentPartnerRegist
      :login_id="user?.data?.user[1]?.login_id"
      :person="user?.data?.user[1]?.person"
      :personAddress="user?.data?.user[1]?.person_address"
      @onBlur="(ev, type) => onBlur(ev, type, 1)"
    />
    <hr />
    <ComponentPartnerRegist
      :login_id="user?.data?.user[2]?.login_id"
      :person="user?.data?.user[2]?.person"
      :personAddress="user?.data?.user[2]?.person_address"
      @onBlur="(ev, type) => onBlur(ev, type, 2)"
    />
    <hr />
    <ComponentPartnerRegist
      name="three"
      :login_id="user?.data?.user[3]?.login_id"
      :person="user?.data?.user[3]?.person"
      :personAddress="user?.data?.user[3]?.person_address"
      @onBlur="(ev, type) => onBlur(ev, type, 3)"
    />
    <hr />
    <ComponentAlert
      text="更新成功"
      type="success"
      class="my-2"
      v-if="alertFlag"
    />
    <ComponentButton
      text="更新"
      color="primary"
      class="mt-3"
      @onClick="onClick()"
    />
  </v-container>
</template>
<style lang="scss"></style>
