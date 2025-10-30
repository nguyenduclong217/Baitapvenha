// ============================================bai 1==========================================
console.log("bai 1");
const arr = [1, 2, 3, 4, 5, 6];
//Tạo mảng mới chứa bình phương của từng phần tử.
const squareNumber = (arr) => {
  let arr2 = [];
  for (let nub of arr) {
    arr2[arr2.length] = nub ** 2;
  }
  return arr2;
};
console.log(squareNumber(arr));

//Tạo mảng mới chứa các số chẵn trong mảng.
const evenNumber = (arr) => {
  let arr2 = [];
  for (let nub of arr) {
    if (nub % 2 === 0) arr2[arr2.length] = nub;
  }
  return arr2;
};
console.log(evenNumber(arr));

//Tạo mảng mới chứa các số bình phương nhưng chỉ lấy số lẻ
const squareOldNumber = (arr) => {
  let arr2 = [];
  for (let nub of arr) {
    if (nub % 2 !== 0) {
      arr2[arr2.length] = nub ** 2;
    }
  }
  return arr2;
};
console.log(squareOldNumber(arr));

// ========================================================Bai 2==========================================
console.log("Bai 2");
const names = [" hoang ", "AN", " f8 ", "Education"];

//- Tạo mảng mới chứa các phần tử đã được xoá khoảng trắng thừa và viết thường toàn bộ.
const fixname = (names) => {
  let newNames = [];
  for (let lower of names) {
    newNames[newNames.length] = lower.trim().toLowerCase();
  }
  return newNames;
};
console.log(fixname(names));

// Tạo mảng mới viết chữ cái đầu hoa (Hoang, An, F8, Education)
const capitalizationText = (names) => {
  let newNames = [];
  for (let capital of names) {
    capital = capital.trim().toLowerCase();
    capital = capital[0].toUpperCase() + capital.slice(1);
    newNames[newNames.length] = capital;
  }
  return newNames;
};
console.log(capitalizationText(names));

// =================================================bai 3=======================================
console.log("bai 3");
const nums = [3, 7, 2, 9, 12, 15, 18];

//Lấy ra mảng mới chỉ chứa số lớn hơn hoặc bằng 10.
const compare = (numb) => {
  let newNumb = [];
  for (let numb of nums) {
    if (numb >= 10) newNumb[newNumb.length] = numb;
  }
  return newNumb;
};
console.log(compare(nums));

//Từ mảng mới trên, tạo mảng chỉ chứa số chia hết cho 3.
const divisor = (nums) => {
  let newNumb = [];
  for (let numb of nums) {
    if (numb % 3 === 0) newNumb[newNumb.length] = numb;
  }
  return newNumb;
};
console.log(divisor(nums));

//Với mảng ban đầu, tạo mảng mới tăng gấp đôi nhưng chỉ giữ lại số lẻ
const oddNumber = (nums) => {
  let newNumb = [];
  for (let numb of nums) {
    if (numb % 2 !== 0) newNumb[newNumb.length] = numb * 2;
  }
  return newNumb;
};
console.log(oddNumber(nums));

//================================= bai 4====================================
console.log("bai 4");
const words = ["javascript", "php", "css", "html", "python", "java"];

// Lọc ra các từ có độ dài >=5
const lengthText = (words) => {
  let newWords = [];
  for (let word of words) {
    if (word.length >= 5) newWords[newWords.length] = word;
  }
  return newWords;
};
console.log(lengthText(words));

//Tạo mảng mới viết hoa toàn bộ.
const upperText = (words) => {
  let newWords = [];
  for (let word of words) {
    newWords[newWords.length] = word.toUpperCase();
  }
  return newWords;
};
console.log(upperText(words));

//Tạo mảng mới viết ngược từng chuỗi (tpircsavaj, avaj...).
const reverseText = (words) => {
  let newWords = [];
  for (let word of words) {
    let char = word.split("");
    for (let n = 0; n <= char.length / 2; n++) {
      let temp = char[n];
      char[n] = char[char.length - 1 - n];
      char[char.length - 1 - n] = temp;
    }
    newWords[newWords.length] = char.join("");
  }
  return newWords;
};
console.log(reverseText(words));
