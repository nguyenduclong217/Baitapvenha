// Bai 1
console.log("Bai 1");
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Phone", category: "Electronics", price: 800 },
  { id: 3, name: "Shirt", category: "Clothing", price: 40 },
  { id: 4, name: "Shoes", category: "Clothing", price: 60 },
  { id: 5, name: "Headphones", category: "Electronics", price: 150 },
];

// Lọc ra các sản phẩm thuộc doanh mục "electronics"

function findCategory(products) {
  return products.filter(
    (product) => product.category.toLowerCase() === "Electronics".toLowerCase()
  );
}
console.log(findCategory(products));

// Tính tổng các sản phẩm trong doanh mục "Electronics"
function sumPrice(products) {
  const newArr = findCategory(products);
  let sum = 0;
  newArr.forEach((product) => {
    sum += product.price;
  });
  return sum;
}
console.log(
  `Tổng giá của tất cả sản phẩm trong danh mục "Electronics" là: ${sumPrice(
    products
  )}`
);

// Chuyển đổi mảng sản phẩm thành một object, trong đó key là category, value là mảng các sản phẩm thuộc danh mục đó.

function creativeKey(products) {
  return products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});
}
console.log(creativeKey(products));

// =====================================================================bai 2====================================================================
console.log("Bai 2");
const students = [
  { id: 1, name: "An", scores: { math: 8, english: 7, science: 9 } },
  { id: 2, name: "Bình", scores: { math: 6, english: 8, science: 7 } },
  { id: 3, name: "Châu", scores: { math: 9, english: 6, science: 8 } },
];

// Tính điểm trung bình của từng học
function averageScore(students) {
  return students.map((student) => {
    const scores = Object.values(student.scores);
    const total = scores.reduce((sum, score) => (sum += score), 0);
    const average = (total / scores.length).toFixed(1);
    return { name: student.name, average };
  });
}
console.log(averageScore(students));

// Tìm học sinh có điểm trung bình cao nhất
function maxAverage(students) {
  const newArr = averageScore(students);
  return newArr.reduce((max, student) => {
    return student.average > max.average ? student : max;
  });
}
console.log(maxAverage(students));

// Sắp xếp danh sách học viên theo thứ tụ điểm trung bình giảm dần
function listAverage(students) {
  const newArr = averageScore(students);
  return newArr.sort((a, b) => b.average - a.average);
}
console.log(listAverage(students));

// =======================================================================Bai 3=========================================================
console.log("Bai 3");
const orders = [
  {
    orderId: 101,
    customer: "John",
    items: [{ name: "Laptop", price: 1000, quantity: 1 }],
  },
  {
    orderId: 102,
    customer: "Alice",
    items: [
      { name: "Phone", price: 500, quantity: 2 },
      { name: "Charger", price: 50, quantity: 3 },
    ],
  },
  {
    orderId: 103,
    customer: "Bob",
    items: [{ name: "Headphones", price: 200, quantity: 2 }],
  },
];

// Tinh tong tien cua tung don hang
function sumOrders(orders) {
  return orders.map((order) => {
    const total = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return { ...order, total };
  });
}
const ordersWithTotal = sumOrders(orders);
ordersWithTotal.forEach((order) => {
  console.log(
    `Order ${order.orderId} của ${order.customer} - Tổng: $${order.total}`
  );
});

// Tim khach hang co tong tien cao nhat

function findMaxPrice(orders) {
  const newArr = sumOrders(orders);
  const maxCustomer = newArr.reduce((sum, order) => {
    return sum.total > order.total ? sum : order;
  });
  return maxCustomer;
}
const topCustomer = findMaxPrice(orders);

console.log(
  `Khach hang co tong tien cao nhat la : ${topCustomer.customer} - ${topCustomer.total}`
);

