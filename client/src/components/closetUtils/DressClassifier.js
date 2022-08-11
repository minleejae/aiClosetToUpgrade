import "@tensorflow/tfjs-backend-webgl";
const mobilenet = require("@tensorflow-models/mobilenet");

//옷의 종류 TOP, BOTTOM, SHOE 리턴
const getDressType = (predictions) => {
  for (let i = 0; i < predictions.length; i++) {
    const curClassName = predictions[i].className.toLowerCase();
    if (curClassName.includes("shirt")) {
      return "TOP";
    } else if (
      curClassName.includes("jean") ||
      curClassName.includes("skirt")
    ) {
      return "BOTTOM"; //skirt 추가하기
    } else if (
      curClassName.includes("shoe") ||
      curClassName.includes("sandal")
    ) {
      return "SHOE";
    }
  }
  return "ETC";
};

//옷의 타입 SUIT / CASUAL 리턴
const getStyleType = (predictions) => {
  for (let i = 0; i < predictions.length; i++) {
    const curClassName = predictions[i].className.toLowerCase();
    if (curClassName.includes("suit") || curClassName.includes("loafer")) {
      return "SUIT";
    }
  }
  return "CASUAL";
};

//옷의 종류와 타입 객체로 리턴
const DressClassifier = async (img) => {
  const model = await mobilenet.load();
  const predictions = await model.classify(img, 10);
  console.log("Predictions: ");
  console.log(predictions);

  const dressType = getDressType(predictions);
  const styleType = getStyleType(predictions);

  return { dressType, styleType };
};

export default DressClassifier;
