

const IMG_PATH = "https://image.tmdb.org/t/p/original";

var headers = {
             "accept": "application/json",
             "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};




const params = getQueryParams();
 if (params) {
      watch_page_id = params['id'];
      console.log(watch_page_id);
      fetch_actor_Jobs(watch_page_id);
 } else { }


async function fetch_actor_Jobs (id){
   let cast_Results_div = document.getElementById('Movie_Results')
   let Crew_Results_div = document.getElementById('TV_Results')


   let movie_url = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`
   let tv_url  = `https://api.themoviedb.org/3/person/${id}/tv_credits?language=en-US`

   const movie_url_res = await fetch(movie_url,   {headers});
   const movie_url_data = await movie_url_res.json();

   const tv_url_res = await fetch(tv_url,   {headers});
   const tv_url_data = await tv_url_res.json();

   let cast = movie_url_data.cast.concat(tv_url_data.cast)
   let crew = movie_url_data.crew.concat(tv_url_data.crew)


   console.log('tv_url_data', cast)
   console.log('movie_url_data', crew)

   Search_Results_SHOW(cast, cast_Results_div);
   Search_Results_SHOW(crew, Crew_Results_div);


}

// Function to get URL parameters
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





function Search_Results_SHOW(movies, display_div) {
  console.log(movies.length);

  //document.getElementById('Search_R_count').innerText = `SEARCH RESULTS  (${movies.length}) :`;
  //document.getElementById('Search_R_title_Display').innerText = `:  ${searchTerm}`;

  display_div.innerHTML = "";
  movies.forEach((movie) => {
    let { original_title, original_name, name, poster_path, id, vote_average, overview, release_date, first_air_date , runtime, S_info} = movie;
    //console.log(movie);
    let title;
    let type;
    let type_r;
    let Info;

    if (original_title === undefined) {
       title = name || original_name;
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
    boxImg.addEventListener("click", async (e) => {
        e.stopPropagation();
        window.location.href = "watch.html?id=" + id + "&type="+type_r;
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


    display_div.appendChild(movieItem);
  });
}
