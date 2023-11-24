const container = document.querySelector(".container");
const optionsContainer = document.querySelector("options-container");
//"in"
const country = "ina";
const option = ["general","entertaiment","health","science","sports", "technology"];

//request/hari
let requestURL;

//creat cards from data
const generateUI = (articles) => {

}

const init = () => {
    optionsContainer.innerHTML="";
    getNews();
    createOptions();
};

window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=geneal&apiKey=`
}