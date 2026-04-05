<script setup lang="ts">
import { ref, onMounted } from "vue";
import examBEA from "@/plugins/examBEA";

const examObj = examBEA();
const heads = examObj.heads;

type Question = {
  key: number;
  question1: string;
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
  //name.value = await examPersonName();
});
</script>
<template>
  <div class="table-display">
    <div class="table-row hques bg-blue pc">
      <div class="table-col w10 vertical-middle text-center">No</div>
      <div class="table-col w-50 text-center vertical-middle">設問</div>
      <div
        class="table-col vertical-middle"
        v-for="head in heads"
        :key="head.value"
      >
        <div>{{ head.value }}</div>
        {{ head.label }}
      </div>
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
        <div class="text-center">
          <input
            type="radio"
            :name="String(question.key)"
            :checked="props.selectPoint[question.key] === head.value"
            @click="emit('onClick', question.key, head.value)"
          />
          <p class="sp">{{ heads[head.value - 1]?.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
