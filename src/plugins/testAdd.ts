import { inputDataType } from "@/types";
export default function () {
  const testEdit = (inputData: inputDataType, res: any) => {
    console.log(res);
    inputData.testname = res.data.test.testname;
    inputData.testcount = res.data.test.testcount;
    inputData.nameuseflag = res.data.test.nameuseflag ? true : false;
    inputData.genderuseflag = res.data.test.genderuseflag ? true : false;
    inputData.mailremaincount = res.data.test.mailremaincount;
    inputData.startdaytime = res.data.test.startdaytime;
    inputData.enddaytime = res.data.test.enddaytime;
    inputData.resultflag = res.data.test.resultflag ? true : false;
    inputData.envcheckflag = res.data.test.envcheckflag ? true : false;
    inputData.enqflag = res.data.test.enqflag ? true : false;
    inputData.lisencedownloadflag = res.data.test.lisencedownloadflag
      ? true
      : false;
    inputData.examlistdownloadflag = res.data.test.examlistdownloadflag
      ? true
      : false;
    inputData.totaldownloadflag = res.data.test.totaldownloadflag
      ? true
      : false;
    inputData.recomendflag = res.data.test.recomendflag ? true : false;
    inputData.loginflag = res.data.test.loginflag ? true : false;
    inputData.logintext = res.data.test.logintext;
    inputData.movietype = res.data.test.movietype;
    inputData.moviedisplayurl = res.data.test.moviedisplayurl;
    inputData.testparts = res.data.testparts;
    inputData.loginflag = res.data.test.loginflag ? true : false;
    inputData.pdfuseflag = res.data.test.pdfuseflag ? true : false;
    inputData.pdfstartday = res.data.test.pdfstartday;
    inputData.pdfendday = res.data.test.pdfendday;
    inputData.pdfcountflag = res.data.test.pdfcountflag;
    inputData.pdflimitcount = res.data.test.pdflimitcount;

    return inputData;
  };

  return {
    testEdit,
  };
}
