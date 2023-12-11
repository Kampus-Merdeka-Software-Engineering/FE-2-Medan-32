// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");

searchBox.addEventListener("click", () => {
  navbar.classList.toggle("showInput");
  if (navbar.classList.contains("showInput")) {
    searchBox.classList.replace("bx-search", "bx-x");
  } else {
    searchBox.classList.replace("bx-x", "bx-search");
  }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function () {
  navLinks.style.left = "0";
};
menuCloseBtn.onclick = function () {
  navLinks.style.left = "-100%";
};

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

      // Mengambil data berita lengkap berdasarkan ID berita
      const comments = await getComments(newsId);

      //menampilkan comments
      displayComments(comments);
      //   displayComments.forEach((comment) => {
      //     const commentElement = document.createElement("div");
      //     commentElement.className = "comment";});
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

// https://be-medan-32.adaptable.appnews/:id/comments
//comments
async function getComments(newsId) {
  try {
    const response = await fetch(
      `https://be-medan-32.adaptable.app/news/${newsId}/comments`,
      { method: "GET" }
    );
    const data = await response.json();
    console.log("Comments:", data);
    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

function displayComments(comments) {
  console.log("Comments:", comments);

  if (comments && comments.length > 0) {
    // Mencari elemen kontainer komentar di HTML (ganti dengan ID yang sesuai)
    const commentsContainer = document.getElementById("comments-container");

    // Membersihkan kontainer komentar sebelum menambahkan yang baru
    commentsContainer.innerHTML = "";

    // Iterasi melalui setiap komentar dan menambahkannya ke kontainer
    comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.className = "comment";

      // Menetapkan konten komentar
      commentElement.innerHTML = `
        <h4 class="post-author">${comment.name}</h4>
        <p class="post-comment">${comment.comment}</p>
        <a href="#" class="post-date"><span>${comment.createdAt}</span></a>
      `;

      // Menambahkan elemen komentar ke kontainer
      commentsContainer.appendChild(commentElement);
    });
  } else {
    console.error("No comments available");
  }
}

function sendComment() {
  const nameInput = document.getElementById("send-name").value;
  const emailInput = document.getElementById("send-email").value;
  const commentInput = document.getElementById("send-comment").value;

  const commentData = {
    name: nameInput,
    email: emailInput,
    comment: commentInput,
  };

  fetch(`https://be-medan-32.adaptable.app/news/${newsId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  })
    .then((response) => {
      if (response.status === 405) {
        throw new Error("Method Not Allowed");
      }
      if (!response.ok) {
        throw new Error(
          `Network response was not ok. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Comment sent:", data);
      // Actions after successful comment submission
    })
    .catch((err) => {
      console.error("There was an error sending comment:", err);
      // Handle error cases here
    });
}

// KIRIM KOMENTAR
// <!-- JavaScript -->

// // Fungsi untuk mengirim komentar ke API
// async function sendComment() {
//   const nameInput = document.getElementById('nameInput').value;
//   const emailInput = document.getElementById('emailInput').value;
//   const messageInput = document.getElementById('messageInput').value;

//   const commentData = {
//     name: nameInput,
//     email: emailInput,
//     content: messageInput
//   };

//   try {
//     const response = await fetch('https://be-medan-32.adaptable.app/news/4/comments', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(commentData),
//     });

//     if (response.ok) {
//       // Komentar berhasil dikirim ke server
//       const responseData = await response.json();

//       // Di sini Anda dapat menanggapi respon dari server, misalnya, menambahkan komentar ke halaman web secara dinamis
//       const commentArea = document.querySelector('.comment-area');
//       const newComment = document.createElement('div');
//       newComment.classList.add('comment-content', 'd-flex');
//       newComment.innerHTML = `
//         <div class="comment-meta">
//           <h4 href="#" class="post-author">${responseData.name}</h4>
//           <a href="#" class="post-date"><span>${new Date().toLocaleDateString()}</span></a>
//           <p>${responseData.message}</p>
//         </div>
//         <div class="garis"></div>
//       `;

//       commentArea.appendChild(newComment);

//       // Reset formulir setelah mengirim komentar
//       document.getElementById('nameInput').value = '';
//       document.getElementById('emailInput').value = '';
//       document.getElementById('messageInput').value = '';
//     } else {
//       console.error('Gagal mengirim komentar ke server:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Terjadi kesalahan:', error);
//   }
// }

// // Menambahkan event listener untuk form submission
// document.querySelector('.comment-form').addEventListener('submit', function (event) {
//   event.preventDefault(); // Menghentikan aksi default dari form submission
//   sendComment(); // Memanggil fungsi untuk mengirim komentar
// });

// // search-box open close js code
// let navbar = document.querySelector(".navbar");
// let searchBox = document.querySelector(".search-box .bx-search");
// // let searchBoxCancel = document.querySelector(".search-box .bx-x");

// searchBox.addEventListener("click", ()=>{
//   navbar.classList.toggle("showInput");
//   if(navbar.classList.contains("showInput")){
//     searchBox.classList.replace("bx-search" ,"bx-x");
//   }else {
//     searchBox.classList.replace("bx-x" ,"bx-search");
//   }
// });

// // sidebar open close js code
// let navLinks = document.querySelector(".nav-links");
// let menuOpenBtn = document.querySelector(".navbar .bx-menu");
// let menuCloseBtn = document.querySelector(".nav-links .bx-x");
// menuOpenBtn.onclick = function() {
// navLinks.style.left = "0";
// }
// menuCloseBtn.onclick = function() {
// navLinks.style.left = "-100%";
// }

// //berita
// //detail berita
// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//     const urlParams = new URLSearchParams(window.location.search);
//     const newsId = urlParams.get("id");

//     // console.log("News ID:", newsId);

//     if (newsId) {
//       // Mengambil data berita lengkap berdasarkan ID
//       const fullNews = await detailNews(newsId);

//       // Menampilkan berita lengkap pada halaman
//       displayFullNews(fullNews);
//     }
//   } catch (error) {
//     console.error("Error while processing URL parameters:", error);
//   }
// });

// // Fungsi untuk mengambil data berita lengkap dari API atau sumber data lainnya
// async function detailNews(newsId) {
//   try {
//     const response = await fetch(
//       `https://be-medan-32.adaptable.app/news/${newsId}`,
//       { method: "GET" }
//     );
//     const data = await response.json();
//     console.log("dari fungsi detail", data);
//     return data;
//   } catch (error) {
//     console.error({ error });
//     return null;
//   }
// }

// function displayFullNews(fullNews) {
//   console.log("Full News Data:", fullNews);
//   // Lakukan manipulasi DOM atau tampilkan data sesuai kebutuhan Anda
//   // Misalnya, tampilkan judul, gambar, deskripsi, dll.
//   if (fullNews && fullNews.length > 0) {
//     const titleElement = document.getElementById("full-news-title");
//     const imageElement = document.getElementById("full-news-image");
//     const dateElement = document.getElementById("full-news-date");
//     const contentElement = document.getElementById("full-news-content");
//     const authorElement = document.getElementById("full-news-author");

//     // Access the first item in the array (assuming it's the only item)
//     const firstNews = fullNews[0];

//     authorElement.innerHTML = `<p>${firstNews.author}</p>`;
//     titleElement.innerHTML = `<h1>${firstNews.title}</h1>`;
//     imageElement.innerHTML = `<img src="${firstNews.urlToImage}" alt="${firstNews.title}">`;
//     contentElement.innerHTML = `<p>${firstNews.content}</p>`;
//     dateElement.innerHTML = `<p><a href="#">${firstNews.publishedAt}</a></p>`;

//     console.log("Title Element:", titleElement);
//     console.log("Image Element:", imageElement);
//     console.log("Content Element:", contentElement);
//     console.log("Author Element:", authorElement);
//     console.log("Author Element:", dateElement);
//   } else {
//     // Handle jika data berita tidak ditemukan atau terjadi kesalahan lainnya
//     console.error("Failed to fetch full news");
//   }
// }
