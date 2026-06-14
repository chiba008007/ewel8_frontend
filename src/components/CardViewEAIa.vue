<script setup lang="ts">
import { ref, onMounted } from "vue";
import CardViewHeader from "./CardViewHeader.vue";
import SelectFieldView from "./SelectFieldView.vue";
import { TIMELIMITLINE } from "@/plugins/const";
interface Props {
  pagename?: string | symbol | undefined;
  title?: string;
  editid?: number | string | string[];
  testcount?: number | string;
  timelimit?: number;
  selectedTime?: number;
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  timelimit: 0,
  editid: 0,
  testcount: 0,
  selectedTime: 60,
});
onMounted(() => {
  if (props.editid) {
    onClick(1);
  }
});
const emit = defineEmits<{
  (e: "onKeyup", value: string, name: string | undefined): void;
  (e: "onStatus", value: boolean): void;
  (e: "onTimeLimit", value: number | null): void;
}>();

const bgcolor = ref({
  0: "bg-success",
  1: "",
});

const onClick = (status: number) => {
  if (status === 0) {
    bgcolor.value[0] = "bg-success";
    bgcolor.value[1] = "";
  }
  if (status === 1) {
    bgcolor.value[0] = "";
    bgcolor.value[1] = "bg-success";
  }
  let bool = status ? true : false;
  emit("onStatus", bool);
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
      <b>受検時間設定</b>
      <SelectFieldView
        class="from-control w-25"
        :items="TIMELIMITLINE"
        :value="props.selectedTime ?? undefined"
        @onChange="
          (val) => emit('onTimeLimit', val !== null ? Number(val) : null)
        "
      ></SelectFieldView>
    </v-card-text>
  </v-card>
</template>
<style lang="scss"></style>
