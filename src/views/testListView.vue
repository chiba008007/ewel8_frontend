<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import InfoAreaView from "@/components/InfoAreaView.vue";
import TestMenu from "@/components/TestMenu.vue";
import PartnerAdmin from "@/components/PartnerAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useRoute } from "vue-router";
import TestApiService from "@/services/TestApiService";
import pageClickMove from "@/plugins/pagemove";
import pankuzuMain from "@/components/pankuzuMain.vue";
import dayjs from "dayjs";
import { useStoreUser } from "@/store/user";
import { D_ADMIN, D_PARTNER, examStatusArray } from "@/plugins/const";
import ProgressView from "@/components/ProgressView.vue";
import TextFieldView from "@/components/TextFieldView.vue";
import "dayjs/locale/ja";
import SelectFieldView from "@/components/SelectFieldView.vue";
import DateView from "@/components/DateView.vue";

dayjs.locale("ja");
const move = pageClickMove();
const route = useRoute();
const user = useStoreUser();
const loadingFlag = ref(true);

const testheaders = ref([
  { title: "検査名", align: undefined, key: "campany" },
  { title: "実施期間", align: undefined, key: "examCount" },
  { title: "受検者数", align: undefined, key: "examCount" },
  { title: "処理数", align: undefined, key: "syoriCount" },
  { title: "残数", align: undefined, key: "zanCount" },
  { title: "機能", align: undefined, key: "method" },
]);

const partner_id =
  user.userdata.type === "customer"
    ? (user.userdata as userType).partner_id
    : user.getSession("partner_id");

const tmp = {
  user_id: route.params.id,
  partner_id: partner_id,
};
const testList = ref();

type userType = {
  id: string;
  type: "admin" | "partner" | "customer";
  partner_id?: number;
};

type userAny = {
  id: number;
  testname: string;
  startdaytime: string;
  enddaytime: string;
  testcount: number;
  zan: number;
  syori: number;
};
const type = (user.userdata as userType).type;

const fetchTestList = async () => {
  try {
    // 初期表示時に検査一覧を取得
    const res = await TestApiService.getTestList({
      user_id: route.params.id,
      partner_id: partner_id,
    });

    testList.value = res.data;
  } catch (e) {
    // APIエラー時の通知
    alert("param error" + e);
  } finally {
    // 成功・失敗どちらでもローディング終了
    loadingFlag.value = false;
  }
};

onMounted(() => {
  // 初期表示時にテーブルサイズを調整
  onResize();

  // 初期表示時に一覧取得
  fetchTestList();
  fetchExamList();
});

const tableHeight = ref(100);
const tableWidth = ref(500);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
  const wWidth = window.innerWidth;
  tableWidth.value = wWidth;
};

const tab = ref("tests");
const searchForm = ref({
  id: "",
  name: "",
  status: null as string | number | null,
  startDate: "",
  endDate: "",
  memo1: "",
  memo2: "",
});
const examStatusOptions = examStatusArray.filter((item) => item.id !== 0);

const filteredExamList = computed(() => {
  const f = appliedSearch.value;

  return examList.value.filter((exam) => {
    const status = !exam.started_at ? 0 : !exam.ended_at ? 1 : 2;
    return (
      (!f.id || exam.email?.includes(f.id)) &&
      (!f.name || exam.name?.includes(f.name)) &&
      (f.status == null ||
        Number(f.status) === 3 ||
        status === Number(f.status)) &&
      (!f.startDate ||
        (!!exam.ended_at && exam.ended_at.slice(0, 10) >= f.startDate)) &&
      (!f.endDate ||
        (!!exam.ended_at && exam.ended_at.slice(0, 10) <= f.endDate)) &&
      (!f.memo1 || exam.memo1?.includes(f.memo1)) &&
      (!f.memo2 || exam.memo2?.includes(f.memo2))
    );
  });
});

const appliedSearch = ref({ ...searchForm.value });

const onSearch = () => {
  appliedSearch.value = { ...searchForm.value };
  tab.value = "users";
};
const onSearchInput = (value: string, name: string) => {
  if (
    name === "id" ||
    name === "name" ||
    name === "status" ||
    name === "startDate" ||
    name === "endDate" ||
    name === "memo1" ||
    name === "memo2"
  ) {
    searchForm.value[name] = value;
  }
};

type ExamItem = {
  id: number;
  test_id: number;
  email: string;
  name: string | null;
  kana: string | null;
  gender: number;
  memo1: string | null;
  memo2: string | null;
  started_at: string | null;
  ended_at: string | null;
};

const examList = ref<ExamItem[]>([]);

const fetchExamList = async () => {
  const res = await TestApiService.getTestExamList({
    user_id: route.params.id,
    partner_id: partner_id,
  });
  examList.value = res.data;
};

