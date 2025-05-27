<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import exampfs from "@/plugins/exampfs";
import ProgressView from "@/components/ProgressView.vue";

const loadingFlag = ref(true);
const examObj = exampfs();
const heads = examObj.heads.value;
const props = defineProps<{
  questions?: object;
  params?: string | undefined | any;
  testparts_id?: number | any;
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
  loadingFlag.value = false;
  emit("onSelected", selected);
});
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <div class="table-display">
    <div class="table-row hques bg-blue pc">
      <div class="table-col w10 vertical-middle text-center">No</div>
      <div class="table-col text-center vertical-middle">A</div>
      <div class="table-col wAns" v-for="head in heads" :key="head.value">
        {{ head.label }}
      </div>
      <div class="table-col text-center vertical-middle">B</div>
    </div>
    <div class="table-row" v-for="question in props.questions" :key="question">
      <div class="table-col border-sm pl-2 bg-sp-blue">
        {{ question["key"] }}
      </div>
      <div class="table-col border-sm pl-1">
        <div class="d-flex">
          <p class="sp mr-1">A</p>
          {{ question["question1"] }}
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
            :name="question['key']"
            :checked="head.value == selected[question['key']] ? true : false"
            @click="emit('onClick', question['key'], head.value)"
          />
          <p class="sp">{{ heads[head.value - 1]?.label }}</p>
        </div>
      </div>
      <div class="table-col border-sm pa-2">
        <div class="d-flex">
          <p class="sp mr-1">B</p>
          {{ question["question2"] }}
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text\css" scss>
div.table-display {
  display: table;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  width: 100%;

  div.table-row {
    display: table-row;
    &.hques {
      height: 220px;
    }
    div.table-col {
      font-size: 18px;
      display: table-cell;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 10px;
      &.w10 {
        width: 10px !important;
      }
      &.wAns {
        width: 30px;
        text-align: left;
        writing-mode: vertical-rl;
        text-orientation: upright;
        padding-right: 10px;
      }
      &.vertical-middle {
        vertical-align: middle;
      }
    }
  }
}
@media (min-width: 600px) {
  .sp {
    display: none !important;
  }
}
@media (max-width: 600px) {
  div.table-display {
    display: block;
    div.table-row {
      display: block;
      &.pc {
        display: none;
      }
      div.table-col {
        display: block;
        &.text-left-sp {
          text-align: left !important;
        }
        &.bg-sp-blue {
          background-color: #2196f3;
          color: #fff;
        }
      }
    }
  }
}
input[type="radio"] {
  width: 30px;
  height: 30px;
  border-radius: 0%;
}
</style>
