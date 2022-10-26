const container = document.querySelector('.container');
const val = document.querySelector('.val');
const createBtn = document.querySelector('.btn');
createBtn.textContent = 'Create New';
const loadBtn = addElement(container, 'button', 'Load Posts');

const output = document.querySelector('.output');
const baseUrl = 'http://localhost:3000/';

window.addEventListener('DOMContentLoaded', (e) => {
  console.log('Page loaded');
  getPosts(e);
});

createBtn.addEventListener('click', addPost);
loadBtn.addEventListener('click', getPosts);

function addPost(e) {
  console.log('Adding new post');
  e.preventDefault();
  const title = val.value || 'New Title';
  val.value = '';
  const url = baseUrl + 'posts';
  const body = {
    title,
    author: 'Stevo',
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      makePost(data);
    });
}

function getPosts(e) {
  e.preventDefault();
  const url = baseUrl + 'posts';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      pageContents(data);
    });
}

function pageContents(data) {
  output.innerHTML = '';
  data.forEach((el) => {
    makePost(el);
  });
}

function makePost(el) {
  const main = addElement(output, 'div', '');
  main.classList.add('box');
  const postTitle = addElement(main, 'input', '');
  postTitle.value = el.title;
  const postAuthor = addElement(main, 'input', '');
  postAuthor.value = el.author;

  const btnContainer = addElement(main, 'div', '');
  const updateBtn = addElement(main, 'button', 'Update');
  updateBtn.addEventListener('click', (e) => {
    const json = {
      title: postTitle.value,
      author: postAuthor.value,
    };
    updatePost(json, el.id);
  });
  const deleteBtn = addElement(main, 'button', 'Delete');
  deleteBtn.addEventListener('click', (e) => {
    const url = baseUrl + 'posts/' + el.id;
    fetch(url, { method: 'DELETE' });
    main.remove();
  });
}

function updatePost(json, id) {
  const url = baseUrl + 'posts/' + id;
  const body = {
    title: json.title,
    author: json.author,
  };
  const options = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(json),
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function addElement(parent, type, html) {
  const el = document.createElement(type);
  parent.append(el);
  el.innerHTML = html;
  return el;
}
