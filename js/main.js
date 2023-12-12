// nampilin berita

const baseUrlMain = "https://be-medan-32.adaptable.app";

const containerTopLeftElement = document.getElementById("top-left");
const containerBottomLeftElement = document.getElementById("bottom-left");
const containerRightElement = document.getElementById("container-right");

const fetchDataTopLeft = async () => {
  try {
    const response = await fetch(`${baseUrlMain}/news/latest?limit=1`, {
      method: "GET",
    });
    const data = await response.json();

    //nampilin 1 berita yg paling awal diambil API
    const article = data[0];

    const articleHTMLElement = document.createElement("div");
    articleHTMLElement.className = "container-top-left";

    articleHTMLElement.innerHTML = `
    <article>
      <img src = "${article.urlToImage}">
        <div>
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <a onclick="redirectToDetail(${article.id})">Read More <span>>></span></a>
        </div>
    </article>
    `;

    containerTopLeftElement.appendChild(articleHTMLElement);
  } catch (error) {
    console.error({ error });
  }
};

const fetchDataBottomLeft = async () => {
  try {
    const response = await fetch(`${baseUrlMain}/news/latest?limit=3`, {
      method: "GET",
    });
    const data = await response.json();

    const newsException = data[0];
    const remainingArticles = data.filter(
      (article) => article !== newsException
    );

    remainingArticles.forEach((article) => {
      const articleHTMLElement = document.createElement("div");
      articleHTMLElement.className = "container-bottom-left";

      articleHTMLElement.innerHTML = `
          <article>
            <img src="${article.urlToImage}" />
            <div>
              <h3>${article.title}</h3>
              <p>${article.description}</p>
              <a onclick="redirectToDetail(${article.id})">Read More</a>
            </div>
          </article>
        `;

      containerBottomLeftElement.appendChild(articleHTMLElement);
    });
  } catch (error) {
    console.error({ error });
  }
};

const fetchDataRight = async () => {
  try {
    const response = await fetch(`${baseUrlMain}/news/other?limit=6`, {
      method: "GET",
    });
    const data = await response.json();
    console.log("article kanan: ", data);
    data.forEach((article) => {
      const articleHTMLElement = document.createElement("div");
      articleHTMLElement.className = "container-right";

      articleHTMLElement.innerHTML = `
        <article>
        <h4>CATNEWS</h4>
        <div>
          <h2>
            ${article.title}
          </h2>

          <p>
            ${article.description}
          </p>

          <a onclick="redirectToDetail(${article.id})">Read More</a>
        </div>
        <img src="${article.urlToImage}" />
        </article> 
        `;

      containerRightElement.appendChild(articleHTMLElement);
    });
  } catch (error) {
    console.error({ error });
  }
};

async function redirectToDetail(id) {
  console.log("redirect to detail");
  window.location.href = `subMain.html?id=${id}`;
}

fetchDataTopLeft();
fetchDataBottomLeft();
fetchDataRight();