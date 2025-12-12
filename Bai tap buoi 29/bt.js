const BASE_URL = "https://dummyjson.com";
const app = {
  _query: {
    order: "desc",
    limit: 10,
    page: 1,
  },
  _timeoutId: null,
  init() {
    this.getUsers();
    this.search();
    this.sort();
    this.paginate();
    this.createForm();
    this.addTask();
    this.editTask();
    this.deleteTask();
    this.desc();
  },
  async getUsers() {
    try {
      //Add loading
      this.renderLoading();
      const skip = (this._query.page - 1) * this._query.limit;
      let url = `${BASE_URL}/posts?sortBy=id&order=${this._query.order}&limit=${this._query.limit}&skip=${skip}`;
      if (this._query.q) {
        url = `${BASE_URL}/posts/search?q=${this._query.q}&sortBy=id&order=${this._query.order}&limit=${this._query.limit}&skip=${skip}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch /posts");
      }
      const data = await response.json();
      const pageNumber = Math.ceil(data.total / this._query.limit);
      this.renderPosts(data.posts);
      this.renderPaginate(pageNumber);
    } catch (error) {
      //Add error
      this.renderError(error.message);
    } finally {
      //Remove loading
      this.renderLoading(false);
    }
  },
  renderPaginate(pageNumber) {
    const paginateEl = document.querySelector(".js-paginate");
    paginateEl.innerHTML = "";
    for (let page = 1; page <= pageNumber; page++) {
      const active = this._query.page === page ? "bg-green-600" : "";
      paginateEl.innerHTML += `<button class="border border-gray-300 px-4 py-2 ${active}">${page}</button>`;
    }
  },
  renderLoading(status = true) {
    const loadingEl = document.querySelector(".js-loading");
    loadingEl.innerHTML = status
      ? `<span class="block text-3xl text-center">Loading...</span>`
      : "";
  },
  renderError(message) {
    const postListEl = document.querySelector(".js-post-list");
    postListEl.innerHTML = `<span class="block text-3xl text-center">${message}</span>`;
  },
  renderPosts(posts) {
    const postListEl = document.querySelector(".js-post-list");
    postListEl.innerHTML = posts
      .map(
        (post) => `<div class="my-3 border border-gray-300 p-5"  data-id="${
          post.id
        }">
          <h2 class="text-2xl font-medium mb-3">
            ${this.sanitizeText(post.title)}
          </h2>
          <p>
            ${this.sanitizeText(post.body)}
          </p>
          <div class="flex justify-between mt-3">
            <button
              class="desc cursor-pointer border border-gray-300 py-2 px-5 hover:bg-green-600 rounded-full"   data-id="${
                post.id
              }"

             >
              Xem chi tiết
            </button>
            <div class="flex gap-2">
              <span class="edit cursor-pointer">Sửa</span>
              <span class="delete text-red-600 cursor-pointer">Xóa</span>
            </div>
          </div>
        </div>`
      )
      .join("");
  },
  sanitizeText(text) {
    return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  },
  search() {
    const inputEl = document.querySelector(".js-search");
    inputEl.addEventListener("input", (e) => {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
      this._timeoutId = setTimeout(() => {
        const keyword = e.target.value;
        this._query.q = keyword;
        this._query.page = 1;
        this.getUsers();
      }, 500);
    });
  },
  debounce(callback, timeout = 500) {
    let id;
    return (...args) => {
      //args --> mảng
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        callback.apply(null, args);
      }, timeout);
    };
  },
  sort() {
    const btnList = document.querySelectorAll(".js-sort button");
    btnList.forEach((btn) => {
      btn.addEventListener("click", () => {
        const sortValue = btn.dataset.sort;
        const btnActive = document.querySelector(".js-sort .btn-active");
        if (btnActive) {
          btnActive.classList.remove("btn-active");
        }
        btn.classList.add("btn-active");
        this._query.order = sortValue;
        this.getUsers();
      });
    });
  },
  paginate() {
    const paginateEl = document.querySelector(".js-paginate");
    paginateEl.addEventListener("click", (e) => {
      const page = +e.target.innerText;
      this._query.page = page;
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      this.getUsers();
    });
  },

  createForm() {
    const overlay = document.createElement("div");
    overlay.className =
      "js-overlay hidden fixed inset-0 bg-black/40 flex items-center justify-center z-50";
    const form = document.createElement("div");
    form.className = "box bg-white w-[60%] p-5 rounded flex flex-col gap-[8px]";
    //gan even form
    form.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    // gan even overlay
    overlay.addEventListener("click", () => {
      overlay.classList.add("hidden");
    });
    //====
    const h2 = document.createElement("h2");
    h2.className = "form-title font-bold text-[2rem]";
    h2.innerHTML = "";
    //title
    const inputTitle = document.createElement("input");
    // inputTitle.classList.add("title");
    inputTitle.type = "text";
    inputTitle.placeholder = "Title....";
    inputTitle.className =
      "title px-3 py-2 border border-gray-400 focus:outline-none focus:outline-blue-400";

    // body
    const inputBody = document.createElement("textarea");
    // inputBody.classList.add("body");
    inputBody.rows = 4;
    inputBody.type = "text";
    inputBody.placeholder = "Content....";
    inputBody.className =
      "body px-3 py-2 border border-gray-400 focus:outline-none focus:outline-blue-400";

    // button
    const button = document.createElement("button");
    button.innerHTML = "Save";
    button.className =
      "bg-green-500 px-2 py-1 hover:bg-green-600 cursor-pointer rounded-[12px] text-white";

    button.onclick = () => {
      const title = inputTitle.value.trim();
      const body = inputBody.value.trim();
    };
    form.append(h2, inputTitle, inputBody, button);
    overlay.appendChild(form);
    return overlay;
  },
  async addInfo(data) {
    const url = `${BASE_URL}/posts/add`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        userId: 5,
      }),
    });
    if (!response.ok) {
      throw new Error("Fail to creative post");
    }
    return await response.json();
  },
  // them the

  addTask() {
    const overlay = this.createForm();
    document.body.appendChild(overlay);

    const form = overlay.querySelector(".box");
    const btnSave = form.querySelector("button");
    const inputTitle = form.querySelector(".title");
    const inputBody = form.querySelector(".body");
    console.log(overlay);

    const errorEl = document.createElement("p");
    errorEl.className = "text-red-500";
    form.insertBefore(errorEl, btnSave);

    const btnAdd = document.querySelector(".add");

    btnAdd.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      const h2 = form.querySelector(".form-title");
      h2.innerHTML = "Create Task";
    });

    btnSave.addEventListener("click", async () => {
      const title = inputTitle.value.trim();
      const body = inputBody.value.trim();

      if (!title || !body) {
        errorEl.innerHTML = "Không được để trống!";
        return;
      }

      try {
        const newPost = await this.addInfo({ title, body });

        const list = document.querySelector(".js-post-list");
        const div = document.createElement("div");
        div.className = "my-3 border border-gray-300 p-5";

        div.innerHTML = `
        <h2 class="text-2xl font-medium mb-3">${newPost.title}</h2>
        <p>${newPost.body}</p>
        <div class="flex justify-between mt-3">
          <button class="cursor-pointer border border-gray-300 py-2 px-5 hover:bg-green-600 rounded-full">
            Xem chi tiết
          </button>
          <div class="flex gap-2">
            <span class="edit cursor-pointer">Sửa</span>
            <span class="delete text-red-600 cursor-pointer">Xóa</span>
          </div>
        </div>
      `;

        list.prepend(div);

        errorEl.innerHTML = "";
        inputTitle.value = "";
        inputBody.value = "";

        overlay.classList.add("hidden");
      } catch (error) {
        errorEl.innerHTML = "Lỗi khi tạo post!";
      }
    });
  },
  async updatePost(id, data) {
    const url = `${BASE_URL}/posts/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Fail to update post");
    }

    return await response.json();
  },
  editTask() {
    const postListEl = document.querySelector(".js-post-list");

    postListEl.addEventListener("click", (e) => {
      if (!e.target.classList.contains("edit")) return;

      // Tìm post đang được click edit
      const postEl = e.target.closest("div.my-3");
      const id = postEl.dataset.id;

      const overlay = document.querySelector(".js-overlay");
      const form = overlay.querySelector(".box");
      const h2 = form.querySelector(".form-title");
      const btnSave = form.querySelector("button");
      const inputTitle = form.querySelector(".title");
      const inputBody = form.querySelector(".body");

      //MỞ FORM
      overlay.classList.remove("hidden");
      h2.innerHTML = "Edit Task";

      //LẤY DỮ LIỆU HIỆN TẠI
      const oldTitle = postEl.querySelector("h2").innerText;
      const oldBody = postEl.querySelector("p").innerText;

      inputTitle.value = oldTitle;
      inputBody.value = oldBody;

      //Gỡ các sự kiện cũ để tránh nhân đôi
      const newBtnSave = btnSave.cloneNode(true);
      btnSave.parentNode.replaceChild(newBtnSave, btnSave);

      //Gắn sự kiện SAVE mới cho nút Save
      newBtnSave.addEventListener("click", async () => {
        const title = inputTitle.value.trim();
        const body = inputBody.value.trim();

        if (!title || !body) {
          alert("Không được để trống!");
          return;
        }

        try {
          const updated = await this.updatePost(id, { title, body });

          //CẬP NHẬT LẠI DOM
          postEl.querySelector("h2").innerText = updated.title;
          postEl.querySelector("p").innerText = updated.body;

          overlay.classList.add("hidden");
        } catch (error) {
          alert("Update thất bại!");
        }
      });
    });
  },
  async deletePost(id) {
    const url = `${BASE_URL}/posts/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Fail to delete post on id: ${id}`);
    }

    return await response.json();
  },

  deleteTask() {
    const postListEl = document.querySelector(".js-post-list");

    postListEl.addEventListener("click", async (e) => {
      if (!e.target.classList.contains("delete")) return;

      const postEl = e.target.closest("div.my-3");
      const id = postEl.dataset.id;

      if (!confirm("Bạn chắc chắn muốn xóa?")) return;

      try {
        await this.deletePost(id);

        // XÓA KHỎI DOM
        postEl.remove();

        alert("Xóa thành công!");
      } catch (error) {
        alert("Xóa thất bại!");
      }
    });
  },
  // xem chi tiet
  desc() {
    const box = document.querySelector(".text-desc");
    const overlay = document.querySelector(".overlay");
    const title = document.querySelector(".title");
    const text = document.querySelector(".hidden-desc");
    const postListEl = document.querySelector(".js-post-list");

    postListEl.addEventListener("click", async (e) => {
      if (!e.target.classList.contains("desc")) return;
      const id = e.target.dataset.id;
      console.log(id);
      overlay.classList.remove("hidden");
      box.classList.remove("hidden");
      title.innerText = "Loading...";
      text.innerHTML = "";
      try {
        const res = await fetch(`${BASE_URL}/posts/${id}`);
        if (!res.ok) {
          throw new Error("Lỗi kết nối");
        }
        const data = await res.json();
        title.textContent = data.title;
        text.textContent = data.body;
      } catch (error) {
        console.log(error.message);
      }
    });
    overlay.addEventListener("click", () => {
      box.classList.add("hidden");
      overlay.classList.add("hidden");
    });
  },
};

app.init();
