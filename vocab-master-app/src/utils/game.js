export const playAudio = (file) => {
  let audio = new Audio(
    "https://audio.dict.cc/speak.audio.php?type=wav&lang=de&text=" + file
  );
  audio.oncanplaythrough = function () {
    this.play();
  };
};

export const filterWord = (word) => {
  var noPunc = word.replace(/[,<.>;_:'"\[{}\]?\/\\|1234567890`~!@#$-]/g, "");
  let trimmed = noPunc.replace(/\s{2,}/g, " ").trim();
  let lower = trimmed.toLowerCase();

  return lower;
};

export const getCleanWords = (chk, wordArr) => {
  let word = wordArr.join("");
  let check = filterWord(chk);
  let answer = filterWord(word);
  return { check, answer };
};
