<script setup lang="ts">
import ButtonView from "./ButtonView.vue";

interface Props {
  title?: string;
  pagename?: string | symbol | undefined;
  editid?: number | string | string[];
  bgcolor: Record<number, string>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "onClick", value: number): void;
}>();

const isReadonly = () => {
  return props.pagename != "testCopy" && props.editid ? true : false;
};
</script>

<template>
  <v-card-title class="text-h6">
    {{ props.title }}
  </v-card-title>

  <v-card-actions>
    <ButtonView
      text="利用しない"
      variant="outlined"
      :class="props.bgcolor[0]"
      @onClick="emit('onClick', 0)"
      :readonly="isReadonly()"
    />

    <ButtonView
      text="利用する"
      variant="outlined"
      :class="props.bgcolor[1]"
      @onClick="emit('onClick', 1)"
      :readonly="isReadonly()"
    />

    <p v-show="isReadonly()" class="text-red">
      ※ データ更新時は変更不可となります。
    </p>
  </v-card-actions>
</template>
