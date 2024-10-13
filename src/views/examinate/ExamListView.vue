<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "@/components/ButtonView.vue";
import ComponentTextField from "@/components/TextFieldView.vue";
import ExamTitle from "@/components/ExamTitle.vue";

type exam = Array<{
  id: number;
  title: string;
  isComplete: boolean;
}>;

const tab = ref(1);
const examList = ref<exam>([]);
const answerList = ref({
  1: { value: 0 },
  2: { value: 0, comment: "" },
  3: { value: 0 },
  4: { value: 0 },
  5: { value: 0, comment: "" },
  6: { value: 0, comment: "" },
});
const validForm = ref(false);

// NOTE: サンプル検査データ
for (let i of [1, 2, 3]) {
  examList.value.push({
    id: i,
    title: `BA-J${i}`,
    isComplete: i === 3,
  });
}

const registerAnswer = () => {
  console.log(answerList.value);
};
</script>

<template>
  <ExamTitle
    :logo-src="require('@/assets/logo.png')"
    :customer-name="`test企業`"
    :exam-name="`test検査`"
  />

  <v-tabs v-model="tab" align-tabs="center" color="primary">
    <v-tab :value="1">検査一覧</v-tab>
    <v-tab :value="2">アンケート</v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item :value="1">
      <v-container>
        <div class="text-h6 mb-4">検査選択メニュー</div>
        <div class="mb-4 text-center">
          <div v-if="examList.some((exam) => exam.isComplete === false)">
            受検して頂く検査は{{ examList.length }}つです。<br />
            下記の検査名をクリックして検査をはじめて下さい。
          </div>
          <div v-else>
            すべての検査が完了しました。<br />
            おつかれさまでした。
          </div>
        </div>
        <div class="text-center mb-4">
          <v-btn
            v-for="exam in examList"
            :key="exam.id"
            color="primary"
            class="w-75 mb-2"
            :disabled="exam.isComplete"
            @click="exam.isComplete = true"
          >
            <span v-if="exam.isComplete" class="text-red mr-4">受検済み</span>
            {{ exam.title }}
          </v-btn>
        </div>
        <div class="text-center w-75 ma-auto">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/rxKmGgpWibc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen="true"
          ></iframe>
        </div>
      </v-container>
    </v-window-item>
    <v-window-item :value="2">
      <v-container>
        <div class="text-h6 mb-4">強み理解のアンケート</div>
        <div class="mb-4">
          以下は任意のアンケートです。ぜひ、ご協力頂けますと幸いです。<br />
          ※システム上個人は特定せず収集しております。
        </div>
        <v-form v-model="validForm">
          <div class="mb-4">
            <v-divider></v-divider>
            <p class="mt-4">
              あなたは、日々の業務の中で<span
                class="text-red border-b-lg border-error"
                >自分の強み</span
              >を意識していますか。
            </p>
            <v-radio-group
              class="pl-2"
              hideDetails="auto"
              v-model="answerList[1].value"
              :rules="[(v:number) => !!v || '必須項目です']"
            >
              <v-radio label="意識していない" :value="1"></v-radio>
              <v-radio label="あまり意識していない" :value="2"></v-radio>
              <v-radio label="少し意識している" :value="3"></v-radio>
              <v-radio label="意識している" :value="4"></v-radio>
            </v-radio-group>
          </div>

          <div
            class="mb-4"
            v-if="answerList[1].value == 3 || answerList[1].value == 4"
          >
            <v-divider></v-divider>
            <p class="mt-4">
              あなたの強みは、<span class="text-red border-b-lg border-error"
                >どのような強み</span
              >ですか。具体的教えてください。
            </p>
            <ComponentTextField
              density="compact"
              variant="outlined"
              messages="例：細かい書類作りが得意、企画やアイディアを出すことが得意 等"
              :rules="(v:string) => !v ? '必須項目です' : null"
              @onBlur="(val) => (answerList[2].comment = val)"
            ></ComponentTextField>
            <p class="mt-4">
              あなたは、日々の業務の中で<span
                class="text-red border-b-lg border-error"
                >自分の強みを活かす機会</span
              >に恵まれていますか。
            </p>
            <v-radio-group
              class="pl-2"
              hideDetails="auto"
              v-model="answerList[2].value"
              :rules="[(v:number) => !!v || '必須項目です']"
            >
              <v-radio label="恵まれていない" :value="1"></v-radio>
              <v-radio label="あまり恵まれていない" :value="2"></v-radio>
              <v-radio label="少し恵まれている" :value="3"></v-radio>
              <v-radio label="恵まれている" :value="4"></v-radio>
            </v-radio-group>
          </div>

          <div class="mb-4">
            <v-divider></v-divider>
            <p class="mt-4">
              あなたは、周囲の人が<span
                class="text-red border-b-lg border-error"
                >あなたの強みを認識している</span
              >と思いますか。
            </p>
            <v-radio-group
              class="pl-2"
              hideDetails="auto"
              v-model="answerList[3].value"
              :rules="[(v:number) => !!v || '必須項目です']"
            >
              <v-radio label="認識していない" :value="1"></v-radio>
              <v-radio label="あまり認識していない" :value="2"></v-radio>
              <v-radio label="少し認識している" :value="3"></v-radio>
              <v-radio label="認識している" :value="4"></v-radio>
            </v-radio-group>
          </div>

          <div class="mb-4">
            <v-divider></v-divider>
            <p class="mt-4">
              あなたは、周囲の人たちが<span
                class="text-red border-b-lg border-error"
                >どのような強みを持っているか</span
              >認識できていますか。
            </p>
            <v-radio-group
              class="pl-2"
              hideDetails="auto"
              v-model="answerList[4].value"
              :rules="[(v:number) => !!v || '必須項目です']"
            >
              <v-radio label="まったく認識できていない" :value="1"></v-radio>
              <v-radio label="あまり認識できていない" :value="2"></v-radio>
              <v-radio label="少し認識できている" :value="3"></v-radio>
              <v-radio label="認識できている" :value="4"></v-radio>
            </v-radio-group>
          </div>

          <div class="mb-4">
            <v-divider></v-divider>
            <p class="mt-4">
              周囲の人たちが<span class="text-red border-b-lg border-error"
                >どのような強みを持っているか</span
              >を認識する必要があると思いますか。
            </p>
            <v-radio-group
              class="pl-2"
              hideDetails="auto"
              v-model="answerList[5].value"
              :rules="[(v:number) => !!v || '必須項目です']"
            >
              <v-radio label="まったく必要ないと思う" :value="1"></v-radio>
              <v-radio label="あまり必要ないと思う" :value="2"></v-radio>
              <v-radio label="少し必要だと思う" :value="3"></v-radio>
              <v-radio label="必要だと思う" :value="4"></v-radio>
            </v-radio-group>
            <p class="mt-4">上記と答えた理由を教えてください。</p>
            <ComponentTextField
              density="compact"
              variant="outlined"
              :rules="(v:string) => !v ? '必須項目です' : null"
              @onBlur="(val) => (answerList[5].comment = val)"
            ></ComponentTextField>
          </div>

          <div class="mb-4">
            <v-divider></v-divider>
            <p class="mt-4">
              周囲の人たちがどのような強みを持っているか認識することは、<span
                class="text-red border-b-lg border-error"
                >あなたの業務上メリット</span
              >があると思いますか。
            </p>
            <v-radio-group
              class="pl-2"
              hideDetails="auto"
              v-model="answerList[6].value"
              :rules="[(v:number) => !!v || '必須項目です']"
            >
              <v-radio
                label="メリットはまったくないと思う"
                :value="1"
              ></v-radio>
              <v-radio label="メリットはあまりないと思う" :value="2"></v-radio>
              <v-radio label="メリットは少しあると思う" :value="3"></v-radio>
              <v-radio label="メリットはあると思う" :value="4"></v-radio>
            </v-radio-group>
            <p class="mt-4">上記と答えた理由を教えてください。</p>
            <ComponentTextField
              density="compact"
              variant="outlined"
              :rules="(v:string) => !v ? '必須項目です' : null"
              @onBlur="(val) => (answerList[6].comment = val)"
            ></ComponentTextField>
          </div>

          <v-divider></v-divider>
          <div class="mt-4 mb-4">
            アンケートは以上です。<br />
            ご協力ありがとうございました。
          </div>
          <div class="text-center">
            <ComponentButton
              text="アンケート登録"
              color="primary"
              @onClick="registerAnswer"
              :disabled="!validForm"
            />
          </div>
        </v-form>
      </v-container>
    </v-window-item>
  </v-window>
</template>
