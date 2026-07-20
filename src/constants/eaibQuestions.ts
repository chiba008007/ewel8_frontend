import eaibImage1 from "@/assets/exam/eaib/1.jpg";
import eaibImage2 from "@/assets/exam/eaib/2.jpg";
import eaibImage3 from "@/assets/exam/eaib/3.jpg";
import eaibMainImage from "@/assets/exam/eaib/13.jpg";
import eaibAnswerImage1 from "@/assets/exam/eaib/13_1.jpg";
import eaibAnswerImage2 from "@/assets/exam/eaib/13_2.jpg";
import eaibAnswerImage3 from "@/assets/exam/eaib/13_3.jpg";
import eaibAnswerImage4 from "@/assets/exam/eaib/13_4.jpg";
import eaibAnswerImage15 from "@/assets/exam/eaib/15.jpg";
import eaibAnswerImage16 from "@/assets/exam/eaib/16.jpg";
import eaibAnswerImage17 from "@/assets/exam/eaib/17.jpg";
import eaibAnswerImage18 from "@/assets/exam/eaib/18.jpg";
import eaibAnswerImage19 from "@/assets/exam/eaib/19.jpg";
import eaibAnswerImage20 from "@/assets/exam/eaib/20.jpg";
import eaibAnswerImage21 from "@/assets/exam/eaib/21.jpg";
import eaibAnswerImage33 from "@/assets/exam/eaib/33.jpg";
import eaibAnswerImage33_1 from "@/assets/exam/eaib/33_1.jpg";
import eaibAnswerImage33_2 from "@/assets/exam/eaib/33_2.jpg";
import eaibAnswerImage33_3 from "@/assets/exam/eaib/33_3.jpg";
import eaibAnswerImage34_1 from "@/assets/exam/eaib/34_1.jpg";
import eaibAnswerImage34_2 from "@/assets/exam/eaib/34_2.jpg";

// 設問の型
export type EAIBAnswerRow = {
  key: number; // 回答番号(q1, q2...)
  label: string; // a.幸せ
  image?: string;
};
export type EAIBChoice = {
  value: number;
  label: string;
};
export type EAIBQuestion = {
  key: number;
  type: number;
  code: string;
  image: string;
  text: string;
  title: string;
  ans: EAIBAnswerRow[];
  choices?: EAIBChoice[];
  scaleLeft?: string;
  scaleRight?: string;
};

const SECTION_A = "セクションA";
const SECTION_B = "セクションB";
const SECTION_C = "セクションC";
const SECTION_D = "セクションD";
const SECTION_E = "セクションE";
const SECTION_F = "セクションF";
const SECTION_G = "セクションG";
const SECTION_H = "セクションH";

const QUESTION_PATTERN_1 =
  "上の写真の表情に下記a～gの各感情が、<u>それぞれ</u>どの程度表れていると思いますか。各感情について、1～5の中で最もあてはまると思う番号を1つ選んで答えてください。";
const QUESTION_PATTERN_2 =
  "上の写真の人物が「変化前の表情」から「変化後の表情に変化しました。「変化後の表情」に下記のa～gの各感情が、<u>それぞれ</u>どの程度表れていると思いますか。各感情について、1～5の中で最もあてはまると思う番号を1つ選んで答えてください";
const QUESTION_PATTERN_3 =
  "次のそれぞれの質問について、最もあてはまると思う数字を1つ選んで答えてください。";
const QUESTION_PATTERN_4 =
  "次の各文章を読んで、その下に示したそれぞれの行動はどの程度役に立つでしょうか。最も適切な答えを1つ選んでください。";
const QUESTION_PATTERN_5 =
  "次の3コマの漫画を読んで、その下に示した<u>それぞれ</u>の対応はどの程度役に立つでしょうか。";
const QUESTION_PATTERN_6 =
  "風景写真に下記のA～Cの各感情が、<u>それぞれ</u>どの程度表れていると思いますか。<br />各感情について、１～５の中で最もあてはまると思う番号を１つ選んで答えてください。";
const QUESTION_PATTERN_7 =
  "次の各項目について、各々の感情を想像して、a～cのそれぞれに答えてください。もしその感情を想像できなくても、直感で答えてください。";
const QUESTION_PATTERN_8 =
  "次のそれぞれの質問に対して、最もあてはまるものを選んでください。";
const QUESTION_PATTERN_9 =
  "次のそれぞれの質問に対して、最もあてはまるものを①～⑤までの選択肢の中から1つ選んでください。";
const QUESTION_PATTERN_10 =
  "次のそれぞれの質問に対して、最もあてはまるものを選んでください。";

const answer_select = [
  "a. 幸せ",
  "b. 悲しみ",
  "c. 恐れ",
  "d. 怒り",
  "e. 嫌悪",
  "f. 驚き",
  "g. 軽蔑",
];
const answer_select_2 = ["怒り", "嫌悪", "驚き", "恐れ", "悲しみ"];

