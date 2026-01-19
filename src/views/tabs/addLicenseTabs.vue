<script setup lang="ts">
import type { PartnerForm } from "@/types/partner";
import type { License } from "@/types/license";
import TextFieldView from "@/components/TextFieldView.vue";

const props = defineProps<{
  licenses: License[];
}>();

const emit = defineEmits<{
  (e: "license-input", code: string, value: number): void;
}>();

const onLicenseInput = (code: string, value: string) => {
  emit("license-input", code, Number(value || 0));
};
</script>
<template>
  <p>パートナー企業情報を入力してください。</p>

  <div>
    <TextFieldView
      type="text"
      density="compact"
      variant="outlined"
      class="w-25"
      placeholder="ライセンス名を入力してください"
    />

    <p class="mt-2">
      ライセンスを登録する検査の登録数を入力してください。(半角数値)
    </p>
    <v-list v-for="license in licenses" :key="license.code">
      <v-list-item>
        <v-list-item-title>
          {{ license.text }}（{{ license.code }}）
        </v-list-item-title>

        <v-row no-gutters>
          <v-col
            v-for="item in license.list"
            :key="item.code"
            cols="2"
            class="pa-1"
          >
            {{ item.code }}

            <TextFieldView
              type="number"
              density="compact"
              variant="outlined"
              placeholder="0"
              :value="item.value"
              @onKeyup="(v) => onLicenseInput(item.code, v)"
            />
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>
