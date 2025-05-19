const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_MOVIE_API = "https://api.themoviedb.org/3/search/movie?&query=";
const SEARCH_TV_API = "https://api.themoviedb.org/3/search/tv?&query=";

const headers = {
"accept": "application/json",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};

const search_R_div = document.getElementById("Search_Results");

 // Extract the search term from URL parameters
 const params = getQueryParams();



 const searchTerm = params['search_query'];
 console.log(searchTerm);

 if (searchTerm) {

   SearchShows(SEARCH_MOVIE_API + searchTerm, SEARCH_TV_API+searchTerm);    // code to fetch and display search results here
 } else {

 }


// =========================================Function to get URL parameters ============================================
 function getQueryParams() {
     const params = {};
     const queryString = window.location.search.substring(1);
     const regex = /([^&=]+)=([^&]*)/g;
     let m;
     while (m = regex.exec(queryString)) {
         params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
     }
     return params;
 }

//======================================= Search ===================================================

async function SearchShows(url, url2) {
  const res1 = await fetch(url, {headers});
  const data1 = await res1.json();

  const response = await fetch(url, { headers });
  const data = await response.json();

  const res2 = await fetch(url2, {headers});
  const data2 = await res2.json();
  //console.log("show ", data1['results']);
  //console.log("mvovie ", data2['results']);
  const combinedData =data1.results.concat(data2.results);
  Search_Results_SHOW(combinedData) ;
}

function Search_Results_SHOW(movies) {
  console.log(movies.length);

  document.getElementById('Search_R_count').innerText = `SEARCH RESULTS  (${movies.length}) :`;
  document.getElementById('Search_R_title_Display').innerText = `:  ${searchTerm}`;

  search_R_div.innerHTML = "";
  movies.forEach((movie) => {
    let { original_title, original_name, poster_path, id, vote_average, overview, release_date, first_air_date , runtime, S_info} = movie;
    console.log(movie);
    let title;
    let type;
    let type_r;
    let Info;

    if (original_title === undefined) {
       title = original_name;
       date = first_air_date.substring(0, 4);
       type = "tv";
       type_r = "tv";

       info = ''; //S_info;

    } else {
        title = original_title;
        date = release_date.substring(0, 4);
        type = "mv";
        type_r = "movie"
        info = ''; //`${runtime} min` ;
    }

    if (poster_path === null){
       return;
    }


    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    movieItem.innerHTML = `
             <div class="box-img">
                <img class="img-on" src="${IMG_PATH + poster_path}" alt="">
                <div class="box-img-button">
                     <div class="button_style1"></div>
                     <div class="button_style2"></div>
                </div>
            </div>
            <div class="box_title">${title}</div>
            <div class="container_span">
               <div style="display:flex;">
                    <div  class="badge-type"> ${type} </div>
                    <div class="badge-type_year"> ${date} </div>
               </div>
               <div class="badge-type_text"> ${info}</div>
               <div  class="badge-type_rating"> &starf;  ${vote_average} </div>
            </div>

    `;
    // Add event listener to open another page when clicked
    //movieItem.addEventListener("click", () => {
    //window.location.href = "watch_page.html?id=" + id + "&type="+type;

    const boxImg = movieItem.querySelector(".box-img");
    boxImg.addEventListener("click", () => {
        window.location.href = "watch.html?id=" + id + "&type="+type_r;
    });

    const FaveButton = movieItem.querySelector(".button_style2");
    FaveButton.addEventListener("click", function(event) {
        event.stopPropagation();
        AddToFav(movie);
    });

    const PlayT = movieItem.querySelector(".button_style1");
    PlayT.addEventListener("click", function(event) {
        event.stopPropagation();
        PlayTrailer(id , type_r);
    });


    search_R_div.appendChild(movieItem);
  });
}


