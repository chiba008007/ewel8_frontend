<script setup lang="ts">
import { ref, onMounted } from "vue";
import examVFJ from "@/plugins/examVFJ";
import { examPersonName } from "@/services/VFJ/examPersonName";

const examObj = examVFJ();
const heads = examObj.heads;
const name = ref("");

type Question = {
  key: number;
  question1: string;
  question2: string;
};

const props = defineProps<{
  questions?: Question[];
  selectPoint: Record<number, number>;
}>();

const emit = defineEmits<{
  (e: "onClick", key: number, value: number): void;
  (e: "onSelected", value: object): void;
}>();

onMounted(async () => {
  name.value = await examPersonName();
});
</script>
<template>
  貴社の{{ name }}として、<span class="text-red"
    >AとBの行動のどちらを取って欲しくないですか。</span
  >取って欲しくない行動を想定し、設問に回答してください。
  <div class="table-display">
    <div class="table-row hques bg-blue pc">
      <div class="table-col w10 vertical-middle text-center">No</div>
      <div class="table-col text-center vertical-middle">A</div>
      <div class="table-col wAns" v-for="head in heads" :key="head.value">
        {{ head.label }}
      </div>
      <div class="table-col text-center vertical-middle">B</div>
    </div>
    <div
      class="table-row"
      v-for="question in props.questions"
      :key="question.key"
    >
      <div class="table-col border-sm pl-2 bg-sp-blue">
        {{ question.key }}
      </div>
      <div class="table-col border-sm pl-1">
        <div class="d-flex">
          <p class="sp mr-1">A</p>
          {{ question.question1 }}
        </div>
      </div>
      <div
        class="table-col border-sm text-center vertical-middle text-left-sp"
        v-for="head in heads"
        :key="head.value"
      >
        <div class="d-flex">
          <input
            type="radio"
            :name="String(question.key)"
            :checked="props.selectPoint[question.key] === head.value"
            @click="emit('onClick', question.key, head.value)"
          />
          <p class="sp">{{ heads[head.value - 1]?.label }}</p>
        </div>
      </div>
      <div class="table-col border-sm pa-2">
        <div class="d-flex">
          <p class="sp mr-1">B</p>
          {{ question.question2 }}
        </div>
      </div>
    </div>
  </div>
</template>
