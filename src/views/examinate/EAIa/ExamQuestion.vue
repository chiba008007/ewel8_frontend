<script setup lang="ts">
import type { EAIBQuestion } from "@/constants/eaibQuestions";
import imgView from "@/components/imgView.vue";
import RadioView from "@/components/RadioView.vue";

const props = defineProps<{
  questions?: EAIBQuestion[];
  selectPoint: Record<number, number>;
}>();

const emit = defineEmits<{
  (e: "onClick", key: number, value: number): void;
}>();

// 選択した回答を親へ渡す
const selectAnswer = (key: number, value: number | undefined) => {
  if (value !== undefined) {
    emit("onClick", key, value);
  }
};
</script>

<template>
  <v-card
    v-for="(question, index) in props.questions ?? []"
    :key="question.key"
    class="mx-auto mb-6"
    max-width="1200"
    rounded="sl"
    elevation="3"
  >
    <!-- セクション名 -->
    <v-card-title class="bg-light-green-lighten-4 pa-4" v-if="index === 0">
      {{ question.code }}
    </v-card-title>
    <h3 class="pa-5" v-if="index === 0">
      {{ question.title }}
    </h3>
    <!-- type:1 -->
    <div v-if="question.type == 1">
      <!-- 設問画像 -->
      <div class="text-center">
        <imgView
          :src="question.image"
          :max-width="860"
          class="mx-auto ma-5 rounded-lg"
          contain
        ></imgView>
      </div>
      <v-card-text class="px-6 pb-6">
        <!-- 設問文 -->
        <div class="d-flex">
          <p style="width: 30px">{{ question.key }} :</p>
          <p class="text-body-1 mb-6 ml-4" v-html="question.text"></p>
        </div>

        <!-- 回答範囲 -->
        <div class="d-flex justify-space-between mb-2 text-caption">
          <span>全く表れていない</span>
          <span>完全に表れている</span>
        </div>

        <!-- 小問 -->
        <v-sheet
          v-for="row in question.ans"
          :key="row.key"
          class="answer-grid pa-3 mb-3"
          rounded="lg"
          border
        >
          <v-row align="center">
            <v-col cols="12" sm="4" class="font-weight-bold">
              {{ row.label }}
            </v-col>

            <v-col cols="12" sm="8">
              <!-- 1～5の回答ボタン -->
              <v-btn-toggle
                :model-value="props.selectPoint[row.key]"
                color="primary"
                mandatory
                divided
                class="w-100"
                @update:model-value="(value) => selectAnswer(row.key, value)"
              >
                <v-btn v-for="n in 5" :key="n" :value="n" class="flex-grow-1">
                  {{ n }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-sheet>
      </v-card-text>
    </div>
    <!-- type:2-->
    <div v-if="question.type === 2" class="type2-question mb-10">
      <!-- 設問文 -->
      <div class="d-flex align-start mb-5 mt-10 w-75 mx-auto">
        <span class="font-weight-bold mr-2">{{ question.key }}.</span>
        <div v-html="question.text"></div>
      </div>

      <div class="answer-table">
        <!-- 回答尺度 -->
        <div class="answer-header">
          <div></div>
          <div class="text-center">
            {{ question.scaleLeft ?? "役立たない" }}
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div class="text-center">
            {{ question.scaleRight ?? "役立つ" }}
          </div>
        </div>

        <!-- 回答行 -->
        <div v-for="row in question.ans" :key="row.key" class="answer-row">
          <div class="answer-label">
            {{ row.label }}
          </div>

          <v-btn
            v-for="number in 5"
            :key="number"
            :variant="
              props.selectPoint[row.key] === number ? 'flat' : 'outlined'
            "
            :color="
              props.selectPoint[row.key] === number ? 'primary' : undefined
            "
            height="48"
            @click="emit('onClick', row.key, number)"
          >
            {{ number }}
          </v-btn>
        </div>
      </div>
    </div>
    <!-- type:3 単一選択形式 -->
    <div v-if="question.type === 3" class="mb-10">
      <!-- 設問文 -->
      <div class="d-flex align-start mb-6 mt-10 w-75 mx-auto">
        <span class="font-weight-bold mr-2"> {{ question.key }}. </span>

        <div v-html="question.text"></div>
      </div>

      <!-- q34など、回答保存先のキー -->
      <div
        v-for="row in question.ans"
        :key="row.key"
        class="d-flex justify-center ga-6"
      >
        <v-btn
          v-for="choice in question.choices ?? []"
          :key="choice.value"
          :variant="
            props.selectPoint[row.key] === choice.value ? 'flat' : 'outlined'
          "
          :color="
            props.selectPoint[row.key] === choice.value ? 'primary' : undefined
          "
          height="54"
          min-width="100"
          @click="selectAnswer(row.key, choice.value)"
        >
          {{ choice.value }}.{{ choice.label }}
        </v-btn>
      </div>
    </div>
    <!-- type:4 縦並びの単一選択 -->
    <div v-if="question.type === 4" class="type4-question mb-10">
      <!-- 設問文 -->
      <div class="d-flex align-start pa-5">
        <span class="font-weight-bold mr-3"> {{ question.key }}. </span>
        <div v-html="question.text"></div>
      </div>
      <v-divider />
      <!-- 回答欄 -->
      <div v-for="row in question.ans" :key="row.key" class="ml-10 mt-5">
        <RadioView
          :model-value="props.selectPoint[row.key]"
          :items="
            (question.choices ?? []).map((choice) => ({
              label: `${choice.value}. ${choice.label}`,
              value: choice.value,
            }))
          "
          @update:model-value="
            (value) =>
              selectAnswer(row.key, value === null ? undefined : Number(value))
          "
        />
      </div>
    </div>
    <!-- type:5 行動ごとの有効度 -->
    <div v-if="question.type === 5" class="mb-10">
      <!-- 設問文 -->
      <div class="d-flex align-start pa-5">
        <span class="font-weight-bold mr-3"> {{ question.key }}. </span>

        <div v-html="question.text"></div>
      </div>

      <!-- 行動ごとの回答 -->
      <div
        v-for="row in question.ans"
        :key="row.key"
        class="action-question mx-auto mb-10"
      >
        <div class="mb-4">
          <div v-if="row.label.includes('：')">
            <span class="font-weight-bold">
              {{ row.label.split("：")[0] }}：
            </span>
            <span>
              {{ row.label.split("：").slice(1).join("：") }}
            </span>
          </div>

          <div v-else>
            {{ row.label }}
          </div>
        </div>

        <!-- 評価の両端 -->
        <div class="d-flex justify-space-between mb-2 text-caption">
          <span>役に立たない</span>
          <span>役に立つ</span>
        </div>

        <!-- 1～5の回答 -->
        <v-btn-toggle
          :model-value="props.selectPoint[row.key]"
          color="primary"
          mandatory
          divided
          class="w-100"
          @update:model-value="(value) => selectAnswer(row.key, value)"
        >
          <v-btn
            v-for="number in 5"
            :key="number"
            :value="number"
            class="flex-grow-1"
            height="54"
          >
            {{ number }}
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>
    <!-- type:6 画像付き回答形式 -->
    <div v-if="question.type === 6" class="mb-10">
      <!-- 設問文 -->
      <div class="d-flex align-start pa-5">
        <span class="font-weight-bold mr-3"> {{ question.key }}. </span>
        <div v-html="question.text"></div>
      </div>

      <!-- メイン画像 -->
      <imgView :src="question.image" :max-width="260" class="mx-auto mb-8" />
      <div class="mx-auto w-100 pa-5" v-html="question.title"></div>
      <!-- 回答行 -->
      <div
        v-for="row in question.ans"
        :key="row.key"
        class="image-answer-row mx-auto mb-8"
      >
        <v-row align="center">
          <!-- 左：回答画像 -->
          <v-col cols="12" sm="3" class="text-center">
            <imgView
              v-if="row.image"
              :src="row.image"
              :max-width="260"
              class="mx-auto"
            />
          </v-col>

          <!-- 右：回答ボタン -->
          <v-col cols="12" sm="9">
            <div class="d-flex justify-space-between mb-2 text-caption">
              <span>役に立たない</span>
              <span>役に立つ</span>
            </div>

            <v-btn-toggle
              :model-value="props.selectPoint[row.key]"
              color="primary"
              mandatory
              divided
              class="w-100"
              @update:model-value="(value) => selectAnswer(row.key, value)"
            >
              <v-btn
                v-for="number in 5"
                :key="number"
                :value="number"
                class="flex-grow-1"
                height="52"
              >
                {{ number }}
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
</template>
<style scoped>
/* 回答行に薄い背景を付ける */
.answer-row {
  background-color: #fafafa;
}

/* 回答表全体 */
.answer-table {
  max-width: 80%;
  max-width: 900px;
  margin: 0 auto;
  overflow-x: auto;
}

/* 見出しと回答行を同じ列幅にする */
.answer-table {
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
}

.answer-header,
.answer-row {
  display: grid;
  grid-template-columns: 1.8fr repeat(5, 1fr);
  gap: 8px;
  align-items: center;
}

.answer-header {
  margin-bottom: 8px;
  font-size: 12px;
}

.answer-row {
  margin-bottom: 8px;
  background-color: #fafafa;
}

.answer-label {
  font-weight: 600;
  padding-left: 8px;
}

.answer-row .v-btn {
  width: 100%;
}

.answer-label {
  font-weight: 600;
}

/* v-html内の空欄を表示する */
:deep(.blank-box) {
  display: inline-block;
  width: 120px;
  height: 28px;
  margin: 0 6px;
  border: 1px solid #333;
  vertical-align: middle;
}
/* 行動と回答欄の表示幅 */
.action-question {
  width: 75%;
}
.image-answer-row {
  width: 100%;
  max-width: 760px;
}

/* スマホ */
@media (max-width: 600px) {
  .answer-table {
    width: 100%;
    padding: 0 12px;
  }

  .answer-header {
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
  }

  /* ラベル用の空列を消す */
  .answer-header > div:first-child {
    display: none;
  }

  .answer-row {
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    padding: 10px;
  }

  .answer-label {
    grid-column: 1 / -1;
    padding-left: 0;
    margin-bottom: 4px;
  }

  .answer-row .v-btn {
    min-width: 0;
    width: 100%;
  }
}
</style>
