<script setup lang="ts">
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import { d_Front } from "../plugins/const";

pdfMake.fonts = {
  Roboto: {
    normal: d_Front + "/examples/fonts/GenShinGothic-Medium.ttf",
    bold: d_Front + "/examples/fonts/GenShinGothic-Medium.ttf",
    italics: d_Front + "/examples/fonts/GenShinGothic-Medium.ttf",
  },
};

const submit = () => {
  const html = `
      <div>
        Sample Documentああああ<br />
        This is a <strong>simple</strong> example with <em>formatted</em> text.
      </div>
      <div>
        Sample Documentああああ<br />
        This is a <strong>simple</strong> example with <em>formatted</em> text.
      </div>
      <div>
        Sample Documentああああ<br />
        This is a <strong>simple</strong> example with <em>formatted</em> text.
      </div>
      <div>
        Sample Documentああああ<br />
        This is a <strong>simple</strong> example with <em>formatted</em> text.
      </div>
      <div>
        Sample Documentああああ<br />
        This is a <strong>simple</strong> example with <em>formatted</em> text.
      </div>
      <div>
        Sample Documentああああ<br />
        This is a <strong>simple</strong> example with <em>formatted</em> text.
      </div>
      <div>
        Sample Documentああああ<br />
        This is a <strong>simple</strong> example with <em>formatted</em> text.
      </div>
      <div>
        Sample Documentああああ<br />
        This is a <strong>simple</strong> example with <em>formatted</em> text.
      </div>
      <div style="margin-top:4400px;">いいい</div>
      <div style="margin-top:4400px;">うううう</div>
      <table border=1>
        <tr>
          <td>aaa</td>
          <td>vvv</td>
        </tr>
      </table>
    `;

  const converted = htmlToPdfmake(html);
  const docDefinition = { content: converted };
  pdfMake.createPdf(docDefinition).download("出力テスト.pdf");
};
</script>
<template>
  <div>
    <v-btn @click="submit()">aaa</v-btn>
  </div>
</template>
