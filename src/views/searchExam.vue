<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import ComponentTextField from "../components/TextFieldView.vue";
import AdminMenu from "../components/AdminMenu.vue";
import UserApiService from "@/services/UserApiService";
import { useRouter } from "vue-router";
import { useStoreUser } from "@/store/user";
import ExamApiService from "@/services/ExamApiService";
import TestApiService from "@/services/TestApiService";
const user = useStoreUser();
const router = useRouter();
const loading = ref(true);
const pankuzu = [
  { title: user.home, href: router.resolve({ name: "List" }).href },
  { title: user.examSearch },
];

const headers = [
  { title: "検査名", sortable: false, key: "testname" },
  { title: "ID", sortable: false, key: "id" },
  { title: "顧客企業名", sortable: false, key: "customer" },
  { title: "パートナー企業名", sortable: false, key: "partner" },
  { title: "氏名", sortable: false, key: "name" },
  { title: "受検日時", sortable: false, key: "date" },
];
const form = ref({
  id: "",
  customer_name: "",
  name: "",
  year: "",
  month: "",
  day: "",
});
const desserts = ref<object[]>([]);
const defaulted = ref<object[]>([]);
try {
  TestApiService.getSearchExam().then(function (rlt) {
    console.log(rlt.data);
    if (rlt.data) {
      desserts.value = rlt.data;
      defaulted.value = rlt.data;
      loading.value = false;
    }
  });
} catch (e) {
  console.log(e);
}

const typed = ref() as any;
const onclick = () => {
  desserts.value = [];
  let date = form.value.year + "-" + form.value.month + "-" + form.value.day;
  if (
    form.value.id ||
    form.value.customer_name ||
    form.value.name ||
    form.value.year ||
    form.value.month ||
    form.value.day
  ) {
    defaulted.value.forEach((element: typeof typed) => {
      if (
        element.email == form.value.id ||
        element.customer_name == form.value.customer_name ||
        element.name == form.value.name ||
        element.endtime.startsWith(date)
      ) {
        desserts.value.push(element);
      }
    });
  } else {
    desserts.value = defaulted.value;
  }
};
const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
</script>
<template>
  <v-row justify="center" v-resize="onResize">
    <AdminMenu />
  </v-row>
  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
  <v-card subtitle="検索フォーム" width="100%" class="ma-0 px-3" elevation="0">
    <v-row no-gutters>
      <v-col cols="2" class="pa-0 ma-0">
        <ComponentTextField
          placeholder="IDを入力してください"
          text="IDで検索"
          density="compact"
          variant="outlined"
          class="w-100"
          @onBlur="(e) => (form.id = e)"
        />
      </v-col>
      <v-col cols="2" class="pl-2">
        <ComponentTextField
          placeholder="顧客企業名を入力してください"
          text="顧客企業名で検索"
          density="compact"
          variant="outlined"
          class="w-100"
          @onBlur="(e) => (form.customer_name = e)"
        />
      </v-col>
      <v-col cols="2" class="pl-2">
        <ComponentTextField
          placeholder="氏名を入力してください"
          text="氏名で検索"
          density="compact"
          variant="outlined"
          class="w-100"
          @onBlur="(e) => (form.name = e)"
        />
      </v-col>
      <v-col cols="1" class="pl-2">
        <ComponentTextField
          placeholder="年入力"
          text="年入力"
          density="compact"
          variant="outlined"
          class="w-100"
          @onBlur="(e) => (form.year = e)"
        />
      </v-col>
      <v-col cols="1" class="d-flex">
        <ComponentTextField
          placeholder="月入力"
          text="月入力"
          density="compact"
          variant="outlined"
          class="w-50"
          @onBlur="(e) => (form.month = e)"
        />
        <ComponentTextField
          placeholder="日入力"
          text="日入力"
          density="compact"
          variant="outlined"
          class="w-50"
          @onBlur="(e) => (form.day = e)"
        />
      </v-col>
      <v-col cols="12">
        <ComponentButton
          text="検索"
          color="primary"
          class="mt-1"
          @onClick="onclick()"
        />
      </v-col>
    </v-row>
  </v-card>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="listable ma-2"
    :height="tableHeight"
    fixed-header
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.testname }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.customer_name }}</td>
        <td>{{ item.partner_name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.endtime }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
<style lang="scss"></style>
