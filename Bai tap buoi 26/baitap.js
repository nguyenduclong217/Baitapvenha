const ul = document.querySelector("ul");
const items = document.querySelectorAll("ul li");

items.forEach((item) => {
  const btnDown = item.querySelector(".down");
  const btnUp = item.querySelector(".up");
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    const liActive = ul.querySelector(".active");
    if (liActive && liActive !== item) {
      liActive.classList.remove("active");
    }
    item.classList.toggle("active");
  });
  // nut xuong
  btnDown.addEventListener("click", (e) => {
    e.stopPropagation();
    const itemEl = item.nextElementSibling;
    if (!itemEl) {
      return;
    }
    ul.insertBefore(itemEl, item);
  });
  // nut len
  btnUp.addEventListener("click", (e) => {
    e.stopPropagation();
    const itemEl = item.previousElementSibling;
    if (!itemEl) {
      return;
    }
    ul.insertBefore(item, itemEl);
    console.log("1");
  });
});

// them nut chuc nang

document.addEventListener("keydown", (e) => {
  const liActive = ul.querySelector(".active");
  if (e.shiftKey && e.altKey) {
    if (liActive) {
      if (e.key === "ArrowDown") {
        const itemClone = liActive.cloneNode(true);
        itemClone.classList.remove("active");
        ul.insertBefore(itemClone, liActive.nextElementSibling);
      }
      if (e.key === "ArrowUp") {
        const itemClone = liActive.cloneNode(true);
        itemClone.classList.remove("active");
        ul.insertBefore(itemClone, liActive);
      }
    }
  }
});

// tao chuot phai

const boxContent = document.querySelector(".box-content");
const btnRename = document.querySelector(".rename");
const btnDelete = document.querySelector(".delete");
const overlay = document.querySelector(".overlay");
const renameBox = document.querySelector("#rename-box");
const input = document.querySelector("#rename-input");
const btnSub = document.querySelector(".submit");
// chan chuot phai

ul.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  li = e.target.closest("li.title");
  if (!li) return;
  if (
    e.target.classList.contains("up") ||
    e.target.classList.contains("down")
  ) {
    return;
  }
  // lay vi tri cua li
  currentItem = li;
  // tinh khoang cach
  boxContent.style.left = e.clientX + "px";
  boxContent.style.top = e.clientY + "px";
  boxContent.classList.remove("hidden");
});

// rename

btnRename.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  renameBox.classList.remove("hidden");
  boxContent.classList.add("hidden");
  input.value = currentItem.childNodes[0].textContent.trim();
  input.focus();
});

// dong rename

function closeRename() {
  overlay.classList.add("hidden");
  renameBox.classList.add("hidden");
}

overlay.addEventListener("click", () => {
  closeRename();
});

btnSub.addEventListener("click", () => {
  const oldInput = currentItem.childNodes[0].textContent.trim();
  const newInput = input.value.trim();

  if (newInput !== "" && newInput !== oldInput) {
    currentItem.childNodes[0].textContent = newInput;
  }
  closeRename();
});

btnDelete.addEventListener("click", () => {
  boxContent.classList.add("hidden");
  const text = currentItem.childNodes[0].textContent.trim();
  setTimeout(() => {
    if (confirm(`Are you sure about your decision delete "${text}"`)) {
      li.remove();
    }
  }, 0);
});

// bat nut esc

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    boxContent.classList.add("hidden");
    closeRename();
  }
});

document.addEventListener("click", () => {
  const liActive = ul.querySelector(".active");
  if (liActive) {
    liActive.classList.remove("active");
  }
  boxContent.classList.add("hidden");
});
