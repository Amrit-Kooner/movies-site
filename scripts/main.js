const API_KEY = "33eaec19d58c1cf3a84092d291c7a45e";
const SITE_PATH = "https://api.themoviedb.org/3/";
const IMAGE_PATH = "https://image.tmdb.org/t/p/";

// ...
async function getDataFromAPI(endpoint) {
    try {
        const response = await fetch(`${SITE_PATH}${endpoint}?language=en-US&api_key=${API_KEY}`);

        if(response.ok && response.status >= 200 && response.status <= 299){
            const data = await response.json();
            return data.results;
        }
    } catch (err) {
        console.error(err);
    }

    console.log("error fetching data");
    return false;
}

// ...
function createSlideHTML(dataArray){
    const htmlArray = [];

    const IMAGE_SIZE = "original/"

    for(let i = 0; i < dataArray.length; i++){
        const {original_title, overview, release_date, backdrop_path} = dataArray[i];

        htmlArray.push(
            `<div class="slideshow-slide swiper-slide" title="${original_title}">
                <img src=${IMAGE_PATH}${IMAGE_SIZE}${backdrop_path} class="slide-image"/>
                <div class="slide-info">
                    <p class="slide-movie-desc">${overview}</p>
                    <hr>
                    <div class="slide-movie-info-wrapper">
                        <h1 class="slide-movie-name">${original_title}</h1>
                        <date class="slide-movie-date">${release_date}</date>
                    </div>
                </div>
            </div>`
        )
    }

    return htmlArray;
}

// ...
function createCardHTML(dataArray){
    const htmlArray = [];

    const IMAGE_SIZE = "w300/"

    for(let i = 0; i < dataArray.length; i++){
        const {original_title, poster_path, release_date, vote_average} = dataArray[i];

        const splicedTitle = original_title.slice(0, 22) + "..."

        htmlArray.push(
            `<div class="carousel-movie-card swiper-slide" title="${original_title}">
                <div class="card-movie-img-wrapper">
                    <img src=${IMAGE_PATH}${IMAGE_SIZE}${poster_path} class="card-movie-img" alt="movie img"/>
                </div>
                <h1 class="card-movie-name">${(splicedTitle.length-3) === original_title.length ? original_title : splicedTitle}</h1>
                <div class="card-movie-desc">
                    <date class="card-movie-date">${release_date}</date>
                    <div class="card-movie-rating">${vote_average.toFixed(0)}/10</div>
                </div>
            </div>`
        )
    }

    return htmlArray
}

// ...
function addDataToHTML(htmlArr, className){
    const parentDiv = document.querySelector(className);

    if(!parentDiv){
        console.log("parent div not found");
        return;
    }

    htmlArr.forEach(html => {
        parentDiv.insertAdjacentHTML('beforeend', html);
    });
}

// ...
async function getComingSoon(){
    const endpoint = "movie/upcoming";
    const className = ".slideshow-wrapper";

    const data = await getDataFromAPI(endpoint);

    if(!data) return false;
    
    const splicedData = data.slice(0, 5);
    const slideArrayHTML = createSlideHTML(splicedData);

    addDataToHTML(slideArrayHTML, className);

    // swiperSlideshow.update();
}

// ...
async function getTrending(){
    const endpoint = "movie/popular";
    const className = ".carousel-card-wrapper.trending"

    const data = await getDataFromAPI(endpoint);

    if(!data) return false;
    
    const splicedData = data.slice(0, 10);
    const slideArrayHTML = createCardHTML(splicedData);

    addDataToHTML(slideArrayHTML, className);
}

// ...
async function getNewReleases(){
    const endpoint = "movie/now_playing";
    const className = ".carousel-card-wrapper.new-releases"

    const data = await getDataFromAPI(endpoint);

    if(!data) return false;
    
    const splicedData = data.slice(0, 10);
    const slideArrayHTML = createCardHTML(splicedData);

    addDataToHTML(slideArrayHTML, className);
}

// ...
async function getHorror(){
    const endpoint = "discover/movie?with_genres=27";
    const className = ".carousel-card-wrapper.horror"

    const data = await getDataFromAPI(endpoint);

    if(!data) return false;
    
    const splicedData = data.slice(0, 10);
    const slideArrayHTML = createCardHTML(splicedData);

    addDataToHTML(slideArrayHTML, className);
}

// ...
async function getAction(){
    const endpoint = "discover/movie?with_genres=28";
    const className = ".carousel-card-wrapper.action"
    const data = await getDataFromAPI(endpoint);

    if(!data) return false;
    
    const splicedData = data.slice(0, 10);
    const slideArrayHTML = createCardHTML(splicedData);

    addDataToHTML(slideArrayHTML, className);

}

// ...
async function getThriller(){
    const endpoint = "discover/movie?with_genres=53";
    const className = ".carousel-card-wrapper.thriller"

    const data = await getDataFromAPI(endpoint);

    if(!data) return false;
    
    const splicedData = data.slice(0, 10);
    const slideArrayHTML = createCardHTML(splicedData);

    addDataToHTML(slideArrayHTML, className);
}

// ...
document.addEventListener("DOMContentLoaded", async () => {
  await getComingSoon();
  await getNewReleases();
  await getTrending();
  await getThriller();
  await getAction();
  await getHorror();

const swiperSlideshow = new Swiper('.swiper-slideshow', {
    direction: 'horizontal',
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 800,

    pagination: {
      el: '.swiper-pagination',
    },
  });

  const swiperCarousel = new Swiper('.swiper-carousel', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 5,
    spaceBetween: 15,
    slidesPerGroup: 3, 
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    speed: 800,
  });
});