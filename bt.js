const inputEl = document.querySelector("input");
const statusBox = document.querySelector(".h form");
const bigBox = document.querySelector(".h");
const btn = document.querySelector("button");
const ul = document.querySelector(".list");
const form = document.querySelector(".form1");

inputEl.focus();
function addTask() {
  const taskText = inputEl.value.trim();
  if (taskText === ``) return;
  const allTasks = document.querySelectorAll(".list p");
  // Kiem tra trung
  for (let t of allTasks) {
    if (
      t.textContent.trim().toLocaleLowerCase() === taskText.toLocaleLowerCase()
    ) {
      inputEl.value = "";
      inputEl.focus();
      // tim va thong bao trung
      let statusText = bigBox.querySelector(".duplicate-message");
      if (!statusText) {
        statusText = document.createElement("span");
        statusText.classList.add(
          "duplicate-message",
          "text-red-500",
          "mx-[8%]"
        );
        statusText.textContent = "Task đã bị trùng!";
        statusBox.parentNode.insertBefore(statusText, statusBox.nextSibling);
      }
      statusText.classList.remove("hidden");
      return;
    }
    const statusText = bigBox.querySelector(".duplicate-message");
    // statusText.classList.add("hidden");
    if (statusText) {
      statusText.classList.add("hidden");
    }
  }
  // khoi tao cac the
  const li = document.createElement(`li`);
  const span = document.createElement(`span`);
  const big = document.createElement("div");
  const div = document.createElement("div");
  const fix = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");

  div.innerHTML = `<p class="text-white text-[1rem] ">${taskText}</p>`;

  // tao phan tu con
  div.appendChild(span);
  fix.appendChild(input);
  fix.appendChild(button);
  fix.addEventListener("submit", function (e) {
    e.preventDefault();
    button.click();
  });
  big.appendChild(div);
  big.appendChild(fix);
  li.appendChild(big);
  //==================================================
  fix.classList.add(
    "z-10",
    "hidden",
    "absolute",
    "w-[100%]",
    "h-[100%]",
    "left-[0]",
    "top-[0]",
    "border",
    "border-violet-700"

    // "p-[8px]"
  );
  // div.classList.add("flex", "w-[100%]", "h-[100%]");
  div.classList.add(
    "flex",
    "justify-between",
    "p-[8px]",
    "bg-violet-700",
    "rounded-[5px]"
  );
  big.classList.add("relative");
  input.classList.add(
    "w-[75%]",
    "px-[8px]",
    "h-[100%]",
    "bg-[#1a1a40]",
    "outline-none",
    "text-white"
  );
  button.classList.add("w-[25%]", "h-[100%]", "bg-violet-700");
  // them icon

  span.innerHTML = `<button class="fix">
          <i class="fa-regular fa-pen-to-square text-white"></i>
        </button>
        <button class="delete">
          <i class="fa-solid fa-trash text-white"></i>
        </button>`;
  ///
  button.innerText = `Update`;
  const deleteTask = div.querySelector(".delete");
  const fixTask = div.querySelector(".fix");

  const p = div.querySelector("p");

  // Xoa task
  deleteTask.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
  });
  p.addEventListener("click", () => {
    p.classList.toggle("line-through");
  });
  // Sua task
  fixTask.addEventListener("click", (e) => {
    e.stopPropagation();
    fix.classList.remove("hidden");
    input.focus();
    input.type = "text";
    input.value = taskText;
    console.log;
    if (p.value !== taskText) {
      input.value = p.textContent;
    }

    // li.classList.remove("p-[8px]");
  });
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    p.textContent = input.value.trim();
    // if (p.textContent === "")
    if (input.value.trim() === "") {
      let errol = li.querySelector(".errol-title");
      if (!errol) {
        errol = document.createElement("span");
        errol.classList.add("errol-title", "text-red-500", "ml-2");
        errol.textContent = "To do cannot be left blank";
        li.appendChild(errol);
      }
      errol.classList.remove("hidden");
      return;
    }
    // errol.classList.add("hidden");
    const errol = li.querySelector(".errol-title");
    if (errol) errol.classList.add("hidden");
    fix.classList.add("hidden");
    // console.log(errol);
  });

  ul.appendChild(li);
  inputEl.value = "";
}
// Sua task
// ket thuc
btn.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});
