const output = document.querySelector(".output");
const btn1 = document.createElement("button");
btn1.textContent = "Reload JSON";
btn1.addEventListener("click", reloader);

const input1 = document.createElement("input");
const input2 = document.createElement("input");
const btn2 = document.createElement("button");
btn2.textContent = "Add guest";
const div1 = document.createElement("div");
div1.append(input1);
div1.append(input2);
div1.append(btn2);
document.body.append(div1);

document.body.append(btn1);

const url = "list.json";
let myList = [];
let localData = localStorage.getItem("myList");
window.addEventListener("DOMContentLoaded", (e) => {
  output.textContent = "Loading...";

  if (localData) {
    myList = JSON.parse(localStorage.getItem("myList"));
    maker();
  } else {
    reloader();
  }
});

function reloader() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      myList = data;
      maker();
      localStorage.setItem("myList", JSON.stringify(myList));
    });
}

function maker() {
  output.innerHTML = "";
  myList.forEach((element, index) => {
    makeList(element, index);
  });
}

function makeList(item, i) {
  const div = document.createElement("div");
  div.classList.add("box");
  div.innerHTML = `${item.name} #(${item.guests})`;
  output.appendChild(div);

  if (item.status) {
    div.classList.add("confirmed");
  } else {
    div.classList.add("unconfirmed");
  }
  div.addEventListener("click", (e) => {
    div.classList.toggle("confirmed");
    div.classList.toggle("unconfirmed");
    myList[i].status = !myList[i].status;
    saveToStorage();
  });

  const span = document.createElement("span");
  span.textContent = "x";
  div.append(span);
  span.addEventListener("click", (e) => {
    e.stopPropagation();
    div.remove();
    myList.splice(i, 1);
    saveToStorage();
  });
}

function saveToStorage() {
  localStorage.setItem("myList", JSON.stringify(myList));
  console.log(myList);
}
