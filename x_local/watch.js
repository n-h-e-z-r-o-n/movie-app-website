//IndexedDB

const Movies_API_URL =   "https://api.themoviedb.org/3/discover/movie?&api_key=6bfaa39b0a3a25275c765dcaddc7dae7";
const TVs_API_URL =   "https://api.themoviedb.org/3/discover/tv?&api_key=6bfaa39b0a3a25275c765dcaddc7dae7";

const watch_info = document.getElementById("watch_info");
const watch_Frame = document.getElementById("watch_Frame");
let Watch_iframe_div_content;

let Show_Data_Json;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const watch_frame_link_eb = 'https://vidsrc.to/embed/'; //https://vidsrc.xyz/embed/   ====  https://vidsrc.dev/embed/tv/ == https://vidsrc.to/embed/

const headers = {
             "accept": "application/json",
             "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};


const Server_S_location = "https://movionyx.com/Server_S.php"

let episodes = {};
let show_id;
let watch_type;



// ============================ Extract the search term from URL parameters ============================================


const params = getQueryParams();
 if (params) {
   watch_page_id = params['id'];
   watch_type = params['type'];
   show_id = watch_page_id;
   Suggestion_Show();
   SHOW_INFOs(watch_page_id, watch_type);

 } else { }


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




//======================================================================================================================



// Function to compare a given date with today
function compareWithToday(dateString) {
    // Create Date objects for the given date and today's date
    const givenDate = new Date(dateString);
    const today = new Date();

    // Set time to 00:00:00 for both dates to only compare the date part
    givenDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Compare the dates
    if (givenDate > today) {
        return false;
    } else {
        return true;
    }
}


//======================================================================================================================



async function SHOW_INFOs(id, type) {
  const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}&?`,   {headers});
  const data = await res.json();
  Show_Data_Json = data;
  Show_Info(data, type)
  Watch_IFRAME(id, type, data);
}


async function Show_Info(info_data, type){

    const Favorite_btn_watch = document.getElementById('Favorite_btn_watch');
    Favorite_btn_watch.addEventListener("click",  function(event) {
        event.stopPropagation();
        AddToFav(info_data);
    });

    var show_type = document.getElementById("show_type");
    var show_type_s = document.getElementById("show_type_s");
    if(type === "movie"){
       type = "Mv"
    }else{ type = "Tv"  }
    show_type.innerHTML = `${type} &#9737;`;
    show_type_s.innerHTML = `&#9737; ${type}`;

    // ---------------------------------------------------------------------------------------------------------------------
    var element = document.getElementById("back_img1");

    if (info_data['backdrop_path'] == null){info_data['backdrop_path'] = info_data['poster_path'] }

    element.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--global-color-bg)), url("${IMG_PATH}${info_data['backdrop_path']}")`;
    element.style.backgroundPosition = 'center';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundSize = 'cover';



    var back_img_s = document.getElementById("back_img_s");

    back_img_s.style.background = ` linear-gradient(to bottom, rgba(0, 0, 0, 0) 80%, #050301 98%),
                                  linear-gradient(to right, rgba(0, 0, 0, 0) 40%, #050301 100%),
                                  url("${IMG_PATH}${info_data['backdrop_path']}")`;

    back_img_s.style.backgroundPosition = 'center';
    back_img_s.style.backgroundRepeat = 'no-repeat';
    back_img_s.style.backgroundSize = 'cover';
    back_img_s.style.imageRendering = 'high-quality';



    //------------------------------------------------------------------------------------------------------------------
    var poster_show = document.getElementById("poster_image");
    var poster_image_s = document.getElementById("poster_image_s");

    poster_show.style.background  = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, #050301 98%),
                                    linear-gradient(to top , rgba(0, 0, 0, 0) 70%, #050301 98%),
                                    linear-gradient(to right, rgba(0, 0, 0, 0) 70%, #050301 98%),
                                    linear-gradient(to left, rgba(0, 0, 0, 0) 70%, #050301 98%),
                                    url("${IMG_PATH}${info_data['poster_path']}")`;

    poster_show.style.backgroundPosition = 'center';
    poster_show.style.backgroundRepeat = 'no-repeat';
    poster_show.style.backgroundSize = 'cover';

    poster_image_s.style.background  = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, #050301 98%),
                                    linear-gradient(to top , rgba(0, 0, 0, 0) 70%, #050301 98%),
                                    linear-gradient(to right, rgba(0, 0, 0, 0) 70%, #050301 98%),
                                    linear-gradient(to left, rgba(0, 0, 0, 0) 70%, #050301 98%),
                                    url("${IMG_PATH}${info_data['poster_path']}")`;

    poster_image_s.style.backgroundPosition = 'center';
    poster_image_s.style.backgroundRepeat = 'no-repeat';
    poster_image_s.style.backgroundSize =  '100% 100%';

    //------------------------------------------------------------------------------------------------------------------
    var title_s = document.getElementById("Show_title_S");
    var title_l = document.getElementById("Show_title_l");

    let title = info_data['title'];
    if (title === undefined){
          title = info_data['original_name'];
    }
    title_s.innerHTML = title;
    title_l.innerHTML = title;

    //------------------------------------------------------------------------------------------------------------------



   let genres = ""
   for (let i = 0; i < info_data['genres'].length; i++) {
     genres = genres.concat(' ', info_data['genres'][i].name, ', ');
   }


   //------------------------------------------------------------------------------------------------------------------
   var show_pg = document.getElementById("show_pg");
   var show_pg_s = document.getElementById("show_pg_s");


    let PG = 18;
    if(info_data['adult'] ===  false){
        PG = 13;
    }

   show_pg.innerHTML = `PG-${PG} `;
   show_pg_s.innerHTML = `PG-${PG} `;

   //------------------------------------------------------------------------------------------------------------------
   var show_MIN = document.getElementById("show_MIN");
   var show_MIN_s = document.getElementById("show_MIN_s");


    if(info_data['runtime'] ===  undefined){
       info_data['runtime'] =   info_data['episode_run_time'];
    }


   show_MIN.innerHTML = `${info_data['runtime']} Min`;
   show_MIN_s.innerHTML = `${info_data['runtime']} Min`;

    var show_HD_s = document.getElementById("show_HD_s");
    var show_HD_l = document.getElementById("show_HD");
    show_HD_s.innerHTML = `HD`;
    show_HD_l.innerHTML = `HD`;

   //------------------------------------------------------------------------------------------------------------------
    var show_pg_min_genra1 = document.getElementById("show_genres_s");
    var show_genres = document.getElementById("show_genres");

   show_pg_min_genra1.innerHTML = `${genres} `;
   show_genres.innerHTML = ` ${genres} `

   //------------------------------------------------------------------------------------------------------------------

    var show_rating_s = document.getElementById("show_rating_s");
    var show_rating = document.getElementById("show_rating");


    show_rating_s.innerHTML = `${info_data['vote_average']}  &starf;`;
    show_rating.innerHTML = `${info_data['vote_average']}  &starf;`;

    //------------------------------------------------------------------------------------------------------------------

    var overview1 = document.getElementById("Show_SUMMARY_S");
    var overview2 = document.getElementById("Show_SUMMARY_l");

    overview1.innerHTML = info_data['overview'];
    overview2.innerHTML = info_data['overview'];

    //------------------------------------------------------------------------------------------------------------------

    var Show_Production_s = document.getElementById("Show_Production_s");
    var show_production = document.getElementById("show_production");

    let production_companies = ""
    for (let i = 0; i < info_data['production_companies'].length; i++) {
      production_companies = production_companies.concat(' ', info_data['production_companies'][i].name, ', ');
    }

    Show_Production_s.innerHTML = production_companies;
    show_production.innerHTML = production_companies;

    //------------------------------------------------------------------------------------------------------------------

    var show_Premiered_s = document.getElementById("show_Premiered_s");
    var show_Premiered = document.getElementById("show_Premiered");

    if (info_data['release_date'] === undefined){
        info_data['release_date'] = info_data['first_air_date'];
    }
      show_Premiered_s.innerHTML = info_data['release_date'];
      show_Premiered.innerHTML = info_data['release_date'];

    //------------------------------------------------------------------------------------------------------------------

}


// =====================================================================================================================

// =====================================================================================================================


async function Watch_IFRAME(imdb, type, info_data) {
      if (type==="movie"){

          try{
              let url_v = `${Server_S_location}?search=_${imdb}`;
              const res = await fetch( url_v);
              const data = await res.json();
              console.log(data['data'][0]);
              console.log(data['data'][0]['id']);
              if(data['data'][0]['id']){

                      //watch_Frame.innerHTML = `<iframe class="iframe_watch"   id="watch-frame" src='https://dna.uns.bio/#${data["data"][0]["id"]}' width="700px" height="600px" frameborder="0" allowfullscreen></iframe>`;
                      Watch_iframe_div_content = `<iframe class="iframe_watch"   id="watch-frame" src='https://dna.uns.bio/#${data["data"][0]["id"]}' width="700px" height="600px" frameborder="0" allowfullscreen></iframe> `;

              }else{

                    //watch_Frame.innerHTML = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${imdb}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;
                    Watch_iframe_div_content = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${imdb}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;

              }
          } catch(error){

                   //watch_Frame.innerHTML = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${imdb}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;
                   Watch_iframe_div_content = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${imdb}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;
          }

          //watch_Frame.innerHTML = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${imdb}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;
          //Watch_iframe_div_content = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${imdb}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;

          let savedState = localStorage.getItem(`watch_on_${show_id}`);
          if (savedState) {
               var watch_Now_btn = document.getElementById('watch_Now_btn');
               watch_Now_btn.click();
          }


      }else{

              let se = info_data['seasons'];
              se = se.filter(se => se.air_date !== null);
              let con = ``;
              console.log(se);
              const Selected_Season = document.querySelector('.Selected_Season');
              Selected_Season.innerHTML = ` &#128193; &nbsp; &nbsp; Select Season  &nbsp;&nbsp;  &dtrif;`;

              let i = 0;
              let j = 0;

              if(se[0]['name'] === 'Specials'){
                      j =-1;

                  }

              for (i ; i < se.length; i++) {
                   j++;
                   con = con +  `<div data-season="season${i}" onclick="displayEpisodes(event, ${j}, ${se[i]['episode_count']}, '${encodeURIComponent(se[i]['poster_path'])}',  ${se[i]['id']}, '${se[i]['air_date']}', ${imdb})"> &#9678; ${se[i]['name']}</div> `;

              }
              i=i-1;

              const season_selector =  document.getElementById("season-selector");
              season_selector.innerHTML = ` ${con}`;

               const savedState = localStorage.getItem(`DisplayEpisode_${info_data["id"]}`);
                if (savedState) {
                    const state = JSON.parse(savedState);
                    displayEpisodes(event, state['season'], state['episodes_count'], state['season_image'], state['season_id'] , state['season_air_date'], state['series_id'])
                } else {
                  displayEpisodes(event, j, se[i]['episode_count'], encodeURIComponent(se[i]['poster_path']),  se[i]['id'], se[i]['air_date'], imdb);

                }

                //displayEpisodes(event, i, se[i]['episode_count'], encodeURIComponent(se[i]['poster_path']),  se[i]['id'], se[i]['air_date'], imdb);
      }
}

//======================================================================================================================
const season_selector = document.querySelector('.season-selector')
const Selected_Season = document.querySelector('.Selected_Season')

Selected_Season.onclick = function(){
       if ( season_selector.style.display === 'none'){
           season_selector.style.display = "block";
       } else {
           season_selector.style.display = "none";
       }
}


 function displayEpisodes(event, season_no, episodes_count, season_image, season_id , season_air_date, series_id) {
           if(season_no !== Show_Data_Json['number_of_seasons']){
               const state = {
                    season: season_no,
                    episodes_count: episodes_count,
                    season_image: season_image,
                    season_id: season_id,
                    season_air_date: season_air_date,
                    series_id: series_id
                };
               localStorage.setItem(`DisplayEpisode_${series_id}`, JSON.stringify(state));
           } else { localStorage.removeItem(`DisplayEpisode_${series_id}`); }

           const Selected_Season_img =  document.getElementById("Selected_Season_img");
           Selected_Season_img.style.background = ` url("${IMG_PATH}${decodeURIComponent(season_image)}")`;
           Selected_Season_img.style.backgroundPosition = 'center';
           Selected_Season_img.style.backgroundRepeat = 'no-repeat';
           Selected_Season_img.style.backgroundSize = '100% 100%'; // Stretch to fit the container
           Selected_Season_img.style.imageRendering = 'high-quality'




            const season_selector = document.querySelector('.season-selector');
            const Selected_Season = document.querySelector('.Selected_Season');
            Selected_Season.innerHTML = ` &#128193; &nbsp; &nbsp; Season   ${season_no} &nbsp;&nbsp;  &dtrif;`;
            season_selector.style.display = "none";


            let episode_list_divs = ``;
            const episode_list =  document.getElementById("episode-list");

             last_season = Show_Data_Json['last_episode_to_air']['season_number']
             last_episode = Show_Data_Json['last_episode_to_air']['episode_number']

            let i = 1
            let not_out_class = '';
            while(i <= episodes_count){

                if(last_season === season_no){
                  if(i > last_episode){
                     not_out_class = 'episodes_each_not_out';
                  }
                }
                episode_list_divs = episode_list_divs + `<div class="episodes_each ${not_out_class}" onclick="WatchEpisodes(event, ${season_no},  ${i}, ${series_id})">Episode ${i}</div>`;
                i++;
            }
            i=i-1;
            episode_list.innerHTML = ` ${episode_list_divs}`;


           let btn_savedState = localStorage.getItem(`watch_on_${show_id}`);
           if (btn_savedState) {
            const savedState =    localStorage.getItem(`WatchEpisode_${series_id}`);
                    if(savedState){
                           const state = JSON.parse(savedState);
                           if(state['season_no'] === season_no ){
                                const episodeElements =  episode_list.querySelectorAll('div');
                                const episodeElement = Array.from(episodeElements).find(
                                  (div) => div.textContent.trim() === `Episode ${state['episode_no']}`
                                );
                                episodeElement.click();
                           }
                     }
            }

            const season_c =  document.getElementById("season_c");
            season_c.style.display = 'flex';
 }

 async function WatchEpisodes(event, season_no,  episode_no, series_id){
          let episode_code = `s${season_no}-e${episode_no}-${series_id}` //s3-e6-95557
          console.log(series_id);
          //localStorage.setItem(`DisplayEpisode_${series_id}`, JSON.stringify(state));
          const state = {
                    season_no: season_no,
                    episode_no: episode_no,
          };

          localStorage.setItem(`WatchEpisode_${series_id}`, JSON.stringify(state));

          const episodesDivs = document.querySelectorAll('.episodes div');
          episodesDivs.forEach(div => div.classList.remove('episodes_each_select'));


          const Element = event.target;
          Element.classList.add('episodes_each_select');


          watch_Frame_element = document.getElementById('watch_Frame');
          watch_Frame_element.style.display = 'block';

          let type = 'tv';

          try{
              let url_v = `${Server_S_location}?search=${episode_code}`;
              const res = await fetch( url_v);
              const data = await res.json();
              //console.log(data['data'][0]);
              //console.log(data['data'][0]['id']);
              if(data['data'][0]['id']){

                  watch_Frame.innerHTML = `<iframe class="iframe_watch"   id="watch-frame" src='https://dna.uns.bio/#${data["data"][0]["id"]}' width="700px" height="600px" frameborder="0" allowfullscreen></iframe>`;
                  Watch_iframe_div_content = `<iframe class="iframe_watch"   id="watch-frame" src='https://dna.uns.bio/#${data["data"][0]["id"]}' width="700px" height="600px" frameborder="0" allowfullscreen></iframe> `;

              }else{

                    watch_Frame.innerHTML = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${imdb}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;
                    Watch_iframe_div_content = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${imdb}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;

              }
          } catch(error){
                  watch_Frame.innerHTML = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${series_id}/${season_no}/${episode_no}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;
                  Watch_iframe_div_content = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${series_id}/${season_no}/${episode_no}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;
           }

          //watch_Frame.innerHTML = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${series_id}/${season_no}/${episode_no}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;
          //Watch_iframe_div_content = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${series_id}/${season_no}/${episode_no}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;

          var cancel_watch_btn = document.getElementById('cancel_watch_btn')
          cancel_watch_btn.style.display = 'flex';
 }



// ---------------------------------------------------------------------------------------------------------------

const recommendation_R_div =  document.getElementById("recommendation_R_div");


async function Suggestion_Show() {

   if(watch_type === 'tv' ){
      rcd_url =  `https://api.themoviedb.org/3/tv/${show_id}/recommendations?language=en-US&page=1`
  } else {
     rcd_url =   `https://api.themoviedb.org/3/movie/${show_id}/recommendations?language=en-US&page=1`
  }

  const res1 = await fetch(rcd_url,  {headers} );
  const data1 = await res1.json();

  console.log(data1)
  const combinedData =data1.results;
  Suggestion_Search(combinedData) ;
}

function Suggestion_Search(movies) {
  recommendation_R_div.innerHTML = "";
  movies.forEach((movie) => {
    let { original_title, original_name, poster_path, id, vote_average, overview, release_date, first_air_date } = movie;
    let title;
    let type;
    if (original_title=== undefined) {
       title = original_name;
       date = first_air_date;
        type = "tv";

    } else {
       title = original_title;
       date = release_date
        type = "movie";
    }
    if (poster_path === null){
        poster_path ='/nHj7dPNMM2QheZEDb2f7FxlBhUK.jpg';
    }


    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    movieItem.innerHTML = `

              <!-- box-1  -->
              <div class="imgBx">
                <img src="${IMG_PATH + poster_path}">
              </div>
              <div class="content">
                <div>
                  <h2>${title}</h2>
                  <p>&starf; &starf; ${vote_average}</p>
                </div>
              </div>

    `;
    // Add event listener to open another page when clicked
    movieItem.addEventListener("click", () => {
         window.location.href = "watch.html?id=" + id + "&type="+type;
       });
    recommendation_R_div.appendChild(movieItem);
  });
}

// ---------------------------------------------------------------------------------------------------------------------





const modal = document.querySelector('.Info_container')
const toggle = document.querySelector('.Info_container_toggle')
var text_t  = document.getElementById("Info_toggle_text");
let Current_text = text_t.innerHTML

let isActive = false

toggle.onclick = function(){
  if (isActive) {
    text_t.innerHTML = Current_text;
    modal.classList.remove('active');
    isActive = false
  } else {
    modal.classList.add('active')
    text_t.innerHTML = '+';
    isActive = true
  }
}


// ---------------------------------------------------------------------------------------------------------------------

document.getElementById('watch_Now_btn').addEventListener('click', function() {
    var cancel_watch_btn = document.getElementById('cancel_watch_btn');
    console.log("Watch_iframe_div_content", Watch_iframe_div_content)
    if(Watch_iframe_div_content){
        watch_Frame.innerHTML = Watch_iframe_div_content;
    } else{
              const firstEpisode = document.querySelector('.episodes_each');
              firstEpisode.click();
              localStorage.setItem(`watch_on_${show_id}`, 'true');
              return;
    }
    watch_Frame.style.display = 'flex';
    cancel_watch_btn.style.display = 'flex';
    localStorage.setItem(`watch_on_${show_id}`, 'true');
});

document.getElementById('cancel_watch_btn').addEventListener('click', function() {
    var cancel_watch_btn = document.getElementById('cancel_watch_btn');
    watch_Frame.innerHTML = ``;
    watch_Frame.style.display = 'none';
    cancel_watch_btn.style.display = 'none';
    localStorage.removeItem(`watch_on_${show_id}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// SHOW TRAILER.PREVIEW ////////////////////////////////////////////////////////////////////////////////////////

async function PlayTrailer(id_play, type){
            const cancel_watch_btn = document.getElementById('cancel_watch_btn');
            const watch_preview_btn = document.getElementById("watch_preview");

        watch_Frame_element = document.getElementById('watch_Frame');
        watch_Frame_element.style.display = 'block';

        const trailer_div_iframe = document.getElementById("trailer_div_iframe");


        let t_url = `https://api.themoviedb.org/3/tv/${id_play}/videos?language=en-US`
        if (type === 'movie'){
            t_url = `https://api.themoviedb.org/3/movie/${id_play}/videos?language=en-US`
        }
        const response = await fetch(t_url, { headers });
        const data = await response.json();

        //console.log("Trailer :" , data.results);
        //console.log("Trailer  Last:" , data.results.length - 1);
        //console.log("Trailer Last d:" , data.results[data.results.length - 1]);
        //console.log("Trailer  :" , data.results[data.results.length - 1]['key']);

         if (data.results[data.results.length - 1] === undefined) {
            watch_Frame_element.style.display = 'none'
            cancel_watch_btn.style.display = 'none'
            watch_preview_btn.innerHTML = 'NO PREVIEW'
            return
        }

        //watch_Frame.innerHTML = ` <iframe  class="iframe_watch"   id="watch-frame" onerror="iframeLoadError()" src='${watch_frame_link_eb}${type}/${imdb}'  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> `;
        watch_Frame_element.innerHTML = `<iframe class="iframe_watch" width="560"  height="315"  src="https://www.youtube.com/embed/${data.results[data.results.length - 1]['key']}?autoplay=1&rel=1&mute=0" frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"   allowfullscreen>    </iframe>`
}


const watch_preview_btn = document.getElementById("watch_preview");
watch_preview_btn.addEventListener("click", (event) => {
    var cancel_watch_btn = document.getElementById('cancel_watch_btn');
    watch_Frame.innerHTML = '';
    PlayTrailer(show_id, watch_type)
    watch_Frame.style.display = 'flex';
    cancel_watch_btn.style.display = 'flex';
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//================ Disable Right Click + Inspect Element ===============================================================
/*
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
    e.preventDefault();
  }
});
*/

// =====================================================================================================================
