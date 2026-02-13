export const useTestParts = () => {
  const applyTestParts = (
    inputTestPart: any,
    testparts: Record<string, any>
  ) => {
    Object.keys(testparts).forEach((code) => {
      const part = testparts[code];
      if (!part) return;

      // 存在しなければ初期化
      if (!inputTestPart.value[code]) {
        inputTestPart.value[code] = {};
      }

      inputTestPart.value[code] = {
        ...inputTestPart.value[code],
        ...part,
        threeflag: Boolean(part.threeflag),
        weightFlag: Boolean(part.weightflag),
        status: Boolean(part.status),
      };
    });
  };

  return { applyTestParts };
};
