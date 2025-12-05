// Khoi tao bien
const btn3 = document.querySelectorAll(".number-page");
const btnAdd = document.querySelector(".add");
const btnNew = document.querySelector(".new");
const btnOld = document.querySelector(".old");
const input = document.querySelector(".search-input");
// const h2 = document.querySelector(".text-desc");
const overlay = document.querySelector(".overlay");
const list1 = document.querySelector(".list-btn3");

let loadingTimer = null;
btn3.forEach((btn) => {
  btn.classList.add(
    "border",
    "font-bold",
    "w-[25px]",
    "text-center",
    "text-[0.85rem]"
  );
});
const baseApi = "https://dummyjson.com/posts";

// tao Task
const render = (post) => {
  const postListEl = document.querySelector(".posts-list");
  const liEl = document.createElement("li");
  liEl.className = "tag";
  liEl.classList.add("border", "p-4", "rounded-md", "mt-3");

  liEl.innerHTML = `
  <h2 class="title font-bold text-[1.1rem]">${post.title}</h2>
  <p class="content text-[0.8rem]">${post.body}</p>
  <div class ="list-btn-post flex justify-between mt-2">
  <button class="desc text-[0.8rem] font-bold border px-2 rounded-[20px]" data-id="${post.id}" >Xem chi tiết</button>
  <div class="btn-status">
  <button class="rewrite text-[0.8rem] font-bold ">Sửa</button>
  <button class="delete text-[0.8rem] font-bold text-red-600 ml-1">Xóa</button>
  </div>
  </div>
  `;
  // console.log(post);
  postListEl.appendChild(liEl);
};
// lay du lieu
const response = async (url = baseApi) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await res.json();
    document.querySelector(".posts-list").innerHTML = "";
    data.posts.forEach((item) => {
      render(item);
    });
    return data.posts;
  } catch (error) {
    console.log(error.message);
  }
};

async function blogs(value) {
  const url = `${baseApi}?sortBy=title&order=${value}`;
  const data = await response(url);

  let sorted = data.posts;
  if (!sorted) return;

  if (value === "asc") {
    sorted = posts.sort((a, b) => a.id - b.id);
  } else if (value === "desc") {
    sorted = posts.sort((a, b) => b.id - a.id);
  }
  document.querySelector(".posts-list").innerHTML = "";
  sorted.forEach((item) => render(item));
  // if(data.post)
  // return data;
}

[btnNew, btnOld].forEach((btn) =>
  btn.addEventListener("click", () => {
    btnNew.classList.remove("active-1");
    btnOld.classList.remove("active-1");
    // Nut nao dc click thi se active1
    btn.classList.add("active-1");
    if (btn === btnNew) {
      blogs("desc");
    } else {
      blogs("asc");
    }
  })
);

// danh sanh
list1.addEventListener("click", (e) => {
  const item = e.target.closest(".number-page");
  if (!item) return;
  btn3.forEach((b) => b.classList.remove("active-2"));
  item.classList.add("active-2");
});

let allPosts = [];
const loadPosts = async () => {
  const res = await fetch(baseApi);
  const data = await res.json();
  allPosts = data.posts;
  renderList(allPosts);
};

//render danh sach
const renderList = (list) => {
  const postsListEl = document.querySelector(".posts-list");
  postsListEl.innerHTML = "";
  list.forEach((item) => render(item));
};

input.addEventListener("input", () => {
  const keyword = input.value.toLowerCase().trim();
  const filter = allPosts.filter((post) => {
    return post.title.toLowerCase().includes(keyword);
  });
  renderList(filter);
});

const postListEl = document.querySelector(".posts-list");
const title = document.querySelector(".title");
const h3 = document.querySelector("h3");
const box = document.querySelector(".text-desc");
// const descHidden = document.querySelector(".text2");

const desc = document.querySelector(".hidden-desc");
console.log(desc);

postListEl.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("desc")) return;
  const id = e.target.dataset.id;
  clearTimeout(loadingTimer);
  overlay.classList.remove("hidden");
  box.classList.remove("hidden");
  h3.classList.remove("hidden");
  title.classList.add("hidden");
  desc.classList.add("hidden");
  try {
    const res = await fetch(`https://dummyjson.com/posts/${id}`);
    const data = await res.json();
    title.textContent = data.title;
    desc.textContent = data.body;
    loadingTimer = setTimeout(() => {
      h3.classList.add("hidden"); // ẩn h3
      title.classList.remove("hidden"); // hiện title
      desc.classList.remove("hidden");
    }, 1200);
    console.log(desc);
  } catch (err) {
    console.log(err);
  }
});

overlay.addEventListener("click", () => {
  box.classList.add("hidden");
  overlay.classList.add("hidden");
});

loadPosts();
response();
