const btn = document.querySelector(".btn");
const inpEle = document.querySelector("input");
const output = document.querySelector(".output");
const container = document.querySelector(".container");
inpEle.style.display = "none";
btn.textContent = "Load GitHub JSON data";

const baseurl = "https://my-json-server.typicode.com/cetvrtak/json-file/posts/";
btn.addEventListener("click", loadData);

function loadData(e) {
  console.log("ready");
  const url = baseurl;
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      createPage(data);
    });
}

function createPage(data) {
  console.log(data);
  output.innerHTML = "";
  data.forEach((el) => {
    const main = addEle(output, "div", "");
    addEle(main, "div", el.title);
    addEle(main, "div", el.body);
    addEle(main, "div", el.id);
    main.classList.add("box");
  });
}

function addEle(parent, t, html) {
  const ele = document.createElement(t);
  parent.append(ele);
  ele.innerHTML = html;
  return ele;
}
