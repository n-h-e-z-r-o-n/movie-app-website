const IMG_PATH = "https://image.tmdb.org/t/p/original";

//const SEARCH_MOVIE_API = "https://api.themoviedb.org/3/search/movie?include_adult=true&query=";

const SEARCH_MOVIE_API ='https://api.themoviedb.org/3/search/multi?include_adult=true&query=' ;

var headers = {
"accept": "application/json",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};




const search_R_div = document.getElementById("Search_Results");

 // Extract the search term from URL parameters
 const params = getQueryParams();



 const searchTerm = params['search_query'];
 //console.log(searchTerm);

 if (searchTerm) {
   SearchShows(SEARCH_MOVIE_API + searchTerm);    // code to fetch and display search results here
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

async function SearchShows(url) {
  const res1 = await fetch(url, {headers});
  const data1 = await res1.json();

  Search_Results_SHOW(data1.results) ;
}

function Search_Results_SHOW(movies) {
  //console.log(movies);

  document.getElementById('Search_R_count').innerText = `SEARCH RESULTS  (${movies.length}) :`;
  document.getElementById('Search_R_title_Display').innerText = `:  ${searchTerm}`;

  search_R_div.innerHTML = "";
  movies.forEach((movie) => {
    let { media_type, original_title, original_name, name, poster_path, id, vote_average, overview, release_date, first_air_date , runtime, S_info} = movie;

    let title;
    let type;
    let type_r;
    let Info;
    let style = ''
    let SR = ''
    let SR1 = ''
    vote_average = parseInt(vote_average) + '&starf;'

    //console.log(movie);
    if (media_type === "person"){
       let {known_for_department, name, profile_path } = movie;
       style = "border-radius: 50%; background-color: #1B1B1B;"
       date =''
       title = name;
       poster_path = profile_path
       info = known_for_department
       type = ''
       vote_average = ''
       SR = "display: none;";
       SR1 =  SR;

    } else if (media_type === "tv") {
       title = name || original_name;
       date = first_air_date.substring(0, 4);
       type = "tv";
       type_r = "tv";
       SR1 =  "display: none;"


       info = ''; //S_info;

    } else if (media_type  === "movie"){
        title = original_title;
        date = release_date.substring(0, 4);
        type = "mv";
        type_r = "movie"
        info = ''; //`${runtime} min` ;
        SR1 =  "display: none;"
    }

    if (poster_path === null){
       return;
    }


    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    movieItem.innerHTML = `
             <div class="box-img">
                <img class="img-on" style="${style}" src="${IMG_PATH + poster_path}" alt="">
                <div class="box-img-button">
                     <div class="button_style1" style='${SR}'></div>
                     <div class="button_style2" style='${SR1}'></div>
                </div>
            </div>
            <div class="box_title">${title}</div>
            <div class="container_span">
               <div style="display:flex;">
                    <div  class="badge-type"> ${type} </div>
                    <div class="badge-type_year"> ${date} </div>
               </div>
               <div class="badge-type_text"> ${info}</div>
               <div  class="badge-type_rating">  ${vote_average} </div>
            </div>
    `;
    // Add event listener to open another page when clicked
    //movieItem.addEventListener("click", () => {
    //window.location.href = "watch_page.html?id=" + id + "&type="+type;

    if(true){
        const box_title = movieItem.querySelector('.box_title');
        scrambleToText(box_title, title, 20)

        const badge_type_year = movieItem.querySelector('.badge-type_year');
        scrambleToText(badge_type_year, `${date}`, 10)

        const badge_type_text = movieItem.querySelector('.badge-type_text');
        scrambleToText(badge_type_text, info, 10)

        const badge_type_rating = movieItem.querySelector('.badge-type_rating');
        scrambleToText(badge_type_rating, `&starf;  ${vote_average} `, 20)
    }

    const boxImg = movieItem.querySelector(".box-img");
    boxImg.addEventListener("click", async (e) => {
        e.stopPropagation();
        if (media_type === "person"){
            window.location.href = "Actor.html?id=" + id
        }else{
            window.location.href = "watch.html?id=" + id + "&type="+type_r;
        }
    });

    const FaveButton = movieItem.querySelector(".button_style2");
    FaveButton.addEventListener("click", function(event) {
        event.stopPropagation();
        AddToFav(movie, FaveButton );
    });

    const PlayT = movieItem.querySelector(".button_style1");
    PlayT.addEventListener("click", function(event) {
        event.stopPropagation();
        PlayTrailer(id , type_r);
    });


    search_R_div.appendChild(movieItem);
  });
}


