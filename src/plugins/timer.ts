export const startCountdown = (
  limittime: string,
  onTick: (time: string) => void,
  onEnd: () => void
): number => {
  const end = new Date(limittime).getTime();

  const timerId = window.setInterval(() => {
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) {
      clearInterval(timerId);
      onTick("0分0秒");
      onEnd();
      return;
    }

    const m = Math.floor(diff / 1000 / 60);
    const s = Math.floor((diff / 1000) % 60);

    onTick(`${m}分${s}秒`);
  }, 1000);

  return timerId;
};
