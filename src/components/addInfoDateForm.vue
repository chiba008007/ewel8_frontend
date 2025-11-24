<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, ref } from "vue";
import TextFieldView from "@/components/TextFieldView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import { monthArray, dayArray, timeArray, minuteArray } from "@/plugins/const";
import { zeroPadding, zeroZapress } from "@/plugins/validate";
import { informationType } from "@/types/informationType";
import { REQUIRED_MESSAGE } from "@/plugins/const";

type ValidationResult = string | boolean;
type RuleElement =
  | string
  | boolean
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)
  | [string, any, (string | undefined)?];

interface Props {
  title?: string;
  color?: string;
  rules?: string | RuleElement[];
  tooltipMessage?: string;
  tooltipflag?: boolean;
  start_year?: string;
  start_month?: string;
  start_day?: string;
  start_time?: string;
  start_hour?: string;
  end_year?: string;
  end_month?: string;
  end_day?: string;
  end_time?: string;
  end_hour?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "bg-primary",
});

const emit = defineEmits<{
  (e: "onUpdate", value: boolean, type: string): void;
  (e: "onClick", value: boolean, type: string): void;
  (e: "onBlur", value: string, name: string): void;
  (e: "onDateTime", value: string): void;
  (e: "onDateEndTime", value: string): void;
  (e: "onKeyup", value: string, key: keyof informationType): void;
}>();

const onKeyup = (value: string, key: keyof informationType) => {
  emit("onKeyup", value, key);
};
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm d-flex align-center pl-2"
      :class="props.color"
    >
      {{ props.title }}
      <v-tooltip :text="props.tooltipMessage" v-if="props.tooltipflag">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">mdi-information</v-icon>
        </template>
      </v-tooltip>
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <v-row no-gutters>
        <v-col cols="10">
          <p class="text-caption">【開始日付】</p>
          <div class="d-flex">
            <TextFieldView
              class="w-25"
              :maxlength="4"
              :value="props.start_year"
              :rules="[(v) => !!v || REQUIRED_MESSAGE]"
              @onKeyup="(e) => onKeyup(e, 'start_year')"
            />
            <span class="mt-3 text-caption">年</span>
            <SelectFieldView
              :items="monthArray"
              :text="props.start_month"
              class="w-25"
              :rules="[(v:string) => !!v || REQUIRED_MESSAGE]"
              @onChange="(e:string) => onKeyup(e, 'start_month')"
            /><span class="mt-3 text-caption">月</span>
            <SelectFieldView
              :items="dayArray"
              class="w-25"
              :text="props.start_day"
              :rules="[(v:string) => !!v || REQUIRED_MESSAGE]"
              @onChange="(e:string) => onKeyup(e, 'start_day')"
            /><span class="mt-3 text-caption">日</span>
            <SelectFieldView
              :items="timeArray"
              class="w-25"
              :text="props.start_hour"
              :rules="[(v:string) => (v !== null && v !== undefined && v !== '') || REQUIRED_MESSAGE]"
              @onChange="(e:string) => onKeyup(e, 'start_hour')"
            />
            <span class="mt-3 text-caption">時</span>
            <SelectFieldView
              :items="minuteArray"
              class="w-25"
              :text="props.start_time"
              :rules="[(v:string) => (v !== null && v !== undefined && v !== '') || REQUIRED_MESSAGE]"
              @onChange="(e:string) => onKeyup(e, 'start_time')"
            /><span class="mt-3 text-caption">分</span>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="10">
          <p class="text-caption">【終了日付】</p>

          <div class="d-flex">
            <TextFieldView
              class="w-25"
              :maxlength="4"
              :value="props.end_year"
              :rules="[(v:string) => !!v || REQUIRED_MESSAGE]"
              @onKeyup="(e) => onKeyup(e, 'end_year')"
            />
            <span class="mt-3 text-caption">年</span>
            <SelectFieldView
              :items="monthArray"
              class="w-25"
              :text="props.end_month"
              :rules="[(v:string) => !!v || REQUIRED_MESSAGE]"
              @onChange="(e:string) => onKeyup(e, 'end_month')"
            /><span class="mt-3 text-caption">月</span>
            <SelectFieldView
              :items="dayArray"
              class="w-25"
              :text="props.end_day"
              :rules="[(v:string) => !!v || REQUIRED_MESSAGE]"
              @onChange="(e:string) => onKeyup(e, 'end_day')"
            /><span class="mt-3 text-caption">日</span>
            <SelectFieldView
              :items="timeArray"
              class="w-25"
              :text="props.end_hour"
              :rules="[(v:string) => (v !== null && v !== undefined && v !== '') || REQUIRED_MESSAGE]"
              @onChange="(e:string) => onKeyup(e, 'end_hour')"
            /><span class="mt-3 text-caption">時</span>
            <SelectFieldView
              :items="minuteArray"
              class="w-25"
              :text="props.end_time"
              :rules="[(v:string) => (v !== null && v !== undefined && v !== '') || REQUIRED_MESSAGE]"
              @onChange="(e:string) => onKeyup(e, 'end_time')"
            /><span class="mt-3 text-caption">分</span>
          </div>
          <span class="text-red text-caption">{{ props.rules }}</span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
