const headers = {
  "accept": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";


const search_R_div = document.getElementById("gen_category");
const genre_header = document.getElementById("genre_header");
const show_more_g = document.getElementById("show_more_g");
const gen_filter_btn = document.getElementById("gen_filter_btn");



let genre_id;
let C_page = 1;

let m_url =  'https://api.themoviedb.org/3/discover/movie?';
let s_url = 'https://api.themoviedb.org/3/discover/tv?'

genre_id = getQueryParams();
if (genre_id) {

  m_url += `&with_genres=${genre_id}`;
  s_url += `&with_genres=${genre_id}`;

  Run_Fetch_Data(C_page);
} else { }




// Function to get URL parameters
 function getQueryParams() {
     let params;
     let params_1;
     const queryString = window.location.search.substring(1);
     const regex = /([^&=]+)-([^&]*)/g;
     let m;
     while (m = regex.exec(queryString)) {
         params = decodeURIComponent(m[1]);
         params_1 = decodeURIComponent(m[2])
     }
     genre_header.innerHTML = `${params} Movies, TV Series`
     return params_1;
 }




async function Run_Fetch_Data(page) {
        m_url += `&page=${page}`;
        m_url += `&page=${page}`;

        let data = { results: [] };
        let data2 = { results: [] };

        try{
          const response = await fetch(m_url, { headers });
           data = await response.json();
        }catch (error) {
            console.error('Error fetching data:', error);
        }

        try{
          const response2 = await fetch(s_url, { headers });
          data2 = await response2.json();
        }catch (error) {
          console.error('Error fetching data:', error);
        }

        let data_json = data.results.concat(data2.results)
        data_json = shuffleArray(data_json);
        Search_Results_SHOW(data_json)
}





function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}


function Search_Results_SHOW(movies) {
  movies.forEach((movie) => {
    const { original_title, original_name, poster_path, id, vote_average, overview, release_date, first_air_date , runtime, S_info} = movie;
    //console.log(movie);
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
        AddToFav(movie,FaveButton );
    });

    const PlayT = movieItem.querySelector(".button_style1");
    PlayT.addEventListener("click", function(event){
        event.stopPropagation();
        PlayTrailer( id ,  type_r);
    });


    search_R_div.appendChild(movieItem);
  });
}


show_more_g.addEventListener("touchstart", function() {
     show_more_g.innerHTML = 'LOADING ...';
     C_page = C_page + 1;
     Run_Fetch_Data(C_page)
     show_more_g.innerHTML = 'Show More &#x21b4;';
});







async function logSelectedOptions() {
    // Get all selected types
    const selectedTypes = Array.from(document.querySelectorAll('input[name="show_type"]:checked'))
        .map(checkbox => checkbox.value);

    // Get all selected countries
    const selectedCountries = Array.from(document.querySelectorAll('input[name="country"][data-country]:checked'))
        .map(checkbox => checkbox.value);

     // Get selected sort options
    const selectedSortOptions = [];
    document.querySelectorAll('.dropdown_content input[name="sorting"]:checked').forEach((checkbox) => {
    selectedSortOptions.push(checkbox.value);
    });

    // Get all selected years
    const selectedYears = Array.from(document.querySelectorAll('input[type="checkbox"][data-year]:checked'))
        .map(checkbox => checkbox.value);

    // Get all selected genres
    const selectedGenres = Array.from(document.querySelectorAll('input[type="checkbox"][data-genre]:checked'))
        .map(checkbox => checkbox.value);

    // Log the selected options to the console
   // console.log("Selected Types:", selectedTypes);
    //console.log("Selected Countries:", selectedCountries);
   // console.log("Selected Years:", selectedYears);
   /// console.log("Selected Genres:", selectedGenres);
    //console.log("Selected selectedSortOptions:", selectedSortOptions);


  m_url =  'https://api.themoviedb.org/3/discover/movie?';
  s_url = 'https://api.themoviedb.org/3/discover/tv?'


   if (selectedGenres.length) m_url += `&with_genres=${selectedGenres.join(',')}`;
   if (selectedYears.length) m_url += `&year=${selectedYears[0]}`;
   if (selectedCountries.length) m_url += `&with_origin_country=${selectedCountries[0]}`;
   if(selectedSortOptions.length) m_url +=  `&sort_by=${selectedSortOptions[0]}`

   if (selectedGenres.length) s_url += `&with_genres=${selectedGenres.join(',')}`;
   if (selectedYears.length) s_url += `&year=${selectedYears[0]}`;
   if (selectedCountries.length) s_url += `&with_origin_country=${selectedCountries[0]}`;
   if(selectedSortOptions.length) s_url +=  `&sort_by=${selectedSortOptions[0]}`

  //console.log('url_m', m_url)
 // console.log('url_s', s_url)

 if(selectedTypes[0] === 'Movie'){
        s_url = "";
  } else if(selectedTypes[0] === 'Tv'){
         m_url = '';
  } else {}

  search_R_div.innerHTML = ''
  C_page = 1;
  Run_Fetch_Data(C_page);
}


gen_filter_btn.addEventListener("touchstart", function() {
   logSelectedOptions()
});

//======================================================================================================================
//======================================================================================================================




const Select_options = document.querySelectorAll(".Select_box");
Select_options.forEach((Select_option) => {
  const dropdown_content = Select_option.querySelector(".dropdown_content");

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
  const dropdown_content = Select_option.querySelector(".dropdown_content");
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
  const dropdown_content = Select_option.querySelector(".dropdown_content");

    if (
      !Select_option.contains(event.target) &&
      !Select_option.contains(event.target)
    ) {
      dropdown_content.style.display = "none"; // Close the dropdown
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
    const sorting_checkboxes = document.querySelectorAll('input[name="sorting"]');
    const show_type_checkboxes = document.querySelectorAll('input[name="show_type"]');
    const year_checkboxes = document.querySelectorAll('input[name="year"]');
    const country_checkboxes = document.querySelectorAll('input[name="country"]');

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

    year_checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                year_checkboxes.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
            }
        });
    });

    country_checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                country_checkboxes.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
            }
        });
    });

});











/* ================================================================================================================== */
