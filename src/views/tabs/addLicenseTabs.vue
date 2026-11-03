<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import type { License } from "@/types/license";
import TextFieldView from "@/components/TextFieldView.vue";

const searchText = ref("");

const props = defineProps<{
  licenses: License[];
}>();

const matchesItem = (
  license: License,
  item: License["list"][number]
): boolean => {
  const keyword = searchText.value.trim().toLowerCase();

  if (!keyword) return true;

  return [license.text, license.code, item.text, item.code].some((v) =>
    v.toLowerCase().includes(keyword)
  );
};

const matchesLicense = (license: License): boolean => {
  const keyword = searchText.value.trim().toLowerCase();

  if (!keyword) return true;

  // ライセンス名・コードで検索
  if (
    [license.text, license.code].some((v) => v.toLowerCase().includes(keyword))
  ) {
    return true;
  }

  // 子ライセンスを検索
  return Object.values(license.list ?? {}).some((item) =>
    matchesItem(license, item)
  );
};

const emit = defineEmits<{
  (e: "license-input", code: string, value: number): void;
}>();

const changes = reactive<Record<string, string>>({});
const signs = reactive<Record<string, 1 | -1>>({});

// 現在総数を計算
const getTotal = (code: string, current: number): number => {
  const amount = Number(changes[code] || 0);
  return Math.max(0, current + (signs[code] ?? 1) * amount);
};
const inputVersions = reactive<Record<string, number>>({});

const onLicenseInput = (
  code: string,
  current: number,
  value: string = changes[code] ?? ""
) => {
  if (value !== "" && !/^\d+$/.test(value)) return;

  const sign = signs[code] ?? 1;
  const amount = Number(value || 0);

  if (!Number.isSafeInteger(amount)) return;

  const adjusted = sign === -1 ? Math.min(amount, current) : amount;

  changes[code] = value === "" ? "" : String(adjusted);
  emit("license-input", code, current + sign * adjusted);

  if (adjusted !== amount) {
    inputVersions[code] = (inputVersions[code] ?? 0) + 1;
  }
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
      :value="searchText"
      @onInput="(v) => (searchText = v)"
    />

    <p class="mt-2">
      ライセンスを登録する検査の登録数を入力してください。(半角数値)
    </p>
    <v-list
      v-for="license in licenses"
      :key="license.code"
      v-show="matchesLicense(license)"
    >
      <v-list-item>
        <v-list-item-title>
          {{ license.text }}（{{ license.code }}）
        </v-list-item-title>

        <v-row no-gutters>
          <v-col
            v-for="item in license.list"
            :key="item.code"
            cols="12"
            sm="6"
            md="4"
            class="pa-2"
            v-show="matchesItem(license, item)"
          >
            <div>{{ item.code }}</div>
            <div class="mb-2">
              現在総数：{{ getTotal(item.code, Number(item.value ?? 0)) }} 件
            </div>

            <div class="d-flex ga-2 align-start">
              <v-select
                :model-value="signs[item.code] ?? 1"
                :items="[
                  { title: '＋', value: 1 },
                  { title: '－', value: -1 },
                ]"
                density="compact"
                variant="outlined"
                hide-details
                style="max-width: 90px"
                @update:model-value="
                  (v) => {
                    signs[item.code] = Number(v) === -1 ? -1 : 1;
                    onLicenseInput(item.code, Number(item.value ?? 0));
                  }
                "
              />

              <TextFieldView
                :key="`${item.code}-${inputVersions[item.code] ?? 0}`"
                type="number"
                density="compact"
                variant="outlined"
                placeholder="変更件数"
                :value="changes[item.code] ?? ''"
                @onInput="
                  (v) => onLicenseInput(item.code, Number(item.value ?? 0), v)
                "
              />
            </div>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>
