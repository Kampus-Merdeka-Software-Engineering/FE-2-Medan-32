// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");

searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}



//berita
//detail berita
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get("id");

    // console.log("News ID:", newsId);

    if (newsId) {
      // Mengambil data berita lengkap berdasarkan ID
      const fullNews = await detailNews(newsId);

      // Menampilkan berita lengkap pada halaman
      displayFullNews(fullNews);
    }
  } catch (error) {
    console.error("Error while processing URL parameters:", error);
  }
});

// Fungsi untuk mengambil data berita lengkap dari API atau sumber data lainnya
async function detailNews(newsId) {
  try {
    const response = await fetch(
      `https://be-medan-32.adaptable.app/news/${newsId}`,
      { method: "GET" }
    );
    const data = await response.json();
    console.log("dari fungsi detail", data);
    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

function displayFullNews(fullNews) {
  console.log("Full News Data:", fullNews);
  // Lakukan manipulasi DOM atau tampilkan data sesuai kebutuhan Anda
  // Misalnya, tampilkan judul, gambar, deskripsi, dll.
  if (fullNews && fullNews.length > 0) {
    const titleElement = document.getElementById("full-news-title");
    const imageElement = document.getElementById("full-news-image");
    const dateElement = document.getElementById("full-news-date");
    const contentElement = document.getElementById("full-news-content");
    const authorElement = document.getElementById("full-news-author");

    // Access the first item in the array (assuming it's the only item)
    const firstNews = fullNews[0];

    authorElement.innerHTML = `<p>${firstNews.author}</p>`;
    titleElement.innerHTML = `<h1>${firstNews.title}</h1>`;
    imageElement.innerHTML = `<img src="${firstNews.urlToImage}" alt="${firstNews.title}">`;
    contentElement.innerHTML = `<p>${firstNews.content}</p>`;
    dateElement.innerHTML = `<p><a href="#">${firstNews.publishedAt}</a></p>`;

    console.log("Title Element:", titleElement);
    console.log("Image Element:", imageElement);
    console.log("Content Element:", contentElement);
    console.log("Author Element:", authorElement);
    console.log("Author Element:", dateElement);
  } else {
    // Handle jika data berita tidak ditemukan atau terjadi kesalahan lainnya
    console.error("Failed to fetch full news");
  }
}


