



Mkey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
const Movies_API_URL =   "https://api.themoviedb.org/3/discover/movie?";
const TVs_API_URL =   "https://api.themoviedb.org/3/discover/tv?primary_release_year=2024"
const Trending_API_URL =   "https://api.themoviedb.org/3/trending/all/day?primary_release_year=2024"

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_MOVIE_API = "https://api.themoviedb.org/3/search/movie?api_key=" + Mkey + "&query=";
const SEARCH_TV_API = "https://api.themoviedb.org/3/search/tv?api_key=" + Mkey + "&query=";

const Slider_div = document.getElementById("sliderUl");
const Swiper_div = document.getElementById("swiperUl");
const movie_div = document.getElementById("movieUl");
const series_div = document.getElementById("seriesUl");
const Trending_div = document.getElementById("TrendingUl");

const headers = {
"accept": "application/json",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};




const  Latest_Movies_List_link =  "https://vidsrc.to/vapi/episode/latest/" ;
const  Latest_episode_List_link = "https://vidsrc.to/vapi/episode/latest";

let slider_type;
const page_count = 1;
let series_currentPage = 1;
let movie_currentPage = 1;


let Let_Movies_CK ;
let Let_Series_CK ;
let MCk_found_ = false;
let SCk_found_ = false;



//======================================= movie fetch --code block===================================================
Start_Function();
//======================================= Search ===================================================

const searchButton = document.getElementById('toggle-search');
const searchInput = document.querySelector('.search-input');
const icon = document.getElementById("id_search_icon");

searchButton.addEventListener('click', () => {
searchInput.classList.toggle('active');

// Toggle the icon between "search" and "close"
if (searchInput.classList.contains('active')) {
icon.innerHTML = '&#10060;'; // Close icon
} else {
icon.innerHTML = 'Q'; // Search icon
}
});

// FOR SEARCH SUBMIT

const form = document.getElementById("searchForm");
const search = document.getElementById("search_input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {

    search.value = "";
    window.location.href = "S_Results.html?query=" + searchTerm; // Replace with the URL of the page you want to open
  } else {

  }
});




// ----------------------------- Cookies Function ------------------------------------------------------------


function clearLocalStorageAfterInterval(intervalInMinutes) {
    const intervalInMilliseconds = intervalInMinutes * 60 * 1000;

    // Set an initial timestamp in localStorage if it doesn't exist
    const lastClearedTime = localStorage.getItem('lastClearedTime');
    const currentTime = Date.now();

    if (!lastClearedTime) {
        localStorage.setItem('lastClearedTime', currentTime);
    } else {
        // Check if 30 minutes have passed since the last clearing
        const timeElapsed = currentTime - parseInt(lastClearedTime, 10);
        if (timeElapsed >= intervalInMilliseconds) {
            localStorage.setItem("Movies", 'null');
            localStorage.setItem("Series", 'null');
            console.log('localStorage cleared *');
            localStorage.setItem('lastClearedTime', currentTime);  // Update the timestamp
            Start_Function();
        }
    }

    // Set a recurring interval to check and clear localStorage
    setInterval(() => {
        const now = Date.now();
        const elapsed = now - parseInt(localStorage.getItem('lastClearedTime'), 10);

        if (elapsed >= intervalInMilliseconds) {
            localStorage.setItem("Movies", 'null');
            localStorage.setItem("Series", 'null');
            console.log('localStorage cleared #');
            localStorage.setItem('lastClearedTime', now);
            Start_Function();
        }
    }, 1000); // Check every second
}