//Gop danh sach tat ca san pham
function mergeElements(orders) {
  const allItems = orders.map((order) => order.items).flat();
  const newArr = allItems.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { name: item.name, totalQuantity: 0 };
    }
    acc[item.name].totalQuantity += item.quantity;
    return acc;
  }, {});
  return Object.values(newArr);
}
console.log(mergeElements(orders));

//=============================================================================Bai 4==================================================================
console.log("bai 4");
const employees = [
  { id: 1, name: "Mai", department: "IT", salary: 1200 },
  { id: 2, name: "Nam", department: "HR", salary: 800 },
  { id: 3, name: "Hà", department: "IT", salary: 1500 },
  { id: 4, name: "Linh", department: "Marketing", salary: 900 },
  { id: 5, name: "Phúc", department: "IT", salary: 1100 },
];

// Tinh tong luong cua tung phong ban
function totalWage(employees) {
  const newArr = employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = { department: employee.department, total: 0 };
    }
    acc[employee.department].total += employee.salary;
    return acc;
  }, {});
  return Object.values(newArr);
}
console.log(totalWage(employees));

// Tim nhan vien co muc luon cao nhat moi phong ban

function topEmployees(employees) {
  const grouped = employees.reduce((acc, employee) => {
    const newArr = employee.department;
    if (!acc[newArr] || employee.salary > acc[newArr].salary) {
      acc[newArr] = employee;
    }
    return acc;
  }, {});
  return Object.values(grouped);
}
console.log(topEmployees(employees));

// Chuyển đổi dữ liệu về dạng object, trong đó key là tên phòng ban, value là mảng nhân viên trong phòng ban đó.
function convertKey(employees) {
  return employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = [];
    }
    acc[employee.department].push(employee);
    return acc;
  }, {});
}
console.log(convertKey(employees));

// ============================================================== BAI 5 ===============================================================================
console.log("Bai 5");

const watchHistory = [
  { userId: 1, videoId: "A1", duration: 10 },
  { userId: 2, videoId: "B1", duration: 15 },
  { userId: 1, videoId: "A1", duration: 20 },
  { userId: 3, videoId: "C1", duration: 30 },
  { userId: 2, videoId: "B1", duration: 5 },
  { userId: 1, videoId: "A2", duration: 25 },
  { userId: 3, videoId: "C1", duration: 15 },
];

// Tinh tong thoi gian cua tung video
function totalTime(watchHistory) {
  const newArr = watchHistory.reduce((acc, video) => {
    if (!acc[video.videoId]) {
      acc[video.videoId] = { videoId: video.videoId, duration: 0 };
    }
    acc[video.videoId].duration += video.duration;
    return acc;
  }, {});
  return Object.values(newArr);
}
console.log(totalTime(watchHistory));

// Tim video duoc xem nhieu nhat
function findVideo(watchHistory) {
  const newArr = totalTime(watchHistory);
  return newArr.reduce((acc, time) => {
    return acc.duration > time.duration ? acc : time;
  });
}
console.log(findVideo(watchHistory));

// Nhóm lịch sử xem theo userId, trong đó mỗi userId sẽ chứa danh sách các video mà họ đã xem và tổng thời gian xem mỗi video.

function historyVideo(watchHistory) {
  return watchHistory.reduce((acc, video) => {
    if (!acc[video.userId]) {
      acc[video.userId] = [];
    }
    const info = { videoId: video.videoId, duration: video.duration };
    acc[video.userId].push(info);
    return acc;
  }, {});
}
console.log(historyVideo(watchHistory));

// ========================================================Bai 6=========================================================================
console.log("bai 6");
const matches = [
  { teamA: "A", teamB: "B", scoreA: 2, scoreB: 1 },
  { teamA: "C", teamB: "D", scoreA: 1, scoreB: 3 },
  { teamA: "A", teamB: "C", scoreA: 2, scoreB: 2 },
  { teamA: "B", teamB: "D", scoreA: 0, scoreB: 1 },
  { teamA: "A", teamB: "D", scoreA: 3, scoreB: 1 },
];

