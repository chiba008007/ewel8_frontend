<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import TextFieldView from "@/components/TextFieldView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import SwitchView from "@/components/SwitchView.vue";
import imgView from "@/components/imgView.vue";
import { d_Path, TAX_PER, BILLSENDFROM } from "@/plugins/const";
import TextAreaFieldView from "@/components/TextAreaFieldView.vue";
import { Core as YubinBangoCore } from "yubinbango-core2";
import BillApiService from "@/services/BillApiService";
import { useRouter, useRoute } from "vue-router";
import AlertView from "@/components/AlertView.vue";

const route = useRoute();
const id = route.params.id;

const router = useRouter();
const user = useStoreUser();

const licenseData = ref();
const error = ref();

// items生成（例：前年〜翌年まで）
// 現在の年を取得
const now = new Date();
const currentYear = now.getFullYear();
const yearItems = computed(() => {
  return [
    { id: currentYear - 1, name: `${currentYear - 1}年` },
    { id: currentYear, name: `${currentYear}年` },
    { id: currentYear + 1, name: `${currentYear + 1}年` },
  ];
});

// 現在年月を取得
const currentMonth = now.getMonth() + 1;
const monthItems = computed(() => {
  return Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    return { id: m, name: `${m}月` };
  });
});
// 現在日
const currentDay = now.getDate();
const dayItems = computed(() => {
  return Array.from({ length: 31 }, (_, i) => {
    const m = i + 1;
    return { id: m, name: `${m}日` };
  });
});

const form = ref({
  id: 0,
  post: "",
  post1: "",
  post2: "",
  address_1: "",
  address_2: "",
  company_name: "",
  busyo: "",
  yakusyoku: "",
  name: "",
  money: 0,
  title: "",
  pay_date: "",
  pay_date_y: currentYear,
  pay_date_m: currentMonth,
  pay_date_d: currentDay,
  pay_bank: "",
  pay_number: "",
  pay_name: "",
  bill_number: "",
  bill_date: "",
  bill_date_y: currentYear,
  bill_date_m: currentMonth,
  bill_date_d: currentDay,
  from_post: "",
  from_post1: BILLSENDFROM.from_post1,
  from_post2: BILLSENDFROM.from_post2,
  from_address_1: BILLSENDFROM.from_address_1,
  from_address_2: BILLSENDFROM.from_address_2,
  from_name: BILLSENDFROM.from_name,
  from_tel: BILLSENDFROM.from_tel,
  company_print_flag: true,
  tanto_print_flag: true,
  note: "",
  lists: [{}],
});

interface FormRow {
  title: string;
  name: string;
  kikaku: string;
  quantity: string;
  unit: string;
  money: string;
  totals: number;
}

const forms = ref<FormRow[]>([
  {
    title: "",
    name: "",
    kikaku: "",
    quantity: "",
    unit: "",
    money: "",
    totals: 0,
  },
]);
const getFormValue = (index: number, key: keyof FormRow) => {
  // forms[index] が未定義なら空文字を返す
  if (key == "money") {
    return Number(forms.value[index]?.[key]) ?? 0;
  } else {
    return forms.value[index]?.[key] ?? "";
  }
};

// フォームに保持するため一度キー毎初期化をする
const updateForm = <K extends keyof FormRow>(
  index: number,
  key: K,
  value: FormRow[K]
): void => {
  if (!forms.value[index]) {
    forms.value[index] = {
      title: "",
      name: "",
      kikaku: "",
      quantity: "",
      unit: "",
      money: "",
      totals: 0,
    };
  }
  forms.value[index][key] = value;
};