function setCookie(interval = 1000) {
    const intervalId = setInterval(() => {
        console.log("Checking variables...");

        // Check if both variables have data
        if (Let_Movies_CK && Let_Series_CK) {
            console.log("Both variables have data. Stopping the loop.");

            Let_Movies_CK =  JSON.stringify(Let_Movies_CK);
            Let_Series_CK = JSON.stringify(Let_Series_CK);

            localStorage.setItem("Movies", Let_Movies_CK);
            localStorage.setItem("Series", Let_Series_CK);

            clearInterval(intervalId); // Stop the loop
        }
        if (SCk_found_ && MCk_found_) {
           console.log("Found Cookies. Stopping the loop.");
           clearInterval(intervalId);
        }
    }, interval); // Check every `interval` milliseconds
}



 // movie_currentPage

function Start_Function() {
   clearLocalStorageAfterInterval(30);

   Slider_Movies(Movies_API_URL, 'movie');
   //Math.random() < 0.5 ? Slider_Movies(Movies_API_URL, 'movie') : Slider_Movies(TVs_API_URL, 'tv');

   trendingShows(Trending_API_URL);



   const M_value = localStorage.getItem('Movies');
   const S_value = localStorage.getItem('Series');

   //console.log('M_value', M_value ,'; ', 'S_value : ', S_value);

   if(M_value === null || M_value === "null"){
       Latest_Movies(null, movie_currentPage, 'add');

   } else {
     MCk_found_ = true;
     const parsedMovies = JSON.parse(M_value);
     console.log("movies cookies present ");
     movie_div.innerHTML = "";
     showMovies(parsedMovies);
   }

   if(S_value === null || M_value === "null"){
       Latest_episode(null, page_count);
   } else {
     SCk_found_ = true;
     console.log("Series cookies present ");
     const parsedSeries = JSON.parse(S_value);
     series_div.innerHTML = "";
     showTV(parsedSeries);


   }

   setCookie();
}




// -----------------------------Slide Show Function ------------------------------------------------------------
var element = document.getElementById("trending_container");

function start_slider(){
 jQuery(document).ready(function ($) {
         $(".slider-img").on("click", function () {
           if ($(this).hasClass("active")) {
             const redirectUrl = this.dataset.redirectUrl;
             //console.log(redirectUrl);
             window.location.href = "watch.html?id=" + redirectUrl + `&type=${slider_type}`;
           } else {
             $(".slider-img").removeClass("active");
             $(this).addClass("active");
           }
         });
       });

  jQuery(document).ready(function ($) {
        let currentIndex = 0;
        const images = $(".slider-img");
        const imageCount = images.length;

        function showNextImage() {
            images.removeClass("active");
            currentIndex = (currentIndex + 1) % imageCount;
            images.eq(currentIndex).addClass("active");
        }

        // Automatically change the image every 3 seconds
        setInterval(showNextImage,9000);

    });
  }
// ---------------------------------------------------------------------------------------------------------------------------------
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//============================================================================================================================================================


 function AutoScroll_TRENDING() {

    const arrows = document.querySelectorAll(".arrow");

    const arrowsRight = document.querySelectorAll(".rarrow"); // Right arrows
    const arrowsLeft = document.querySelectorAll(".larrow"); // Left arrows


      const movieLists = document.querySelectorAll(".movie-list");

      arrowsRight.forEach((arrow, i) => {
        const itemNumber = movieLists[i].querySelectorAll("img").length;
        let clickCounter = 0;

        const clickNext = () => {
          const ratio = Math.floor(window.innerWidth / 270);
          clickCounter++;
          const movieList = movieLists[i];
          const computedStyle = window.getComputedStyle(movieList);
          const transformValue = computedStyle.getPropertyValue("transform");
          const currentTranslateX = parseInt(transformValue.split(",")[4]) || 0;

          if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
            movieList.style.transform = `translateX(${currentTranslateX - 300}px)`;
          } else {
            movieList.style.transform = "translateX(0)";
            clickCounter = 0;
          }
        };

          const clickPrev = () => {
          if (clickCounter > 0) {
            const movieList = movieLists[i];
            const computedStyle = window.getComputedStyle(movieList);
            const transformValue = computedStyle.getPropertyValue("transform");
            const currentTranslateX = parseInt(transformValue.split(",")[4]) || 0;

            clickCounter--;
            movieList.style.transform = `translateX(${currentTranslateX + 300}px)`;
          }
        };

        arrowsLeft[i].addEventListener("click", clickPrev);

        arrow.addEventListener("click", clickNext);
        setInterval(clickNext, 7000);   // Auto-click the next arrow after 3 seconds
      });
    }





