/*
function loadCSS(filePath) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = filePath;
    document.head.appendChild(link);
}

loadCSS("./shared.css");
loadCSS("./custon.css");
loadCSS("./NavBar.css");
*/
//========================Access Details ==================================================================

let  Movies_API_URL =   "https://api.themoviedb.org/3/discover/movie?";


let Trending_API_URL =   "https://api.themoviedb.org/3/trending/all/day?primary_release_year=2025"
const popular = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
const top_rated  =  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
const upcoming  = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'


const IMG_PATH = "https://image.tmdb.org/t/p/w1280";



var  headers = {
  "accept": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};


//======================================================================================================================
const Slider_div = document.getElementById("sliderUl");
const Swiper_div = document.getElementById("swiperUl");
const movie_div = document.getElementById("movieUl");
const series_div = document.getElementById("seriesUl");
const Trending_div = document.getElementById("TrendingUl");

const  Latest_Movies_List_link =  "https://vidsrc.to/vapi/episode/latest/" ;
const  Latest_episode_List_link = "https://vidsrc.to/vapi/episode/latest";

const company_show = {
                       "Marvel Studios" : [420, 'https://image.tmdb.org/t/p/w1280/hUzeosd33nzE5MCNsZxCGEKTXaQ.png'] ,
                       "Marvel Animation" : [13252, "https://image.tmdb.org/t/p/w1280/1gKwYyTDNhumwBKUlKqoxXRUdpC.png" ],
                       "DC Films" : [128064,  "https://image.tmdb.org/t/p/w1280/13F3Jf7EFAcREU0xzZqJnVnyGXu.png"],
                       "Walt Disney Pictures" : [2,  "https://image.tmdb.org/t/p/w1280/wdrCwmRnLFJhEoH8GSfymY85KHT.png"],
                       "Walt Disney Television" : [670,  "https://image.tmdb.org/t/p/w1280/rRGi5UkwvdOPSfr5Xf42RZUsYgd.png"],
                        "Warner Bros. Pictures" : [174,  "https://image.tmdb.org/t/p/w1280/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png"],
                        "Universal Pictures" : [33,  "https://image.tmdb.org/t/p/w1280/3wwjVpkZtnog6lSKzWDjvw2Yi00.png"],
                        "Paramount Pictures" : [4,  "https://image.tmdb.org/t/p/w1280/gz66EfNoYPqHTYI4q9UEN4CbHRc.png"],
                        "Sony Pictures Entertainment" : [34,  "https://image.tmdb.org/t/p/w1280/mtp1fvZbe4H991Ka1HOORl572VH.png"],
                        "Lionsgate " : [1632,  "https://image.tmdb.org/t/p/w1280/cisLn1YAUuptXVBa0xjq7ST9cH0.png"],
                        "DreamWorks Animation " : [521,  "https://image.tmdb.org/t/p/w1280/3BPX5VGBov8SDqTV7wC1L1xShAS.png"],
                        "Netflix Animation " : [171251,  "https://image.tmdb.org/t/p/w1280/AqUAfMC270bGGK09Nh3mycwT1hY.png"],
                        "Netflix" : [178464,  "https://image.tmdb.org/t/p/w1280/tyHnxjQJLH6h4iDQKhN5iqebWmX.png"],
                        "Pixar" : [3,  "https://image.tmdb.org/t/p/w1280/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png"],
                        "Illumination" : [6704,  "https://image.tmdb.org/t/p/w1280/fOG2oY4m1YuYTQh4bMqqZkmgOAI.png"],
                        "Blue Sky Studios" : [9383,  "https://image.tmdb.org/t/p/w1280/ppeMh4iZJQUMm1nAjRALeNhWDfU.png"],
                        "Laika" : [11537,  "https://image.tmdb.org/t/p/w1280/AgCkAk8EpUG9fTmK6mWcaJA2Zwh.png"],
                        "Amazon Studios" : [20580,  "https://image.tmdb.org/t/p/w1280/oRR9EXVoKP9szDkVKlze5HVJS7g.png"],
                        "HBO" : [3268,  "https://image.tmdb.org/t/p/w1280/tuomPhY2UtuPTqqFnKMVHvSb724.png"],
                         "Apple" : [14801,  "https://image.tmdb.org/t/p/w1280/bnlD5KJ5oSzBYbEpDkwi6w8SoBO.png"],
                     }

