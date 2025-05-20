const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const more_div = document.getElementById("moreUl");

const headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};

const params = getQueryParams();  // Extract the search term from URL parameters

let currentPage = 1;
let currentPage_tv = 1;




if (params['query'] === 'show'){
           let savedState = localStorage.getItem('view_tv')
          if (savedState) {
             savedState = JSON.parse(savedState);
             console.log(savedState)
             showTV(savedState)
           }else{
              Latest_episode()
           }

}
else{
          let savedState = localStorage.getItem('view_movie')
          if (savedState) {
             savedState = JSON.parse(savedState);
             console.log(savedState)
             showMovies(savedState)
           }else{

              Latest_Movies(event, 'movie')
           }

}


// =================================== Function to get URL parameters ===================================
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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function Latest_Movies(event, type) {

  let count = 1
  let data_json = []

    let url = `https://yts.mx/api/v2/list_movies.json?page=${count}&limit=50&sort_by=year`
    let response = await fetch(url);
    let data = await response.json();
    console.log("Shown data", data.data.movies);
    data_json = data_json.concat(data.data.movies) ;

  currentPage = count;
  localStorage.setItem('movie_view_currentPage', `${currentPage}`);

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
            await sleep(1500);
         }
     }

     hold.push({poster_path:data_json[i]['medium_cover_image'], release_date:data_json[i]['year'], vote_average:data_json[i]['rating'], title:data_json[i]['title_english'], id:data.id, runtime:data_json[i]['runtime']});
     showMovies([{poster_path:data_json[i]['medium_cover_image'], release_date:data_json[i]['year'], vote_average:data_json[i]['rating'], title:data_json[i]['title_english'], id:data.id, runtime:data_json[i]['runtime']}]);
    }

  localStorage.setItem("view_movie", JSON.stringify(hold));

  more_div.innerHTML = "";
  showMovies(hold);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showMovies(movies) {
  movies.forEach((movie) => {
    let { title, poster_path, id, vote_average, overview, release_date, runtime } = movie;
    if(!id){
      return;
    }

    if (poster_path === null){
        return;
    }

    const movieItem = document.createElement("div");
    movieItem.classList.add("box");

    movieItem.innerHTML = `
        <!-- box-1  -->

             <div class="box-img">
                <img class="img-on" src="${poster_path}" loading="lazy" alt="">
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
    boxImg.addEventListener("click", () => {
      window.location.href = "watch.html?id=" + id + "&type=movie";
    });


    const FaveButton = movieItem.querySelector(".button_style2");
    FaveButton.addEventListener("click", function(event) {
        event.stopPropagation();
        AddToFav(movie, FaveButton);
    });

    const PlayT = movieItem.querySelector(".button_style1");
    PlayT.addEventListener("click", function(event) {
        event.stopPropagation();
        PlayTrailer(id , 'movie');
    });

    more_div.appendChild(movieItem);
  });
}



async function more_movie(){
  const button = document.getElementById("pagination_f");
  const state = button.getAttribute('data-state');
  console.log(state)
  if (state ==='show-more'){
            button.textContent = "Loading...";
            button.setAttribute('data-state', 'loading');

            let currentPage = parseInt(localStorage.getItem('movie_view_currentPage')) || 1;
            currentPage = currentPage + 1;
            localStorage.setItem('movie_view_currentPage', `${currentPage}`);
            console.log(  '====', currentPage)

            let data_json = [];
            /*
            let res = await fetch(`https://vidsrc.xyz/movies/latest/page-${movie_currentPage}.json`,    {"accept": "application/json",});
            let data = await res.json();
            data_json = data_json.concat(data['result']) ;
             */

            let url = `https://yts.mx/api/v2/list_movies.json?page=${currentPage}&limit=50&sort_by=year`
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

            showMovies(hold)

            const name = localStorage.getItem('view_movie');
            const parsedSeries = JSON.parse(name);
            hold = parsedSeries.concat(hold);
            localStorage.setItem("view_movie", JSON.stringify(hold));

    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function Latest_episode(event) {

  let count = 1;

  let data_json = [];
  let id_prev = 0;

  while (count <= 1) {
      let res = await fetch(`https://vidsrc.xyz/episodes/latest/page-${count}.json`, {"accept": "application/json",});

      let data = await res.json();
      if(Array.isArray(data['result'])){
        data_json = data_json.concat(data['result']) ;
        count++;
      }else{
        itemValues = Object.values(data.result);
        data_json = data_json.concat(itemValues) ;
        count++;
      }
      //break;
    }
  currentPage_tv =   count - 1;
  localStorage.setItem('tv_view_currentPage', `${currentPage_tv}`);
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

                hold.push({poster_path:data2['poster_path'], first_air_date:data2['first_air_date'], vote_average:data2['vote_average'], original_name:data2['name'], id:data2['id'], S_info: seasons_episode});
                id_prev = data2['id'];
                showTV([{poster_path:data2['poster_path'], first_air_date:data2['first_air_date'], vote_average:data2['vote_average'], original_name:data2['name'], id:data2['id'], S_info: seasons_episode}]);
            }
          }
        }finally{continue;}
  }


  localStorage.setItem("view_tv", JSON.stringify(hold));
  more_div.innerHTML = "";
  showTV(hold);
}

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
                <img class="img-on" src="${IMG_PATH+poster_path}" alt="" loading="lazy">
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


    const boxImg = movieItem.querySelector(".box-img");
    boxImg.addEventListener("click", () => {
        window.location.href = "watch.html?id=" + id + "&type=tv";
    });


    const FaveButton = movieItem.querySelector(".button_style2");
    FaveButton.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent the click from propagating to the boxImg event
        AddToFav(movie, FaveButton); // Replace 'yourFunction' with the function you want to call
    });

    const PlayT = movieItem.querySelector(".button_style1");
    PlayT.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent the click from propagating to the boxImg event
        PlayTrailer(id, 'tv'); // Replace 'yourFunction' with the function you want to call
    });

    more_div.appendChild(movieItem); // Append the `movieItem` to the container
  });
}



async function more_series(){

  const button = document.getElementById("pagination_f");
  const state = button.getAttribute('data-state');


  if (state ==='show-more'){
            button.textContent = "Loading...";
            button.setAttribute('data-state', 'loading');


            let currentPage_tv = parseInt(localStorage.getItem('tv_view_currentPage')) || 2;
            currentPage_tv = currentPage_tv + 1;
            localStorage.setItem('tv_view_currentPage', `${currentPage_tv}`);
            console.log(  '====', currentPage_tv)



            let data_json = [];
            let id_prev = 0;

            let res = await fetch(`https://vidsrc.xyz/episodes/latest/page-${currentPage_tv}.json`,  {"accept": "application/json",});
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
            showTV(hold);

            const name = localStorage.getItem('view_tv');
            const parsedSeries = JSON.parse(name);
            hold = parsedSeries.concat(hold);
            localStorage.setItem("view_tv", JSON.stringify(hold));
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function run_more(){
        if (params['query'] === 'show'){
                   more_series()
        }
        else{
                more_movie()
        }
}


// Event listeners for pagination buttons
document.getElementById("pagination_f").addEventListener("click", () => run_more());




