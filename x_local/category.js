

const IMG_PATH = "https://image.tmdb.org/t/p/original";

let xcode;


const headers = {
  "accept": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};


//localStorage.clear()

// ============================ Extract the search term from URL parameters ============================================


const params = getQueryParams();

 if (params) {
   xcode = params['xcode'];
   //console.log(xcode)
   show_Movies(xcode);
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


// =====================================================================================================================


async function  show_Movies(company_id){

    const savedState = localStorage.getItem(`Company_Movies_${company_id}`);
    if (savedState) {
        const state = JSON.parse(savedState);
        Display_Shows(state, 'movie', 1);

    } else {

            let Movies_object = [];
            let page = 1;
            let count = 1;
            let parallel = [];
            let track_page = 4;
            while(page <= count){
                        let movies_url =`https://api.themoviedb.org/3/discover/movie?api_key&with_companies=${company_id}&page=${page}`
                        const movies_url_response = await fetch(movies_url, { headers });
                        const movies_url_data = await movies_url_response.json();

                        //console.log(movies_url_data);

                        page++;
                        count = movies_url_data['total_pages']
                        Movies_object = Movies_object.concat(movies_url_data['results'])

                        parallel = parallel.concat(movies_url_data['results'])
                        if (page === track_page){
                            track_page = track_page  + 4;
                            Display_Shows(parallel, 'movie', 0);
                            parallel = [];
                        }
            }


            try{
               localStorage.setItem(`Company_Movies_${company_id}`, JSON.stringify(Movies_object));
            } catch (e) { localStorage.clear()}
            Display_Shows(Movies_object, 'movie', 1);
   }
}


async function  show_Series(company_id){

    const savedState = localStorage.getItem(`Company_Series_${company_id}`);
    if (savedState) {
        const state = JSON.parse(savedState);
        Display_Shows(state, 'tv', 1);

    } else {

            let Movies_object = [];
            let page = 1;
            let count = 1;
            let parallel = [];
            let track_page = 4;
            while(page <= count){
                        let movies_url =`https://api.themoviedb.org/3/discover/tv?api_key&with_companies=${company_id}&page=${page}`
                        const movies_url_response = await fetch(movies_url, { headers });
                        const movies_url_data = await movies_url_response.json();

                        console.log(movies_url_data);


                        page++;
                        count = movies_url_data['total_pages']
                        Movies_object = Movies_object.concat(movies_url_data['results'])

                        parallel = parallel.concat(movies_url_data['results'])
                        if (page === track_page){
                            track_page = track_page  + 4;
                            Display_Shows(parallel, 'tv', 0);
                            parallel = [];
                        }
            }

            try {
                   localStorage.setItem(`Company_Series_${company_id}`, JSON.stringify(Movies_object));
            } catch (e) { localStorage.clear()}

            localStorage.setItem(`Company_Series_${company_id}`, JSON.stringify(Movies_object));
            Display_Shows(Movies_object, 'tv', 1);

   }
}







function Display_Shows(movies, media_type, clear) {


   const container =  document.getElementById("Movies_container");
   if(clear){
      container.innerHTML = ``;
   }
   /*
   const body_show =  document.getElementById("body_show");
   if (window.innerWidth <= 968) { // Or any other screen size threshold
            body_show.style.background = `url(${IMG_PATH+movies[0]['poster_path']})`;
            body_show.style.backgroundRepeat = 'no-repeat';
            body_show.style.backgroundPosition = 'center';
            body_show.style.backgroundSize = '100% 100%';
    } else {
            body_show.style.background = `url(${IMG_PATH+movies[0]['backdrop_path']})`;
            body_show.style.backgroundRepeat = 'no-repeat';
            body_show.style.backgroundPosition = 'center';
            body_show.style.backgroundSize = '100% 100%';
    }
    */

   //console.log(movies[0]);
   for (const movie of movies) {
    let { title, backdrop_path, poster_path, id, vote_average, overview,  first_air_date ,release_date, runtime } = movie;


        const Item = document.createElement("div");
        Item.classList.add("each_box");
        Item.style.background = `url(${IMG_PATH+poster_path})`;
        Item.style.backgroundRepeat = 'no-repeat';
        Item.style.backgroundPosition = 'center';
        Item.style.backgroundSize = '100% 100%';
        Item.style.boxShadow =  '0 4px 6px var(--global-color-fg)';
        Item.style.backgroundColor = 'transparent';
        container.appendChild(Item);
        Item.addEventListener("click", () => { //dblclick
            window.location.href = "watch.html?id=" + id + `&type=${media_type}`;
        });
    }
}



const show_movies =  document.getElementById("show_movies")
const show_tv =  document.getElementById("show_tv")
const show_movies2 =  document.getElementById("show_movies2")
const show_tv2 =  document.getElementById("show_tv2")

show_movies.addEventListener("click", () => { //dblclick
            show_Movies(xcode);
            show_movies.classList.add("active");
            show_movies2.classList.add("active");
            show_tv.classList.remove("active");
            show_tv2.classList.remove("active");
            localStorage.setItem('C_CAT_T', 'mv')
        });

 show_movies2.addEventListener("click", () => { //dblclick
           show_Movies(xcode);
            show_movies.classList.add("active");
            show_movies2.classList.add("active");
            show_tv.classList.remove("active");
            show_tv2.classList.remove("active");
            localStorage.setItem('C_CAT_T', 'mv')
        });



show_tv.addEventListener("click", () => { //dblclick
           show_Series(xcode);
           show_tv.classList.add("active");
           show_tv2.classList.add("active");
           show_movies.classList.remove("active");
           show_movies2.classList.remove("active");
           localStorage.setItem('C_CAT_T', 'tv')
});

show_tv2.addEventListener("click", () => { //dblclick
           show_Series(xcode);
           show_tv.classList.add("active");
           show_tv2.classList.add("active");
           show_movies.classList.remove("active");
           show_movies2.classList.remove("active");
           localStorage.setItem('C_CAT_T', 'tv')
});

let  C_CAT_T = localStorage.getItem('C_CAT_T')
if(C_CAT_T=== 'mv'){
    show_movies.click();
}else if(C_CAT_T=== 'tv'){
    show_tv.click();
}else {}