const page_count = 1;

let series_currentPage = parseInt(localStorage.getItem('series_currentPage'), 10);
console.log(series_currentPage)
if(!series_currentPage){
  series_currentPage = 1;
}

let movie_currentPage = parseInt(localStorage.getItem('movie_currentPage'), 10);
console.log(movie_currentPage)
if(!movie_currentPage){
  movie_currentPage = 1;
}

 console.log(movie_currentPage)
 console.log(series_currentPage)


let Let_Movies_CK ;
let Let_Series_CK ;
let MCk_found_ = false;
let SCk_found_ = false;




//========================================== movie fetch --code block===================================================
Start_Function();
Company_Card(company_show);


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

            localStorage.removeItem("Movies");
            localStorage.removeItem("Series");

            localStorage.removeItem("series_currentPage");
            localStorage.removeItem("movie_currentPage");
            series_currentPage = 1;
            movie_currentPage = 1;



            console.log('localStorage cleared *');
            localStorage.setItem('lastClearedTime', currentTime);  // Update the timestamp
        }
    }

    // Set a recurring interval to check and clear localStorage
    setInterval(() => {
        const now = Date.now();
        const elapsed = now - parseInt(localStorage.getItem('lastClearedTime'), 10);

        if (elapsed >= intervalInMilliseconds) {
            localStorage.removeItem("Movies");
            localStorage.removeItem("Series");

            localStorage.removeItem("Trending_Shows");
            localStorage.removeItem("Trending_Shows");

            localStorage.removeItem("series_currentPage");
            localStorage.removeItem("movie_currentPage");
            series_currentPage = 1;
            movie_currentPage = 1;


            console.log('localStorage cleared #');
            localStorage.setItem('lastClearedTime', now);
        }
    }, 10000); // Check every second
}




function setCookie(interval = 1000) {
    const intervalId = setInterval(() => {
        //console.log("Checking variables...");
        // Check if both variables have data
        if (Let_Movies_CK && Let_Series_CK) {
            //console.log("Both variables have data. Stopping the loop.");

            Let_Movies_CK =  JSON.stringify(Let_Movies_CK);
            Let_Series_CK = JSON.stringify(Let_Series_CK);

            localStorage.setItem("Movies", Let_Movies_CK);
            localStorage.setItem("Series", Let_Series_CK);

            clearInterval(intervalId); // Stop the loop
        }
        if (SCk_found_ && MCk_found_) {
           //console.log("Found Cookies. Stopping the loop.");
           clearInterval(intervalId);
        }
    }, interval); // Check every `interval` milliseconds
}



 // movie_currentPage

function Start_Function() {
    clearLocalStorageAfterInterval(35);

    //localStorage.clear();


    let Slider_Display_CK = localStorage.getItem('Slider_Display');
    if (Slider_Display_CK){
        Slider_Display_CK = JSON.parse(Slider_Display_CK);
        Slider_Display(Slider_Display_CK, 'movie');
    }else{
        Slider_Movies(Movies_API_URL, 'movie');
    }
   //Slider_Movies(Movies_API_URL, 'movie');
   //Math.random() < 0.5 ? Slider_Movies(Movies_API_URL, 'movie') : Slider_Movies(TVs_API_URL, 'tv');



   let Trending_Shows_CK = localStorage.getItem('Trending_Shows');
   if (0){
        Trending_Shows_CK = JSON.parse(Trending_Shows_CK);
        showsTrending(Trending_Shows_CK);
   }else{
        trendingShows(Trending_API_URL);
   }
   //trendingShows(Trending_API_URL);




   //console.log('M_value', M_value ,'; ', 'S_value : ', S_value);
   const M_value = localStorage.getItem('Movies');
   if(M_value){
         MCk_found_ = true;
         const parsedMovies = JSON.parse(M_value);
         //console.log("movies cookies present :", parsedMovies);
         movie_div.innerHTML = "";

         if(Array.isArray(parsedMovies)){
             movie_div.innerHTML = "";
             showMovies(parsedMovies);
         }else{
            Latest_Movies(null, movie_currentPage, 'add');
         }

   } else {
         Latest_Movies(null, movie_currentPage, 'add');
   }


   const S_value = localStorage.getItem('Series');
   if(S_value){

         SCk_found_ = true;
         const parsedSeries = JSON.parse(S_value);
         //console.log("Series cookies present :", parsedSeries);
         //console.log(Array.isArray(parsedSeries));

         if(Array.isArray(parsedSeries)){
             series_div.innerHTML = "";
             showTV(parsedSeries);
         }else{
              Latest_episode(null, page_count);
         }

   } else {
         Latest_episode(null, page_count);
   }
   setCookie();
}