// Tinh so tran thang , hoa, thua moi doi

function findMatch(matches) {
  const newArr = {};
  matches.forEach(({ teamA, teamB, scoreA, scoreB }) => {
    if (!newArr[teamA]) {
      newArr[teamA] = { team: teamA, win: 0, draw: 0, lost: 0 };
    }
    if (!newArr[teamB]) {
      newArr[teamB] = { team: teamB, win: 0, draw: 0, lost: 0 };
    }
    if (scoreA > scoreB) {
      newArr[teamA].win++;
      newArr[teamB].lost++;
    } else if (scoreA < scoreB) {
      newArr[teamA].lost++;
      newArr[teamB].win++;
    } else {
      newArr[teamA].draw++;
      newArr[teamB].draw++;
    }
  });
  return Object.values(newArr);
}
console.log(findMatch(matches));

// Xep hang doi bang theo so diem

function rankTeams(matches) {
  const results = findMatch(matches);
  results.forEach((match) => {
    match.point = match.win * 3 + match.draw * 1;
  });
  results.sort((a, b) => b.point - a.point);
  return results;
}
console.log(rankTeams(matches));

// Tim doi co so ban thang nhieu nhat
function findTopScoringTeam(matches) {
  const goals = matches.reduce((acc, match) => {
    const { teamA, teamB, scoreA, scoreB } = match;
    if (!acc[teamA]) {
      acc[teamA] = 0;
    }
    if (!acc[teamB]) {
      acc[teamB] = 0;
    }
    acc[teamA] += scoreA;
    acc[teamB] += scoreB;
    return acc;
  }, {});
  const topTeam = Object.entries(goals).reduce(
    (max, [team, goals]) => (goals > max.goals ? { team, goals } : max),
    { team: "", goals: 0 }
  );
  return topTeam;
}
console.log(findTopScoringTeam(matches));

// =================================================================Bai 7===============================================================
console.log("Bai 7");
const employees1 = [
  { id: 1, name: "An", projects: ["P1", "P2"] },
  { id: 2, name: "Bình", projects: ["P2", "P3"] },
  { id: 3, name: "Châu", projects: ["P1", "P3", "P4"] },
  { id: 4, name: "Dũng", projects: ["P4"] },
];

//Nhóm nhân viên theo dự án, sao cho mỗi dự án có danh sách nhân viên tham gia.

function groupProject(employees1) {
  return employees1.reduce((acc, employ) => {
    employ.projects.forEach((project) => {
      if (!acc[project]) {
        acc[project] = [];
      }
      acc[project].push(employ.name);
    });
    return acc;
  }, {});
}
console.log(groupProject(employees1));

// Tim du an co nhieu nhan vien tham ra nhat
function findMaxEmployees(employees1) {
  const projectCount = employees1.reduce((acc, employ) => {
    employ.projects.forEach((project) => {
      if (!acc[project]) {
        acc[project] = 0;
      }
      acc[project]++;
    });
    return acc;
  }, {});
  const maxCount = Math.max(...Object.values(projectCount));
  return Object.entries(projectCount)
    .filter(([_, count]) => count === maxCount)
    .map(([project, count]) => ({ project, count }));
}
console.log(findMaxEmployees(employees1));

// ========================================================================Bai 8================================================================
console.log("Bai 8");

const reviews = [
  { productId: "P1", userId: "U1", rating: 5 },
  { productId: "P2", userId: "U2", rating: 4 },
  { productId: "P1", userId: "U3", rating: 3 },
  { productId: "P3", userId: "U1", rating: 4 },
  { productId: "P2", userId: "U3", rating: 2 },
  { productId: "P1", userId: "U2", rating: 4 },
];

