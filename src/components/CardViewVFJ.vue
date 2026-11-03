<script setup lang="ts">
import { computed } from "vue";
import CardViewHeader from "./CardViewHeader.vue";
import TextField from "@/components/TextFieldView.vue";
interface Props {
  pagename?: string | symbol | undefined;
  title?: string;
  editid?: number | string | string[];
  testcount?: number | string;
  examPersonName?: string | null;
  status?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  examPersonName: null,
  editid: 0,
  testcount: 0,
});

const emit = defineEmits<{
  (e: "onKeyup", value: string, name: string | undefined): void;
  (e: "onStatus", value: boolean): void;
}>();

const bgcolor = computed(() => ({
  0: props.status ? "" : "bg-success",
  1: props.status ? "bg-success" : "",
}));

const onClick = (status: number) => {
  emit("onStatus", status === 1);
};
</script>
<template>
  <v-card class="w-100" elevation="4" variant="outlined">
    <CardViewHeader
      :title="props.title"
      :pagename="props.pagename"
      :editid="props.editid"
      :bgcolor="bgcolor"
      @onClick="onClick"
    ></CardViewHeader>
    <v-card-text>
      <v-row no-gutters>
        <v-col
          >受検者数:{{ props.testcount }}<span class="ml-2">人</span></v-col
        >
      </v-row>
      <b>検査対象者入力</b>
      <TextField
        class="text-caption"
        :value="props.examPersonName ?? ''"
        @onKeyup="(e) => emit('onKeyup', e, 'examPersonName')"
      ></TextField>
      <small class="text-red">
        ガイダンスで表示される検査対象者を入力してください。未入力の場合は社員（または契約社員等）と表示されます。
      </small>
    </v-card-text>
  </v-card>
</template>
<style lang="scss"></style>
