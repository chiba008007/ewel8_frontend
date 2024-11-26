<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import exampfs from "@/plugins/exampfs";

const examObj = exampfs();
const heads = examObj.heads.value;
const props = defineProps<{
  questions?: object;
  params?: string | undefined;
  testparts_id?: number;
}>();

const emit = defineEmits<{
  (e: "onClick", key: number, value: number): void;
  (e: "onSelected", value: object): void;
}>();

const selected = ref([{}]);
const select = examObj.getPFS(props.params, props.testparts_id);
select.then((value) => {
  for (let i = 1; i <= 36; i++) {
    let q = "q" + i;
    selected.value.push(value[q]);
  }
  emit("onSelected", selected);
});
</script>
<template>
  <table class="w-100 border-sm pfs-table">
    <tr class="bg-blue">
      <th class="border-sm min">No</th>
      <th class="border-sm">A</th>
      <th class="border-sm min ver" v-for="head in heads" :key="head.value">
        {{ head.label }}
      </th>
      <th class="border-sm">B</th>
    </tr>
    <tr v-for="question in props.questions" :key="question">
      <td class="border-sm pa-2">{{ question["key"] }}</td>
      <td class="border-sm pa-2">{{ question["question1"] }}</td>
      <td class="border-sm pa-2" v-for="head in heads" :key="head.value">
        <input
          type="radio"
          :name="question['key']"
          :checked="head.value == selected[question['key']] ? true : false"
          @click="emit('onClick', question['key'], head.value)"
        />
      </td>
      <td class="border-sm pa-2">{{ question["question2"] }}</td>
    </tr>
  </table>
</template>
