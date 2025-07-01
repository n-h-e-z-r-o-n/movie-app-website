document.querySelector('.search_btn').classList.add('hid_element');

const search_R_div = document.getElementById("gen_category");


var headers = {
  "accept": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

let C_page = 0

/*
let url_m = "https://api.themoviedb.org/3/discover/movie?&page=1&with_genres=16&with_keywords=210024|287501&with_text_query=death"
let url_s = "https://api.themoviedb.org/3/discover/tv?&page=1&with_genres=16&with_keywords=210024|287501&with_text_query=death"
*/

let url_m = "https://api.themoviedb.org/3/discover/movie?with_keywords=210024|287501&include_adult=true"
let url_s = "https://api.themoviedb.org/3/discover/tv?with_keywords=210024|287501&include_adult=true"






Show_More_F()







function Search_Results_SHOW(movies) {
  movies.forEach((movie) => {
    const { original_title, name, title, original_name, poster_path, id, vote_average, overview, release_date, first_air_date , runtime, S_info} = movie;
    //console.log(movie);
    let title_;
    let type;
    let type_r;
    let Info;

    if (original_title === undefined) {
       title_ = name;
       date = first_air_date.substring(0, 4);
       type = "tv";
       type_r = "tv";
       info = ''; //S_info;

    } else {
        title_ = title;
        date = release_date.substring(0, 4);
        type = "mv";
        type_r = "movie"
        info = ''; //`${runtime} min` ;
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
            <div class="box_title">${title_}</div>
            <div class="container_span">
               <div style="display:flex;">
                    <div  class="badge-type"> ${type} </div>
                    <div class="badge-type_year"> ${date} </div>
               </div>
               <div class="badge-type_text"> ${info}</div>
               <div  class="badge-type_rating"> &starf;  ${vote_average} </div>
            </div>

    `;

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
         window.location.href = "watch.html?id=" + id + "&type="+type_r;
    });

    const FaveButton = movieItem.querySelector(".button_style2");
    FaveButton.addEventListener("click", function(event) {
        event.stopPropagation();
        AddToFav(movie, FaveButton);
    });

    const PlayT = movieItem.querySelector(".button_style1");
    PlayT.addEventListener("click", function(event) {
        event.stopPropagation();
        PlayTrailer(id , type_r);
    });


    search_R_div.appendChild(movieItem);
  });
}



/* ====================================================================================================================*/

/* ====================================================================================================================*/


const Select_options = document.querySelectorAll(".Select_option");
Select_options.forEach((Select_option) => {
  const dropdown_content = Select_option.querySelector(".anime_dropdown_content");

  Select_option.addEventListener("touchstart", function () {
    if (dropdown_content.style.display === "flex") {
      dropdown_content.style.display = "none";
    } else {
      dropdown_content.style.display = "flex";
    }
  });

  dropdown_content.addEventListener("mouseleave", function () {
    dropdown_content.style.display = 'none'; // Hide the container on mouse leave
  });

  dropdown_content.addEventListener("touchcancel", function () {
    dropdown_content.style.display = 'none'; // Hide the container on touch cancel
  });
});


document.addEventListener("touchcancel", function (event) {
  Select_options.forEach((Select_option) => {
  const dropdown_content = Select_option.querySelector(".anime_dropdown_content");
    if (
      !Select_option.contains(event.target) &&
      !Select_option.contains(event.target)
    ) {
      dropdown_content.style.display = "none"; // Close the dropdown
    }
  });
});


document.addEventListener("touchstart", function (event) {

  Select_options.forEach((Select_option) => {
  const dropdown_content = Select_option.querySelector(".anime_dropdown_content");

    if (
      !Select_option.contains(event.target) &&
      !Select_option.contains(event.target)
    ) {
      dropdown_content.style.display = "none"; // Close the dropdown
    }
  });
});


/* ====================================================================================================================*/

/* ====================================================================================================================*/

const anime_genre_each_ALL = document.querySelectorAll(".anime_genre_each");

anime_genre_each_ALL.forEach((anime_genre_each) => {
  anime_genre_each.addEventListener("touchstart", function () {
    // Toggle the 'Selected_G' class
    this.classList.toggle("Selected_G");
  });
});

/* ====================================================================================================================*/

/* ====================================================================================================================*/


function logSelectedOptions() {
  // Get selected types (Movie, Tv, All)
  const selectedTypes = [];
  document.querySelectorAll('.anime_dropdown_content input[type="checkbox"]:checked').forEach((checkbox) => {
    selectedTypes.push(checkbox.value);
  });

  // Get selected sort options
  const selectedSortOptions = [];
  document.querySelectorAll('.anime_dropdown_content input[type="checkbox"]:checked').forEach((checkbox) => {
    selectedSortOptions.push(checkbox.value);
  });

  // Get selected genres
  const selectedGenres = [];
  document.querySelectorAll('.anime_genre_each.Selected_G').forEach((genre) => {
    selectedGenres.push({
      genre: genre.textContent,
      id: genre.getAttribute('data-genre'),
    });
  });





  // Log the selected options
  console.log("Selected Types:", selectedTypes);
  console.log("Selected Sort Options:", selectedSortOptions);
  console.log("Selected Genres:", selectedGenres);
}

// Example: Call the function when a button or event triggers it


/* ====================================================================================================================*/


document.getElementById('anime_genra_list_Filter_btn').addEventListener('click', function(event) {
   const selectedTypes = [];
  document.querySelectorAll('.anime_dropdown_content input[name="show_type"]:checked').forEach((checkbox) => {
    selectedTypes.push(checkbox.value);
  });

  // Get selected sort options
  const selectedSortOptions = [];
  document.querySelectorAll('.anime_dropdown_content input[name="sorting"]:checked').forEach((checkbox) => {
    selectedSortOptions.push(checkbox.value);
  });

  // Get selected genres
  const selectedGenres = [];
  document.querySelectorAll('.anime_genre_each.Selected_G').forEach((genre) => {
    selectedGenres.push( genre.getAttribute('data-genre'))
  });

   console.log("Selected Types:", selectedTypes);
  console.log("Selected Sort Options:", selectedSortOptions);
  console.log("Selected Genres:", selectedGenres);

  let search_value  = document.getElementById('anime_search_input')
  console.log(search_value.value.trim())
  search_value = search_value.value.trim()



  url_m = "https://api.themoviedb.org/3/discover/movie?with_keywords=210024|287501&include_adult=true"
  url_s = "https://api.themoviedb.org/3/discover/tv?with_keywords=210024|287501&include_adult=true"




  if(selectedGenres.length) url_m += `&with_genres=${selectedGenres.join(',')}`
  if (search_value  !== "")  url_m += `&with_text_query=${search_value}`
  if(selectedSortOptions.length) url_m +=  `&sort_by=${selectedSortOptions[0]}`


  if(selectedGenres.length) url_s += `&with_genres=${selectedGenres.join(',')}`
  if (search_value  !== "")  url_s += `&with_text_query=${search_value}`
  if(selectedSortOptions.length) url_s +=  `&sort_by=${selectedSortOptions[0]}`




  if(selectedTypes[0] === 'Movie'){
        url_s = "";
  } else if(selectedTypes[0] === 'Tv'){
         url_m = '';
  } else {}

  console.log('url_m', url_m)
  console.log('url_s', url_s)

  C_page = 0;
  Anime_Filter()

});




document.getElementById('anime_search_btn').addEventListener('click', function(event) {
   let search_value  = document.getElementById('anime_search_input')
   search_value = search_value.value.trim()
    if (search_value  !== "") {
        C_page = 1
        Anime_Search(search_value, C_page)
    } else { }

});


document.getElementById('anime_search_input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();  // Prevents the default "Enter" key behavior
    const searchValue = event.target.value.trim(); // Trim whitespace

    if (searchValue  !== "") {
    //searchValue.value = "";
    C_page = 1
    Anime_Search(searchValue, C_page)
    } else { }
  }
});





async function Anime_Filter() {

        let data = { results: [] };
        let data2 = { results: [] };

        C_page = C_page + 1;

        let catch_url_m = url_m + `&page=${C_page}`
        let catch_url_s = url_s + `&page=${C_page}`


        try{
          const response = await fetch(catch_url_m, { headers });
           data = await response.json();
        }catch (error) {
            console.error();
        }

        try{
          const response2 = await fetch(catch_url_s, { headers });
          data2 = await response2.json();
        }catch (error) {
          console.error();
        }
        let data_json = data.results.concat(data2.results)
        //data_json = shuffleArray(data_json);
        search_R_div.innerHTML ="";
        Search_Results_SHOW(data_json)
}





async function Anime_Search(s_query, S_page) {

   url_m = `https://api.themoviedb.org/3/discover/movie?include_adult=true&with_genres=16&with_keywords=210024|287501&with_text_query=${s_query}`
   url_s = `https://api.themoviedb.org/3/discover/tv?include_adult=true&with_genres=16&with_keywords=210024|287501&with_text_query=${s_query}`

  let catch_url_m = url_m + `&page=${S_page}`
  let catch_url_s = url_s + `&page=${S_page}`

  const response = await fetch(catch_url_m, { headers });
  const data = await response.json();

  const response2 = await fetch(catch_url_s, { headers });
  const data2 = await response2.json();

  let data_json = data.results.concat(data2.results)
   search_R_div.innerHTML ="";
   Search_Results_SHOW(data_json)
}



async function Show_More_F() {

        let data = { results: [] };
        let data2 = { results: [] };

        C_page = C_page + 1;

        let catch_url_m = url_m + `&page=${C_page}`
        let catch_url_s = url_s + `&page=${C_page}`


        console.log('url_m :', catch_url_m)
        console.log('url_s :', catch_url_s)
        try{
          const response = await fetch(catch_url_m, { headers });
           data = await response.json();
        }catch (error) {
            console.error('Error fetching data:', error);
        }

        try{
          const response2 = await fetch(catch_url_s, { headers });
          data2 = await response2.json();
        }catch (error) {
          console.error('Error fetching data:', error);
        }
        let data_json = data.results.concat(data2.results)
        Search_Results_SHOW(data_json)
}



const show_more_g = document.getElementById("show_more_g");
show_more_g.addEventListener("click", function() {
     show_more_g.innerHTML = 'LOADING ...';
     Show_More_F()
     show_more_g.innerHTML = 'Show More &#x21b4;';
});

//======================================================================================================================


document.addEventListener('DOMContentLoaded', function() {
    const sorting_checkboxes = document.querySelectorAll('input[name="sorting"]');
    const show_type_checkboxes = document.querySelectorAll('input[name="show_type"]');

    sorting_checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                sorting_checkboxes.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
            }
        });
    });

    show_type_checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                show_type_checkboxes.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
            }
        });
    });



});