const examHeaders = [
  { title: "番号", key: "no", sortable: false },
  { title: "ID", key: "email" },
  { title: "氏名", key: "name" },
  { title: "ふりがな", key: "kana" },
  { title: "生年月日", key: "birthdate" },
  { title: "検査名", key: "testname" },
  { title: "ステータス", key: "status" },
  { title: "メモ1", key: "memo1" },
  { title: "メモ2", key: "memo2" },
];
</script>
<template>
  <PartnerAdmin coded="customer" />
  <InfoAreaView />
  <v-row justify="center">
    <TestMenu />
  </v-row>

  <pankuzuMain
    :partnerhref="{ pageName: 'testList', href: 'testLists' }"
    :adminhref="{ pageName: 'testList', href: 'testLists' }"
  ></pankuzuMain>
  <ProgressView v-if="loadingFlag"></ProgressView>

  <v-tabs v-model="tab" class="mb-3">
    <v-tab value="tests">検査一覧</v-tab>
    <v-tab value="users">受検者一覧</v-tab>
  </v-tabs>
  <div class="search-area">
    <div class="font-weight-bold mb-2">■ 検査検索条件</div>

    <div class="search-grid">
      <div class="search-field">
        <label>ID：</label>
        <TextFieldView
          hide-details
          class="w-auto"
          @onKeyup="(value) => onSearchInput(value, 'id')"
        />
      </div>

      <div class="search-field">
        <label>氏名：</label>
        <TextFieldView
          hide-details
          @onKeyup="(value) => onSearchInput(value, 'name')"
        />
      </div>

      <div class="search-field">
        <label>ステータス：</label>
        <SelectFieldView
          :items="examStatusOptions"
          :value="searchForm.status"
          @onChange="(value) => (searchForm.status = value)"
        ></SelectFieldView>
      </div>

      <div class="search-field">
        <label>受検日：</label>
        <DateView
          v-model:value="searchForm.startDate"
          clearable
          @onClear="searchForm.startDate = ''"
        />
        ～
        <DateView
          v-model:value="searchForm.endDate"
          clearable
          @onClear="searchForm.endDate = ''"
        />
      </div>

      <div class="search-field">
        <label>メモ1：</label>
        <TextFieldView
          hide-details
          @onKeyup="(value) => onSearchInput(value, 'memo1')"
        />
      </div>

      <div class="search-field">
        <label>メモ2：</label>
        <TextFieldView
          hide-details
          @onKeyup="(value) => onSearchInput(value, 'memo2')"
        />
      </div>
      <ButtonView text="検索" color="primary" @click="onSearch()"></ButtonView>
    </div>
  </div>
  <v-window v-model="tab">
    <v-window-item
      value="tests"
      :transition="false"
      :reverse-transition="false"
    >
      <v-row v-resize="onResize">
        <v-col class="mt-0 pt-0">
          <v-data-table
            v-if="testList"
            :headers="testheaders"
            :items="testList"
            class="listable ma-2 dataTableStyle dataTestList"
            :height="tableHeight"
            fixed-header
            color="green"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="w-25">
                  <span v-if="type === D_PARTNER">{{
                    (item as userAny).testname
                  }}</span>
                  <a
                    v-else
                    class="text-link"
                    @click="
                      move.pageTestListModeParam(
                        'testExamList',
                        (item as userAny).id,
                        tmp.user_id
                      )
                    "
                    >{{ (item as userAny).testname }}</a
                  >
                </td>
                <td class="text-xs-right" nowrap>
                  {{
                    dayjs((item as userAny).startdaytime).format(
                      "YYYY/M/DD HH:mm"
                    )
                  }}～{{
                    dayjs((item as userAny).enddaytime).format(
                      "YYYY/M/DD HH:mm"
                    )
                  }}
                </td>
                <td class="text-right">{{ (item as userAny).testcount }}</td>
                <td class="text-right">{{ (item as userAny).syori }}</td>
                <td class="text-right">{{ (item as userAny).zan }}</td>
                <td class="text-center w-25" nowrap>
                  <ButtonView
                    v-if="type != D_PARTNER"
                    text="ID/QRコード"
                    class="text-caption mb-2"
                    color="success"
                    size="small"
                    target="_blank"
                    @click="
                      move.pageQRBlank(
                        'testQr',
                        (item as userAny).id.toString(),
                        tmp.user_id
                      )
                    "
                  ></ButtonView>
                  <ButtonView
                    text="追加更新"
                    class="text-caption mb-2 ml-2"
                    color="success"
                    size="small"
                    @click="
                      move.pageTestEdit('testEdit', {
                        id: tmp.user_id,
                        editid: (item as userAny).id,
                      })
                    "
                  ></ButtonView>
                  <ButtonView
                    v-if="type != D_PARTNER"
                    text="削除"
                    class="text-caption mb-2 ml-2"
                    color="red"
                    size="small"
                    @click="
                      move.pageTestEdit('testDelete', {
                        id: tmp.user_id,
                        editid: (item as userAny).id,
                      })
                    "
                  ></ButtonView>
                  <ButtonView
                    v-if="type === D_ADMIN"
                    text="複製"
                    class="text-caption mb-2 ml-2"
                    color="success"
                    size="small"
                    @click="
                      move.pageTestEdit('testCopy', {
                        id: tmp.user_id,
                        editid: (item as userAny).id,
                      })
                    "
                  ></ButtonView>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item
      value="users"
      :transition="false"
      :reverse-transition="false"
    >
      <v-data-table
        :headers="examHeaders"
        :items="filteredExamList"
        item-value="id"
        class="listable ma-2 dataTableStyle"
        fixed-header
      >
        <template v-slot:[`item.no`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.email`]="{ item }">
          {{ item.email }}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          {{
            item.ended_at ? dayjs(item.ended_at).format("YYYY/MM/DD") : "受検中"
          }}
        </template>
      </v-data-table>
    </v-window-item>
  </v-window>
</template>
<style lang="scss">
a.text-link {
  color: #0400ff;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: #00ff00;
    transition: 0.5s;
  }
}
.search-area {
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
}

.search-grid {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px 16px;
}

.search-field {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.search-field label {
  width: 110px;
  flex-shrink: 0;
}

.search-field > :not(label) {
  flex: 1;
  width: 100%;
  min-width: 0;
}
</style>
