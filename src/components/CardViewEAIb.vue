<script setup lang="ts">
import { computed } from "vue";
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
  status?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  timelimit: 0,
  editid: 0,
  testcount: 0,
  selectedTime: 60,
});

const emit = defineEmits<{
  (e: "onKeyup", value: string, name: string | undefined): void;
  (e: "onStatus", value: boolean): void;
  (e: "onTimeLimit", value: number | null): void;
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
