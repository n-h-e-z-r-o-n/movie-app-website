function loadCSS(filePath) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = filePath;
    document.head.appendChild(link);
}

loadCSS("./admin.css");



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let Movie_nav= document.getElementById('Movie_nav')
let Home_nav= document.getElementById('Home_nav')
let Tv_nav= document.getElementById('Tv_nav')



let Movie_div= document.getElementById('Movie_Results')
let TV_div= document.getElementById('TV_Results')
let Home_div= document.getElementById('Home_Results')
let Search_div= document.getElementById('Search_Results')

let Search_Movie = document.getElementById('Search_Movie')
let Search_TV = document.getElementById('Search_TvShow')





//let Server_S_location = "https://movionyx.com/Server_S.php"

let Server_S_location = "./Retrive_Movie.php"
let upload_admin_location = './advanceUpload.php'
let UploadTaskDetail = "./UploadTaskDetail.php?task_id="
let RenameVideo_location = "./RenameVideo.php"
let data_write_location = "./data_write.php"
let data_retrieve_location = "./data_retrive.php"
let fetch_all_location = "./fetch_all.php"


const headers = {
      "accept": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};

let section_container;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////     SEARCH       /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


document.getElementById('Search_Movie').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {


    event.preventDefault();  // Prevents the default "Enter" key behavior
    const searchValue = event.target.value.trim(); // Trim whitespace

    if (searchValue  !== "") {
        searchValue.value = "";

        Search_div.style.display =  'flex';
        Movie_div.style.display = 'none';
        TV_div.style.display = 'none';
        Home_div.style.display =  'none';

        //console.log("Movies: \t", searchValue)
        Search_url(searchValue, Search_div, 'movie')
    } else {
     Search_div.style.display =  'none';
     }
  }
});


document.getElementById('Search_TvShow').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();  // Prevents the default "Enter" key behavior
    const searchValue = event.target.value.trim(); // Trim whitespace

    if (searchValue  !== "") {
        searchValue.value = "";

        Search_div.style.display =  'flex';
        Movie_div.style.display = 'none';
        TV_div.style.display = 'none';
        Home_div.style.display =  'none';

        //console.log("TV: \t", searchValue)
        Search_url(searchValue, Search_div, "tv")
    } else {
    Search_div.style.display =  'none';
    }
  }
});



Home_nav.addEventListener('click', function(event) {
       Movie_div.style.display = 'none';
       TV_div.style.display = 'none';
       Search_div.style.display = 'none';
       Home_div.style.display =  'flex';

       Movie_nav.style.color = 'gray';
       Home_nav.style.color = '#6DA9D2';
       Tv_nav.style.color = 'gray';
       section_container = 'Home_nav'


});

Movie_nav.addEventListener('click', function(event) {
       Movie_div.style.display = 'flex';
       TV_div.style.display = 'none';
       Search_div.style.display = 'none';
       Home_div.style.display =  'none';


       Movie_nav.style.color = '#6DA9D2';
       Home_nav.style.color = 'gray';
       Tv_nav.style.color = 'gray';

       Search_Movie.style.display =  'flex';
       Search_TV.style.display =  'none';
       section_container = 'Movie_nav'

});



Tv_nav.addEventListener('click', function(event) {
       Movie_div.style.display = 'none';
       Search_div.style.display = 'none';
       Home_div.style.display =  'none';
       TV_div.style.display = 'flex';

       Movie_nav.style.color = 'gray';
       Home_nav.style.color = 'gray';
       Tv_nav.style.color = '#6DA9D2';


       Search_Movie.style.display =  'none';
       Search_TV.style.display =  'flex';
        section_container = 'Tv_nav'

});

Movie_nav.click();