// -----------------------------Slide Show Function ====================================================================

function start_slider(){
 const sliderItems = document.querySelectorAll(".slider-img");
    let currentIndex = 0;
    let autoChangeInterval;

    function setActiveSlide(index) {
        sliderItems.forEach(img => img.classList.remove("active"));
        sliderItems[index].classList.add("active");
        currentIndex = index; // Update current index
    }

    function nextSlide() {
        let nextIndex = (currentIndex + 1) % sliderItems.length; // Loop back when reaching the end
        setActiveSlide(nextIndex);
    }

    function startAutoChange() {
        autoChangeInterval = setInterval(nextSlide, 10000); // Change slide every 3s
    }

    function stopAutoChange() {
        clearInterval(autoChangeInterval);
    }

    // Click event to manually select a slider
    sliderItems.forEach((item, index) => {
        item.addEventListener("click", () => {
             let clickedItem = event.currentTarget;
             if (clickedItem.classList.contains("active")) {
                // Redirect only if already active
                const redirectUrl = item.dataset.redirectUrl;
                window.location.href = "watch.html?" + redirectUrl;
            } else{
                stopAutoChange(); // Stop auto-change when manually clicked
                setActiveSlide(index);
                setTimeout(startAutoChange, 2000); // Restart auto-change after 5s
            }
        });
    });

    // Start automatic slide change
    setActiveSlide(0); // Set the first item active initially
    startAutoChange();

}

// ---------------------------------------------------------------------------------------------------------------------------------
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//============================================================================================================================================================

function AutoScroll_TRENDING() {
        const arrowsRight =  document.getElementById("rarrow")
        const arrowsLeft =   document.getElementById("larrow")
        const movieLists = document.getElementById("TrendingUl")
        const scrollAmount = 310;
        let autoScrollInterval;
        let scroll_pixel = 4;
        let scrollDirection = scroll_pixel;

        // Add event listeners to each right arrow
        arrowsRight.addEventListener("click", () => {
              //console.log("arrowsRight");
              stopAutoScroll();
              movieLists.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });

              setTimeout(startAutoScroll, 2000);
        });


        // Add event listeners to each left arrow
        arrowsLeft.addEventListener("click", () => {
                console.log("arrowsLeft");
                stopAutoScroll();
                movieLists.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth",
                });

                setTimeout(startAutoScroll, 2000);
        });

        function startAutoScroll() {
          stopAutoScroll(); // Ensure only one interval runs
          autoScrollInterval = setInterval(() => {
            movieLists.scrollBy({
              left: scrollDirection, // Move based on direction
              behavior: "smooth",
            });

            // Check if we reached the right end
            if (movieLists.scrollLeft + movieLists.clientWidth >= movieLists.scrollWidth) {
                setTimeout(startAutoScroll, 2000);
                scrollDirection = -scroll_pixel; // Change direction to left
            }

            // Check if we reached the left end
            if (movieLists.scrollLeft <= 0) {
                setTimeout(startAutoScroll, 2000);
                scrollDirection = scroll_pixel; // Change direction to right
            }
          }, 50);
        }

        function stopAutoScroll() {
          clearInterval(autoScrollInterval);
        }
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        movieLists.addEventListener("touchmove", () => {
            stopAutoScroll(); // Stop auto scroll during touch move
        });

        movieLists.addEventListener("touchend", () => {
            isTouching = false;
            setTimeout(() => {
              if (!isTouching) {
                startAutoScroll(); // Restart auto-scroll after touch ends
              }
            }, 7000); // Delay before restarting auto-scroll
        });

        startAutoScroll();
}






//SLIDER_ function --------------------------------------------------------------------------------

