<script setup lang="ts">
import { computed } from "vue";
import ComponentTextField from "../components/TextFieldView.vue";
import { useRoute } from "vue-router";
import { EXAMCOUNTTYPE } from "@/plugins/const";
import SelectFieldView from "./SelectFieldView.vue";

type Rule = (value: string) => true | string | Promise<true | string>;

type ValidationResult = string | boolean;
type RuleElement =
  | string
  | boolean
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)
  | [string, any, (string | undefined)?];

const route = useRoute();

const adaptedRules = computed<RuleElement[]>(() => {
  const r = props.rules as unknown;
  if (r == null) return [];
  return Array.isArray(r) ? (r as RuleElement[]) : [r as RuleElement];
});

interface Props {
  title?: string;
  text?: string;
  class?: string;
  hideDetails?: boolean | "auto";
  login_id?: string;
  person?: string;
  messages?: string;
  errormessage?: string;
  value?: string | number;
  type?: string;
  rules?: string | RuleElement[] | null;
  displayTextValue?: string;
  passwordFlag?: boolean;
  requriredIcon?: boolean;
  telSampleFlag?: boolean;
  maxlength?: number;
  color?: string;
  explaintext?: string;
  tooltipMessage?: string;
  tooltipflag?: boolean;
  modelValue?: string | number;
  examtype?: boolean;
  unexaminedCount?: number;
  registeredCount?: number;
  changeType?: "up" | "down";
}

const props = withDefaults(defineProps<Props>(), {
  color: "bg-primary",
  testcount: 0,
});

const emit = defineEmits<{
  (e: "onBlur", value: string, type: string): void;
  (e: "onKeyup", value: string, type: string): void;
  (e: "update:modelValue", value: string | number): void;
  (e: "onChangeType", value: "up" | "down"): void;
}>();
</script>
<template>
  <v-row no-gutters v-if="route.name === 'testEdit' && props.examtype">
    <v-col
      sm="3"
      class="border-sm d-flex align-center pa-4 pl-2"
      :class="props.color"
      >受検登録数 / 未受検者数
    </v-col>
    <v-col sm="9" class="pa-1 border-sm py-4 pl-4">
      {{ props.registeredCount }} 件 / {{ props.unexaminedCount ?? "-" }} 件
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm d-flex align-center pl-2"
      :class="props.color"
      >{{ props.title }}
      <span v-if="props.requriredIcon" class="text-red">*</span>
      <v-tooltip :text="props.tooltipMessage" v-if="props.tooltipflag">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">mdi-information</v-icon>
        </template>
      </v-tooltip>
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <div class="d-flex align-start ga-2">
        <div class="w-25">
          <ComponentTextField
            type="number"
            :min="0"
            :value="props.value"
            :text="props.text"
            density="compact"
            variant="outlined"
            :hideDetails="props.hideDetails"
            :messages="props.messages"
            :maxlength="props.maxlength"
            :rules="adaptedRules"
            @onBlur="emit('onBlur', $event, props.type ?? '')"
          />
          <div v-if="props.errormessage" class="text-error text-caption mt-1">
            {{ props.errormessage }}
          </div>
        </div>

        <SelectFieldView
          v-if="route.name === 'testEdit' && props.examtype"
          class="w-50"
          :items="
            Object.entries(EXAMCOUNTTYPE).map(([id, name]) => ({ id, name }))
          "
          :value="props.changeType"
          @onChange="(e) => emit('onChangeType', e as 'up' | 'down')"
        />
      </div>
    </v-col>
  </v-row>
</template>