/*
document.getElementById('Search_nav').addEventListener('click', function(event) {
       Movie_div.style.display = 'none';
       TV_div.style.display = 'none';
       Search_div.style.display = 'flex';
       Home_div.style.display =  'none';
});
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


document.getElementById('show_more_g').addEventListener('click', function(event) {
       Show_More_F();
});

document.getElementById('Fill_Data-Store').addEventListener('click', function(event) {
       FILL_DATA_STORE();
});

document.getElementById('Rename_Uploaded').addEventListener('click', function(event) {
      auto_rename();
});

let terminal_control = true
document.getElementById('terminal_control').addEventListener('click', function(event) {
      let terminal =  document.getElementById('terminal')
      if (terminal_control){
           terminal.style.display = 'none';
      }else{
           terminal.style.display = 'block';
      }
      terminal_control = !terminal_control;
});

document.getElementById('Refresh_Feed').addEventListener('click', function(event) {

      Movie_div.innerHTML = '';
      TV_div.innerHTML = '';


      localStorage.removeItem("home_page_count")
      localStorage.removeItem("home_page_data")
      let home_page_count =  1;
      let home_page_data =  [];

      localStorage.removeItem("tv_page_count")
      localStorage.removeItem("tv_page_data")
      let tv_page_count = 1;
      tv_page_data =  [];

      window.location.href = '';
});

document.getElementById('Direct_Upload').addEventListener('click', function(event) {
      var Direct_link_Results = document.getElementById('Direct_link_Results')
      Direct_link_Results.style.display = 'flex';
      document.getElementById('Direct_link_Results_close').addEventListener('click', function(event) {
         Direct_link_Results.style.display = 'none';
      });
      const submitBtn = document.getElementById('submitBtn');
});

submitBtn.addEventListener('dblclick', function() {
            const name = document.getElementById('nameInput').value;
            const M_link = document.getElementById('linkInput').value;
            if(name && M_link) {
                Direct_uploadVideo(M_link, name, submitBtn, "1024p")
            }
 });




async function Direct_uploadVideo(magnet_link, title, box,  quality){
              box.disabled = true;

              const upload_url = `${upload_admin_location}?url=${encodeURIComponent(magnet_link)}&name=${encodeURIComponent(title)}`
              const response = await fetch(upload_url);
              const data = await response.json();

              let task_id = data.id;
              if(task_id){
                    console.log("=====================================================================================================================================================")
                    console.log("\n\n DIRECT UPLOAD INITIATED ")

                  box.classList.add('success-state');
                  console.log(" UPLOADING : \t : ", title);
                  console.log(" UPLOADING QUALITY : \t : ", quality);

                  console.log(" TASK ID  : \t:", data.id )

                    document.getElementById('nameInput').value = '';
                    document.getElementById('linkInput').value = '';
                  console.log("==================================================================================================================================================================\n\n")
                  box.disabled = false;
              }else{
                   console.log("Upload Error: ", data);
                           box.disabled = false;
              }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function get_Tasklist() {
    const response = await fetch('read_tracks.php');
    Tasklist =  await response.json();
    return Tasklist
}



async function saveUploadedTracks(tracks) {
        const response = await fetch('write_tracks.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tracks)
        });
        const data = await response.json();
}


let Tasklist;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  MOVIE SECTION  ////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let View_More_Movie_Results= document.getElementById('View_More_Movie_Results')
document.getElementById('View_More_Movie_container_close').addEventListener('click', function(event) {
       View_More_Movie_Results.style.display = 'none';
});



let home_page_count =    parseInt(localStorage.getItem("home_page_count")) || 1;
let home_page_data = JSON.parse(localStorage.getItem("home_page_data")) || [];
//console.log("home_page_data", home_page_data);

if(home_page_data.length > 0){
   showMovies(home_page_data)
}else{
   fetchMovies(home_page_count)
}



async function Search_url(search_term, div_element, type) {
    if(type==='movie'){
        let page = 1;
        let url = `https://yts.mx/api/v2/list_movies.json?page=${page}&limit=50&sort_by=year&query_term=${search_term}`
        const response = await fetch(url);
        const data = await response.json();
        //console.log("Search Data : \t", data)
        Show_SearchResults(data.data.movies, div_element)
    }else{
        let page = 1;
        let url = `https://api.themoviedb.org/3/search/tv?query=${search_term}&include_adult=false&language=en-US&page=1`
        const response = await fetch(url, {headers});
        const data = await response.json();
        //console.log("Search Data : \t", data.results)
        Show_tv_SearchResults(data.results, div_element)
    }
}
//d

async function fetchMovies(num) {
    let url = `https://yts.mx/api/v2/list_movies.json?page=${home_page_count}&limit=50&sort_by=year` // download_count
    const response = await fetch(url);
    const data = await response.json();

    home_page_data  =  home_page_data.concat(data.data.movies);
    localStorage.setItem("home_page_data", JSON.stringify(home_page_data));
    showMovies(data.data.movies)

}

async function Show_SearchResults(movies, dive_element) {
  dive_element.innerHTML = '';

  if(movies===undefined){
     return;
  }

  movies.forEach((movie) => {
        let { id, title, year, imdb_code, medium_cover_image, large_cover_image, torrents } = movie;

        const movieItem = document.createElement("div");
        movieItem.classList.add("box");

        movieItem.innerHTML = `
            <!-- box-1  -->

                 <div class="box-img">
                    <img class="img-on" loading="lazy" src="${medium_cover_image}" alt="">
                    <div class="box-img-button">
                         <div class="button_style1"></div>
                         <div class="button_style2"></div>
                    </div>
                 </div>
                 <div class="box_title">${title}</div>
                 <div class="box_title">${year}</div>
              </div>
        `;
       dive_element.appendChild(movieItem);
       check_movie(imdb_code, movieItem);

       const boxImg = movieItem.querySelector(".box-img");
       boxImg.addEventListener("click", () => {
                 View_More_Movie_Results_fill (movie, movieItem)
       });
  });
}



async function showMovies(movies) {
  // console.log("movies : ", movies)
  movies.forEach((movie) => {
        let { id, title, year, imdb_code, large_cover_image, torrents } = movie;

        const movieItem = document.createElement("div");
        movieItem.classList.add("box");

        movieItem.innerHTML = `
            <!-- box-1  -->

                 <div class="box-img">
                    <img class="img-on" loading="lazy" src="${large_cover_image}" alt="">
                    <div class="box-img-button">
                         <div class="button_style1"></div>
                         <div class="button_style2"></div>
                    </div>
                 </div>
                 <div class="box_title">${title}</div>
                 <div class="box_title">${year}</div>
              </div>
        `;
       Movie_div.appendChild(movieItem);
       check_movie(imdb_code, movieItem);

       const boxImg = movieItem.querySelector(".box-img");
       boxImg.addEventListener("click", () => {
                View_More_Movie_Results_fill (movie, movieItem)
       });

  });
}


let Movie_submitBtn =  document.getElementById('Movie_submitBtn')
async function View_More_Movie_Results_fill (data, div_m){
    View_More_Movie_Results.style.display = 'flex';
    var poster_show = document.getElementById("View_More_movie_image");
    poster_show.style.background  = `url("${data.large_cover_image}")`;
    poster_show.style.backgroundPosition = 'center';
    poster_show.style.backgroundRepeat = 'no-repeat';
    poster_show.style.backgroundSize = '100% 100%';

    var name = document.getElementById("view_show_movie_name");
    name.innerHTML = data.title;

    var name = document.getElementById("view_show_movie_id");
    view_show_id.innerHTML = data.id;
    let data_json =  data.torrents

    var View_More_Movie_downloadLinks = document.getElementById("View_More_Movie_downloadLinks");
    View_More_Movie_downloadLinks.innerHTML = '';
    for (let i = 0; i < data_json.length; i++){
            const link = document.createElement('div');
            link.className = 'each_downloadLinks';
            link.innerHTML = `
                                <div class="each_downloadLinks_SE"> ${data_json[i].quality} // EP ${data_json[i].size} </div>
                                <div  class="each_downloadLinks_name"> ${data.title}</div>
                                <div class="each_downloadLinks_seeds_peers">Seeds: ${data_json[i].seeds} || Peers: ${data_json[i].peers}</div>
            `;


            link.addEventListener("click", () => {
                 let hash = data_json[i].hash
                 let magnetLink = `magnet:?xt=urn:btih:${hash}`;

                 let title = `${data.title} (${data.year})`

                 //console.log( title, " -- ", i, " -- ", magnetLink, '--', data.imdb_code, "-- ", data_json[i].quality )
                 uploadVideo(data.imdb_code, magnetLink, title, div_m, data_json[i].quality);
             });
            View_More_Movie_downloadLinks.appendChild(link);
    }

    const handle_M_Submit = function() {
        let Movie_direct_link = document.getElementById('Movie_direct_link').value;
        Movie_direct_link = Movie_direct_link.trim()
        if(Movie_direct_link !== '') {
            uploadVideo(data.imdb_code, Movie_direct_link, data.title, div_m, "1024p");
        }
   };
   Movie_submitBtn.removeEventListener('dblclick', handle_M_Submit);
   Movie_submitBtn.addEventListener('dblclick', handle_M_Submit);
}


async function uploadVideo(imdb_code, magnet_link, name, box, quality){
           const classList = box.classList
           console.log(classList)
           console.log(classList[1])
           if(classList[1] === 'success-state' ){
              return
           }
           if(classList[1] === 'exist-state' ){
             return
           }

           if(classList[1] === undefined){
              box.classList.add('error-state');
              return;
           }
          box.classList.remove('not_exist-state');

          let find_url =`https://api.themoviedb.org/3/find/${imdb_code}?external_source=imdb_id`
          const find_response = await fetch(find_url, {method: 'GET', headers });
          const find_data = await find_response.json();

          //console.log(find_data.movie_results)
          let title = name + ' _' + find_data.movie_results[0].id;
          let imdb = find_data.movie_results[0].id

           const itemExists = Tasklist.some(item => item.name === title);
           if(!itemExists){
                document.getElementById('Movie_direct_link').value = ''
           }else{
                console.log("UPLOAD ERROR  MOVIE ALREADY IN QUEUE : \t",  title);
                return;
           }

          console.log("=====================================================================================================================================================")
          console.log("\n\n UPLOAD INITIATED ")

          console.log(" SHOW NAME : \t:", title )

          let url_v = `${Server_S_location}?search=_${imdb}`;
          const res = await fetch( url_v);
          const data = await res.json();

          if(!data['data'][0]){

              const upload_url = `${upload_admin_location}?url=${encodeURIComponent(magnet_link)}&name=${encodeURIComponent(title)}`
              const response = await fetch(upload_url);
              const data = await response.json();


              let task_id = data.id;
              if(task_id){
                  Upload_status_check(task_id, title, box, imdb, imdb_code);

                  Tasklist = await get_Tasklist()
                  Tasklist.push( { "task_id": task_id, "name": title , "show_id": imdb , 'imdb_code': imdb_code })
                  saveUploadedTracks(Tasklist)


                  console.log(" TASK ID  : \t:", data.id )
                  box.classList.add('success-state');
                  console.log(" UPLOADING : \t : ", title);
                  console.log(" UPLOADING QUALITY : \t : ", quality);


                  console.log("==================================================================================================================================================================\n\n")
              }else{
                   console.log("Upload Error: ", data);
                   console.log("===================================================================================================================================================================")


              }

          } else{

               video_id = data['data'][0].id
               console.log(" Upload Canceled: Upload already Exists: \t\t-Video_id : ", video_id, "\t\t-Name : ", title)
               console.log("===================================================================================================================================================================")
               box.classList.remove('not_exist-state');
               box.classList.remove('success-state');
               box.classList.add('exist-state');

               let write_url = `${data_write_location}?video_id=${video_id}&show_id=${imdb}`
               const write_response = await fetch(write_url);
               const write_data = await write_response.json();
          }
}



async function  Upload_status_check(task_id, name, box , show_id, imdb_code){

        while(1){
            let task_detail_url =  UploadTaskDetail + task_id
            const response = await fetch(task_detail_url);
            const data = await response.json();

            console.log("\n\n TASK PROGRESS: \t:", name, '-\t Task_ID :', task_id, '-\t Task Status :', data.status)

            if(data.status === 'Processing' ){
               await sleep(2000000);  // Wait for 5 minutes
               continue;
            }
            if(data.status === 'Queued' ){
               await sleep(2000000);  // Wait for 5 minutes
               continue;
            }

            if(data.status === 'Failed' ){

                   Tasklist = await get_Tasklist()
                   Tasklist = Tasklist.filter(item => item.task_id !== task_id);
                   saveUploadedTracks(Tasklist)


                   box.classList.remove('not_exist-state');
                   box.classList.remove('success-state');
                   box.classList.add('error-state');
                   break;
            }

            if(data.status === 'undefined' ){
                    Tasklist = await get_Tasklist()
                    Tasklist = Tasklist.filter(item => item.task_id !== task_id);
                    saveUploadedTracks(Tasklist)

                   box.classList.remove('not_exist-state');
                   box.classList.remove('success-state');
                   box.classList.add('error-state');
                   break;
            }

             if(data.status === 'Completed'){
                let video_id  =  data.videos[0];

                let write_local = `${data_retrieve_location}?show_id=${show_id}`
                const retrieve_local_response = await fetch(write_local);
                const retrieve_local_data = await retrieve_local_response.json();
                //console.log("RETRIEVED_DATA_STORED :", retrieve_local_data)

                if(retrieve_local_data.Feedback ==="show_id not found"){

                        let video_rename_url = `${RenameVideo_location}?video_id=${video_id}&new_name=${encodeURIComponent(name)}`
                        const rename_response = await fetch(video_rename_url);
                        const rename_data = await rename_response.json();
                        console.log( "\t\t\t",name , "\t\t -Rename-Status : ", rename_data.success)

                        let write_url = `${data_write_location}?video_id=${video_id}&show_id=${show_id}`
                        const write_response = await fetch(write_url);
                        const write_data = await write_response.json();
                        console.log("\t\t\t", name ,'\t\t',write_data.feedback)


                        box.classList.remove('not_exist-state');
                        box.classList.remove('success-state');
                        box.classList.remove('error-state');
                        box.classList.add('exist-state');
                }
                break;
             }
       }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function  check_movie(imdb_code, BOX) {

           Tasklist = await get_Tasklist()

           //console.log("Tasklist : ", Tasklist);
           for (const [index, task] of Tasklist.entries()) {
                //console.log(`Task ${index + 1}:`);
                //console.log(`  ID: ${task.task_id}`);
                //console.log(`  Name: ${task.name}`);
                //console.log(`  show_id: ${task.show_id}`);
                //console.log(`  imdb_code: ${task.imdb_code}`);
                //console.log(imdb_code, ' ===' ,task.imdb_code, ' --- ' );
                if (imdb_code === task.imdb_code) {
                        BOX.classList.add('success-state');
                        return;
                }
           }


            let find_url =`https://api.themoviedb.org/3/find/${imdb_code}?external_source=imdb_id`
            const find_response = await fetch(find_url, {method: 'GET', headers });
            const find_data = await find_response.json();

            if(find_data.movie_results[0]){
                let write_url = `${data_retrieve_location}?show_id=${find_data.movie_results[0].id}`;
                const write_response = await fetch( write_url);
                const write_data = await write_response.json();

                //console.log("log :", write_data)

                if(write_data.Feedback.video_id){
                   BOX.classList.add('exist-state')
                }else{
                   BOX.classList.add('not_exist-state')
                }
            }else{
                BOX.classList.add('error-state');
            }

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  TV-SHOW SECTION  /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let View_More_Results= document.getElementById('View_More_Results')
let Season_Selector = document.getElementById('Season_Selector')

document.getElementById('View_More_container_close').addEventListener('click', function(event) {
       View_More_Results.style.display = 'none';
});

document.getElementById('Season_btn').addEventListener('click', function(event) {
       Season_Selector.style.display = 'block';
});



let Hold_current_torrents_view;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

let tv_page_count =  parseInt(localStorage.getItem("tv_page_count")) || 1;
let tv_page_data = JSON.parse(localStorage.getItem("tv_page_data")) || [];

if(tv_page_count > 1){
   showTV(tv_page_data, TV_div)
}else{
   tv_fetch(1);
}

async function tv_fetch(page) {

     let show_url = `https://eztvx.to/api/get-torrents?limit=100&page=${page}`
     const response = await fetch(show_url);
     const data = await response.json();
     //console.log(data.torrents)

     let data_json = data.torrents;

    data_json =  data_json.filter((item, index, self) =>
          index === self.findIndex((t) => t.imdb_id === item.imdb_id)
    );



     let hold = []
     for (let i = 0; i < data_json.length; i++) {
        if(data_json[i]['imdb_id'] === '0'){
          continue;
        }

        let res2 = await fetch(`https://api.themoviedb.org/3/find/tt${data_json[i]['imdb_id']}?external_source=imdb_id`, {headers});
        let data2 = await res2.json();

        let found_data =  data2.tv_results
        //console.log(data_json[i]['imdb_id'] , " - " ,found_data)

        if(found_data.length <= 0){
          continue;
        }

       let poster_path_ = IMG_PATH + found_data[0]['poster_path']
       let first_air_date_ =found_data[0]['first_air_date']
       let original_name_ = found_data[0]['name']
       let id_ = found_data[0]['id']
       let seasons_episode_ = ''
       let vote_average_ = found_data[0]['vote_average']

       hold  =  hold.concat([{poster_path:poster_path_, first_air_date:first_air_date_ , vote_average:vote_average_, original_name:original_name_, id:id_, S_info: seasons_episode_,imdb_id:data_json[i]['imdb_id'] }]);
       //console.log([{poster_path:poster_path_, first_air_date:first_air_date_ , vote_average:vote_average_, original_name:original_name_, id:id_, S_info: seasons_episode_, imdb_id:data_json[i]['imdb_id'] }])
       showTV([{poster_path:poster_path_, first_air_date:first_air_date_ , vote_average:vote_average_, original_name:original_name_, id:id_, S_info: seasons_episode_,imdb_id:data_json[i]['imdb_id'] }], TV_div);
     }

    tv_page_data  =  tv_page_data.concat(hold);
    localStorage.setItem("tv_page_data", JSON.stringify(tv_page_data));
}



function showTV(movies, div_container) {
  movies.forEach((movie) => {
    //console.log(movie)

    let {id, original_name, poster_path, vote_average, overview, first_air_date, S_info, imdb_id } = movie;
    if(!id){
      return;
    }

    if (poster_path === null){
        poster_path ='/nHj7dPNMM2QheZEDb2f7FxlBhUK.jpg';
    }

    let updatedString = first_air_date.substring(0, 4);
    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    movieItem.innerHTML = `
        <!-- box-1  -->

            <div class="box-img">
                <img class="img-on" src="${poster_path}" alt="">
            </div>
            <div class="box_title">${original_name}</div>
            <div class="box_title"> ${updatedString} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &starf;  ${vote_average} </div>
            <div class="box_title"> ${S_info} </div>
            </div>

    `;

    const boxImg = movieItem.querySelector(".box-img");
    boxImg.addEventListener("click", () => {
        View_More_Results.style.display = 'flex';
        View_More_Results_fill(id,  imdb_id)
    });


     div_container.appendChild(movieItem); // Append the `movieItem` to the container
  });
}


async function View_More_Results_fill (id, imdb_id){
      const elementsToReset = [
        "last_air_date",
        "first_air_date",
        "view_show_name",
        "number_of_seasons",
        "number_of_episodes",
        'Season_Selector',
        "Episodes_show"
    ];
     elementsToReset.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "";
    });


    let res2 = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {headers});
    let Details = await res2.json();

    //console.log("'Details :", Details)
    //console.log("'imdb_id :", imdb_id)
    tv_shows_links(imdb_id)

    var poster_show = document.getElementById("View_More_image");
    poster_show.style.background  = `url("${IMG_PATH}${Details['poster_path']}")`;
    poster_show.style.backgroundPosition = 'center';
    poster_show.style.backgroundRepeat = 'no-repeat';
    poster_show.style.backgroundSize = 'cover';

    var last_air_date = document.getElementById("last_air_date");
    last_air_date.innerHTML = "Last Air Date " + Details['last_air_date'];

    const last_episode_to_air  = Details.last_episode_to_air || {
        episode_number: 0,
        season_number: 0
    };

    var last_air_date = document.getElementById("first_air_date");
    last_air_date.innerHTML = "Air Date :" + Details['first_air_date'];

    var name = document.getElementById("view_show_name");
    name.innerHTML = Details['name'];

    var name = document.getElementById("view_show_id");
    view_show_id.innerHTML = Details['id'];

    var number_of_seasons = document.getElementById("number_of_seasons");
    number_of_seasons.innerHTML = "Total Seasons : " + Details['number_of_seasons']

    var number_of_episodes = document.getElementById("number_of_episodes");
    number_of_episodes.innerHTML = "Total Episodes : " + Details['number_of_episodes']

    let seasons = ''
    for (let i = 0; i < Details['seasons'].length; i++){
            seasons  = seasons +  `<div class="season_each"
                                   onclick="show_episodes(
                                        ${Details['seasons'][i]['episode_count']},
                                        ${Details['seasons'][i]['season_number']},
                                        '${encodeURIComponent(Details['seasons'][i]['poster_path'])}',
                                        ${last_episode_to_air.episode_number},
                                        ${last_episode_to_air.season_number},
                                        ${id},
                                        '${Details['name'].replace(/'/g, "\\'")}'
                                    )"
                                    >  ${Details['seasons'][i]['name']} </div>`
    }

    Season_Selector.innerHTML  = seasons;
}

async function show_episodes(episode_count, season_number, poster_path,  last_episode, last_season, series_id, title){


    Season_Selector.style.display = 'none';
    var Episodes_show = document.getElementById("Episodes_show");
    if(poster_path !== null){
        var poster_show = document.getElementById("View_More_image");
        poster_show.style.background  = `url("${IMG_PATH}${decodeURIComponent(poster_path)}")`;
        poster_show.style.backgroundPosition = 'center';
        poster_show.style.backgroundRepeat = 'no-repeat';
        poster_show.style.backgroundSize = 'cover';
    }

      let i = 1
      let not_out_class = '';
      let episode_list_divs = `<div class="Episodes_show_title">SEASON ${season_number}</div>`;
      //console.log('last_season : ', last_season)
      //console.log('last_episode : ', last_episode)
      //console.log('season_number : ', season_number)
      while(i <= episode_count){

                if(last_season === season_number){
                  if(i > last_episode){
                     not_out_class = 'episodes_each_not_out';
                  }          }
                let hold_div = `<div class="episodes_each ${not_out_class}" data-season='${i}'
                                onclick="tv_shows_links_episode('${season_number}', '${i}', '${series_id}', '${title.replace(/'/g, "\\'")}')"
                                >Episode ${i}</div>`;
                episode_list_divs = episode_list_divs + hold_div
                i++;
      }
      Episodes_show.innerHTML = episode_list_divs
      check_episode_stored (season_number, episode_count, series_id)
}



//View_More_Results_fill(233256,'28228082' )
//tv_shows_links('0239195')


async function tv_shows_links(imdb_id){

    var View_More_downloadLinks = document.getElementById("View_More_downloadLinks");
    View_More_downloadLinks.innerHTML = '';

    let count = 1;
    let total_count = 1;
    let hold = []

    while(count<=total_count){

            let show_url = `https://eztvx.to/api/get-torrents?limit=100&page=${count}&imdb_id=${imdb_id}`
            //console.log(show_url)
            const response = await fetch(show_url);
            const data = await response.json();

            //console.log(data.torrents)
            hold = hold.concat(data.torrents)
            total_count = Math.ceil(data.torrents_count / data.limit);
            //console.log('total_count: ', total_count);

            count++;
    }

    //console.log('hold: ', hold);
    Hold_current_torrents_view = hold

    let torrents =  hold;

    torrents.forEach(torrent => {

            //console.log(torrent)
            const link = document.createElement('div');
            link.className = 'each_downloadLinks';
            link.innerHTML = `
                                <div class="each_downloadLinks_SE"> S${torrent.season} // EP ${torrent.episode} </div>
                                <div  class="each_downloadLinks_name"> ${torrent.title}</div>
                                <div class="each_downloadLinks_seeds_peers">Seeds: ${torrent.seeds} || Peers: ${torrent.peers}</div>
            `;
            View_More_downloadLinks.appendChild(link);
    });
}


let episode_submitBtn =  document.getElementById('episode_submitBtn')
async function tv_shows_links_episode(season, episode, series_id, tv_title){
    document.querySelectorAll('.episodes_each').forEach(item => {
            const episode_num = item.dataset.season
            item.classList.remove('episodes_each_select');
            if(episode==episode_num){
                  item.classList.add('episodes_each_select');
            }
    });


   const torrents = Hold_current_torrents_view.filter(torrent =>
            torrent.season	=== season &&
            torrent.episode  === episode
   );

   View_More_downloadLinks.innerHTML = '';
   torrents.forEach(torrent => {
        const link = document.createElement('div');
        link.className = 'each_downloadLinks';
        link.innerHTML = `
                            <div class="each_downloadLinks_SE"> S${torrent.season} // EP ${torrent.episode} </div>
                            <div  class="each_downloadLinks_name"> ${torrent.title}</div>
                            <div class="each_downloadLinks_seeds_peers">Seeds: ${torrent.seeds} || Peers: ${torrent.peers}</div>
        `;
        View_More_downloadLinks.appendChild(link);

        link.addEventListener("dblclick", () => {
                let magnet_link = `magnet:?xt=urn:btih:${torrent.hash}`;
                Tv_show_upload(torrent.season, torrent.episode, magnet_link, series_id, tv_title)
        });
    });


   const handleSubmit = function() {
        let episode_direct_link = document.getElementById('episode_direct_link').value;
        episode_direct_link = episode_direct_link.trim()
        if(episode_direct_link !== '') {
            Tv_show_upload(season, episode, episode_direct_link, series_id, tv_title)

        }
   };
   episode_submitBtn.removeEventListener('dblclick', handleSubmit);
   episode_submitBtn.addEventListener('dblclick', handleSubmit);

}

async function Tv_show_upload(season, episode, magnet_link, series_id, tv_title){
    let title =  tv_title + '-' + `s${season}-e${episode}-${series_id}`
    let episode_code__id = `s${season}-e${episode}-${series_id}`;
    //console.log('episode_title :', title)
    //console.log('episode_code__id :', episode_code__id)
    //console.log('episode_magnet_link :', magnet_link)

    const itemExists = Tasklist.some(item => item.show_id === episode_code__id);
    if(!itemExists){
        tv_uploadVideo(magnet_link,  episode_code__id, title);
        document.getElementById('episode_direct_link').value = ''
    }else{
        console.log("UPLOAD ERROR  EPISODE ALREADY IN QUEUE : \t",  title);
    }

}






async function tv_uploadVideo( magnet_link,  episode_code__id,  episode_title ){

           if (Tasklist === null){
                  Tasklist = await get_Tasklist()
           }

          console.log("=====================================================================================================================================================")
          console.log("\n\n EPISODE UPLOAD INITIATED =====================================================================================================================================================")

          console.log(" EPISODE NAME : \t:", episode_title )

            //console.log(imdb)
            //console.log(title)

          let url_v = `${Server_S_location}?search=${episode_code__id}`;
          const res = await fetch( url_v);
          const data = await res.json();
          //console.log(data['data'][0])

          if(!data['data'][0]){

              const upload_url = `${upload_admin_location}?url=${encodeURIComponent(magnet_link)}&name=${encodeURIComponent(episode_title)}`
              const response = await fetch(upload_url);
              const data = await response.json();


              let task_id = data.id;
              if(task_id){

                  const itemExists = Tasklist.some(item => item.name === episode_title);
                  if(itemExists){
                      console.log(" Episode Already in Queue ")
                      console.log("===================================================================================================================================================================")
                      return
                  }

                  Tasklist.push( { "task_id": task_id, "name": episode_title , "show_id": episode_code__id , 'imdb_code': episode_code__id })
                  localStorage.setItem("Tasklist", JSON.stringify(Tasklist));
                  saveUploadedTracks(Tasklist)


                  console.log(" TASK ID  : \t:", data.id )
                  console.log(" UPLOADING : \t : ", episode_title);
                  console.log(" UPLOADING QUALITY : \t : ", null);


                  console.log("==================================================================================================================================================================\n\n")
                  // box.classList.add('success-state');

              }else{
                  console.log(" UPLOAD ERROR : \t : ", data)
                  console.log("==================================================================================================================================================================\n\n")

              }


          } else{

               video_id = data['data'][0].id
               console.log(" Episode Upload Canceled: Episode already Exists: \t\t-Video_id : ", video_id, "\t\t-Name : ", episode_title)
               console.log("===================================================================================================================================================================")

               /*
               box.classList.remove('not_exist-state');
               box.classList.remove('success-state');
               box.classList.add('exist-state');
               */

               let write_url = `${data_write_location}?video_id=${video_id}&show_id=${episode_code__id}`
               const write_response = await fetch(write_url);
               const write_data = await write_response.json();
          }
}