async function Slider_Movies(url, show_type) {

  while (true) {
        const response = await fetch(url, { headers });
        const data = await response.json();

        // If `data.results` exists
        if (data.results) {
          //console.log('Results:', data.results);
          Slider_Display(data.results, show_type);
          localStorage.setItem("Slider_Display", JSON.stringify(data.results));
          break;
        } else {
          await sleep(10000);
        }
  }

}

function Slider_Display(movies, show_type) {

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
              let { title, original_name, backdrop_path, first_air_date, poster_path, id, vote_average, overview, release_date } = movie;
              if (backdrop_path === null){
                    backdrop_path ='/nHj7dPNMM2QheZEDb2f7FxlBhUK.jpg';
              }


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

              movieItem.dataset.redirectUrl = `id=${id}&type=${show_type}`;
              Slider_div.appendChild(movieItem);
              start = movieItem;

              const movieItem2 = document.createElement("div");
              movieItem2.classList.add("card");
              movieItem2.innerHTML = `
                    <img class='card_img' src="${IMG_PATH + backdrop_path}" />
                    <div class="overlay_rate">&#9733; ${vote_average}</div>
                    <div class="overlay_title">${show_name}</dvi>
                    </div>
              `;

              movieItem2.dataset.redirectUrl_card = `id=${id}&type=${show_type}`;
              //movieItem2.addEventListener("click", () => { //dblclick
              //  window.location.href = "watch.html?id=" + id + '&type=' + show_type;
              //});
              Swiper_div.appendChild(movieItem2);
              count++;
        }
      });
      start_slider();
      StartSwiper();


  }
}


// get Movies and shows --------------------------------------------------------


async function Latest_Movies(event, page, type) {

  let count = 1;
  let data_json = [];

  while (count <= page) {
      /*
      let res = await fetch(`https://vidsrc.xyz/movies/latest/page-${page}.json`, {"accept": "application/json",});
      let data = await res.json();
      console.log(data['result']);
      data_json = data_json.concat(data['result']) ;
      */
        let url = `https://yts.mx/api/v2/list_movies.json?page=${page}&limit=50&sort_by=year`
        let response = await fetch(url);
        let data = await response.json();
        //console.log("Shown data", data.data.movies);
        data_json = data_json.concat(data.data.movies) ;


      count++;
      break;
    }

  let hold = [];
  console.log(data_json.length)
  for (let i = 0; i < data_json.length; i++) {


     /*
     medium_cover_image
     rating
     runtime
     small_cover_image
     title_english
     */
     let data;
     while(true){
        try{
             let res = await fetch(`https://api.themoviedb.org/3/movie/${data_json[i]['imdb_code']}/external_ids`, {headers});
             data = await res.json();
             //console.log(data.id)
             break
         }catch(error){
            await sleep(1050);
         }
     }

     hold.push({poster_path:data_json[i]['medium_cover_image'], release_date:data_json[i]['year'], vote_average:data_json[i]['rating'], title:data_json[i]['title_english'], id:data.id, runtime:data_json[i]['runtime']});
     showMovies([{poster_path:data_json[i]['medium_cover_image'], release_date:data_json[i]['year'], vote_average:data_json[i]['rating'], title:data_json[i]['title_english'], id:data.id, runtime:data_json[i]['runtime']}]);
  }
  Let_Movies_CK = hold;
  movie_div.innerHTML = "";
  showMovies(hold);
}


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function showMovies(movies) {
  movies.forEach((movie) => {
    let { title, poster_path, id, vote_average, overview, release_date, runtime } = movie;
    if(!id){
      return;
    }

    if (poster_path === null){
        poster_path ='/nHj7dPNMM2QheZEDb2f7FxlBhUK.jpg';
    }
    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    movieItem.innerHTML = `
        <!-- box-1  -->

             <div class="box-img">
                <img class="img-on" src="${poster_path}" alt="">
                <div class="box-img-button">
                     <div class="button_style1"></div>
                     <div class="button_style2"></div>
                </div>
            </div>
            <div class="box_title">${title}</div>
            <div class="container_span">
               <div style="display:flex;">
                    <div  class="badge-type"> mv </div>
                    <div class="badge-type_year">${release_date} </div>
               </div>
               <div class="badge-type_text"> ${runtime} min</div>
               <div  class="badge-type_rating"> &starf;  ${vote_average} </div>
            </div>
    `;

    const boxImg = movieItem.querySelector(".box-img");
        boxImg.addEventListener("click", async() => {
        /*
        let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/external_ids`, {headers});
        let data = await res.json();
        console.log(data)
        */
        window.location.href = "watch.html?id=" + id + "&type=movie";
    });


    const FaveButton = movieItem.querySelector(".button_style2");
    FaveButton.addEventListener("click",  function(event) {
        event.stopPropagation();
        AddToFav(movie);
    });

    const PlayT = movieItem.querySelector(".button_style1");
    PlayT.addEventListener("click",  function(event)  {
        event.stopPropagation(); // Prevent the click from propagating to the boxImg event
        PlayTrailer(id, 'movie'); // Replace 'yourFunction' with the function you want to call
    });

    movie_div.appendChild(movieItem);
  });
}



