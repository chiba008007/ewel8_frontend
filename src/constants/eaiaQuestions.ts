import eaiaImage1 from "@/assets/exam/eaia/1.jpg";
import eaiaImage2 from "@/assets/exam/eaia/2.jpg";
import eaiaImage3 from "@/assets/exam/eaia/3.jpg";

import eaiaMainImage from "@/assets/exam/eaia/13.jpg";
import eaiaMainImage15 from "@/assets/exam/eaia/15.jpg";
import eaiaMainImage16 from "@/assets/exam/eaia/16.jpg";
import eaiaMainImage17 from "@/assets/exam/eaia/17.jpg";
import eaiaMainImage18 from "@/assets/exam/eaia/18.jpg";
import eaiaMainImage19 from "@/assets/exam/eaia/19.jpg";
import eaiaMainImage20 from "@/assets/exam/eaia/20.jpg";
import eaiaAnswerImage1 from "@/assets/exam/eaia/13_1.jpg";
import eaiaAnswerImage2 from "@/assets/exam/eaia/13_2.jpg";
import eaiaAnswerImage3 from "@/assets/exam/eaia/13_3.jpg";
import eaiaAnswerImage4 from "@/assets/exam/eaia/13_4.jpg";
import eaiaAnswerImage15 from "@/assets/exam/eaia/15.jpg";
import eaiaAnswerImage16 from "@/assets/exam/eaia/16.jpg";
import eaiaAnswerImage17 from "@/assets/exam/eaia/17.jpg";
import eaiaAnswerImage18 from "@/assets/exam/eaia/18.jpg";
import eaiaAnswerImage19 from "@/assets/exam/eaia/19.jpg";
import eaiaAnswerImage20 from "@/assets/exam/eaia/20.jpg";
import eaiaAnswerImage21 from "@/assets/exam/eaia/21.jpg";
import eaiaAnswerImage33 from "@/assets/exam/eaia/33.jpg";
import eaiaAnswerImage33_1 from "@/assets/exam/eaia/33_1.jpg";
import eaiaAnswerImage33_2 from "@/assets/exam/eaia/33_2.jpg";
import eaiaAnswerImage33_3 from "@/assets/exam/eaia/33_3.jpg";
import eaiaAnswerImage34_1 from "@/assets/exam/eaia/34_1.jpg";
import eaiaAnswerImage34_2 from "@/assets/exam/eaia/34_2.jpg";