async function check_episode_stored (season_no, episode_count,  series_id){

        const episodeElements = document.querySelectorAll('.episodes_each');
        for (const [index, ep] of episodeElements.entries()) {
            const episode_no = index + 1;


            let episode_code = `s${season_no}-e${episode_no}-${series_id}`
            //console.log(episode_code)
            try{
              let url_v = `${Server_S_location}?search=${episode_code}`;

              const res = await fetch( url_v);
              const data = await res.json();
              //console.log(data)
              if(data['data'][0]['id']){
                    ep.style.background = '#1C352D'; // Or any other style
              }

            }catch (error){

            }
        };

}


async function Show_tv_SearchResults(movies, div_element){
  div_element.innerHTML = ''
  for (const movie of movies) {
       try{
               let poster_path_ = IMG_PATH + movie['poster_path']
               let first_air_date_ = movie['first_air_date']
               let original_name_ = movie['name']
               let id_ = movie['id']
               let seasons_episode_ = ''
               let vote_average_ = movie['vote_average']

                let external_ids_url = ` https://api.themoviedb.org/3/tv/${id_}/external_ids`
                const external_ids_response = await fetch(external_ids_url, {headers});
                const external_ids_data = await external_ids_response.json();

                let imdb_id_ = external_ids_data.imdb_id.replace('tt', '');;

               //console.log([{poster_path:poster_path_, first_air_date:first_air_date_ , vote_average:vote_average_, original_name:original_name_, id:id_, S_info: seasons_episode_, imdb_id:data_json[i]['imdb_id'] }])
               showTV([{poster_path:poster_path_, first_air_date:first_air_date_ , vote_average:vote_average_, original_name:original_name_, id:id_, S_info: seasons_episode_, imdb_id: imdb_id_}], div_element);
       }catch(error){}
  }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function Show_More_F() {

        if(section_container === "Movie_nav"){
            //console.log("show_more : Movie")
            home_page_count = home_page_count + 1;
            localStorage.setItem("home_page_count", home_page_count)
            fetchMovies(home_page_count)
        }else if(section_container === "Tv_nav"){
            //console.log("show_more : tv")
            tv_page_count = tv_page_count + 1;
            localStorage.setItem("tv_page_count", tv_page_count)
            tv_fetch(tv_page_count);
        }else if(section_container === "Home_nav"){
            //console.log("show_more : Home")

        }else{
        console.log("show_more : null")
        }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

async function auto_rename(){

    Tasklist = await get_Tasklist()


    console.log(`Tasklist Length:`, Tasklist.length , '\n\n');

    for (const [index, task] of Tasklist.entries()) {
        //console.log(`Task ${index + 1}:`);
        //console.log(`  ID: ${task.task_id}`);
        //console.log(`  Name: ${task.name}`);
        //console.log(`  show_id: ${task.show_id}`);
        //console.log(`  imdb_code: ${task.imdb_code}`);
        //console.log("------------------");

        let task_detail_url =  UploadTaskDetail + task.task_id
        const response = await fetch(task_detail_url);
        const data = await response.json();

        console.log("TASK PROGRESS: \t:", task.name, '-\t status :', data.status)

        if(data.status === 'Processing'){
               continue;
        }


        if(data.status === 'Completed'){
                let video_id  =  data.videos[0];

                let write_local = `${data_retrieve_location}?video_id=${video_id}&show_id=${task.show_id}`
                const write_local_response = await fetch(write_local);
                const write_local_data = await write_local_response.json();
                //console.log("\t\t\tChecking Data is Stored Local :", write_local_data.Feedback)


                let video_rename_url = `${RenameVideo_location}?video_id=${video_id}&new_name=${encodeURIComponent(task.name)}`
                const rename_response = await fetch(video_rename_url);
                const rename_data = await rename_response.json();
                console.log('\t\t', task.name , "- rename_status : ", rename_data.success)

                if(rename_data.success){


                      Tasklist = Tasklist.filter(item => item.task_id !== task.task_id);
                      saveUploadedTracks(Tasklist)



                      console.log('\t\t',`Task == ${task.id} : ${task.name} == removed successfully`);
                      //console.log("Upload-Success - New-Tasklist", Tasklist);
                }
        }
        if(data.status === "Failed"){

                Tasklist = Tasklist.filter(item => item.task_id !== task.task_id);
                saveUploadedTracks(Tasklist)
                console.log('\t\t\t',"Error : Upload Failed: ",  task.name , '\t task_id :', task.task_id );


        }

         if(data.status === undefined){

                Tasklist = Tasklist.filter(item => item.task_id !== task.task_id);
                saveUploadedTracks(Tasklist)
                console.log("Error : Upload Failed: ",  task.name , '\t task_id :', task.task_id );

        }

        if(data.message === "Upload task not found"){
             Tasklist = Tasklist.filter(item => item.task_id !== task.task_id);
             saveUploadedTracks(Tasklist)
             localStorage.setItem("Tasklist", JSON.stringify(Tasklist));
        }
    }
    console.log('\n\n======================================================================================================');
    console.log(`Tasklist AFTER RENAME`);
    Tasklist.forEach((task, index) => {
          console.log(`\t Task ${index + 1}:\t\t`,  task.name , "\t\tTaskID :", task.task_id );
    });
    console.log('======================================================================================================\n\n');
}

//auto_rename()
//const interval = setInterval(auto_rename, 100000);

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


async function FILL_DATA_STORE() {
    console.log("\n\n=======================================================================================================\n");
    let current_page = 1;
    let total_page = 1;
    while (current_page <= total_page) {
            let fetch_url = `${fetch_all_location}?page=${current_page}`


            let response = await fetch(fetch_url);
            let data = await response.json();

            total_page = data.metadata.maxPage
            current_page++;

            let data_array = data.data

            for (const movie of data_array) {
                 let { id, name} = movie;
                 let video_id = id;
                 let show_name = name
                 let show_id = extractCode(show_name)

                 //console.log('video_id : ',video_id, '-show_name :' , show_name , '-show_id: ' , show_id);

                 if(show_id){
                     let write_url = `${data_write_location}?video_id=${video_id}&show_id=${show_id}`
                     let write_response = await fetch(write_url);
                     let write_data = await write_response.json();
                     if (write_data.feedback ==='Data saved successfully!'){
                          console.log(" ADDED DATA TO STORE: SHOW INFO STORED ::::::::: ",'video_id : ',video_id, '-show_name :' , show_name , '-show_id: ' , show_id);
                     }
                 }
            }
    }
     console.log("\n\n=======================================================================================================\n\n");
}



const extractCode = (str) => {
  // Case 1: Extract digits after _ (e.g., "_2323323" → "2323323")
  let  underscoreMatch
   underscoreMatch = str.match(/_(\d+)(?:$|\D)/);
   //console.log("1--- :", underscoreMatch)
  if (underscoreMatch) return underscoreMatch[1];

  // Case 2: Extract last digits in "sX-eY-ZZZ" (e.g., "s1-e1-202555" → "202555")
  underscoreMatch = str.match(/s\d+-e\d+-(\d+)(?:$|\D)/);
  //console.log("2--- :", underscoreMatch)
  if (underscoreMatch) return underscoreMatch[0];

  // No match found
  return null;
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
      const terminal = document.getElementById('terminal');

        // Override console.log to display in our terminal
        const originalConsoleLog = console.log;
        console.log = function(...args) {
            originalConsoleLog.apply(console, args); // Still log to original console
            const message = args.join(' ');
            terminal.innerHTML += message + '\n';
            terminal.scrollTop = terminal.scrollHeight;
        };


*/



/*



  fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://nyaa.si/?f=0&c=1_2&q=jujutsu+kaisen'))
    .then(response => response.json())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      const rows = doc.querySelectorAll('table.torrent-list tbody tr');

      rows.forEach(row => {
        const title = row.querySelector('td:nth-child(2) a:not(.comments)')?.textContent;
        const magnet = row.querySelector('td:nth-child(3) a[href^="magnet"]')?.href;
        console.log({ title, magnet });
      });
    });

*/