//SLIDER_ function --------------------------------------------------------------------------------

async function Slider_Movies(url, slider_t) {
  console.log(url);
  slider_type = slider_t;

  while (true) {


        const response = await fetch(url, { headers });
        const data = await response.json();

        // If `data.results` exists
        if (data.results) {
          //console.log('Results:', data.results);
          Slider_Display(data.results);
          break;
        } else {
          await sleep(10000);
        }
  }

}

function Slider_Display(movies) {
  //console.log(movies);
  if(movies){
      Slider_div.innerHTML = "";
      Swiper_div.innerHTML = "";


      let count = 0 ; // Math.floor(Math.random() * (11 - 0) + 0);

      let count_max = count + 19;
      let start = 0;
      movies.forEach((movie, index) => {
        if (count < count_max && index >= count){
              let  show_name;
              let updatedString;
              const { title, original_name, backdrop_path, first_air_date, poster_path, id, vote_average, overview, release_date } = movie;

              if (title === undefined){
              show_name = original_name;
              updatedString = first_air_date.substring(0, 4);
              }else{
              show_name= title;
              updatedString = release_date.substring(0, 4);
              }



              const movieItem = document.createElement("div");
              movieItem.classList.add("slider-img");
              movieItem.innerHTML = `
                    <img src="${IMG_PATH + backdrop_path}" />
                    <div class="details">
                      <h2 class="details_h2">${show_name}</h2>
                      <p class="details_p">&#9733; ${vote_average}</p>
                      <p class="details_p">${updatedString}</p>
                    </div>
              `;

              movieItem.dataset.redirectUrl = `${id}`;
              Slider_div.appendChild(movieItem);
              start = movieItem;

              const movieItem2 = document.createElement("div");
              movieItem2.classList.add("swiper-slide");
              movieItem2.innerHTML = `
                    <img src="${IMG_PATH + backdrop_path}" />
                    <div class="overlay">
                      <span>&#9733; ${vote_average}</span>
                      <h2>${show_name}</h2>
                    </div>
              `;

              movieItem2.addEventListener("click", () => { //dblclick
                window.location.href = "watch.html?id=" + id + "&type=movie";
              });
              Swiper_div.appendChild(movieItem2);
              count++;
        }
      });
      start_slider();
      StartSwiper();
      start.classList.add("active");

  }
}


// get Movies and shows --------------------------------------------------------


async function Latest_Movies(event, page, type) {

  try{
    const choiceSelect = event.target;
    const choiceDivs = document.querySelectorAll('.show_title_section_movie button');
    choiceDivs.forEach(div => div.classList.remove('selected_glow'));
    choiceSelect.classList.add('selected_glow');
  } catch{console.log();}

  let count = 1;
  let data_json = [];

  while (count <= page) {
      let res = await fetch(`https://vidsrc.xyz/movies/latest/page-${page}.json`, {"accept": "application/json",});
      let data = await res.json();
      //console.log(data['result']);
      data_json = data_json.concat(data['result']) ;
      count++;
      break;
    }

  let hold = [];
  for (let i = 0; i < data_json.length; i++) {

    let res2 = await fetch(`https://api.themoviedb.org/3/movie/${data_json[i]['tmdb_id']}?`, {headers});
    let data2 = await res2.json();
    hold.push({poster_path:data2['poster_path'], release_date:data2['release_date'], vote_average:data2['vote_average'], title:data2['title'], id:data2['id'], runtime:data2['runtime']});
  }
  Let_Movies_CK = hold;
  movie_div.innerHTML = "";
  showMovies(hold);
}