// 設問の型
export type EAIaAnswerRow = {
  key: number; // 回答番号(q1, q2...)
  label: string; // a.幸せ
  image?: string;
};
export type eaiaChoice = {
  value: number;
  label: string;
};
export type eaiaQuestion = {
  key: number;
  type: number;
  code: string;
  image: string;
  text: string;
  title: string;
  ans: EAIaAnswerRow[];
  choices?: eaiaChoice[];
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
  "上の写真の表情に下記a～gの各感情が、<u>それぞれ</u>どの程度表れていると思いますか。";
const QUESTION_PATTERN2_1 =
  "上の写真の表情に下記a～gの各感情が、<u>それぞれ</u>どの程度表れていると思いますか。<br />各感情について、1～5の中で最もあてはまると思う番号を1つ選んで答えてください。";
const QUESTION_PATTERN_2 =
  "上の写真の人物が「変化前の表情」から「変化後の表情に変化しました。「変化後の表情」に下記のa～gの各感情が、<u>それぞれ</u>どの程度表れていると思いますか。各感情について、1～5の中で最もあてはまると思う番号を1つ選んで答えてください";
const QUESTION_PATTERN_3 =
  "次のそれぞれの質問について、最もあてはまると思う数字を1つ選んで答えてください。";
const QUESTION_PATTERN_4 =
  "次の各文章を読んで、その下に示したそれぞれの行動はどの程度役に立つでしょうか。最も適切な答えを1つ選んでください。";
//const QUESTION_PATTERN_5 = "次の3コマの漫画を読んで、その下に示した<u>それぞれ</u>の対応はどの程度役に立つでしょうか。";
const QUESTION_PATTERN_5 =
  "この写真には、下のA～Cの<u>それぞれ</u>の感情がどの程度表現されていますか。すべての感情について、最もあてはまると思う番号を1つ選んで答えてください。";
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
export const EAIA_QUESTIONS: Record<number, eaiaQuestion[]> = {
  1: [
    {
      key: 1,
      type: 1,
      code: SECTION_A,
      image: eaiaImage1,
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
      image: eaiaImage2,
      text: QUESTION_PATTERN2_1,
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
      image: eaiaImage3,
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
      text: "親友の結婚式の2次会を盛り上げるための催しを企画するときに、下の3つの気分はどの程度役に立つでしょうか。a～cの気分（感情）<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 22, label: "a. 喜び" },
        { key: 23, label: "b. 退屈" },
        { key: 24, label: "c. 後悔" },
      ],
    },
    {
      key: 2,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "人を奮い立たせるような絵を上手く描くために、下の3つの気分はどの程度役に立つでしょうか。a～cの気分（感情）<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 25, label: "a. 感傷" },
        { key: 26, label: "b. いらだち" },
        { key: 27, label: "c. 興奮" },
      ],
    },
    {
      key: 3,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "とても複雑なプラモデルを失敗せずに作るために、下の3つの気分はどの程度役に立つでしょうか。a～cの気分（感情）<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 28, label: "a. 不安" },
        { key: 29, label: "b. 悲しみ" },
        { key: 30, label: "c. 落ち着いた気持ち" },
      ],
    },
    {
      key: 4,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "あなたは、今後のプロジェクトの進め方を決めるための会議の進行役です。<br />その会議中に、２人のメンバーが口論を始めました。プロジェクトの進捗の遅れを双方とも相手に責任があると思っているようです。<br />このままでは、会議の目的が達成されません。２人の口論を止め、この会議の目的を達成するため、会議の進行役であるあなたに、下の３つの気分はどの程度役に立つでしょうか。 a～cの気分（感情）それぞれについて答えてください",
      title: "",
      ans: [
        { key: 31, label: "a. 楽しみ" },
        { key: 32, label: "b. 落ち着いた気持ち" },
        { key: 33, label: "c. 悲しみ" },
      ],
    },
  ],
  5: [
    {
      key: 5,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "部長は、他の企業で成功事例のある新しい目標管理の手法を、自社でも取り入れることにしました。しかし、実際に取り入れた場合、部下が混乱する可能性があるため、多少の不安を感じています。部長が、自信を持って新しい目標管理の手法を導入するために、下の３つの気分はどの程度役に立つでしょうか。a～cの気分（感情）<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 34, label: "a. 悲しみ" },
        { key: 35, label: "b. 恐れ" },
        { key: 36, label: "c. 怒り" },
      ],
    },
    {
      key: 6,
      type: 2,
      code: SECTION_B,
      image: "",
      text: "学生であるAさんが、就職先を探しています。Aさんが、自分の望む就職先を見つけるために、下の３つの気分はどの程度役に立つでしょうか。a～cの気分（感情）それぞれについて答えてください。",
      title: "",
      ans: [
        { key: 37, label: "a. 悲しみ" },
        { key: 38, label: "b. 喜び" },
        { key: 39, label: "c. 憎しみ" },
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
      text: "あなたは強い不快感を抱いています。そのものが自分にとって胸の悪くなるようなものなので、それを遠ざけたいと思っています。選択肢の中であなたの感情に最も当てはまるものを選んでください。",
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
      text: "Aさんは、人前で大失敗をしてしまいました。そのため、恥ずかしさを感じました。その後、Aさんは、<span class='blank-box'></span>。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 42, label: "" }],
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
      key: 2,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Bさんは、自分の恵まれた人生を振り返り、幸せを感じています。さらに、これまで人に喜んでもらったことなどを思い出すと、Bさんは、<span class='blank-box'></span>を感じました。",
      title: "",
      ans: [{ key: 43, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "驚き" },
        { value: 2, label: "安堵感" },
        { value: 3, label: "ゆううつさ" },
        { value: 4, label: "満足感" },
        { value: 5, label: "とても大きな驚き" },
      ],
    },
    {
      key: 3,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Cさんは、経営していた企業が倒産し、これまでの人生で最大の喪失感を感じました。しかし、時間が経過するうちに少し喪失のショックから立ち直り、この状況から何かしら得るものがあるはずだ、と気づき、Cさんは、<span class='blank-box'></span>。",
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
      text: "Eさんは、現在、家庭円満で、仕事にも満足しています。自分の給与についても特に不満もなく、同僚と比較しても良い方だと思っています。今日、上司との面談で、「Eさん、昨年の実績と周囲の評価を総合し、来年度から課長に昇格です」と伝えられました。そのとき、Eさんは、 <span class='blank-box'></span>を感じました。",
      title: "",
      ans: [{ key: 45, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "驚きとショック" },
        { value: 2, label: "平和と和らいだ気持ち" },
        { value: 3, label: "満足感といい気分" },
        { value: 4, label: "謙虚な気持ちと罪の意識" },
        { value: 5, label: "誇りと優越感" },
      ],
    },
  ],
  7: [
    {
      key: 5,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Fさんは、高校で同じ部活に所属する同性の先輩のことが誰よりも好きでした。<br />その先輩は、成績優秀なうえ、運動神経も抜群です。さらに、思いやりのある性格なので誰からも好かれており、欠点がまるでないように感じられました。Fさんは、<span class='blank-box'></span>を感じました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 46, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "先輩を尊敬していました" },
        { value: 2, label: "先輩をうらやんでいました" },
        { value: 3, label: "先輩に夢中でした" },
        { value: 4, label: "先輩に嫉妬していました" },
        { value: 5, label: "先輩に憤りを感じました" },
      ],
    },
    {
      key: 6,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Gさんは、学校の掃除の時間にさぼっていた学友が、先生に「自分もみんなと一緒にきちんと掃除しました」と言ったことにいらだちを感じました。学友がもう一度同じことをしたときに、Gさんは、<span class='blank-box'></span>を感じました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 47, label: "" }],
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
      key: 7,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Jさんは、酔っていた友人に、普段なら決して口にしないような言葉でからかわれました。<br />Jさんは、不快感を感じました。そこで、次の日、「いくら酔っていても、ひどすぎる」と、素直に気持ちを伝えたところ、友人は「申し訳ない」と謝りました。にもかかわらず、その夜、また同じことを友人がしたとき、Jさんは、<span class='blank-box'></span>。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 48, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "怒りました" },
        { value: 2, label: "心配しました" },
        { value: 3, label: "非常に苛立ちました" },
        { value: 4, label: "恐れました" },
        { value: 5, label: "激怒しました" },
      ],
    },
  ],
  8: [
    {
      key: 8,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Lさんは、「自分は、所属しているテニスサークルの仲間に受け入れられている」と感じて、安心していました。その後、<span class='blank-box'></span>ために、Lさんは、憂鬱になりました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 49, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "サークルの友人の１人がけがをした" },
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
      key: 9,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Mさんは、親友からのメールを楽しみに待っていました。そして、メールが届きました。しかし、<span class='blank-box'></span>ために、Mさんは、悲しいと感じました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 50, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "メールに聞きたかったことが書かれていなかった" },
        { value: 2, label: "メールに自分の大好きな友人の悪口が書いてあった" },
        { value: 3, label: "メールの字が小さくて読みにくかった" },
        { value: 4, label: "メールの文末に「お返事下さいね」と書かれていた" },
        { value: 5, label: "メールが長文で読むのに時間がかかった" },
      ],
    },
    {
      key: 10,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "ある男性は、休日、自宅でくつろいでいました。その時、<span class='blank-box'></span>ために、男性は、感心しました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 51, label: "" }],
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
      key: 11,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "ある女性は、これから起こることに期待していました。その後、<span class='blank-box'></span>ために、女性は愛を感じました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 52, label: "" }],
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
  9: [
    {
      key: 12,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "気持ちが平常の状態から、恐れへの気持ちの変遷を表しているのは、下記の①～⑤の中でどれでしょうか。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 53, label: "" }],
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
      key: 13,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "気持ちが平常の状態から、愛への気持ちの変遷を表しているのは、下記の①～⑤の中でどれでしょうか。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 54, label: "" }],
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
  10: [
    {
      key: 14,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "他の感情と同じグループに属さない感情を選択してください。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 55, label: "" }],
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
      key: 15,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "他の感情と同じグループに属さない感情を選択してください。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 56, label: "" }],
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
      key: 16,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "他の感情と同じグループに属さない感情を選択してください。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 57, label: "" }],
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
      key: 17,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "Tさんは、同僚が不正をするのを見て、社会的に許せないことだと感じました。同僚に注意すると、「みんなやってるよ」と、当然だという表情で言われました。これら一連の出来事によってTさんは、<span class='blank-box'></span>そこで、同僚の不正を止めさせるための方法を考え、実行することにしました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 58, label: "" }],
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
      key: 18,
      type: 4,
      code: SECTION_C,
      image: "",
      text: "都心で地震が起こり、電車が止まっています。Kさんは、「都心の学校に通っている子どもが、帰宅できなくなるのではないか」、と心配していましたが、電車の運行が再開されたことをニュースで知りました。その時、Kさんは、<span class='blank-box'></span>を感じました。",
      title: QUESTION_PATTERN_3,
      ans: [{ key: 59, label: "" }],
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
  11: [
    {
      key: 1,
      type: 5,
      code: SECTION_D,
      image: "",
      text: "Aさんは、会議で部長と課長に対して、発表をしました。発表内容について、課長からは、事前に、「上手くまとまっているね。問題ないよ」というコメントをもらっていたため、自信を持って発表に臨みました。しかし、部長からは、「内容が甘い。もっと考えてこい」と言われました。さらに、課長も部長と同様な発言をしたため、Aさんは、課長に対して、怒りを感じました。Aさんが、この怒りを静めるために、次の<u>それぞれ</u>の行動１～２はどのくらい役に立つでしょうか。",
      title: QUESTION_PATTERN_4,
      ans: [
        {
          key: 60,
          label:
            "行動1：どうして、課長がそのような発言したのかを考えることにした。",
        },
        {
          key: 61,
          label:
            "行動2：どうして、自分はこんなに怒りを感じるのか考えることにした。",
        },
      ],
      choices: [],
    },
    {
      key: 2,
      type: 5,
      code: SECTION_D,
      image: "",
      text: "Bさんは、営業職です。会社から「営業目標を設定し、年度末に達成状況を報告するように」という指示がありました。Bさんは、高い目標を設定しましたが、同僚のCさんは、楽をするために、目標を低く設定しました。結果として、BさんもCさんも目標を達成したのですが、会社は年度末の目標達成率だけで評価を行ったため、Bさんの評価はCさんより低くなってしまいました。Bさんは、正当に評価されなかったことに対して、非常に強い憤りを感じました。Bさんが、この怒りを静めるために、次の<u>それぞれ</u>の行動１～２はどのくらい役に立つでしょうか。",
      title: QUESTION_PATTERN_4,
      ans: [
        {
          key: 62,
          label:
            "行動1：自分が今回の業務を通じて、「どれくらい成長ができたのか」、「どのような能力を身に付けたのか」を書き出してみることにした。",
        },
        {
          key: 63,
          label:
            "行動2：Cさんの仕事ぶりに対する自分の不満を、周囲の人に話すことにした。更に、自分と同意見の人を、見つけることにした。",
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
      text: "Aさんは、タクシーで、駅から客先まで行くことにしました。タクシーに乗り、「A社までお願いします。」と、伝えたところ、何も答えませんでした。わかったのだろうと思い、顧客先で使う資料に目を通すことにしました。気がつくと１５分経っていました。通常であれば、１５分程度で着くのですが、外の風景には見覚えがありません。運転手に確認したところ、まったく違うところに行こうとしていたようです。どうも、運転手は聞き間違えたようです。Aさんは、運転手が確認しなかったことと、約束の時間も迫っているため、焦りと怒りを感じました。Aさんが、目的の場所にできる限り早くたどり着くためには、次の<u>それぞれ</u>の行動１～３はどのくらい役に立つでしょうか。",
      title: QUESTION_PATTERN_4,
      ans: [
        {
          key: 66,
          label:
            "行動1：「なぜ、確認しなかったのか。」と、怒りをぶつけて、「もう、降りる。間違えたから無料にするべきだ。」と言った。",
        },
        {
          key: 67,
          label:
            "行動2：A社の場所を伝え、しっかり伝わったか確認し、運転手が持っている地図で、道案内をした。",
        },
        {
          key: 68,
          label:
            "行動3：車を止めて、A社の場所を確認し、再度A社に向かってもらい、走行中には、冷静になって料金交渉をした。",
        },
      ],
      choices: [],
    },
  ],
  13: [
    {
      key: 5,
      type: 5,
      code: SECTION_D,
      image: "",
      text: "Aさんは、会社の経理処理の専門家だと自負がありました。しかし、新しい会計システムが導入されることが決まり、Aさんは不安を感じています。コンピュータについては、あまり知識がなく、使いこなせる自信がありません。Aさんが不安を取り除くためには、次の<u>それぞれ</u>の行動１～４はどのくらい役に立つでしょうか。",
      title: QUESTION_PATTERN_4,
      ans: [
        {
          key: 69,
          label: "行動1：仕事の内容や量と期日を整理することにした。",
        },
        {
          key: 70,
          label: "行動2：気持ちを落ち着かせるためのさまざまな手法を学んだ。",
        },
        {
          key: 71,
          label:
            "行動3：新システムをなるべく使わず、従来のやり方で処理しようと決めた。",
        },
        {
          key: 72,
          label:
            "行動4：コンピュータに慣れるため、自宅にコンピュータを購入した。",
        },
      ],
      choices: [],
    },
  ],
  14: [
    {
      key: 1,
      type: 1,
      code: SECTION_E,
      image: eaiaMainImage,
      text: QUESTION_PATTERN_5,
      title: "",
      ans: [
        {
          key: 73,
          label: "A.寂しさ",
        },
        {
          key: 74,
          label: "B.いらだち",
        },
        {
          key: 75,
          label: "C.孤独感",
        },
      ],
      choices: [],
    },
  ],
  15: [
    {
      key: 2,
      type: 1,
      code: SECTION_E,
      image: eaiaMainImage15,
      text: QUESTION_PATTERN_5,
      title: "",
      ans: [
        {
          key: 76,
          label: "A.あわれみ",
        },
        {
          key: 77,
          label: "B.うろたえ",
        },
        {
          key: 78,
          label: "C.失望",
        },
      ],
      choices: [],
    },
  ],
  16: [
    {
      key: 3,
      type: 1,
      code: SECTION_E,
      image: eaiaMainImage16,
      text: QUESTION_PATTERN_5,
      title: "",
      ans: [
        {
          key: 79,
          label: "A.疎外感",
        },
        {
          key: 80,
          label: "B.安堵",
        },
        {
          key: 81,
          label: "C.落ち着きのなさ",
        },
      ],
      choices: [],
    },
  ],
  17: [
    {
      key: 4,
      type: 1,
      code: SECTION_E,
      image: eaiaMainImage17,
      text: QUESTION_PATTERN_5,
      title: "",
      ans: [
        {
          key: 82,
          label: "A.苦しみ",
        },
        {
          key: 83,
          label: "B.あわれみ",
        },
        {
          key: 84,
          label: "C.不安",
        },
      ],
      choices: [],
    },
  ],
  18: [
    {
      key: 5,
      type: 1,
      code: SECTION_E,
      image: eaiaMainImage18,
      text: QUESTION_PATTERN_5,
      title: "",
      ans: [
        {
          key: 85,
          label: "A.あっ気にとられる",
        },
        {
          key: 86,
          label: "B.みじめさ",
        },
        {
          key: 87,
          label: "C.やすらぎ",
        },
      ],
      choices: [],
    },
  ],
  19: [
    {
      key: 6,
      type: 1,
      code: SECTION_E,
      image: eaiaMainImage19,
      text: QUESTION_PATTERN_5,
      title: "",
      ans: [
        {
          key: 88,
          label: "A.孤独感",
        },
        {
          key: 89,
          label: "B.うろたえ",
        },
        {
          key: 90,
          label: "C.恐れ",
        },
      ],
      choices: [],
    },
  ],
  20: [
    {
      key: 7,
      type: 1,
      code: SECTION_E,
      image: eaiaMainImage20,
      text: QUESTION_PATTERN_5,
      title: "",
      ans: [
        {
          key: 91,
          label: "A.傷心",
        },
        {
          key: 92,
          label: "B.恐れ",
        },
        {
          key: 93,
          label: "C.生きる不安",
        },
      ],
      choices: [],
    },
  ],
  21: [
    {
      key: 1,
      type: 2,
      code: SECTION_F,
      image: "",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      text: "結婚を控えた同性の親しい友人がいます。結婚前に、一緒に旅行に行こう、と誘われていたのですが、仕事が忙しくてすっかり忘れていたことに気づき、罪悪感を感じていると想像してください。その罪悪感は、以下の各々の感じにどれくらい似ているでしょうか。３つの感覚<u>それぞれ</u>について答えてください。",
      title:
        "次の各項目について、各々の感情を想像して、a～cのそれぞれに答えてください。もしその感情を想像できなくても、直感で答えてください。",
      ans: [
        { key: 94, label: "ａ．重い" },
        { key: 95, label: "ｂ．深い" },
        { key: 96, label: "ｃ．甘い" },
      ],
    },
    {
      key: 2,
      type: 2,
      code: SECTION_B,
      image: "",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      text: "滞っていた仕事がやっと完了して、安心するとともに満足感を感じていると想像してください。その満足感は、以下の各感情にどれくらい似ているでしょうか。３つの感覚<u>それぞれ</u>について答えてください",
      title: "",
      ans: [
        { key: 97, label: "a. 感傷" },
        { key: 98, label: "b. いらだち" },
        { key: 99, label: "c. 興奮" },
      ],
    },
    {
      key: 3,
      type: 2,
      code: SECTION_B,
      image: "",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      text: "暑くて、せかせかして、やる気が起きないと想像してください。その感じは、以下の各感情にどれくらい似ているでしょうか。３つの感情<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 100, label: "ａ．挑発されている" },
        { key: 101, label: "ｂ．孤独である" },
        { key: 102, label: "ｃ．驚いている" },
      ],
    },
  ],
  22: [
    {
      key: 4,
      type: 2,
      code: SECTION_F,
      image: "",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      text: "地味で、小さくて、暗い緑色を感じていると想像してください。その感じは、以下の各感情にどれくらい似ているでしょうか。３つの感情<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 103, label: "ａ．興奮している" },
        { key: 104, label: "ｂ．ねたんでいる" },
        { key: 105, label: "ｃ．喜んでいる" },
      ],
    },
    {
      key: 5,
      type: 2,
      code: SECTION_F,
      image: "",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      text: "明るくて、暑くて、潮風の香りがする感じを想像してください。その感じは、以下の各感情にどれくらい似ているでしょうか。３つの感情<u>それぞれ</u>について答えてください。",
      title: "",
      ans: [
        { key: 106, label: "ａ．無力感" },
        { key: 107, label: "ｂ．恐れを感じている" },
        { key: 108, label: "ｃ．期待感" },
      ],
    },
    {
      key: 6,
      type: 3,
      code: SECTION_F,
      image: "",
      text: "あなたは、冷たく、締め付けられているように感じています。あなたは、あなた自身が凍えている、もしくは、遠くへ移動しているような気がしています。選択肢の中であなたの感情に最も当てはまるものを選んでください。",
      title: "",
      scaleLeft: choices_select_2[0],
      scaleRight: choices_select_2[1],
      ans: [{ key: 109, label: "" }],
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
  23: [
    {
      key: 1,
      type: 4,
      code: SECTION_G,
      image: "",
      text: "<span class='blank-box'></span>が強まると恐怖、弱まると混乱になる。",
      title:
        "次のそれぞれの質問に対して、最もあてはまるものを①～⑤までの選択肢の中から1つ選んでください。",
      ans: [{ key: 110, label: "" }],
      // 表示する5つの選択肢
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
      text: "受容と恐れの感情が結びつくと、<span class='blank-box'></span>を生み出す。",
      title: "",
      ans: [{ key: 111, label: "" }],
      // 表示する5つの選択肢
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
      text: "悲しみと驚きが結びつくと、<span class='blank-box'></span>を生み出す。",
      title: "",
      ans: [{ key: 112, label: "" }],
      // 表示する5つの選択肢
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
      text: "<span class='blank-box'></span>が強まると驚愕、弱まると心配になる。",
      title: "",
      ans: [{ key: 113, label: "" }],
      // 表示する5つの選択肢
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
      text: "喜びと受容が結びつくと<span class='blank-box'></span>になる。",
      title: "",
      ans: [{ key: 114, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "尊重" },
        { value: 2, label: "幸せ" },
        { value: 3, label: "興奮" },
        { value: 4, label: "崇拝" },
        { value: 5, label: "愛" },
      ],
    },
  ],
  24: [
    {
      key: 6,
      type: 4,
      code: SECTION_G,
      image: "",
      text: "<span class='blank-box'></span>が強まると憎悪、弱まるとうんざりになる",
      title:
        "次のそれぞれの質問に対して、最もあてはまるものを①～⑤までの選択肢の中から1つ選んでください。",
      ans: [{ key: 115, label: "" }],
      // 表示する5つの選択肢
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
      text: "喜びと期待が結びつくと<span class='blank-box'></span>になる。",
      title: "",
      ans: [{ key: 116, label: "" }],
      // 表示する5つの選択肢
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
      text: "恐れと驚きが結びつくと<span class='blank-box'></span>になる。",
      title: "",
      ans: [{ key: 117, label: "" }],
      // 表示する5つの選択肢
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
      text: "<span class='blank-box'></span>が強まると悲嘆、弱まると物思いになる。",
      title: "",
      ans: [{ key: 118, label: "" }],
      // 表示する5つの選択肢
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
      text: "<span class='blank-box'></span>が強まると激怒、弱まるといらだちになる。",
      title: "",
      ans: [{ key: 119, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "後悔" },
        { value: 2, label: "警戒" },
        { value: 3, label: "攻撃" },
        { value: 4, label: "怒り" },
        { value: 5, label: "畏敬" },
      ],
    },
  ],
  25: [
    {
      key: 11,
      type: 4,
      code: SECTION_G,
      image: "",
      text: "「意気阻喪（いきそそう）」の意味として最も適切なものはどれかでしょうか。",
      title:
        "次のそれぞれの質問に対して、最もあてはまるものを①～⑤までの選択肢の中から1つ選んでください。",
      ans: [{ key: 120, label: "" }],
      // 表示する5つの選択肢
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
      text: "「不遜（ふそん）」の意味として最も適切なものはどれでしょうか。",
      title: "",
      ans: [{ key: 121, label: "" }],
      // 表示する5つの選択肢
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
      text: "「やるせない」の意味として最も適切なものはどれでしょうか。",
      title: "",
      ans: [{ key: 122, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "思いを晴らすことができずせつない" },
        { value: 2, label: "怒りを持っていく場所がない" },
        { value: 3, label: "何をしてもうまくいかず、むなしい" },
        { value: 4, label: "気が晴れない" },
        { value: 5, label: "何もやる気が起こらない" },
      ],
    },
    {
      key: 14,
      type: 4,
      code: SECTION_G,
      image: "",
      text: "期待と怒りが結びつくと<span class='blank-box'></span>になる。",
      title: "",
      ans: [{ key: 123, label: "" }],
      // 表示する5つの選択肢
      choices: [
        { value: 1, label: "恐れ" },
        { value: 2, label: "驚き" },
        { value: 3, label: "悲しみ" },
        { value: 4, label: "愛" },
        { value: 5, label: "攻撃" },
      ],
    },
  ],
  26: [
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
          label:
            "対応2：今まで内緒にされていたことに腹を立てた。そのため、Bさんを無視することで不満の気持ちを表し、Bさんがどのような対応をするのか様子をみることにした。",
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
      text: "Aさんは、ある会社の課長です。ある日、部長から呼び出されました。そこで、「君の部下のB君は、営業もせずに毎日さぼってぶらぶらしているそうじゃないか。そのような社員がいると、部署全体のやる気が下がって困るよ」と言われました。Aさんが知っているB君は、仕事に対して前向きに取り組んでいたため、あまりにも違っていると感じました。しかし、部長が、「今後、B君の行動に改善が見られなければ、Aさんの降格も考える」と強い口調で言ったため、怒りを感じました。次の<u>それぞれ</u>の対応１～２は、 Aさんが、部長、Aさん、B君、３人の関係を改善するために、どのくらい役に立つでしょうか。",
      ans: [
        {
          key: 126,
          label:
            "対応1：「B君の行動が、自分の知っている行動とは違うのでショックを受けています。そのような行動を本当にB君が取っているのか調べさせてください。」と部長に伝えた。",
        },
        {
          key: 127,
          label:
            "対応2：なぜ、このようなうわさが流れているのかをB君に確認した。",
        },
      ],
      choices: [],
    },
  ],
  27: [
    {
      key: 3,
      type: 5,
      code: SECTION_H,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "Cさんは、現在の生活すべてに満足しています。やりがいのある職務に就き、職場の人間関係も上手くいっていますし、家庭も円満です。この生活が、いつまでも続けば良いと思っています。最近、友人や同僚、部下に、「自分の幸せな生活について自慢したい」、という気持ちが生じていました。次の<u>それぞれ</u>の対応１～２は、今後、Cさんが、現在の良好な人間関係を保つために、どのくらい役に立つでしょうか。",
      ans: [
        {
          key: 128,
          label: "対応1：友人や同僚、部下の話を積極的に聞くようにした。",
        },
        {
          key: 129,
          label: "対応2：家族に、自分の正直な気持ちを伝え、感謝をした。",
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
      text: "Aさんは、多くの仕事を抱えて、残業の毎日です。そこに、突然上司のBさんがやってきて、「最近、仕事のスピードが落ちてるぞ。気持ちがゆるんでるんじゃないか。」と怒鳴られました。Aさんは、言いようのない怒りを感じました。次のそれぞれの対応１～３は、Aさんが、今後、上司との関係を保つのにどのくらい役に立つでしょうか。",
      ans: [
        {
          key: 130,
          label:
            "対応1：「B君の行動が、自分の知っている行動とは違うのでショックを受けています。そのような行動を本当にB君が取っているのか調べさせてください。」と部長に伝えた。",
        },
        {
          key: 131,
          label:
            "対応2：なぜ、このようなうわさが流れているのかをB君に確認した。",
        },
        {
          key: 132,
          label:
            "対応3：なぜ、このようなうわさが流れているのかをB君に確認した。",
        },
      ],
      choices: [],
    },
  ],

  28: [
    {
      key: 5,
      type: 5,
      code: SECTION_H,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "Aさんは、課の会議で、新しい企画を提案しました。その内容について、足りない部分の指摘はあったものの、参加者から色々なアイデアが出て、和やかな雰囲気で会議が進んでいました。ところが、遅れてきた同僚のBさんが、開口一番、「ぜんぜん駄目だよ。」と言ってきました。Bさんは、いつも何かと他人の企画に文句をつけることが多く、Aさんは、怒りを感じました。会議を建設的なものにするのに、次のそれぞれの対応１～３は、どのくらい役に立つでしょうか。",
      ans: [
        {
          key: 133,
          label:
            "対応1：Bさんの意見は、いつも否定的なものばかりなので、無視することにし、会議を終了することにした。",
        },
        {
          key: 134,
          label:
            "対応2：「Bさんには、いつも欠点を見つけてもらって助かるよ。どうすれば、君も認めるような企画になるかな。」と、場の空気を和ました上で、Bさんに代替案を求めた。",
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
  29: [
    {
      key: 6,
      type: 5,
      code: SECTION_H,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "Aさんは、風邪を引いてしまいました。近くの病院で予約を取り、翌日、会社の出勤前に行くことにしました。受付を済ませて待っていると、予定の時間を２０分程過ぎているのに、名前を呼ばれません。この後、別の予定があるため、看護師に確認したところ、予約が重なっていたため、知らないうちに、診察の順番が遅くなっていたようです。突然の話にAさんは、怒りを感じました。Aさんが、なるべく早く診察してもらうのに、次の<u>それぞれ</u>の対応１～３は、どのくらい役に立つでしょうか。",
      ans: [
        {
          key: 136,
          label:
            "対応1：「そんなことは、聞いていない。予約していたのだから早く診るべきだ。」と、看護師に怒鳴った。",
        },
        {
          key: 137,
          label:
            "対応2：自分にもこの後予定があることを伝え、できるだけ早く診てもらうことができないか看護師に相談することにした。",
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
  30: [
    {
      key: 7,
      type: 5,
      code: SECTION_H,
      image: "",
      title: QUESTION_PATTERN_9,
      text: "Aさんは、最近親がリストラで失業したため、自分でアルバイトをして学費を稼ぎながら大学に通っています。アルバイトと授業の両立は体力的に厳しく、ついには自身の体調を崩してしまい、ある教科の課題レポートを期限までに提出することができませんでした。すると、その教科の教授から「やる気がない者に単位をやるつもりはない。もう講義に出席する必要もない」と冷たく言われました。Aさんは、言いようのない怒りを感じました。次の<u>それぞれ</u>の対応１～５は、Aさんが、今後教授との関係を保つのにどのくらい役に立つでしょうか。",
      ans: [
        {
          key: 139,
          label: "対応1：教授と別れた後、友達や家族に怒りをぶつけた。",
        },
        {
          key: 140,
          label:
            "対応2：仕方がないとあきらめて、言われたことは忘れようと思った。",
        },
        {
          key: 141,
          label:
            "対応3：自分は教授に嫌われていると感じ、履修はあきらめることにした。",
        },
        {
          key: 142,
          label: "対応4：気にしないで、レポートを早く仕上げて提出した。",
        },
        {
          key: 143,
          label:
            "対応5：「わかりました。超特急でレポートを仕上げますので、先生見捨てないでください」と、ユーモアを交えて教授に伝えた。",
        },
      ],
      choices: [],
    },
  ],
};

// 回答の選択肢
export const EAIA_HEADS = [
  {
    label: "かなり当てはまる",
    value: 1,
  },
];