// get series and shows --------------------------------------------------------








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
                //console.log(data2)
                hold.push({poster_path:data2['poster_path'], first_air_date:data2['first_air_date'], vote_average:data2['vote_average'], original_name:data2['name'], id:data2['id'], S_info: seasons_episode});
                id_prev = data2['id'];
                showTV([{poster_path:data2['poster_path'], first_air_date:data2['first_air_date'], vote_average:data2['vote_average'], original_name:data2['name'], id:data2['id'], S_info: seasons_episode}]);
            }
          }
        }finally{continue;}
  }
  Let_Series_CK  = hold;
  series_div.innerHTML = "";
  showTV(hold);
}




// SHOW TV SECTION -----------------------------------------------------------------------

function showTV(movies) {
  movies.forEach((movie) => {
    let {id, original_name, poster_path, vote_average, overview, first_air_date, S_info } = movie;
    if(!id){
      return;
    }

    if (poster_path === null){
        return;
    }

    let updatedString = first_air_date.substring(0, 4);
    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    movieItem.innerHTML = `
        <!-- box-1  -->

            <div class="box-img">
                <img class="img-on" src="${IMG_PATH + poster_path}" alt="">
                <div class="box-img-button">
                     <div class="button_style1"></div>
                     <div class="button_style2"></div>
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
    });

    const FaveButton = movieItem.querySelector(".button_style2");
    FaveButton.addEventListener("click",  function(event) {
        event.stopPropagation();
        AddToFav(movie);
    });

    const PlayT = movieItem.querySelector(".button_style1");
    PlayT.addEventListener("click",  function(event) {
        event.stopPropagation();
        PlayTrailer(id, 'tv');
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
          localStorage.setItem("Trending_Shows", JSON.stringify(data.results));
          break;
        } else {
          await sleep(10000);
   }
  }
}



function showsTrending(movies) {
  Trending_div.innerHTML = "";
  movies.forEach((movie) => {
    let { id, media_type, original_title,   poster_path, backdrop_path } = movie;

    if (media_type === undefined){
       if(original_title !== undefined ){
          media_type = 'movie'
       }else{
           media_type = 'tv'
       }
     }

    if (poster_path === null){
        poster_path ='/nHj7dPNMM2QheZEDb2f7FxlBhUK.jpg';
    }


    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-list-item");
    movieItem.innerHTML = `
                  <img class="movie-list-item-img" onclick="redirect_function(${id}, '${media_type}')" src="${IMG_PATH + poster_path}" alt="">
    `;

    Trending_div.appendChild(movieItem);
  });
  AutoScroll_TRENDING();
}

function redirect_function(id, media_type) {
  //console.log("watch clicker", id, media_type);
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
            localStorage.setItem('movie_currentPage', `${movie_currentPage}`);
            console.log(  '====',localStorage.getItem('movie_currentPage'))

            let data_json = [];
            /*
            let res = await fetch(`https://vidsrc.xyz/movies/latest/page-${movie_currentPage}.json`,    {"accept": "application/json",});
            let data = await res.json();
            data_json = data_json.concat(data['result']) ;
             */

            let url = `https://yts.mx/api/v2/list_movies.json?page=${movie_currentPage}&limit=50&sort_by=year`
            const response = await fetch(url);
            const data = await response.json();
            console.log("Shown data", data.data.movies);
            data_json = data_json.concat(data.data.movies) ;

            let hold = [];
            for (let i = 0; i < data_json.length; i++) {
                     /*
                     medium_cover_image
                     rating
                     runtime
                     small_cover_image
                     title_english
                     */
                     let data;
                     while(true){
                        try{
                             let res = await fetch(`https://api.themoviedb.org/3/movie/${data_json[i]['imdb_code']}/external_ids`, {headers});
                             data = await res.json();
                             //console.log(data.id)
                             break
                         }catch(error){
                            await sleep(1050);
                         }
                     }

                     hold.push({poster_path:data_json[i]['medium_cover_image'], release_date:data_json[i]['year'], vote_average:data_json[i]['rating'], title:data_json[i]['title_english'], id:data.id, runtime:data_json[i]['runtime']});
                     showMovies([{poster_path:data_json[i]['medium_cover_image'], release_date:data_json[i]['year'], vote_average:data_json[i]['rating'], title:data_json[i]['title_english'], id:data.id, runtime:data_json[i]['runtime']}]);
            }
            button.innerHTML = "Show More &#x21b4;";
            button.setAttribute('data-state', 'show-more');
            //showMovies(hold)
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
            localStorage.setItem('series_currentPage', `${series_currentPage}`);

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

                      hold.push({poster_path:data2['poster_path'], first_air_date:data2['first_air_date'], vote_average:data2['vote_average'], original_name:data2['name'], id:data2['id'], S_info: seasons_episode});
                      showTV([{poster_path:data2['poster_path'], first_air_date:data2['first_air_date'], vote_average:data2['vote_average'], original_name:data2['name'], id:data2['id'], S_info: seasons_episode}]);
                      id_prev = data2['id'];
                    }
                  }
                }finally{continue;}
            }
            button.innerHTML = "Show More &#x21b4;";
            button.setAttribute('data-state', 'show-more');
            //showTV(hold);


            const name = localStorage.getItem('Series');
            const parsedSeries = JSON.parse(name);
            hold = parsedSeries.concat(hold);
            localStorage.setItem("Series", JSON.stringify(hold));
  }
}