// Tinh diem trung binh danh gia cua moi san pham
function averageScore1(reviews) {
  const grouped = reviews.reduce((acc, review) => {
    if (!acc[review.productId]) {
      acc[review.productId] = {
        productId: review.productId,
        totalRating: 0,
        count: 0,
      };
    }
    acc[review.productId].totalRating += review.rating;
    acc[review.productId].count++;
    return acc;
  }, {});
  return Object.values(grouped).map((item) => ({
    productId: item.productId,
    average: (item.totalRating / item.count).toFixed(2),
  }));
}
console.log(averageScore1(reviews));

//Tim san pham co diem danh gia tb cao nhat
function maxAverageRating(reviews) {
  const maxAverage = averageScore1(reviews);
  const newArr = maxAverage.reduce((acc, review) => {
    return parseFloat(acc.average) > parseFloat(review.average) ? acc : review;
  }, maxAverage[0]);
  return newArr;
}
console.log(maxAverageRating(reviews));
// nhom theo danh sach

function listProduct(reviews) {
  return reviews.reduce((acc, product) => {
    if (!acc[product.productId]) {
      acc[product.productId] = [];
    }
    acc[product.productId].push(product);
    return acc;
  }, {});
}
console.log(listProduct(reviews));

// ===========================================================BAI 9===================================================================================
console.log("Bai 9");

const transactions = [
  { id: 1, account: "A", type: "deposit", amount: 1000 },
  { id: 2, account: "B", type: "withdraw", amount: 200 },
  { id: 3, account: "A", type: "withdraw", amount: 500 },
  { id: 4, account: "C", type: "deposit", amount: 700 },
  { id: 5, account: "B", type: "deposit", amount: 300 },
];

// Tinh so du cua cac tai khoan sau
function calculateMoney(transactions) {
  const listAcc = transactions.reduce((acc, accounts) => {
    if (!acc[accounts.account]) {
      acc[accounts.account] = { accounts: accounts.account, totalMoney: 0 };
    }
    if (accounts.type === "deposit") {
      acc[accounts.account].totalMoney += accounts.amount;
    }
    if (accounts.type === "withdraw") {
      acc[accounts.account].totalMoney -= accounts.amount;
    }
    return acc;
  }, {});
  return Object.values(listAcc);
}
console.log(calculateMoney(transactions));

//Nho cac giao dich theo tai khoan , moi tai khoan co danh sach giao dich cua rieng no
function groupAccount(transactions) {
  return transactions.reduce((acc, accounts) => {
    if (!acc[accounts.account]) {
      acc[accounts.account] = [];
    }
    acc[accounts.account].push(accounts);
    return acc;
  }, {});
}
console.log(groupAccount(transactions));

// =================================================================Bai 10 ===============================================================
console.log("Bai 10");

const inventory = [
  { item: "Laptop", type: "import", quantity: 10 },
  { item: "Mouse", type: "import", quantity: 50 },
  { item: "Laptop", type: "export", quantity: 4 },
  { item: "Keyboard", type: "import", quantity: 20 },
  { item: "Mouse", type: "export", quantity: 10 },
];

function inventoryProduct(inventory) {
  return inventory.reduce((acc, value) => {
    if (!acc[value.item]) {
      acc[value.item] = {
        item: value.item,
        item: value.item,
        totalQuantity: 0,
      };
    }
    acc[value.item].totalQuantity += value.quantity;
    return acc;
  }, {});
}
console.log(inventoryProduct(inventory));

//Tim san pham co gia ton kho nhieu nhat

function maxInventoryProduct(inventory) {
  const newArr = inventoryProduct(inventory);
  return Object.values(newArr).reduce((acc, quantity) => {
    return acc.totalQuantity > quantity.totalQuantity ? acc : quantity;
  });
}
console.log(maxInventoryProduct(inventory));

//Nhóm danh sách nhập xuất theo sản phẩm, trong đó mỗi sản phẩm có lịch sử nhập xuất riêng.

function groupInventory(inventory) {
  return inventory.reduce((acc, types) => {
    const key = types.item;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(types);
    return acc;
  }, {});
}
console.log(groupInventory(inventory));