// 請求書保存
const onRegist = () => {
  if (!confirm("請求書の登録を行います。よろしいですか？")) {
    return false;
  }
  let data = form.value;
  data.bill_date =
    form.value.bill_date_y +
    "-" +
    form.value.bill_date_m +
    "-" +
    form.value.bill_date_d;

  data.pay_date =
    form.value.pay_date_y +
    "-" +
    form.value.pay_date_m +
    "-" +
    form.value.pay_date_d;
  data.id = Number(id);
  data.post = form.value.post1 + "-" + form.value.post2;
  data.from_post = form.value.from_post1 + "-" + form.value.from_post2;
  data.lists = forms.value;
  BillApiService.setTest(data).then((rlt) => {
    if (id) {
      sessionStorage.setItem("flashMessage", "更新が完了しました。");
      router.push({ name: "invoiceSetView", params: { id: id } });
    } else {
      sessionStorage.setItem("flashMessage", "保存が完了しました。");
      router.push({ name: "invoiceView" });
    }
  });
};
// リストの数
const loopCnt = ref(5);
const editRow = (type: "add" | "del") => {
  if (type == "add") {
    loopCnt.value = loopCnt.value + 1;
  }
  if (type == "del" && loopCnt.value > 1) {
    loopCnt.value = loopCnt.value - 1;
  }
};

// 金額計算
const moneyCalc = () => {
  let total = 0;
  forms.value.forEach((row) => {
    const quantity = Number(row.quantity) || 0;
    const money = Number(row.money) || 0;
    row.totals = quantity * money;
    total += quantity * money;
  });
  form.value.money = Math.floor(total * (1 + TAX_PER / 100));
};

// 住所自動入力
const fetchAddress = () => {
  const zipcode = (form.value.post1 + form.value.post2).replace(/[^0-9]/g, "");
  if (zipcode.length !== 7) return;
  try {
    new YubinBangoCore(form.value.post1 + form.value.post2, function (
      addr: any
    ) {
      form.value.address_1 = addr.region + addr.locality + addr.street;
    });
  } catch (e) {
    console.error("住所取得エラー:", e);
  }
};

