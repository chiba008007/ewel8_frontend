<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, ref } from "vue";
import ComponentButton from "@/components/ButtonView.vue";
import { useRoute, useRouter } from "vue-router";
import TestApiService from "@/services/TestApiService";
import ButtonView from "@/components/ButtonView.vue";
import { pfsCsv } from "@/plugins/csv";
const router = useRouter();
const params = router.currentRoute.value.params;

const csvList = ref([
  {
    testparts_id: 0,
    code: "",
  },
]);
let tmp = {
  user_id: params.id,
  test_id: params.testid,
};
TestApiService.getCsvList(tmp).then(function (rlt) {
  csvList.value = [];
  rlt.data.forEach((val: any) =>
    csvList.value.push({
      testparts_id: val.id,
      code: val.code,
    })
  );
});

const emit = defineEmits<{
  (e: "onOkClick"): void;
}>();

interface Props {
  text: string;
  title?: string;
  cancelButtonText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: undefined,
  title: "CSVダウンロード",
  cancelButtonText: "閉じる",
});
const onCsvDownLoad = (code: string) => {
  switch (code) {
    case "PFS":
      pfsCsv(params);
      break;
  }
};
const dialog = ref(false);
</script>
<template>
  <v-btn color="secondary" class="mr-2">
    {{ props.text }}
    <v-dialog v-model="dialog" activator="parent">
      <v-card class="text-left w-100">
        <v-card-title class="text-caption">{{ props.title }}</v-card-title>
        <v-card-text class="pa-0 ml-2 mr-2">
          <ButtonView
            v-for="value in csvList"
            :key="value.testparts_id"
            :text="value.code"
            class="w-100 text-left mb-2"
            color="lime"
            @onClick="onCsvDownLoad(value.code)"
          ></ButtonView>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <ComponentButton
            :text="props.cancelButtonText"
            color="red"
            @onClick="dialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
