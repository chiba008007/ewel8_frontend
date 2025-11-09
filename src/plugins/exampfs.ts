import { ref, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ExamApiService from "@/services/ExamApiService";
import ExamLogApiService from "@/services/ExamLogApiService";
import { AxiosResponse } from "axios";
import { useStoreUser } from "@/store/user";

export declare type LocationQueryValue = string | null;
const route = useRoute();
const questions = ref({
  question1: {},
  question2: {},
  question3: {},
  question4: {},
});
questions.value.question1 = [
  {
    key: 1,
    question1: "自分には人並み以上の知力がある",
    question2: "仲間とはいっしょに楽しい時間を過ごす",
  },
  {
    key: 2,
    question1: "自分が、なぜ、こんな気持ちになったのかを考えることが多い",
    question2: "やり直しを要求されても、その指摘が正しければ、進んでやり直す",
  },
  {
    key: 3,
    question1:
      "「怒っているな」とか「不快だな」としばしば感情を自覚するようにしている",
    question2: "窮地に立たされても、何とかなると思う",
  },
  {
    key: 4,
    question1: "将来、大きな仕事をしようと心に決めている",
    question2: "人の話をじっくり聞くことが得意である",
  },
  {
    key: 5,
    question1: "やり直しを要求されても、その指摘が正しければ、進んでやり直す",
    question2: "雰囲気を壊さずに自分の意見を明快に主張できる",
  },
  {
    key: 6,
    question1: "怒りや不快を顔にださず速やかに静められる",
    question2: "自分には人並み以上の知力がある",
  },
  {
    key: 7,
    question1: "微妙な表情や会話の間から相手の気持ちの変化を感じる",
    question2: "怒りや不快を顔にださず速やかに静められる",
  },
  {
    key: 8,
    question1: "仲間とはいっしょに楽しい時間を過ごす",
    question2: "微妙な表情や会話の間から相手の気持ちの変化を感じる",
  },
  {
    key: 9,
    question1: "人の話をじっくり聞くことが得意である",
    question2:
      "「怒っているな」とか「不快だな」としばしば感情を自覚するようにしている",
  },
  {
    key: 10,
    question1: "人の話をじっくり聞くことが得意である",
    question2:
      "「怒っているな」とか「不快だな」としばしば感情を自覚するようにしている",
  },
];
questions.value.question2 = [
  {
    key: 11,
    question1: "雰囲気を壊さずに自分の意見を明快に主張できる",
    question2: "将来、大きな仕事をしようと心に決めている",
  },
  {
    key: 12,
    question1: "私の意見は仲間に反映されることが多い",
    question2: "自分が、なぜ、こんな気持ちになったのかを考えることが多い",
  },
  {
    key: 13,
    question1: "自分の得意分野で勝負するように心がけている",
    question2: "顔をつぶさずに反対者を説き伏せる自信がある",
  },
  {
    key: 14,
    question1:
      "あせり・恐怖・喜び・悲しみなど、いつも自分の今の感情に名前をつけられる",
    question2: "すこし話をすると相手の好みや性格が把握できる",
  },
  {
    key: 15,
    question1: "自らのスキルを磨き、常に自分を向上させる",
    question2: "仲間を出し抜いて自分の手柄にしようとは思わない",
  },
  {
    key: 16,
    question1: "自分は成功するだけの能力がある",
    question2: "自らのスキルを磨き、常に自分を向上させる",
  },
  {
    key: 17,
    question1: "あせりや恐怖に打ち勝って冷静に行動できる",
    question2:
      "ハイキングや飲み会などの集まりを企画して仲間を喜ばせることが好き",
  },
  {
    key: 18,
    question1: "すこし話をすると相手の好みや性格が把握できる",
    question2: "人を引っ張っていく力がある",
  },
  {
    key: 19,
    question1: "失敗の恐れより、成功の喜びを期待して信じるほうだ",
    question2: "自分の得意分野で勝負するように心がけている",
  },
  {
    key: 20,
    question1: "人から悩みを相談されることが多い",
    question2: "失敗の恐れより、成功の喜びを期待して信じるほうだ",
  },
];
questions.value.question3 = [
  {
    key: 21,
    question1: "顔をつぶさずに反対者を説き伏せる自信がある",
    question2: "人から悩みを相談されることが多い",
  },
  {
    key: 22,
    question1:
      "ハイキングや飲み会などの集まりを企画して仲間を喜ばせることが好き",
    question2: "自分は成功するだけの能力がある",
  },
  {
    key: 23,
    question1: "人を引っ張っていく力がある",
    question2: "あせりや恐怖に打ち勝って冷静に行動できる",
  },
  {
    key: 24,
    question1: "仲間を出し抜いて自分の手柄にしようとは思わない",
    question2:
      "あせり・恐怖・喜び・悲しみなど、いつも自分の今の感情に名前をつけられる",
  },
  {
    key: 25,
    question1:
      "自分は本当はどうしたいのだろう、どんな気持ちなのだろうと、いつも考える",
    question2: "集団の中ではリーダーシップを発揮する",
  },
  {
    key: 26,
    question1: "私は自分が好きであり、肯定的に受け止めている",
    question2: "涙もろく、もらい泣きをするほうである",
  },
  {
    key: 27,
    question1: "かっとなったり、我を忘れて怒ったりしない",
    question2: "チームワークを大切にしている",
  },
  {
    key: 28,
    question1: "自分の弱点を知り、その点で強がらないようにしている",
    question2: "かっとなったり、我を忘れて怒ったりしない",
  },
  {
    key: 29,
    question1: "臨機応変に優先順位を変えながら楽しく課題をかたづける",
    question2: "気難しい客のいる店の接客の仕事も辛くない",
  },
  {
    key: 30,
    question1: "涙もろく、もらい泣きをするほうである。",
    question2: "理解できない説明には、ためらわず率直に質問する",
  },
];
questions.value.question4 = [
  {
    key: 31,
    question1: "私が頑張れば、必ず、状況を好転させられる",
    question2:
      "自分は本当はどうしたいのだろう、どんな気持ちなのだろうと、いつも考える",
  },
  {
    key: 32,
    question1: "気難しい客のいる店の接客の仕事も辛くない",
    question2: "臨機応変に優先順位を変えながら楽しく課題をかたづける",
  },
  {
    key: 33,
    question1: "集団の中ではリーダーシップを発揮する",
    question2: "本音と建前の違いを、私は素早く見抜いてしまう",
  },
  {
    key: 34,
    question1: "本音と建前の違いを、私は素早く見抜いてしまう",
    question2: "私は自分が好きであり、肯定的に受け止めている",
  },
  {
    key: 35,
    question1: "チームワークを大切にしている",
    question2: "私が頑張れば、必ず、状況を好転させられる",
  },
  {
    key: 36,
    question1: "理解できない説明には、ためらわず率直に質問する",
    question2: "自分の弱点を知り、その点で強がらないようにしている",
  },
];
const heads = ref([
  {
    label: "明確にA",
    value: 1,
  },
  {
    label: "どちらかというとA",
    value: 2,
  },
  {
    label: "どちらともいえない",
    value: 3,
  },
  {
    label: "どちらかというとB",
    value: 4,
  },
  {
    label: "明確にB",
    value: 5,
  },
]);
export default function () {
  const router = useRouter();
  const getPFS = (
    params: string | undefined,
    testparts_id: number | undefined
  ) => {
    const tmp = {
      params: params,
      testparts_id: testparts_id,
    };
    return ExamApiService.getPFS(tmp).then(function (rlt) {
      return (rlt as AxiosResponse).data;
    });
  };

  const onStart = (
    testparts_id: string | string[],
    params: LocationQueryValue | LocationQueryValue[],
    page: number | string | string[],
    selectPoint: object = {},
    code: string | undefined | null
  ) => {
    const user = useStoreUser();

    type TmpType = {
      testparts_id: string | string[];
      params: LocationQueryValue | LocationQueryValue[];
      page: string | number | string[];
      selectPoint: object;
      code?: string | null;
      tokenExam: object;
      [key: string]: any; // ← 動的プロパティを許可！
    };

    const tmp: TmpType = {
      testparts_id: testparts_id,
      params: params,
      page: page,
      selectPoint: selectPoint,
      code: code,
      tokenExam: user.userTokenExam,
    };
    const name = ref();
    if (parseInt(tmp.page.toString()) > 1) {
      name.value = "";
      if (page == 2) name.value = "examPfsTake2";
      if (page == 3) name.value = "examPfsTake3";
      if (page == 4) name.value = "examPfsTake4";
      if (page == 5) {
        name.value = "ExamPfsTakeFin";
        // 最後にテストを実施するときにexam_logテーブルにデータを登録しておく(毎回)
        tmp.status = 2;
        ExamLogApiService.set(tmp);
      }
      ExamApiService.editPFS(tmp).then(function (rlt) {
        if (rlt.data == "success") {
          router
            .replace({
              name: name.value,
              params: { testparts_id: testparts_id, page: page },
              query: { k: params },
            })
            .then(() => {
              window.location.reload();
            });
          return true;
        }
        return false;
      });
    } else {
      // 最初にテストを実施するときにexam_logテーブルにデータを登録しておく(毎回)
      tmp.status = 1;
      ExamLogApiService.set(tmp);
      ExamApiService.setPFS(tmp).then(function (rlt) {
        if (rlt.data == "success") {
          router
            .push({
              name: "examPfsTake",
              params: { testparts_id: testparts_id, page: page },
              query: { k: params },
            })
            .then(() => {
              window.location.reload();
            });
          return true;
        }

        return false;
      });
    }
  };
  const checkStatus = (
    testparts_id: number | string[] | string,
    k: string | LocationQueryValue | LocationQueryValue[]
  ) => {
    const tmp = {
      testparts_id: testparts_id,
    };
    ExamApiService.checkStatus(tmp).then(function (rlt: any) {
      if (!rlt.data) {
        return true;
      } else {
        router.push({
          name: "examList",
          query: { k: k },
        });
        return false;
      }
    });
  };
  return {
    onStart,
    questions,
    heads,
    getPFS,
    checkStatus,
  };
}