// 情報取得
const businessNumber = ref();
const flashMessage = ref();
onMounted(async () => {
  const msg = sessionStorage.getItem("flashMessage");
  if (msg) {
    flashMessage.value = msg;
    sessionStorage.removeItem("flashMessage");
  }

  try {
    const response = await BillApiService.getData({
      id: id,
    });
    // idがあるときは編集用データ
    if (id) {
      form.value.post1 = response.data.data.post1;
      form.value.post2 = response.data.data.post2;
      form.value.address_1 = response.data.data.address_1;
      form.value.address_2 = response.data.data.address_2;
      form.value.company_name = response.data.data.company_name;
      form.value.busyo = response.data.data.busyo;
      form.value.yakusyoku = response.data.data.yakusyoku;
      form.value.name = response.data.data.name;
      form.value.money = Math.floor(response.data.data.money);
      form.value.title = response.data.data.title;
      form.value.pay_date_y = response.data.data.pay_date_y;
      form.value.pay_date_m = Number(response.data.data.pay_date_m);
      form.value.pay_date_d = Number(response.data.data.pay_date_d);
      form.value.pay_bank = response.data.data.pay_bank;
      form.value.pay_number = response.data.data.pay_number;
      form.value.pay_name = response.data.data.pay_name;
      form.value.bill_number = response.data.data.bill_number;
      form.value.bill_date_y = Number(response.data.data.bill_date_y);
      form.value.bill_date_m = Number(response.data.data.bill_date_m);
      form.value.bill_date_d = Number(response.data.data.bill_date_d);
      form.value.from_post1 = response.data.data.from_post1;
      form.value.from_post2 = response.data.data.from_post2;
      form.value.from_address_1 = response.data.data.from_address_1;
      form.value.from_address_2 = response.data.data.from_address_2;
      form.value.from_name = response.data.data.from_name;
      form.value.from_tel = response.data.data.from_tel;
      form.value.company_print_flag = response.data.data.company_print_flag;
      form.value.tanto_print_flag = response.data.data.tanto_print_flag;
      form.value.note = response.data.data.note;
      forms.value = response.data.data.lists;
    }
    form.value.bill_number = response.data.nextNumber;
    businessNumber.value = response.data.businessNumber;
  } catch (err) {
    error.value = err;
    console.error("取得失敗:", err);
  }
});
</script>
<template>
  <v-row justify="center">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin
    :pageName="user.billRowData"
    :pagehref="`invoiceView`"
    :pageName2="user.billCreate"
  ></pankuzuAdmin>
  <div v-show="flashMessage">
    <AlertView :text="flashMessage" type="success"></AlertView>
  </div>
  <v-container fluid>
    <div class="text-h5">{{ user.billCreate }}</div>
    <v-row class="mt-2">
      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="6" class="d-flex">
            <p class="pa-2">〒</p>
            <TextFieldView
              :maxlength="3"
              density="compact"
              name="post1"
              placeholder="000"
              :value="form.post1"
              @onKeyup="(e) => (form.post1 = e)"
            ></TextFieldView>
            <p class="pa-2">-</p>
            <TextFieldView
              :maxlength="4"
              density="compact"
              name="post2"
              placeholder="0000"
              :value="form.post2"
              @onKeyup="(e) => ((form.post2 = e), fetchAddress())"
            ></TextFieldView>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col>
            <TextFieldView
              name="address1"
              text="住所を入力してください。"
              :value="form.address_1"
              @onKeyup="(e) => (form.address_1 = e)"
            ></TextFieldView>
            <TextFieldView
              name="address2"
              text="番地・建物名を入力してください。"
              class="mt-2"
              :value="form.address_2"
              @onKeyup="(e) => (form.address_2 = e)"
            ></TextFieldView>
            <TextFieldView
              name="company_name"
              text="会社名を入力してください。"
              class="mt-2"
              :value="form.company_name"
              @onKeyup="(e) => (form.company_name = e)"
            ></TextFieldView>
            <TextFieldView
              name="busyo"
              text="部署名を入力してください。"
              class="mt-2 w-50"
              :value="form.busyo"
              @onKeyup="(e) => (form.busyo = e)"
            ></TextFieldView>
            <div class="d-flex">
              <TextFieldView
                name="yakusyoku"
                text="役職名を入力してください。"
                class="mt-2"
                :value="form.yakusyoku"
                @onKeyup="(e) => (form.yakusyoku = e)"
              ></TextFieldView>
              <TextFieldView
                name="name"
                text="名前を入力してください。"
                class="mt-2"
                :value="form.name"
                @onKeyup="(e) => (form.name = e)"
              ></TextFieldView>
              <p class="pa-2 mt-2">様</p>
            </div>
          </v-col>
        </v-row>
        <p class="mt-2">下記の通りご請求申し上げます。</p>
        <v-row no-gutters>
          <v-col cols="3" class="mt-4">請求金額</v-col>
          <v-col cols="9" class="d-flex">
            <TextFieldView
              name="money"
              text="請求金額"
              class="mt-2"
              :value="form.money"
              @onKeyup="(e) => (form.money = Number(e))"
            ></TextFieldView>
            <p class="mt-5">円</p>
          </v-col>
          <v-col cols="3" class="mt-4">件名</v-col>
          <v-col cols="9">
            <TextFieldView
              name="title"
              text="件名を入力してください。"
              class="mt-2"
              :value="form.title"
              @onKeyup="(e) => (form.title = e)"
            ></TextFieldView>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="3">御支払日</v-col>
          <v-col cols="9">
            <div class="d-flex">
              <SelectFieldView
                :items="yearItems"
                :text="form.pay_date_y + '年'"
                name="pay_date_y"
                @onChange="(e) => (form.pay_date_y = Number(e))"
              ></SelectFieldView>
              <SelectFieldView
                :items="monthItems"
                :text="form.pay_date_m + '月'"
                name="pay_date_m"
                @onChange="(e) => (form.pay_date_m = Number(e))"
              ></SelectFieldView>
              <SelectFieldView
                :items="dayItems"
                :text="form.pay_date_d + '日'"
                name="pay_date_d"
                @onChange="(e) => (form.pay_date_d = Number(e))"
              ></SelectFieldView>
            </div>
          </v-col>
          <v-col cols="3" class="mt-4">御振込先</v-col>
          <v-col cols="5">
            <TextFieldView
              name="pay_bank"
              text="銀行名を入力"
              class="mt-2"
              :value="form.pay_bank"
              @onKeyup="(e) => (form.pay_bank = e)"
            ></TextFieldView>
          </v-col>
          <v-col cols="4">
            <TextFieldView
              name="pay_number"
              text="口座番号"
              class="mt-2"
              :value="form.pay_number"
              @onKeyup="(e) => (form.pay_number = e)"
            ></TextFieldView>
          </v-col>
          <v-col cols="3" class="mt-4">口座名義</v-col>
          <v-col cols="9">
            <TextFieldView
              name="pay_name"
              text="口座名義を入力してください。"
              class="mt-2"
              :value="form.pay_name"
              @onKeyup="(e) => (form.pay_name = e)"
            ></TextFieldView>
          </v-col>
          <v-col cols="12">
            <p>※ 振込手数料は、貴社負担にてお願い申し上げます。</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row>
          <v-col cols="3" class="mt-3">請求No</v-col>
          <v-col cols="9">
            <TextFieldView
              name="bill_number"
              text="請求No"
              class="mt-2"
              :value="form.bill_number"
              @onKeyup="(e) => (form.bill_number = e)"
            ></TextFieldView>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="12">
            <div class="d-flex">
              <SelectFieldView
                :items="yearItems"
                name="bill_date_y"
                :text="form.bill_date_y"
                @onChange="(e) => (form.bill_date_y = Number(e))"
              ></SelectFieldView>
              <SelectFieldView
                :items="monthItems"
                name="bill_date_m"
                :text="form.bill_date_m"
                @onChange="(e) => (form.bill_date_m = Number(e))"
              ></SelectFieldView>
              <SelectFieldView
                :items="dayItems"
                name="bill_date_d"
                :text="form.bill_date_d"
                @onChange="(e) => (form.bill_date_d = Number(e))"
              ></SelectFieldView>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="6"> 適格請求書発行事業者番号 </v-col>
          <v-col cols="6"> {{ businessNumber }} </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="6" class="d-flex">
            <p class="pa-2">〒</p>
            <TextFieldView
              :maxlength="3"
              density="compact"
              name="from_post1"
              placeholder="000"
              :value="form.from_post1"
              @onKeyup="(e) => (form.from_post1 = e)"
            ></TextFieldView>
            <p class="pa-2">-</p>
            <TextFieldView
              :maxlength="4"
              density="compact"
              name="from_post2"
              placeholder="0000"
              :value="form.from_post2"
              @onKeyup="(e) => (form.from_post2 = e)"
            ></TextFieldView>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="12">
            <TextFieldView
              name="from_address_1"
              text="送付元の住所を入力してください。"
              class="mt-2"
              :value="form.from_address_1"
              @onKeyup="(e) => (form.from_address_1 = e)"
            ></TextFieldView>
          </v-col>
          <v-col cols="12">
            <TextFieldView
              name="from_address_2"
              text="送付元の番地・建物名を入力してください。"
              class="mt-2"
              :value="form.from_address_2"
              @onKeyup="(e) => (form.from_address_2 = e)"
            ></TextFieldView>
          </v-col>
          <v-col cols="12">
            <TextFieldView
              name="from_name"
              text="送付元の会社名を入力してください。"
              class="mt-2"
              :value="form.from_name"
              @onKeyup="(e) => (form.from_name = e)"
            ></TextFieldView>
          </v-col>
          <v-col cols="8">
            <TextFieldView
              name="from_tel"
              text="送付元の連絡先を入力してください。"
              class="mt-2"
              :value="form.from_tel"
              @onKeyup="(e) => (form.from_tel = e)"
            ></TextFieldView>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="6">
            <SwitchView
              :label="form.company_print_flag ? '社販あり' : '社販なし'"
              :model="form.company_print_flag ? true : false"
              @onChange="(e) => (form.company_print_flag = !!e)"
              name="company_print_flag"
            ></SwitchView>
            <div>
              <imgView
                v-show="form.company_print_flag"
                :src="d_Path + '/images/logo/innovation.gif'"
                :width="80"
              ></imgView>
            </div>
          </v-col>
          <v-col cols="6">
            <SwitchView
              :label="form.tanto_print_flag ? '担当印あり' : '担当印なし'"
              :model="form.tanto_print_flag ? true : false"
              @onChange="(e) => (form.tanto_print_flag = !!e)"
              name="tanto_print_flag"
            ></SwitchView>
            <div>
              <imgView
                v-show="form.tanto_print_flag"
                :src="d_Path + '/images/logo/sasaki.gif'"
                :width="60"
              ></imgView>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-end">
          <ButtonView
            text="行追加"
            density="compact"
            class="bg-success"
            @onClick="editRow('add')"
          ></ButtonView>
          <ButtonView
            text="行削除"
            density="compact"
            class="bg-purple ml-2"
            @onClick="editRow('del')"
          ></ButtonView>
        </div>
        <table class="w-100 bordered-table mt-2">
          <thead>
            <tr>
              <th class="bg-primary pa-2">No</th>
              <th class="bg-primary pa-2">品名</th>
              <th class="bg-primary pa-2">銘柄</th>
              <th class="bg-primary pa-2">規格</th>
              <th class="bg-primary pa-2">数量</th>
              <th class="bg-primary pa-2">単位</th>
              <th class="bg-primary pa-2">単価</th>
              <th class="bg-primary pa-2">金額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(n, index) in loopCnt" :key="index">
              <td class="ps-2">{{ n }}</td>
              <td class="ps-2">
                <TextFieldView
                  density="compact"
                  :value="getFormValue(index, 'title')"
                  @onKeyup="(e) => updateForm(index, 'title', e)"
                ></TextFieldView>
              </td>
              <td class="ps-2">
                <TextFieldView
                  density="compact"
                  :value="getFormValue(index, 'name')"
                  @onKeyup="(e) => updateForm(index, 'name', e)"
                ></TextFieldView>
              </td>
              <td class="ps-2">
                <TextFieldView
                  density="compact"
                  :value="getFormValue(index, 'kikaku')"
                  @onKeyup="(e) => updateForm(index, 'kikaku', e)"
                ></TextFieldView>
              </td>
              <td class="ps-2">
                <TextFieldView
                  density="compact"
                  :maxlength="2"
                  :value="getFormValue(index, 'quantity')"
                  @onKeyup="
                    (e) => (updateForm(index, 'quantity', e), moneyCalc())
                  "
                ></TextFieldView>
              </td>
              <td class="ps-2">
                <TextFieldView
                  density="compact"
                  :value="getFormValue(index, 'unit')"
                  @onKeyup="(e) => updateForm(index, 'unit', e)"
                ></TextFieldView>
              </td>
              <td class="ps-2">
                <TextFieldView
                  density="compact"
                  :value="
                    Number(getFormValue(index, 'money')) > 0
                      ? getFormValue(index, 'money')
                      : ''
                  "
                  @onKeyup="(e) => (updateForm(index, 'money', e), moneyCalc())"
                ></TextFieldView>
              </td>
              <td class="ps-2">
                <p v-if="getFormValue(index, 'totals') != 0">
                  {{ getFormValue(index, "totals").toLocaleString() }}
                </p>
                <p v-else>
                  {{
                    Number(forms[index]?.["money"]) > 0
                      ? Number(forms[index]?.["money"]) *
                        Number(forms[index]?.["quantity"])
                      : ""
                  }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        ※ 備考
        <TextAreaFieldView
          variant="outlined"
          :value="form.note"
          @onKeyup="(e) => (form.note = e)"
        ></TextAreaFieldView>
      </v-col>
    </v-row>
    <div class="mt-3">
      <ButtonView
        :text="id ? '更新' : '登録'"
        class="bg-primary w-25 mt-2"
        @onClick="onRegist()"
      ></ButtonView>
    </div>
  </v-container>
</template>
<style scoped lang="scss">
.bordered-table {
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
    text-align: center !important;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 50px;
  }

  th:nth-child(n + 5),
  td:nth-child(n + 5) {
    width: 100px;
    text-align: center;
  }
  th:nth-child(n + 7),
  td:nth-child(n + 7) {
    width: 120px;
    text-align: center;
  }
}
</style>
