const search_R_div = document.getElementById("Favorites_Results");
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const Favorites_Data = localStorage.getItem('Favorites');

console.log(Favorites_Data);


if(Favorites_Data === null){
   parsedMovies = [];
} else {
     const parsedMovies = JSON.parse(Favorites_Data);
     console.log(parsedMovies);
     Search_Results_SHOW(parsedMovies);
}



function Search_Results_SHOW(movies) {
  //console.log(movies);
  search_R_div.innerHTML = "";
  movies.forEach((movie) => {
    const { title, original_name, poster_path, id, vote_average, overview, release_date, first_air_date , runtime, S_info} = movie;
    console.log(movie);
    console.log('\n original_title: ', title, '\n original_name: ', original_name, '\n poster_path: ', poster_path, '\n id: ', id, '\n vote_average: ', vote_average, '\n overview: ', overview, '\n release_date: ', release_date, '\n first_air_date: ', first_air_date , '\n runtime: ', runtime, '\n S_info: ', S_info);

    let Box_title;
    let type;
    let Info;

    if (title === undefined) {
       Box_title = original_name;
       date = first_air_date.substring(0, 4);
       type = "tv";
       info =  S_info;

    } else {
        Box_title = title;
        date = release_date.substring(0, 4);
        type = "mv";
        info = `${runtime} min` ;
    }

    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    movieItem.innerHTML = `
             <div class="box-img">
                <img class="img-on" src="${IMG_PATH + poster_path}" alt="">
            </div>
            <div class="box_title">${Box_title}</div>
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
    movieItem.addEventListener("click", () => {
         window.location.href = "watch_page.html?id=" + id + "&type="+type;
       });
    search_R_div.appendChild(movieItem);
  });
}

//=====================================================================================

//======================================= Search ===================================================
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

const searchButton = document.getElementById('toggle-search');
const searchInput = document.querySelector('.search-input');
const icon = document.getElementById("id_search_icon");

searchButton.addEventListener('click', () => {
searchInput.classList.toggle('active');

// Toggle the icon between "search" and "close"
if (searchInput.classList.contains('active')) {
icon.innerHTML = '&#10060;'; // Close icon
} else {
icon.innerHTML = '&#128269;'; // Search icon
}
});
//===================================================================================================