//======================================================================================================================



async function Company_Card(company_show) {
       const company_card_contaner =  document.getElementById("company_card_contaner");
       for (const key in company_show) {
                  let company_id = company_show[`${key}`][0];
                  let company_backdrop = company_show[`${key}`][1];



                  let company_card_holder = document.createElement("div");
                  company_card_holder.classList.add("company_card_holder");
                  //company_card_holder.style.background = "url('./Assets/xr.png')";
                  company_card_holder.style.backgroundColor = 'white';

                  let card_each = document.createElement("div");

                  card_each.classList.add("company_card");
                  card_each.style.background = `linear-gradient(to bottom, rgba(0,0,0,0), var(--global-color-bg)), url(${company_backdrop})`;

                  card_each.style.backgroundRepeat = 'no-repeat';
                  card_each.style.backgroundPosition = 'center';
                  card_each.style.backgroundSize = 'contain';
                  card_each.style.backgroundColor = 'transparent';

                  company_card_holder.appendChild(card_each)

                  company_card_contaner.appendChild(company_card_holder);

                  card_each.addEventListener("click", () => { //dblclick
                        window.location.href =  `category.html?xcode=${company_id}`;
                  });

       }


}

 // SWIPER FUNCTION
function StartSwiper() {
  const stack = document.querySelector(".stack");
  const cards = Array.from(stack.children)
    .filter((child) => child.classList.contains("card"))
    .reverse(); // Ensure correct stacking order

  // Append cards in correct order
  cards.forEach((card) => stack.insertBefore(card, stack.firstChild));

  let isSwiping = false;
  let autoplayInterval = setInterval(moveCardLeft, 7000);

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(moveCardLeft, 7000);
  }

  function moveCardLeft() { // Moves last card to front
    if (isSwiping) return;
    isSwiping = true;
    clearInterval(autoplayInterval); // Pause auto swap

    const lastCard = stack.lastElementChild;
    if (!lastCard || !lastCard.classList.contains("card")) return;

    lastCard.classList.add("swap");

    setTimeout(() => {
      lastCard.classList.remove("swap");
      stack.insertBefore(lastCard, stack.firstElementChild);
      isSwiping = false;
      resetAutoplay(); // Restart auto swap
    }, 1300);
  }

  function moveCardRight() { // Moves first card to back
    if (isSwiping) return;
    isSwiping = true;
    clearInterval(autoplayInterval); // Pause auto swap

    const firstCard = stack.firstElementChild;
    if (!firstCard || !firstCard.classList.contains("card")) return;

    firstCard.classList.add("swap_right");

    setTimeout(() => {
      firstCard.classList.remove("swap_right");
      stack.appendChild(firstCard);
      isSwiping = false;
      resetAutoplay(); // Restart auto swap
    }, 1300);
  }

  // TOUCH SWIPE FUNCTIONALITY
  let startX = 0;
  let moveX = 0;

  stack.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  stack.addEventListener("touchmove", function (e) {
    moveX = e.touches[0].clientX - startX;
    e.preventDefault(); // Prevent page scroll while swiping
  });

  stack.addEventListener("touchend", function () {
    if (Math.abs(moveX) > 50) {
      clearInterval(autoplayInterval); // Pause auto swap on manual swipe
      if (moveX < 0) moveCardLeft();  // Swipe left
      else moveCardRight();  // Swipe right
    }
    startX = 0;
    moveX = 0;
  });

  const stack_items = document.querySelectorAll(".stack");
  stack_items.forEach(stack => {
  const children = Array.from(stack.children); // Convert NodeList to an array

  children.forEach((child) => {
    child.addEventListener("click", (event) => {
      const topCard = document.querySelector(".card:nth-last-child(1)");
      const clickedElement = event.target;

      if (clickedElement === topCard || topCard.contains(clickedElement)) {
        // If clicking the top card, redirect
        const redirectUrl_card = child.dataset.redirectUrl_card;
        if (redirectUrl_card) {
          window.location.href = "watch.html?" + redirectUrl_card;
        }
      } else {

        }

    });
  });
});

}