async function Latest_episode(event, page) {
  try{
    const choiceSelect = event.target;
    const choiceDivs = document.querySelectorAll('.show_title_section_show button');
    choiceDivs.forEach(div => div.classList.remove('selected_glow'));
    choiceSelect.classList.add('selected_glow');
  } catch{console.log();}

  let count = 1;

  let data_json = [];
  let id_prev = 0;

  while (count <= page) {
      let res = await fetch(`https://vidsrc.xyz/episodes/latest/page-${page}.json`, {"accept": "application/json",});

      let data = await res.json();
      if(Array.isArray(data['result'])){
        data_json = data_json.concat(data['result']) ;
        count++;
      }else{
        itemValues = Object.values(data.result);
        data_json = data_json.concat(itemValues) ;
        count++;
      }
      break;
    }
  let hold = [];
  for (let i = 0; i < data_json.length; i++) {
      try{
          let res2 = await fetch(`https://api.themoviedb.org/3/tv/${data_json[i]['tmdb_id']}?`,  {headers});
          let data2 = await res2.json();

          let  seasons_episode = '';

          if(`${data2['poster_path']}` !== `undefined`){
            if (id_prev !==data2['id']){

                try{
                   seasons_episode =   `SS ${data2['number_of_seasons']} / ESP ${data2['last_episode_to_air']['episode_number']}`;
                }catch (error) {
                  seasons_episode =  `SS ${data2['number_of_seasons']} / ESP ${data2['number_of_episodes']}`;
                }

                hold.push({poster_path:data2['poster_path'], first_air_date:data2['first_air_date'], vote_average:data2['vote_average'], original_name:data2['original_name'], id:data2['id'], S_info: seasons_episode});
                id_prev = data2['id'];

            }
          }
        }finally{continue;}
  }
  Let_Series_CK  = hold;
  series_div.innerHTML = "";
  showTV(hold);
}

// SHOW MOVIES  SECTION --------------------------------------------------------


function showMovies(movies) {6
  movies.forEach((movie) => {
    const { title, poster_path, id, vote_average, overview, release_date, runtime } = movie;
    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    let updatedString = release_date.substring(0, 4);
    movieItem.innerHTML = `
        <!-- box-1  -->

             <div class="box-img">
                <img class="img-on" src="${IMG_PATH + poster_path}" alt="">
                <div class="box-img-button">
                     <div class="button_style1">&#9654;</div>
                     <div class="button_style2">+</div>
                </div>
            </div>
            <div class="box_title">${title}</div>
            <div class="container_span">
               <div style="display:flex;">
                    <div  class="badge-type"> mv </div>
                    <div class="badge-type_year">${updatedString} </div>
               </div>
               <div class="badge-type_text"> ${runtime} min</div>
               <div  class="badge-type_rating"> &starf;  ${vote_average} </div>
            </div>
    `;

    // Add event listener to open another page when clicked
    //movieItem.addEventListener("click", () => {
    //window.location.href = "watch.html?id=" + id + "&type=movie";
    //


    const boxImg = movieItem.querySelector(".box-img");
    boxImg.addEventListener("click", () => {
    window.location.href = "watch.html?id=" + id + "&type=movie";
    });


    const FaveButton = movieItem.querySelector(".button_style2");
    FaveButton.addEventListener("click", () => {
    event.stopPropagation(); // Prevent the click from propagating to the boxImg event
    AddToFav(movie); // Replace 'yourFunction' with the function you want to call
    });

    const PlayT = movieItem.querySelector(".button_style1");
    PlayT.addEventListener("click", () => {
    event.stopPropagation(); // Prevent the click from propagating to the boxImg event
    PlayTrailer(movie); // Replace 'yourFunction' with the function you want to call
    });

    movie_div.appendChild(movieItem);
  });
}


// SHOW TV SECTION -----------------------------------------------------------------------

