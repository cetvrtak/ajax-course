// https://reqres.in/api/users?page=2
const baseUrl = "https://reqres.in/api/";
const btn = document.querySelector(".btn");
const inputEl = document.querySelector("input");
const output = document.querySelector(".output");

const app = {
  pg: 1,
};

btn.addEventListener("click", loadData);

window.addEventListener("DOMContentLoaded", loadData);

function loadData() {
  const param = `users?page=${app.pg}`;
  const url = baseUrl + param;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      buildPage(data);
    });
}

function buildPage(data) {
  output.innerHTML = "";
  data.data.forEach((user) => {
    const userBox = addUser(user);
    userBox.addEventListener("click", userPage.bind(user.id));
  });
  const containerEl = makeNode(output, "div");
  containerEl.classList.add("navigation");
  for (let i = 0; i < data.total_pages; i++) {
    const spanEl = makeNode(containerEl, "span", i + 1);
    spanEl.classList.add("indicator");
    spanEl.addEventListener("click", (e) => {
      app.pg = i + 1;
      loadData();
    });
  }
}

function makeNode(parent, nodeType, content = "") {
  const el = document.createElement(nodeType);
  el.innerHTML = content;
  return parent.appendChild(el);
}

function userPage() {
  const param = `users/${this}`;
  const url = baseUrl + param;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      createPage(data.data);
    });
}

function addUser(user) {
  const userBox = makeNode(output, "div");
  userBox.classList.add("user-box");
  const userName = `${user.first_name} ${user.last_name}`;
  const userEl = makeNode(userBox, "div", userName);
  userEl.classList.add("userName");
  userEl.dataset.userId = user.id;
  const emailEl = makeNode(userBox, "div", user.email);
  emailEl.classList.add("email");
  const avatarEl = makeNode(userBox, "img");
  avatarEl.setAttribute("src", user.avatar);

  return userBox;
}

function createPage(data) {
  output.innerHTML = "";
  const main = addUser(data);
  main.setAttribute("contenteditable", true);
  const updateBtn = makeNode(main, "button", "update");
  updateBtn.classList.add("updateBtn");
  updateBtn.addEventListener("click", (e) => {
    const userNameEl = document.querySelector(".userName");
    const user = {
      name: userNameEl.textContent,
      email: document.querySelector(".email").textContent,
      id: userNameEl.dataset.userId,
    };
    updateUser(user);
  });
}

function updateUser(user) {
  console.log(user);
  const param = `users/${user.id}`;
  const url = baseUrl + param;
  console.log(url);
  const headers = {
    "Content-Type": "application/json",
  };
  const data = {
    name: user.name,
    email: user.email,
  };

  fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
