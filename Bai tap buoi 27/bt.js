// Bai tap 1

function fetchUser() {
  return new Promise((resolve) => setTimeout(() => resolve("User Data"), 2000));
}
function fetchPosts() {
  return new Promise((resolve) => setTimeout(() => resolve("Post Data"), 3000));
}
function fetchComments() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Comment Data"), 1000)
  );
}
// =========Giai=============

const startTime = Date.now();
Promise.all([fetchUser(), fetchPosts(), fetchComments()]).then((data) => {
  const end = Date.now();
  console.log("Bai 1");
  console.log("ket qua:", data);
  console.log("Tong thoi gian chay:", end - startTime, "ms");
});

// Bai 2

function fetchFromServer1() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 1 Response"), 3000)
  );
}
function fetchFromServer2() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 2 Response"), 2000)
  );
}
function fetchFromServer3() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 3 Response"), 1000)
  );
}
// ==================Giai bai tap=================
Promise.race([fetchFromServer1(), fetchFromServer2(), fetchFromServer3()]).then(
  (data) => {
    console.log("Bai 2");
    console.log("Ket qua tra ve nhanh nhat la: ", data);
  }
);

// bai 3

function retry(fn, times) {
  // Viết code ở đây
  console.log("Bai 3");
  return new Promise((resolve, reject) => {
    function step() {
      fn()
        .then(resolve)
        .catch((err) => {
          if (times === 0) {
            reject(err);
          } else {
            times--;
            step();
          }
        });
    }
    step();
  });
}
let failingPromise = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.7 ? resolve("Thành công") : reject("Thất bại");
  });
};
retry(failingPromise, 3).then(console.log).catch(console.error);
