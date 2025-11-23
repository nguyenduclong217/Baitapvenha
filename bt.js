// tu goc nut ra viewWidth= clientX
// tu goc but ra viewHeight= clientY
// tu nut ra vien : offsetX, offsetY

// Khoi tao
const box = document.querySelector(".carousel");
const items = document.querySelectorAll(".item");
const imgs = document.querySelectorAll("img");
const listImage = document.querySelector(".carousel-image");
const btnLeft = document.querySelector(".next-left");
const btnRight = document.querySelector(".next-right");

// them thuoc tinh
box.classList.add("overflow-x-hidden");
items.forEach((item) => {
  item.classList.add("flex-none", "w-[980px]", "h-[300px]");
  //   setTimeout(() => {
  //     console.log(item.offsetWidth);
  //   }, 100);
});

imgs.forEach((img) => {
  img.classList.add("w-full", "h-full");
});

// tinh width cua listImage
const widthClass = [...items[0].classList].find((cls) => cls.startsWith("w-"));
const widthValue = widthClass.replace("w-[", "").replace("px]", "");
console.log(widthValue);
const totalWidth = widthValue * listImage.children.length + "px";
listImage.style.width = totalWidth;

console.log(listImage.children.length);

// tao dot
const listDots = document.querySelector(".carousel-dot");
function createDots() {
  for (let i = 0; i < listImage.children.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      count = i;
      updateSlice();
    });
    listDots.appendChild(dot);
  }
}
function updateSlice() {
  // di chuyen
  listImage.style.transform = `translateX(-${widthValue * count}px)`;
  // cap nhap dot
  const dots = listDots.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === count);
  });
}

// nut chuyen (Right)
let count = 0;
btnRight.onclick = function (e) {
  if (count <= listImage.children.length - 1) {
    count++;
    updateSlice();
  }
  btnRight.disabled = count >= listImage.children.length - 1;
  btnLeft.disabled = count > 0 ? false : true;
};

// nut chuyen (left)
btnLeft.onclick = function (e) {
  if (count > 0) {
    count--;
    console.log(count);
    updateSlice();
  }
  btnLeft.disabled = count === 0;
  btnRight.disabled = count < listImage.children.length - 1 ? false : true;
};

createDots();
updateSlice();