function showTV(movies) {
  //series_div.innerHTML = "";
  movies.forEach((movie) => {
    const {id, original_name, poster_path, vote_average, overview, first_air_date, S_info } = movie;
    let updatedString = first_air_date.substring(0, 4);
    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    movieItem.innerHTML = `
        <!-- box-1  -->

            <div class="box-img">
                <img class="img-on" src="${IMG_PATH + poster_path}" alt="">
                <div class="box-img-button">
                     <div class="button_style1">&#9654;</div>
                     <div class="button_style2">+</div>
                </div>
            </div>
            <div class="box_title">${original_name}</div>
            <div class="container_span">
               <div style="display:flex;">
                    <div  class="badge-type"> tv </div>
                    <div class="badge-type_year"> ${updatedString} </div>
               </div>
               <div class="badge-type_text"> ${S_info} </div>
               <div  class="badge-type_rating"> &starf;  ${vote_average} </div>
            </div>

    `;

    // Add event listener to open another page when clicked
    //movieItem.addEventListener("click", () => {
    //window.location.href = "watch.html?id=" + id + "&type=tv";
    //

    const boxImg = movieItem.querySelector(".box-img");
    boxImg.addEventListener("click", () => {
      window.location.href = "watch.html?id=" + id + "&type=tv";

    const FaveButton = movieItem.querySelector(".button_style2");
    FaveButton.addEventListener("click", () => {
    event.stopPropagation(); // Prevent the click from propagating to the boxImg event
    AddToFav(movie); // Replace 'yourFunction' with the function you want to call
    });

    const PlayT = movieItem.querySelector(".button_style1");
    PlayT.addEventListener("click", () => {
    event.stopPropagation(); // Prevent the click from propagating to the boxImg event
    PlayTrailer(movie); // Replace 'yourFunction' with the function you want to call
    });





    });

    series_div.appendChild(movieItem); // Append the `movieItem` to the container
  });
}

// SHOW TRENDING SECTION --------------------------------------------------------
async function trendingShows(url) {
   while (true) {
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (data.results) { //If `data.results` exists
          //console.log('Results:', data.results);
          showsTrending(data.results);
          break;
        } else {
          await sleep(10000);
        }
  }
}



function showsTrending(movies) {
  Trending_div.innerHTML = "";
  movies.forEach((movie) => {
    const { id, media_type, original_title, original_name, poster_path, vote_average, overview, first_air_date } = movie;
    let title;

    if (original_title=== undefined) {
       title = original_name;

    } else {
       title = original_title;
    }
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-list-item");
    movieItem.innerHTML = `

                  <img class="movie-list-item-img" src="${IMG_PATH + poster_path}" alt="">
                  <button class="movie-list-item-button" onclick="redirect_function(${id}, '${media_type}')">Watch</button>
                  <div class="movie-list-item-title"> ${title}</div>
    `;

    Trending_div.appendChild(movieItem);
  });
   AutoScroll_TRENDING();
}

function redirect_function(id, media_type) {
  console.log("watch clicker", id, media_type);
  window.location.href = "watch.html?id=" + id + `&type=${media_type}`;
}



//=====================================================================================================
//=============== SHOW MORE FUNCTIONS =================================================================


