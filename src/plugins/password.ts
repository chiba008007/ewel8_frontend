export function getDateSepalate(
  date: string,
  num: number,
  fallback = 1
): string | number {
  const parts = (date ?? "")
    .trim()
    .split(/[^\d]+/) // "/"や"-"など数字以外で分割
    .filter(Boolean);

  const n = Number.parseInt(parts[num] ?? "", 10); // 10進数を明示

  if (num === 0) {
    // 年は取得できなければ空文字、取得できたら文字列で返す
    return Number.isNaN(n) ? "" : String(n);
  }

  // 月・日は数値。取得できなければ fallback（既定1）
  if (Number.isNaN(n)) return fallback;

  // 簡易クランプ
  if (num === 1) return Math.min(12, Math.max(1, n)); // 月: 1..12
  if (num === 2) return Math.min(31, Math.max(1, n)); // 日: 1..31

  return n;
}
