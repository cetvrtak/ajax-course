const apiKey = "AIzaSyCnA53krJaM9-ilWAXvAgl2VECZqeJd-Go";
const baseUrl = "https://www.googleapis.com/youtube/v3/search";
// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCMCPswww_7TXUIRv69Ouwjg&maxResults=10&order=viewCount&q=TEST&key=[YOUR_API_KEY]

const btn = document.querySelector(".btn");
const output = document.querySelector(".output");
const searchTerm = document.querySelector(".searchBox");

btn.addEventListener("click", (e) => {
  let params =
    "?part=snippet&channelId=UCMCPswww_7TXUIRv69Ouwjg&maxResults=10&order=viewCount";
  let q = searchTerm.value || "sex";
  searchTerm.value = "";
  let searchParam = `&q=${q}`;
  let connKey = `&key=AIzaSyCnA53krJaM9-ilWAXvAgl2VECZqeJd-Go`;
  let url = baseUrl + params + searchParam + connKey;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      output.innerHTML = `<h1>Search for "${q}"</h1>`;
      data.items.forEach((el) => {
        const element = makeCard(el);
        output.append(element);
      });
    })
    .catch((err) => console.error(err));
});

function makeCard(data) {
  console.log(data);
  const vid = data.snippet;

  const main = document.createElement("a");
  main.setAttribute(
    "href",
    `https://www.youtube.com/watch?v=${data.id.videoId}`
  );
  main.setAttribute("target", "_blank");
  main.classList.add("box");

  const div = document.createElement("div");
  const thumb = vid.thumbnails.medium.url;
  div.innerHTML = `<p>${vid.title}</p><img src="${thumb}"/><div style="padding: 0.4rem">${vid.publishTime}</div>`;
  main.append(div);

  return main;
}
