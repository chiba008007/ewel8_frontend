<script setup lang="ts">
import { ref } from "vue";
import TestMenu from "../components/TestMenu.vue";
import AlertView from "@/components/AlertView.vue";
import pankuzuTest from "@/components/pankuzuTest.vue";
import addPartnerForm from "../components/addPartnerForm.vue";
import ButtonView from "@/components/ButtonView.vue";
import TestApiService from "@/services/TestApiService";
import { useRouter } from "vue-router";

const router = useRouter();
const params = router.currentRoute.value.params;
const data = ref({
  testname: "",
  testdate: "",
});
TestApiService.getTest({
  user_id: params.id,
  test_id: params.edit_id,
})
  .then((res) => {
    data.value.testname = res.data.testname;
    data.value.testdate =
      res.data.formatted_startdaytime + "～" + res.data.formatted_enddaytime;
  })
  .catch((e) => {
    alert("error" + e);
  });

const onPankuzu = ref(false);
const message = ref("");
const onDelete = () => {
  TestApiService.deleteTest({
    user_id: params.id,
    test_id: params.edit_id,
  })
    .then(() => {
      message.value = "削除成功しました";
    })
    .catch((e) => {
      message.value = "削除失敗しました";
      alert("error" + e);
    });
};
</script>
<template>
  <PartnerAdmin coded="customer" />
  <v-row justify="center" class="mt-5">
    <TestMenu />
  </v-row>
  <pankuzuTest
    :partnerhref="{ pageName: 'testList', href: 'testLists' }"
    :partnerhref2="{ pageName: 'testAdd' }"
    :adminhref="{ pageName: 'testList', href: 'testLists' }"
    :adminhref2="{ pageName: 'testDelete' }"
    @onEnabled="(e:boolean) => (onPankuzu = e)"
  ></pankuzuTest>
  <section class="pa-2" v-if="onPankuzu">
    <AlertView
      :text="message"
      type="success"
      v-if="message"
      class="mb-3"
    ></AlertView>
    <addPartnerForm
      color="bg-lime"
      title="検査名"
      :displayTextValue="data.testname"
    ></addPartnerForm>
    <addPartnerForm
      color="bg-lime"
      title="検査実施期間"
      :displayTextValue="data.testdate"
    ></addPartnerForm>
    <ButtonView
      text="削除"
      color="red"
      class="mt-3 mb-3 mr-2"
      variant="outlined"
      @onClick="onDelete()"
    />
  </section>
</template>
<style lang="scss"></style>
