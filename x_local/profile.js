
const search_R_div = document.getElementById("Favorites_Results");
const logout_btn = document.getElementById("logout_btn");
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
let Favorites_Data = localStorage.getItem('Favorites');
let U_ID = sessionStorage.getItem("U_ID");




//console.log('U_ID :', U_ID)
//console.log('Favorites_Data :', Favorites_Data)



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if(U_ID){
  getUserFavorites(Search_Results_SHOW)
}else{
  User_logout();
}



//let uniqueMovies = '[{"poster_path":"/bfQkqoPXUrWLxDmt71LYWp5A2uZ.jpg","release_date":"2023-10-05","vote_average":7.4,"title":"Terrestrial Verses","id":1112545,"runtime":77},{"poster_path":"/bHRPrOqLEfuTs65SJaycioH3D8v.jpg","release_date":"2024-11-01","vote_average":0,"title":"October 8","id":1383461,"runtime":100},{"poster_path":"/o8ebppnru8hDxlgCFaLSMomhhlS.jpg","release_date":"2025-03-14","vote_average":7.5,"title":"The Actor","id":800367,"runtime":98},{"poster_path":"/bkbmInoAnEaMH4oxpXAXWwKr8Kd.jpg","release_date":"2025-03-26","vote_average":6.9,"title":"A Working Man","id":1197306,"runtime":116}]';
//Search_Results_SHOW(JSON.parse(uniqueMovies))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

logout_btn.addEventListener("click", function() {
      User_logout()
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Search_Results_SHOW(movies) {
  console.log(movies);
  search_R_div.innerHTML = "";
  movies.forEach((movie) => {
    const { title, original_name, poster_path, id, vote_average, overview, release_date, first_air_date , runtime, S_info} = movie;
    //console.log(movie);
    //console.log('\n original_title: ', title, '\n original_name: ', original_name, '\n poster_path: ', poster_path, '\n id: ', id, '\n vote_average: ', vote_average, '\n overview: ', overview, '\n release_date: ', release_date, '\n first_air_date: ', first_air_date , '\n runtime: ', runtime, '\n S_info: ', S_info);

    let Box_title;
    let type;
    let info;
    let date;
    let r_type;
    if (title) {
       Box_title = title;
       date =  release_date ? release_date.substring(0, 4) : null;
       type = "mv";
       r_type= 'movie'
       info = `${runtime} min` ;


    } else {
        Box_title = original_name;
        date = first_air_date.substring(0, 4);
        type = "tv";
        r_type= 'tv'
        info =  S_info ? S_info : null;
    }

    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    movieItem.innerHTML = `

             <div class="box-img">
                <div class='remove_fave'>X</div>
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
         window.location.href = "watch_page.html?id=" + id + "&type="+r_type;
       });

    const FaveButton = movieItem.querySelector(".remove_fave");
    FaveButton.addEventListener("click",  function(event) {
        event.stopPropagation();
        RemoveFromFav(id, Search_Results_SHOW);
    });

    search_R_div.appendChild(movieItem);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
