<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, ref } from "vue";
import AddSwitchForm from "./addSwitchForm.vue";
import TextField from "@/components/TextFieldView.vue";
import ButtonView from "./ButtonView.vue";
import { settingStatus } from "@/plugins/const";
import getWeightMasterView from "./getWeightMasterView.vue";
const settingString = (type: boolean) => {
  return type ? settingStatus[1] : settingStatus[0];
};

interface Props {
  title?: string;
  editid?: number | string | string[];
  testcount?: number | string;
  model?: boolean;
  weightModel?: boolean;
  element?: object | any;
  dataDetail?: object | any;
  inputWeight?: string[];
  inputWeightMasterString?: string;
}
interface inputObj {
  [key: string]: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  editid: 0,
  testcount: 0,
});

const emit = defineEmits<{
  (e: "onKeyup", value: string, name: string | undefined): void;
  (e: "onBlur", value: string, name: string): void;
  (e: "onThree", value: boolean): void;
  (e: "onWeightFlag", value: boolean): void;
  (e: "onWeight", value: object): void;
  (e: "onStatus", value: boolean): void;
  (e: "setInputWeight", value: string): void;
}>();

const inputData: inputObj = {};
const onkeyup = (e: string, i: number) => {
  let n = i.toString();
  inputData[n] = e;
  emit("onWeight", inputData);
};
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
if (props.editid) {
  onClick(1);
}
const setInputWeight = (ev: string) => {
  emit("setInputWeight", ev);
};
</script>
<template>
  <v-card class="w-100" elevation="4" variant="outlined">
    <v-card-title class="text-h6">{{ props.title }}</v-card-title>
    <v-card-actions>
      <ButtonView
        text="利用しない"
        :variant="`outlined`"
        :class="bgcolor[0]"
        @onClick="onClick(0)"
        :readonly="props.editid ? true : false"
      ></ButtonView>
      <ButtonView
        text="利用する"
        :class="bgcolor[1]"
        :variant="`outlined`"
        @onClick="onClick(1)"
        :readonly="props.editid ? true : false"
      ></ButtonView>
      <p v-show="props.editid ? true : false" class="text-red">
        ※ データ更新時は変更不可となります。
      </p>
    </v-card-actions>
    <v-card-text>
      <v-row no-gutters>
        <v-col
          >受検者数:{{ props.testcount }}<span class="ml-2">人</span></v-col
        >
      </v-row>
      <v-row no-gutters>
        <v-col>
          <AddSwitchForm
            :label="settingString(props.model)"
            title="３要素を用いるストレス共生力算出"
            color="white border-none pl-2"
            class="border-none pl-0"
            :model="props.model"
            @onClick="(e) => emit('onThree', e)"
          ></AddSwitchForm>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <AddSwitchForm
            :label="settingString(props.weightModel)"
            :title="`重付け【` + props.title + `】`"
            color="white border-none pl-2"
            class="border-none pl-0"
            :model="props.weightModel"
            @onClick="(e) => emit('onWeightFlag', e)"
          ></AddSwitchForm>
        </v-col>
      </v-row>
      <v-row no-gutters v-show="props.editid === 0">
        <v-col cols="12">CSVファイルからデータ取得</v-col>
      </v-row>
      <v-row no-gutters v-show="props.editid === 0">
        <v-col cols="12">
          重みマスタからデータ取得<br />
          <getWeightMasterView
            :inputWeightMasterString="props.inputWeightMasterString"
            class="w-50"
            @onChange="(e) => setInputWeight(e)"
            :items="props.inputWeight"
          ></getWeightMasterView>
        </v-col>
      </v-row>

      <p class="text-caption text-red" v-show="props.editid === 0">
        重み付けを設定する場合は、各々数値を入力してください。入力する場合は、半角数字で入力してください。<br />
        既存の重み付けマスタ、csvファイルから取得することも可能です。<br />
        また、重み取得後、編集も可能です。
      </p>
      <v-row no-gutters class="mt-2">
        <v-col>
          <v-row class="mt-0" no-gutters>
            <v-col
              cols="2"
              v-for="val in props.element"
              :key="val.id"
              class="mt-1"
            >
              <div class="border-sm pa-1 bg-lime text-caption">
                <p style="overflow: hidden; white-space: nowrap">
                  {{ val.note }}
                </p>
              </div>
              <div v-if="editid" class="text-right pa-1 box">
                {{ props.dataDetail[`weight${val.id}`] }}
              </div>
              <TextField
                v-else
                :value="props.dataDetail[`weight${val.id}`]"
                type="number"
                step="0.001"
                class="text-caption"
                @onKeyup="(e) => onkeyup(e, val.id)"
              ></TextField>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<style lang="scss">
.box {
  border: 1px solid #ccc;
}
</style>
