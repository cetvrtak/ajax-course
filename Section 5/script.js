const btn = document.querySelector(".btn");
const inpEle = document.querySelector("input");
const output = document.querySelector(".output");

const myForm = document.createElement("form");
document.body.append(myForm);

const output1 = document.createElement("div");
output1.classList.add("main");
const baseUrl =
  "https://script.google.com/macros/s/AKfycbzUcUVn99AkTK1rxxjCd-oU_707N3s23p9OriMaMzCYunuacydj/exec";
inpEle.classList.add("box");
inpEle.setAttribute("name", "nameOG");
inpEle.value = "Hello World";
myForm.append(inpEle);
for (let i = 0; i < 10; i++) {
  const myInput = document.createElement("input");
  myInput.setAttribute("type", "text");
  myInput.setAttribute("placeholder", "Value " + i);
  myInput.classList.add("box");
  myInput.setAttribute("name", "name" + (i + 1));
  myInput.value = "Value " + i;
  myForm.append(myInput);
}
myForm.append(btn);
output.append(output1);
btn.classList.add("box");

btn.addEventListener("click", getPost);

function loadData(e) {
  e.preventDefault();
  console.log("ready");
  let formData = new FormData(myForm);
  let data = [...formData.entries()];
  console.log(data);
  const params = data
    .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join("&");
  console.log(params);
  let url = baseUrl + "?" + params;
  getData(url);
}

function getPost(e) {
  e.preventDefault();
  const headers = new Headers();
  let formData = new FormData(myForm);
  let body = {};
  formData.forEach((val, key) => {
    body[key] = val;
  });
  console.log(body);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };
  fetch(baseUrl, options)
    .then((res) => res.json())
    .then((data) => outputObj(data));
}

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      outputObj(data);
    });
}

function outputObj(obj) {
  console.log(obj);
  output1.innerHTML = "";
  for (const prop in obj) {
    output1.innerHTML += `${prop} : ${obj[prop]}<br>`;
  }
}