async function more_movie(){

  const button = document.getElementById("moreMovieButton");
  const state = button.getAttribute('data-state');

  if (state ==='show-more'){
            button.textContent = "Loading...";
            button.setAttribute('data-state', 'loading');

            movie_currentPage = movie_currentPage + 1;

            let data_json = [];

            let res = await fetch(`https://vidsrc.xyz/movies/latest/page-${movie_currentPage}.json`,    {"accept": "application/json",});
            let data = await res.json();
            data_json = data_json.concat(data['result']) ;

            let hold = [];
            for (let i = 0; i < data_json.length; i++) {

            let res2 = await fetch(`https://api.themoviedb.org/3/movie/${data_json[i]['tmdb_id']}?`, {headers});
            let data2 = await res2.json();
            hold.push({poster_path:data2['poster_path'], release_date:data2['release_date'], vote_average:data2['vote_average'], title:data2['title'], id:data2['id'], runtime:data2['runtime']});
            }
            button.innerHTML = "Show More &#x21b4;";
            button.setAttribute('data-state', 'show-more');
            showMovies(hold)


            const name = localStorage.getItem('Movies');
            const parsedSeries = JSON.parse(name);
            hold = parsedSeries.concat(hold);
            localStorage.setItem("Movies", JSON.stringify(hold));

    }
}



async function more_series(){

  const button = document.getElementById("moretvButton");
  const state = button.getAttribute('data-state');


  if (state ==='show-more'){
            button.textContent = "Loading...";
            button.setAttribute('data-state', 'loading');

            series_currentPage = series_currentPage + 1;

            let data_json = [];
            let id_prev = 0;

            let res = await fetch(`https://vidsrc.xyz/episodes/latest/page-${series_currentPage}.json`,  {"accept": "application/json",});
            let data = await res.json();
            if(Array.isArray(data['result'])){
                 data_json = data_json.concat(data['result']) ;
            }else{
                itemValues = Object.values(data.result);
                data_json = data_json.concat(itemValues) ;
            }

            let hold = [];
            for (let i = 0; i < data_json.length; i++) {
              try{
                  let res2 = await fetch(`https://api.themoviedb.org/3/tv/${data_json[i]['tmdb_id']}?`, {headers});
                  let data2 = await res2.json();
                  let seasons_episode = '';
                  if(`${data2['poster_path']}` !== `undefined`){
                    if (id_prev !==data2['id']){


                        try{
                        seasons_episode =   `SS ${data2['number_of_seasons']} / ESP ${data2['last_episode_to_air']['episode_number']}`;
                        }catch (error) {
                        seasons_episode =  `SS ${data2['number_of_seasons']} / ESP ${data2['number_of_episodes']}`;
                        }

                      hold.push({poster_path:data2['poster_path'], first_air_date:data2['first_air_date'], vote_average:data2['vote_average'], original_name:data2['original_name'], id:data2['id'], S_info: seasons_episode});

                      id_prev = data2['id'];
                    }
                  }
                }finally{continue;}
            }
            button.innerHTML = "Show More &#x21b4;";
            button.setAttribute('data-state', 'show-more');
            showTV(hold);


            const name = localStorage.getItem('Series');
            const parsedSeries = JSON.parse(name);
            hold = parsedSeries.concat(hold);
            localStorage.setItem("Series", JSON.stringify(hold));

  }
}


// =============================================================================


function AddToFav(movie){
    console.log("Fav :" , movie);
    console.log("Fav :" , typeof(movie));

    const Fave = localStorage.getItem('Favorites');
    if(Fave === null){
        localStorage.setItem("Favorites", JSON.stringify([movie]));
    } else {
        const parsedFav = JSON.parse(Fave);
        parsedFav.push(movie);

        const uniqueMovies = parsedFav.filter((movie, index, self) =>
          index === self.findIndex(m => m.id === movie.id)
        );

        localStorage.setItem("Favorites", JSON.stringify(uniqueMovies));
    }
}


function PlayTrailer(movie){
    console.log("Trailer :" , movie);
}


// =============================================================================
 // SWIPER FUNCTION
function StartSwiper(){
      var swiper = new Swiper(".swiper", {
                effect: "cards",
                grabCursor: true,
                initialSlide: 2,
                speed: 500,
                loop: true,
                rotate: true,
                mousewheel: {
                    invert: false,
                },
                autoplay: {
                    delay: 7000, // Time between each slide transition in milliseconds (3 seconds here)
                    disableOnInteraction: false, // Swiping manually won't stop the autoplay
                },
            });
}