//======================================================================================================================

async function switch_pop(url) {
   while (true) {
        const response = await fetch(url, { headers });
        const data = await response.json();
        if (data.results) { //If `data.results` exists
          console.log('Results:', data.results);
          showsTrending(data.results);
          //localStorage.setItem("Trending_Shows", JSON.stringify(data.results));
          break;
        } else {
          await sleep(10000);
   }
  }
}



// Add event listeners to all options
document.querySelectorAll('.sel_options').forEach((option) => {
   option.addEventListener('click', () => {
     document.querySelectorAll('.sel_options').forEach((el) => {
      el.classList.remove('active');
   });



      console.log('Selected:', option.textContent);
      if(option.textContent === 'Trending'){
          switch_pop(Trending_API_URL)
      } else if  (option.textContent === 'Popular'){

           switch_pop(popular)
      } else if (option.textContent === 'Upcoming'){

            switch_pop(top_rated)
      }else if (option.textContent === 'Top Rated'){
            switch_pop(upcoming)
      }

      option.classList.add('active');

   });
});


//

const category_card = document.querySelectorAll(".category-card");
category_card.forEach((genreElement) => {
    genreElement.addEventListener("click", function () {
        const genreId = genreElement.dataset.genre;
        const genreName = genreElement.textContent;
        window.location.href = "genre.html?" + genreName + '-' + genreId
    });
});


/*

                                <div class="genre_each" data-genre="28">Action</div>
                                <div class="genre_each" data-genre="12">Adventure</div>
                                <div class="genre_each" data-genre="16">Animation</div>
                                <div class="genre_each" data-genre="35">Comedy</div>
                                <div class="genre_each" data-genre="80">Crime</div>
                                <div class="genre_each" data-genre="99">Documentary</div>
                                <div class="genre_each" data-genre="18">Drama</div>
                                <div class="genre_each" data-genre="10751">Family</div>
                                <div class="genre_each" data-genre="9648">Mystery</div>
                                <div class="genre_each" data-genre="10749">Romance</div>
                                <div class="genre_each" data-genre="878">Sci-Fi</div>
                                <div class="genre_each" data-genre="10770">TV Movie</div>
                                <div class="genre_each" data-genre="53">Thriller</div>
                                <div class="genre_each" data-genre="37">Western</div>
                                <div class="genre_each" data-genre="10752">War</div>
*/