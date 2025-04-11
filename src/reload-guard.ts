import { useRouter } from "vue-router";

export function preventRapidReload(timeoutMs = 5000) {
  const lastReloadTime = localStorage.getItem("lastReloadTime");
  const now = Date.now();
  const router = useRouter();
  if (lastReloadTime && now - parseInt(lastReloadTime, 10) < timeoutMs) {
    alert("連続リロードは禁止されています。エラーページに遷移します。");
    // すぐリロードされないよう、空のページに遷移して止めるなど（任意）
    router
      .push({
        name: "error",
      })
      .then(() => {
        window.location.reload();
      });
    // window.stop();
    return false;
  }

  // 許可する場合、現在時刻を保存
  localStorage.setItem("lastReloadTime", now.toString());
  return true;
}
