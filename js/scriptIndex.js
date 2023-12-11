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


// FUNGSI SEARCH//
// Mendapatkan elemen input pencarian
const searchInput = document.getElementById('search');

// Event listener untuk meng-handle input dari pengguna
searchInput.addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase(); // Mengambil input pencarian dan mengubahnya menjadi huruf kecil

    // Menggunakan fetch untuk mendapatkan data dari API (contoh)
    fetch('https://be-medan-32.adaptable.app/news')
        .then(response => response.json()) // Mengubah response menjadi JSON
        .then(data => {
            // Melakukan pencarian pada data (misalnya array objek) dari API
            const searchResults = data.filter(item => {
                return item.title.toLowerCase().includes(searchTerm); // Contoh: Mencocokkan input dengan judul item
            });

            // Lakukan sesuatu dengan hasil pencarian (misalnya, tampilkan hasil di halaman web)
            displaySearchResults(searchResults);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// Fungsi untuk menampilkan hasil pencarian (Contoh: Menampilkan hasil dalam konsol)
function displaySearchResults(results) {
    console.log(results);
    // Di sini Anda dapat mengatur cara menampilkan hasil pencarian di halaman web Anda
}







// FEEDBACK
// Function to send feedback
function sendFeedback() {
  const emailInput = document.getElementById('emailInput').value;
  const messageInput = document.getElementById('messageInput').value;

  const feedbackData = {
    email: emailInput,
    content: messageInput
  };

  fetch('https://be-medan-32.adaptable.app/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackData)
  })
  .then(response => {
    if (response.status === 405) {
      throw new Error('Method Not Allowed');
    }
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Feedback sent:', data);
    // Actions after successful feedback submission
  })
  .catch(error => {
    console.error('There was an error sending feedback:', error);
    // Handle error cases here
  });
}
