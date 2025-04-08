import { inputDataPartsType } from "@/types";
export default function () {
  const testPartsEdit = (
    inputData: inputDataPartsType,
    res: any,
    type: string
  ) => {
    inputData.status = res.data.testparts[type].status;
    inputData.threeflag = res.data.testparts[type].threeflag ? true : false;
    inputData.weightFlag = res.data.testparts[type].weightflag ? true : false;
    inputData.timelimit = res.data.testparts[type].timelimit;
    inputData.weight1 = res.data.testparts[type].weight1;
    inputData.weight2 = res.data.testparts[type].weight2;
    inputData.weight3 = res.data.testparts[type].weight3;
    inputData.weight4 = res.data.testparts[type].weight4;
    inputData.weight5 = res.data.testparts[type].weight5;
    inputData.weight6 = res.data.testparts[type].weight6;
    inputData.weight7 = res.data.testparts[type].weight7;
    inputData.weight8 = res.data.testparts[type].weight8;
    inputData.weight9 = res.data.testparts[type].weight9;
    inputData.weight10 = res.data.testparts[type].weight10;
    inputData.weight11 = res.data.testparts[type].weight11;
    inputData.weight12 = res.data.testparts[type].weight12;
    inputData.weight13 = res.data.testparts[type].weight13;
    inputData.weight14 = res.data.testparts[type].weight14;
    return inputData;
  };

  return {
    testPartsEdit,
  };
}
