<script setup lang="ts">
import AddPartnerForm from "@/components/addPartnerForm.vue";
import type { Element } from "@/types/element";

const props = defineProps<{
  elements: Element[];
  values: string[];
}>();

const emit = defineEmits<{
  (e: "update", index: number, value: string): void;
}>();
</script>

<template>
  <p>行動価値エクセルダウンロードで利用する要素名を変更する際に利用します。</p>
  <AddPartnerForm
    v-for="(element, index) in elements"
    :key="element.id"
    :title="element.text"
    :value="values[index]"
    text="要素名を入力してください"
    class="w-100"
    :hideDetails="true"
    @onKeyup="(val) => emit('update', index, val)"
  />
</template>
