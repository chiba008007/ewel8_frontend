import CryptoJS from "crypto-js";
import { d_Path } from "@/plugins/const";

// php側と合わせる
const key = CryptoJS.enc.Utf8.parse("ewel_secret_key!"); // 16バイト
const iv = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16バイト

function enced(code: string) {
  const encrypted = CryptoJS.AES.encrypt(code, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return toBase64Url(encrypted.toString());
}
function toBase64Url(base64: string) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export const pdfDownload = (id: number, code: string, birth: string) => {
  const encrypted = enced(code);
  const path =
    d_Path +
    "/pdf/" +
    id +
    "/code/" +
    code +
    "/birth/" +
    birth.replace(/\//g, "-") +
    "/" +
    encrypted;
  location.href = path;
};
export const onCertficate = (id: number, code: string, birth: string) => {
  // 暗号化
  const encrypted = enced(code);
  const path =
    d_Path +
    "/certificate/" +
    id +
    "/code/" +
    code +
    "/birth/" +
    birth.replace(/\//g, "-") +
    "/" +
    encrypted;
  location.href = path;
};