const choices_select = ["全く表れていない", "完全に表れている"];
const choices_select_2 = ["似ていない", "非常に似ている"];
// ページ番号ごとの設問
export const EAIB_QUESTIONS: Record<number, EAIBQuestion[]> = {
  1: [
    {
      key: 1,
      type: 1,
      code: SECTION_A,
      image: eaibImage1,
      text: QUESTION_PATTERN_1,
      title: "",
      ans: [
        { key: 1, label: answer_select[0] },
        { key: 2, label: answer_select[1] },
        { key: 3, label: answer_select[2] },
        { key: 4, label: answer_select[3] },
        { key: 5, label: answer_select[4] },
        { key: 6, label: answer_select[5] },
        { key: 7, label: answer_select[6] },
      ],
    },
  ],
  2: [
    {
      key: 2,
      type: 1,
      code: SECTION_A,
      image: eaibImage2,
      text: QUESTION_PATTERN_1,
      title: "",
      ans: [
        { key: 8, label: answer_select[0] },
        { key: 9, label: answer_select[1] },
        { key: 10, label: answer_select[2] },
        { key: 11, label: answer_select[3] },
        { key: 12, label: answer_select[4] },
        { key: 13, label: answer_select[5] },
        { key: 14, label: answer_select[6] },
      ],
    },
  ],
  3: [
    {
      key: 3,
      type: 1,
      code: SECTION_A,
      image: eaibImage3,
      text: QUESTION_PATTERN_2,
      title: "",
      ans: [
        { key: 15, label: answer_select[0] },
        { key: 16, label: answer_select[1] },
        { key: 17, label: answer_select[2] },
        { key: 18, label: answer_select[3] },
        { key: 19, label: answer_select[4] },
        { key: 20, label: answer_select[5] },
        { key: 21, label: answer_select[6] },
      ],
    },
  ],
  4: [
    {
      key: 1,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "あなたは、友人達と一緒に旅行に行く計画を立てています。しかし、少し治安の悪い地域に行こうという案が出たため、多少の不安を感じています。あなたが、不安であることを友人達に伝えるために、下の3つの気分はどの程度役に立つでしょうか。<br />a～cの気分（感情）<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 22, label: "a. 興奮" },
        { key: 23, label: "b. 驚き" },
        { key: 24, label: "c. 怒り" },
      ],
    },
    {
      key: 2,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "親友の結婚式の2次会を盛り上げるための催しを企画するときに、下の3つの気分はどの程度役に立つでしょうか。<br />a～cの気分（感情）<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 25, label: "a. 喜び" },
        { key: 26, label: "b. 退屈" },
        { key: 27, label: "c. 後悔" },
      ],
    },
    {
      key: 3,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "高校生であるAさんが、どこに進学しようか考えています。Aさんが、自分の望む進学先を見つけるために、下の3つの気分はどの程度役に立つでしょうか。<br />a～cの気分（感情）<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 28, label: "a. 喜び" },
        { key: 29, label: "b. 退屈" },
        { key: 30, label: "c. 後悔" },
      ],
    },
    {
      key: 4,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "とても複雑なプラモデルを失敗せずに作るために、下の3つの気分はどの程度役に立つでしょうか。a～cの気分（感情）<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 31, label: "a. 不安" },
        { key: 32, label: "b. 悲しみ" },
        { key: 33, label: "c. 落ち着いた気持ち" },
      ],
    },
  ],
  5: [
    {
      key: 5,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "Bさんは、アルバイト先で大失敗をしてしまいました。再び失敗を繰り返さないように、なぜ失敗したのかについて考え、改善点を見つけ出すために、下の3つの気分はどの程度役に立つでしょうか。<br />a～cの気分（感情）それぞれについて答えてください。",
      title: "",
      ans: [
        { key: 34, label: "a. 楽しさ" },
        { key: 35, label: "b. 恐れ" },
        { key: 36, label: "c. みじめさ" },
      ],
    },
    {
      key: 6,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "人を奮い立たせるような絵を上手く描くために、下の3つの気分はどの程度役に立つでしょうか。a～cの気分（感情）それぞれについて答えてください。",
      title: "",
      ans: [
        { key: 37, label: "a. 感傷" },
        { key: 38, label: "b. いらだち" },
        { key: 39, label: "c. 興奮" },
      ],
    },
    {
      key: 7,
      type: 3,
      code: SECTION_B,
      image: "",
      text: "あなたは熱さを感じています。それはまるで閉めきったコンテナの中で熱さが増しているような感じで、圧迫感さえ感じます。<br />選択肢の中であなたの感情に最も当てはまるものを選んでください。",
      title: "",
      ans: [{ key: 40, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: answer_select_2[0] },
        { value: 2, label: answer_select_2[1] },
        { value: 3, label: answer_select_2[2] },
        { value: 4, label: answer_select_2[3] },
        { value: 5, label: answer_select_2[4] },
      ],
    },
    {
      key: 8,
      type: 3,
      code: SECTION_B,
      image: "",
      text: "あなたはあるものに対し、強い不快感を抱いています。自分にとって胸の悪くなるようなものなので、それを遠ざけたいと思っています。<br />選択肢の中であなたの感情に最も当てはまるものを選んでください。",
      title: "",
      ans: [{ key: 41, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: answer_select_2[0] },
        { value: 2, label: answer_select_2[1] },
        { value: 3, label: answer_select_2[2] },
        { value: 4, label: answer_select_2[3] },
        { value: 5, label: answer_select_2[4] },
      ],
    },
  ],
  6: [
    {
      key: 1,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "他の感情と同じグループに属さない感情を選択してください。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 42, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "怒り" },
        { value: 2, label: "不満" },
        { value: 3, label: "激怒" },
        { value: 4, label: "みじめな" },
        { value: 5, label: "すべて同じグループに属する" },
      ],
    },
    {
      key: 2,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "他の感情と同じグループに属さない感情を選択してください。",
      title: "",
      ans: [{ key: 43, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "嫌悪" },
        { value: 2, label: "拒絶" },
        { value: 3, label: "ねたみ" },
        { value: 4, label: "反感" },
        { value: 5, label: "すべて同じグループに属する" },
      ],
    },
    {
      key: 3,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "他の感情と同じグループに属さない感情を選択してください。",
      title: "",
      ans: [{ key: 44, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "悲しみ" },
        { value: 2, label: "憂鬱（ゆううつ）" },
        { value: 3, label: "悩み" },
        { value: 4, label: "恐れ" },
        { value: 5, label: "すべて同じグループに属する" },
      ],
    },
    {
      key: 4,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Aさんは、友人が不正をするのを見て、社会的に許せないことだと感じました。友人に注意すると、「みんなやってるよ」と、当然だという表情で言われました。これら一連の出来事によってAさんは、 <span class='blank-box'></span>。<br />そこで、友人の不正を止めさせるための方法を考え、実行することにしました。",
      title: "",
      ans: [{ key: 45, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "激怒しました" },
        { value: 2, label: "怒りました" },
        { value: 3, label: "嫌悪感を感じました" },
        { value: 4, label: "憂鬱になりました" },
        { value: 5, label: "悲しみを感じました" },
      ],
    },
    {
      key: 5,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "都心で地震が起こり、電車が止まっています。Bさんは、「都心の学校に通っている子どもが、帰宅できなくなるのではないか」、と心配していましたが、電車の運行が再開されたことをニュースで知りました。その時、Bさんは、 <span class='blank-box'></span>を感じました。",
      title: "",
      ans: [{ key: 46, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "喜び" },
        { value: 2, label: "驚き" },
        { value: 3, label: "安堵感" },
        { value: 4, label: "不安" },
        { value: 5, label: "イライラ感" },
      ],
    },
  ],
  7: [
    {
      key: 6,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Cさんは、現在、家庭円満で、仕事にも満足しています。自分の給与についても特に不満もなく、同僚と比較しても良い方だと思っています。今日、上司との面談で、「Cさん、昨年の実績と周囲の評価を総合し、来年度から課長に昇格です。」と伝えられました。そのとき、Cさんは、<span class='blank-box'></span>を感じました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 47, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "驚きとショック" },
        { value: 2, label: "平和と和らいだ気持ち" },
        { value: 3, label: "満足感といい気分" },
        { value: 4, label: "謙虚な気持ちと罪の意識" },
        { value: 5, label: "誇りと優越感" },
      ],
    },
    {
      key: 7,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "学校の掃除の時間にさぼっていた学友が、先生に「自分もみんなと一緒にきちんと掃除しました」と言ったことに、Dさんはいらだちを感じました。学友がもう一度同じことをしたときに、Dさんは、<span class='blank-box'></span>を感じました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 48, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "怒り" },
        { value: 2, label: "憎しみ" },
        { value: 3, label: "強い憤り" },
        { value: 4, label: "非常に強い驚き" },
        { value: 5, label: "憂鬱さ" },
      ],
    },
    {
      key: 8,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Eさんは、人前で大失敗をしてしまいました。そのため、恥ずかしさを感じました。その後、Eさんは、<span class='blank-box'></span>。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 49, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "やりきれなくなりました" },
        { value: 2, label: "意気消沈しました" },
        { value: 3, label: "腹が立ってきました" },
        { value: 4, label: "感傷的になりました" },
        { value: 5, label: "不安になりました" },
      ],
    },
    {
      key: 9,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Fさんは、自分の恵まれた人生を振り返り、幸せを感じています。さらに、これまで人に喜んでもらったことなどを思い出すと、Fさんは、 <span class='blank-box'></span>を感じました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 50, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "驚き" },
        { value: 2, label: "安堵感" },
        { value: 3, label: "ゆううつさ" },
        { value: 4, label: "満足感" },
        { value: 5, label: "とても大きな驚き" },
      ],
    },
  ],
  8: [
    {
      key: 10,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Gさんは、経営していた企業が倒産し、これまでの人生で最大の喪失感を感じました。しかし、時間が経過するうちに少し喪失のショックから立ち直り、「この状況から何かしら得るものがあるはずだ。」と気づき、Gさんは、<span class='blank-box'></span>。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 51, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "とても驚きました" },
        { value: 2, label: "混乱しました" },
        { value: 3, label: "不安を感じました" },
        { value: 4, label: "希望をもちました" },
        { value: 5, label: "物思いに沈みました" },
      ],
    },
    {
      key: 11,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Hさんは、酔っていた友人に普段なら決して口にしないような言葉でからかわれ、不快に感じました。そこで、次の日に「いくら酔っていても、ひどすぎる」と素直に気持ちを伝えたところ、友人は「申し訳ない」と謝りました。しかし、その夜、また同じことを友人がしたとき、Hさんは、<span class='blank-box'></span>。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 52, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "怒りました" },
        { value: 2, label: "心配しました" },
        { value: 3, label: "非常に苛立ちました" },
        { value: 4, label: "恐れました" },
        { value: 5, label: "激怒しました" },
      ],
    },
    {
      key: 12,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Jさんは、高校で同じ部活に所属する同性の先輩のことが誰よりも好きでした。その先輩は、成績優秀なうえ、運動神経も抜群です。さらに、思いやりのある性格なので誰からも好かれており、欠点がまるでないように感じられました。Jさんは、<span class='blank-box'></span>。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 53, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "先輩を尊敬していました" },
        { value: 2, label: "先輩をうらやんでいました" },
        { value: 3, label: "先輩に夢中でした" },
        { value: 4, label: "先輩に嫉妬していました" },
        { value: 5, label: "先輩に憤りを感じました" },
      ],
    },
  ],
  9: [
    {
      key: 13,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Lさんは、「自分は、所属しているテニスサークルの仲間に受け入れられている」と感じて、安心していました。その後、<span class='blank-box'></span>ために、Lさんは憂鬱になりました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 54, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "サークルの友人の1人がけがをした" },
        {
          value: 2,
          label: "サークルの人たちが自分の悪口を言っているのを偶然耳にした",
        },
        { value: 3, label: "テニスの団体戦で試合に負けた" },
        {
          value: 4,
          label:
            "練習場の使用が困難になり、別の場所を探さなければならなくなった",
        },
        { value: 5, label: "サークル内の恋人が、別の異性と仲良くしていた" },
      ],
    },
    {
      key: 14,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Mさんは、親友からのメールを楽しみに待っていました。そして、メールが届きました。しかし、<span class='blank-box'></span>ために、Mさんは悲しくなりました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 55, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "メールに聞きたかったことが書かれていなかった" },
        {
          value: 2,
          label: "メールに自分の大好きな友人の悪口が書いてあった",
        },
        { value: 3, label: "メールの字が小さくて読みにくかった" },
        {
          value: 4,
          label: "メールの文末に「お返事下さいね」と書かれていた",
        },
        { value: 5, label: "メールが長文で読むのに時間がかかった" },
      ],
    },
    {
      key: 15,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "ある男性は、休日、自宅でくつろいでいました。その時、<span class='blank-box'></span>ために、男性は感心しました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 56, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "応募していた懸賞が当たった" },
        {
          value: 2,
          label:
            "電車のホームから線路に人が落ちて、周囲の人が協力して無事救出したと言う話を聞いた",
        },
        {
          value: 3,
          label: "あるアイデアが浮かび、そのおかげで困っていたことが解決した",
        },
        {
          value: 4,
          label: "以前から欲しかった絵画を落札して手に入れたことがわかった",
        },
        { value: 5, label: "心配していたセキが、かぜのせいだとわかった" },
      ],
    },
    {
      key: 16,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "ある女性は、これから起こることに期待していました。その後、<span class='blank-box'></span>ために、女性は愛を感じました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 57, label: "" }],
      // 表示する5つの選択肢
      choices: [
        {
          value: 1,
          label:
            "文通相手とはじめて会うことになり、どこに出かけようか、と考えた",
        },
        {
          value: 2,
          label: "学校のクラス替えで、仲の良い友達と同じクラスになった",
        },
        {
          value: 3,
          label: "誕生会に友達を招待したら、ほとんど全員が来た",
        },
        {
          value: 4,
          label: "誕生日に、両親からプレゼントをもらった",
        },
        {
          value: 5,
          label:
            "あまり気乗りのしないデートに出掛けたら、相手が理想的な異性であることがわかった",
        },
      ],
    },
  ],
  10: [
    {
      key: 17,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "気持ちが平常の状態から、恐れへの気持ちの変遷を表しているのは、下記の1～5の中でどれでしょうか。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 58, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "平常→疑い→注意深い→不安→神経質な→恐れ" },
        {
          value: 2,
          label: "平常→神経質な→不安→注意深い→疑い→恐れ",
        },
        { value: 3, label: "平常→不安→疑い→神経質な→注意深い→恐れ" },
        {
          value: 4,
          label: "平常→注意深い→神経質な→疑い→不安→恐れ",
        },
        { value: 5, label: "平常→注意深い→疑い→神経質な→不安→恐れ" },
      ],
    },
    {
      key: 18,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "気持ちが平常の状態から、愛への気持ちの変遷を表しているのは、下記の1～5の中でどれでしょうか。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 59, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "平常→好意→親しみ→受容→信頼→愛" },
        {
          value: 2,
          label: "平常→親しみ→好意→信頼→受容→愛",
        },
        { value: 3, label: "平常→親しみ→信頼→好意→受容→愛" },
        {
          value: 4,
          label: "平常→親しみ→受容→好意→信頼→愛",
        },
        { value: 5, label: "平常→好意→信頼→受容→親しみ→愛" },
      ],
    },
  ],
  11: [
    {
      key: 1,
      type: 5,
      code: SECTION_D,
      image: "",
      text: "Aさんは、近頃、急激に仕事量が増えたため、毎日締め切りに間に合うかどうか不安で心身共に疲れきっています。最近は、夜も眠れなくなり、とても悩んでいます。Aさんが少しでも悩みや不安を軽くするために、次のそれぞれの行動1～2はどのくらい役に立つでしょうか。",
      title: QUESTION_PATTERN_4,
      ans: [
        {
          key: 60,
          label: "行動1：仕事の内容や量と期日を整理することにした。",
        },
        {
          key: 61,
          label: "行動2：気持ちを落ち着かせるためのさまざまな手法を学んだ。",
        },
      ],
      choices: [],
    },
    {
      key: 2,
      type: 5,
      code: SECTION_D,
      image: "",
      text: "Bさんは、会議で部長と課長に対して発表をしました。課長には事前に発表内容を報告し、「上手くまとまっているね。問題ないよ」というコメントをもらっていたため、自信を持って発表に臨みました。しかし、部長からは、「内容が甘い。もっと考えてこい」と言われました。さらに、課長も部長と同様な発言をしたため、Bさんは、課長に対して、怒りを感じました。Bさんがこの怒りを静めるために、次のそれぞれの行動1～2はどのくらい役に立つでしょうか。",
      title: QUESTION_PATTERN_4,
      ans: [
        {
          key: 62,
          label:
            "行動1：どうして、課長がそのような発言したのかを考えることにした。",
        },
        {
          key: 63,
          label:
            "行動2：どうして、自分はこんなに怒りを感じるのか考えることにした。",
        },
      ],
      choices: [],
    },
  ],
  12: [
    {
      key: 3,
      type: 5,
      code: SECTION_D,
      image: "",
      text: "Cさんは、営業職です。上司から「営業目標を設定し、年度末に達成状況を報告するように」という指示がありました。Cさんは、高い目標を設定しましたが、同僚のDさんは楽をするために、目標を低く設定しました。結果として、CさんもDさんも目標を達成したのですが、会社では年度末の目標達成率だけで評価を行うため、Cさんの評価はDさんより低くなってしまいました。Cさんは、正当に評価されなかったことに対して、非常に強い憤りを感じました。Cさんがこの怒りを静めるために、次のそれぞれの行動1～2はどのくらい役に立つでしょうか。",
      title: QUESTION_PATTERN_4,
      ans: [
        {
          key: 64,
          label: "行動1：仕事の内容や量と期日を整理することにした。",
        },
        {
          key: 65,
          label: "行動2：気持ちを落ち着かせるためのさまざまな手法を学んだ。",
        },
      ],
      choices: [],
    },
    {
      key: 4,
      type: 5,
      code: SECTION_D,
      image: "",
      text: "Eさんは、学校の試験で大失敗したり、恋人に振られたりで、全てにおいてうまくいかず、気持ちが落ち込む日々が続いています。Eさんが落ち込んだ気分を少しでもよくするために、次の<u>それぞれ</u>の行動1～3はどのくらい役に立つでしょうか。",
      title: QUESTION_PATTERN_4,
      ans: [
        {
          key: 66,
          label:
            "行動1：しばらく会っていない友人に連絡をとり、今度会う約束をした",
        },
        {
          key: 67,
          label: "行動2：規則正しい生活を過ごし、健康に気を遣うようにした",
        },
        {
          key: 68,
          label: "行動3：ひとりで過ごす時間を多くとるようにした",
        },
      ],
      choices: [],
    },
  ],
  13: [
    {
      key: 1,
      type: 6,
      code: SECTION_D,
      image: eaibMainImage,
      text: QUESTION_PATTERN_5,
      title:
        "Fさんが不安を取り除くために、次のそれぞれの対応①～④はどのくらい役に立つでしょうか。<br />（対応③、④は次頁）",
      ans: [
        {
          key: 69,
          label: "",
          image: eaibAnswerImage1,
        },
        {
          key: 70,
          label: "",
          image: eaibAnswerImage2,
        },
      ],
      choices: [],
    },
  ],
  14: [
    {
      key: 2,
      type: 6,
      code: SECTION_D,
      image: eaibMainImage,
      text: QUESTION_PATTERN_5,
      title:
        "Fさんが不安を取り除くために、次のそれぞれの対応③～④はどのくらい役に立つでしょうか。",
      ans: [
        {
          key: 71,
          label: "",
          image: eaibAnswerImage3,
        },
        {
          key: 72,
          label: "",
          image: eaibAnswerImage4,
        },
      ],
      choices: [],
    },
  ],
  15: [
    {
      key: 1,
      type: 1,
      code: SECTION_E,
      image: eaibAnswerImage15,
      text: QUESTION_PATTERN_5,
      scaleLeft: choices_select[0],
      scaleRight: choices_select[1],
      title: "",
      ans: [
        { key: 73, label: "A. やすらぎ" },
        { key: 74, label: "B. 恐れ" },
        { key: 75, label: "C. 身をすくむ" },
      ],
      choices: [],
    },
  ],
  16: [
    {
      key: 2,
      type: 1,
      code: SECTION_E,
      image: eaibAnswerImage16,
      text: QUESTION_PATTERN_6,
      scaleLeft: choices_select[0],
      scaleRight: choices_select[1],
      title: "",
      ans: [
        { key: 76, label: "A. 寂しさ" },
        { key: 77, label: "B. いらだち" },
        { key: 78, label: "C. 孤独感" },
      ],
      choices: [],
    },
  ],
  17: [
    {
      key: 3,
      type: 1,
      code: SECTION_E,
      image: eaibAnswerImage17,
      text: QUESTION_PATTERN_6,
      scaleLeft: choices_select[0],
      scaleRight: choices_select[1],
      title: "",
      ans: [
        { key: 79, label: "A. あわれみ" },
        { key: 80, label: "B. うろたえ" },
        { key: 81, label: "C. 失望" },
      ],
      choices: [],
    },
  ],
  18: [
    {
      key: 4,
      type: 1,
      code: SECTION_E,
      image: eaibAnswerImage18,
      text: QUESTION_PATTERN_6,
      scaleLeft: choices_select[0],
      scaleRight: choices_select[1],
      title: "",
      ans: [
        { key: 82, label: "A. 疎外感" },
        { key: 83, label: "B. 安堵" },
        { key: 84, label: "C. 落ち着きのなさ" },
      ],
      choices: [],
    },
  ],
  19: [
    {
      key: 5,
      type: 1,
      code: SECTION_E,
      image: eaibAnswerImage19,
      text: QUESTION_PATTERN_6,
      scaleLeft: choices_select[0],
      scaleRight: choices_select[1],
      title: "",
      ans: [
        { key: 85, label: "A. 苦しみ" },
        { key: 86, label: "B. あわれみ" },
        { key: 87, label: "C. 不安" },
      ],
      choices: [],
    },
  ],
  20: [
    {
      key: 6,
      type: 1,
      code: SECTION_E,
      image: eaibAnswerImage20,
      text: QUESTION_PATTERN_6,
      scaleLeft: choices_select[0],
      scaleRight: choices_select[1],
      title: "",
      ans: [
        { key: 88, label: "A. あっ気にとられる" },
        { key: 89, label: "B. みじめさ" },
        { key: 90, label: "C. やすらぎ" },
      ],
      choices: [],
    },
  ],
  21: [
    {
      key: 7,
      type: 1,
      code: SECTION_E,
      image: eaibAnswerImage21,
      text: QUESTION_PATTERN_6,
      scaleLeft: choices_select[0],
      scaleRight: choices_select[1],
      title: "",
      ans: [
        { key: 91, label: "A. 孤独感" },
        { key: 92, label: "B. うろたえ" },
        { key: 93, label: "C. 恐れ" },
      ],
      choices: [],
    },
  ],
  22: [
    {
      key: 1,
      type: 2,
      code: SECTION_F,
      image: "",
      text: "卒業を控えた同性の親しい友人がいます。卒業前に、「一緒に旅行に行こう。」と誘われていたのですが、忙しくてすっかり忘れていたことに気づき、罪悪感を感じていると想像してください。その感じ（感覚）は、下の3つの感じ（感覚）にどれくらい似ているでしょうか。a～cの感じ（感覚）それぞれについて答えてください。",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      title: QUESTION_PATTERN_7,
      ans: [
        { key: 94, label: "A. 重い" },
        { key: 95, label: "B. 深い" },
        { key: 96, label: "C. 甘い" },
      ],
      choices: [],
    },
    {
      key: 2,
      type: 2,
      code: SECTION_F,
      image: "",
      text: "滞っていた仕事がやっと完了して、安心するとともに満足感を感じていると想像してください。その感じ（感覚）は、下の3つの感じ（感覚）にどれくらい似ているでしょうか。a～cの感じ（感覚）<u>それぞれ</u>について答えてください。",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      title: QUESTION_PATTERN_7,
      ans: [
        { key: 97, label: "A. 暖かい" },
        { key: 98, label: "B. 紫色の" },
        { key: 99, label: "C. 塩辛い" },
      ],
      choices: [],
    },
    {
      key: 3,
      type: 2,
      code: SECTION_F,
      image: "",
      text: "暑くて、せかせかして、やる気が起きないと想像してください。その感じは、下の3つの感じ（感覚）にどれくらい似ているでしょうか。a～cの感じ（感覚）それぞれについて答えてください。",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      title: QUESTION_PATTERN_7,
      ans: [
        { key: 100, label: "A. 挑発されている" },
        { key: 101, label: "B. 孤独である" },
        { key: 102, label: "C. 驚いている" },
      ],
      choices: [],
    },
  ],
  23: [
    {
      key: 4,
      type: 2,
      code: SECTION_F,
      image: "",
      text: "地味で、小さくて、暗い緑色を感じていると想像してください。その感じは、下の3つの感じ（感覚）にどれくらい似ているでしょうか。a～cの感じ（感覚）それぞれについて答えてください。",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      title: QUESTION_PATTERN_7,
      ans: [
        { key: 103, label: "A. 興奮している" },
        { key: 104, label: "B. ねたんでいる" },
        { key: 105, label: "C. 喜んでいる" },
      ],
      choices: [],
    },
    {
      key: 5,
      type: 2,
      code: SECTION_F,
      image: "",
      text: "明るくて、暑くて、潮風の香りがする感じを想像してください。その感じは、下の3つの感じ（感覚）にどれくらい似ているでしょうか。a～cの感じ（感覚）それぞれについて答えてください。",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      title: QUESTION_PATTERN_7,
      ans: [
        { key: 106, label: "A. 無力感" },
        { key: 107, label: "B. 恐れを感じている" },
        { key: 108, label: "C. 期待感" },
      ],
      choices: [],
    },
    {
      key: 6,
      type: 3,
      code: SECTION_F,
      image: "",
      text: "あなたは何もする気が起きません。いつも以上に疲れを感じ、食欲もありません。<br />選択肢の中であなたの気持ちに最も当てはまるものを選んでください。",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      title: QUESTION_PATTERN_7,
      ans: [
        {
          key: 109,
          label: "",
        },
      ],
      choices: [
        { value: 1, label: "怒り" },
        { value: 2, label: "嫌悪" },
        { value: 3, label: "驚き" },
        { value: 4, label: "恐れ" },
        { value: 5, label: "悲しみ" },
      ],
    },
  ],
  24: [
    {
      key: 1,
      type: 4,
      code: SECTION_G,
      image: "",
      title: QUESTION_PATTERN_8,
      text: "<span class='blank-box'></span>が強まると恐怖、弱まると混乱になります。",
      ans: [{ key: 110, label: "" }],
      choices: [
        { value: 1, label: "喜び" },
        { value: 2, label: "驚き" },
        { value: 3, label: "嫌悪" },
        { value: 4, label: "受容" },
        { value: 5, label: "期待" },
      ],
    },
    {
      key: 2,
      type: 4,
      code: SECTION_G,
      image: "",
      title: "",
      text: "受容と恐れの感情が結びつくと、<span class='blank-box'></span>になります。",
      ans: [{ key: 111, label: "" }],
      choices: [
        { value: 1, label: "愛" },
        { value: 2, label: "希望" },
        { value: 3, label: "優越" },
        { value: 4, label: "好奇心" },
        { value: 5, label: "服従" },
      ],
    },
    {
      key: 3,
      type: 4,
      code: SECTION_G,
      image: "",
      title: "",
      text: "受容と恐れの感情が結びつくと、<span class='blank-box'></span>になります。",
      ans: [{ key: 112, label: "" }],
      choices: [
        { value: 1, label: "期待" },
        { value: 2, label: "憎悪" },
        { value: 3, label: "楽観" },
        { value: 4, label: "失望" },
        { value: 5, label: "軽蔑" },
      ],
    },
    {
      key: 4,
      type: 4,
      code: SECTION_G,
      image: "",
      title: "",
      text: "<span class='blank-box'></span>が強まると驚愕、弱まると心配になります。",
      ans: [{ key: 113, label: "" }],
      choices: [
        { value: 1, label: "恐れ" },
        { value: 2, label: "怒り" },
        { value: 3, label: "受容" },
        { value: 4, label: "嫌悪" },
        { value: 5, label: "憤慨" },
      ],
    },
    {
      key: 5,
      type: 4,
      code: SECTION_G,
      image: "",
      title: "",
      text: "喜びと受容が結びつくと<span class='blank-box'></span>になります。",
      ans: [{ key: 114, label: "" }],
      choices: [
        { value: 1, label: "尊重" },
        { value: 2, label: "幸せ" },
        { value: 3, label: "興奮" },
        { value: 4, label: "崇拝" },
        { value: 5, label: "愛" },
      ],
    },
  ],
  25: [
    {
      key: 6,
      type: 4,
      code: SECTION_G,
      image: "",
      title: QUESTION_PATTERN_8,
      text: "<span class='blank-box'></span>が強まると憎悪、弱まるとうんざりになります。",
      ans: [{ key: 115, label: "" }],
      choices: [
        { value: 1, label: "怒り" },
        { value: 2, label: "混乱" },
        { value: 3, label: "嫌悪" },
        { value: 4, label: "後悔" },
        { value: 5, label: "悲しみ" },
      ],
    },
    {
      key: 7,
      type: 4,
      code: SECTION_G,
      image: "",
      title: QUESTION_PATTERN_8,
      text: "喜びと期待が結びつくと<span class='blank-box'></span>になります。",
      ans: [{ key: 116, label: "" }],
      choices: [
        { value: 1, label: "畏敬" },
        { value: 2, label: "楽観" },
        { value: 3, label: "心配" },
        { value: 4, label: "歓喜" },
        { value: 5, label: "崇拝" },
      ],
    },
    {
      key: 8,
      type: 4,
      code: SECTION_G,
      image: "",
      title: QUESTION_PATTERN_8,
      text: "恐れと驚きが結びつくと<span class='blank-box'></span>になります。",
      ans: [{ key: 117, label: "" }],
      choices: [
        { value: 1, label: "嫌悪" },
        { value: 2, label: "怒り" },
        { value: 3, label: "攻撃" },
        { value: 4, label: "恥辱" },
        { value: 5, label: "畏敬" },
      ],
    },
    {
      key: 9,
      type: 4,
      code: SECTION_G,
      image: "",
      title: QUESTION_PATTERN_8,
      text: "<span class='blank-box'></span>が強まると悲嘆、弱まると物思いになります。",
      ans: [{ key: 118, label: "" }],
      choices: [
        { value: 1, label: "期待" },
        { value: 2, label: "驚き" },
        { value: 3, label: "悲しみ" },
        { value: 4, label: "受容" },
        { value: 5, label: "警戒" },
      ],
    },
    {
      key: 10,
      type: 4,
      code: SECTION_G,
      image: "",
      title: QUESTION_PATTERN_8,
      text: "<span class='blank-box'></span>が強まると激怒、弱まるといらだちになる。",
      ans: [{ key: 119, label: "" }],
      choices: [
        { value: 1, label: "後悔" },
        { value: 2, label: "警戒" },
        { value: 3, label: "攻撃" },
        { value: 4, label: "怒り" },
        { value: 5, label: "畏敬" },
      ],
    },
  ],
  26: [
    {
      key: 11,
      type: 4,
      code: SECTION_G,
      image: "",
      title: QUESTION_PATTERN_10,
      text: "「意気阻喪（いきそそう）」の意味として最も適切なものはどれかでしょうか。",
      ans: [{ key: 120, label: "" }],
      choices: [
        { value: 1, label: "思いを晴らすことができない" },
        { value: 2, label: "元気をなくし、沈み込む" },
        { value: 3, label: "何をしてもうまくいかず、むなしい" },
        { value: 4, label: "気が晴れない" },
        { value: 5, label: "何もやる気が起こらない" },
      ],
    },
    {
      key: 12,
      type: 4,
      code: SECTION_G,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "「不遜（ふそん）」の意味として最も適切なものはどれでしょうか。",
      ans: [{ key: 121, label: "" }],
      choices: [
        { value: 1, label: "人をねたむ気持ち" },
        { value: 2, label: "びくびくした気持ち" },
        { value: 3, label: "思いあがっている気持ち" },
        { value: 4, label: "人を軽蔑する気持ち" },
        { value: 5, label: "人を信じない気持ち" },
      ],
    },
    {
      key: 13,
      type: 4,
      code: SECTION_G,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "心配と最も密接に結びつく感情は<span class='blank-box'></span>です。",
      ans: [{ key: 122, label: "" }],
      choices: [
        { value: 1, label: "愛、不安、驚き" },
        { value: 2, label: "驚き、誇り、怒り" },
        { value: 3, label: "受容、不安、期待" },
        { value: 4, label: "恐れ、喜び、驚き" },
        { value: 5, label: "不安、配慮、期待" },
      ],
    },
    {
      key: 14,
      type: 4,
      code: SECTION_G,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "悲しみ、罪悪感、そして後悔が結びつくと<span class='blank-box'></span>になります。",
      ans: [{ key: 123, label: "" }],
      choices: [
        { value: 1, label: "深い悲しみ" },
        { value: 2, label: "いらだたしさ" },
        { value: 3, label: "ゆううつな気分" },
        { value: 4, label: "深い後悔" },
        { value: 5, label: "みじめさ" },
      ],
    },
  ],
  27: [
    {
      key: 1,
      type: 5,
      code: SECTION_H,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "Aさんは、会社の仲の良い同僚であるBさんから、ある日突然「実は転職するんだ」と伝えられて、とても驚きました。最近、よそよそしさを感じていましたが、転職する予定があるとは全く知らなかったからです。次のそれぞれの対応1～2は、今後、AさんがBさんとの関係を保つのにどのくらい役に立つでしょうか。",
      ans: [
        {
          key: 124,
          label:
            "対応1：「Bさん、おめでとう。新しい職場でも頑張れよ」と伝えた。",
        },
        {
          key: 125,
          label: "対応2：ここへ2つ目の対応文を設定する。",
        },
      ],
      choices: [],
    },
    {
      key: 2,
      type: 5,
      code: SECTION_H,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "Cさんは、ある会社の課長です。ある日、部長から呼び出されました。そこで、「君の部下のD君は、営業もせずに毎日さぼってぶらぶらしているそうじゃないか。そのような社員がいると、部署全体のやる気が下がって困るよ」と言われました。Cさんが知っているD君は、仕事に対して前向きに取り組んでいたため、あまりにも違っていると感じました。しかし、部長が、「今後、D君の行動に改善が見られなければ、Cさんの降格も考える。」と強い口調で言ったため、怒りを感じました。次のそれぞれの対応1～2は、Cさんが、部長、Cさん、D君、3人の関係を改善するために、どのくらい役に立つでしょうか。",
      ans: [
        {
          key: 126,
          label:
            "対応1：「D君の行動が、自分の知っている行動とは違うのでショックを受けています。そのような行動を本当にD君が取っているのか調べさせてください。」と部長に伝えた。",
        },
        {
          key: 127,
          label:
            "対応2：なぜ、このようなうわさが流れているのかをD君に確認した。",
        },
      ],
      choices: [],
    },
  ],
  28: [
    {
      key: 3,
      type: 5,
      code: SECTION_H,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "Eさんは、現在の生活すべてに満足しています。やりがいのある職務に就き、職場の人間関係も上手くいっていますし、家庭も円満です。この生活が、いつまでも続けば良いと思っています。最近、友人や同僚、部下に、「自分の幸せな生活について自慢したい」、という気持ちが生じていました。次のそれぞれの対応1～2は、今後、Eさんが現在の良好な人間関係を保つために、どのくらい役に立つでしょうか。",
      ans: [
        {
          key: 128,
          label: "対応1：友人や同僚、部下の話を積極的に聞くようにした。",
        },
        {
          key: 129,
          label: "対応2：自分の正直な気持ちを家族に伝え、感謝をした。",
        },
      ],
      choices: [],
    },
    {
      key: 4,
      type: 5,
      code: SECTION_H,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "Fさんは、最近親がリストラで失業したため、自分で学費を稼ぎながら大学に通っています。仕事と学業の両立は体力的にきつく、ついに体調を崩してしまい、ある教科の課題レポートを期限までに提出できませんでした。すると、その科目の教授から「やる気がない者に単位をやるつもりはない。もう講義にも来ないでくれ。」と冷たく言われました。Fさんは、言いようのない怒りを感じました。次のそれぞれの対応1～3は、Fさんが、今後教授との関係を保つのにどのくらい役に立つでしょうか。",
      ans: [
        {
          key: 130,
          label: "対応1：教授と別れた後、友達や家族に怒りをぶつけた。",
        },
        {
          key: 131,
          label:
            "対応2：自分は教授に嫌われていると感じ、履修はあきらめることにした。",
        },
        {
          key: 132,
          label:
            "対応3：「わかりました。超特急でレポートを仕上げますので、先生見捨てないでくださいね。」と、ユーモアを交えて教授に伝えた。",
        },
      ],
      choices: [],
    },
  ],
  29: [
    {
      key: 5,
      type: 5,
      code: SECTION_H,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "Gさんは、課の会議で新しい企画を提案しました。その内容について、一部の指摘はあったものの、参加者から色々なアイデアが出て、和やかな雰囲気で会議が進んでいました。ところが、遅れてきた同僚のHさんが、開口一番「ぜんぜん駄目だよ。」と言ってきました。Hさんは、いつも何かと他人の企画に文句をつけることが多く、Gさんは怒りを感じました。次の<u>それぞれ</u>の対応1～3は、この後、Gさんが会議を建設的に進めるために、どのくらい役に立つでしょうか。",
      ans: [
        {
          key: 133,
          label: "対応1：友人や同僚、部下の話を積極的に聞くようにした。",
        },
        {
          key: 134,
          label: "対応2：自分の正直な気持ちを家族に伝え、感謝をした。",
        },
        {
          key: 135,
          label:
            "対応3：「他に意見はないですか。」と周りの人に意見を聞き、議論を進めることにした。",
        },
      ],
      choices: [],
    },
  ],
  30: [
    {
      key: 6,
      type: 5,
      code: SECTION_H,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "Kさんは、風邪を引いてしまいました。あまり待たないでいいように、会社の近くの病院を事前に予約してから行きました。予約時間少し前に病院に着き、受付を済ませて待っていると、予約時間を20分程過ぎてもなかなか呼ばれません。この後、別の予定があるため、看護師に確認したところ、予約が重なっていたため、知らないうちに診察の順番が遅くなっていたようです。突然の話にKさんは、怒りを感じました。次のそれぞれの対応1～3は、Kさんがなるべく早く診察してもらうのに、どのくらい役に立つでしょうか。",
      ans: [
        {
          key: 136,
          label:
            "対応1：「そんなことは、聞いていない。予約していたのだから早く診るべきだ。」と、看護師に怒鳴った。",
        },
        {
          key: 137,
          label:
            "対応2：自分にはこの後予定があることを伝え、できるだけ早く診てもらうことができないか看護師に相談することにした。",
        },
        {
          key: 138,
          label:
            "対応3：言ってもしょうがないと割り切って、黙って待つことにした。",
        },
      ],
      choices: [],
    },
  ],
  31: [
    {
      key: 1,
      type: 6,
      code: SECTION_H,
      image: eaibAnswerImage33,
      text: QUESTION_PATTERN_5,
      title:
        "Iさんが部長との人間関係を維持するために、次のそれぞれの返答①～④はどのくらい役に立つでしょうか。<br />（返答②、③は次頁）",
      ans: [
        {
          key: 139,
          label: "",
          image: eaibAnswerImage33_1,
        },
        {
          key: 140,
          label: "",
          image: eaibAnswerImage33_2,
        },
        {
          key: 141,
          label: "",
          image: eaibAnswerImage33_3,
        },
      ],
      choices: [],
    },
  ],
  32: [
    {
      key: 2,
      type: 6,
      code: SECTION_H,
      image: eaibAnswerImage33,
      text: QUESTION_PATTERN_5,
      title:
        "Lさんが部長との人間関係を維持するために、次のそれぞれの返答④～⑤がどのくらい役に立つでしょうか。",
      ans: [
        {
          key: 142,
          label: "",
          image: eaibAnswerImage34_1,
        },
        {
          key: 143,
          label: "",
          image: eaibAnswerImage34_2,
        },
      ],
      choices: [],
    },
  ],
};

// 回答の選択肢
export const EAIB_HEADS = [
  {
    label: "かなり当てはまる",
    value: 1,
  },
];
