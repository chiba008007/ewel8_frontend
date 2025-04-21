<script setup lang="ts">
import { withDefaults, defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import ComponentButton from "@/components/ButtonView.vue";
import ExcelApiService from "@/services/ExcelApiService";
import { d_Path } from "@/plugins/const";
interface Props {
  text: string;
  title?: string;
  cancelButtonText?: string;
}
const router = useRouter();
const params = router.currentRoute.value.params;

const props = withDefaults(defineProps<Props>(), {
  text: undefined,
  title: "ダウンロード形式",
  cancelButtonText: "閉じる",
});

const onClick = (type: number) => {
  ExcelApiService.getExcel({
    test_id: params.testid,
    customer_id: params.id,
    type: type,
  })
    .then((res) => {
      location.href = d_Path + "/" + res.data.file_path;
    })
    .catch((e) => {
      console.log(e);
    });
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
          <ComponentButton
            text="全員分"
            color="green"
            class="w-100"
            @onClick="onClick(1)"
          ></ComponentButton>
          <ComponentButton
            text="受検済のみ"
            color="green"
            class="w-100 mt-3"
            @onClick="onClick(2)"
          ></ComponentButton>
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
