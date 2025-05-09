
let User_Saved_state = sessionStorage.getItem("U_ID");
const headers = {
  "accept": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};

//======================================= SEARCH DATA/ ===================================================
//FORM SEARCH SUBMIT

document.getElementById('search_input_top').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();  // Prevents the default "Enter" key behavior
    const searchValue = event.target.value.trim(); // Trim whitespace

    if (searchValue  !== "") {
    searchValue.value = "";
    window.location.href = "S_Results.html?search_query=" + encodeURIComponent(searchValue);
    } else { }
  }
});


document.getElementById('search_input_bottom').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();  // Prevents the default "Enter" key behavior
    const searchValue = event.target.value.trim(); // Trim whitespace

    if (searchValue  !== "") {
    searchValue.value = "";
    window.location.href = "S_Results.html?search_query=" + encodeURIComponent(searchValue);
    } else { }
  }
});



// SEARCH BTN FUNCTIONALITY

const search_bt = document.querySelector('.search_btn')
const search_bt_toggle = document.querySelector('.search_btn_toggle')
var Search_icon_  = document.getElementById("Search_icon_");

let Search_icon_t = Search_icon_.innerHTML
let search_btn_isActive = false

search_bt_toggle.onclick = function(){
  if (search_btn_isActive) {
    Search_icon_.innerHTML = Search_icon_t
    Genre_divT.style.display = 'none';
    search_bt.classList.remove('active')
    search_btn_isActive = false
  } else {
    Search_icon_.innerHTML = '+'
    search_bt.classList.add('active')
     Genre_divT.style.display = 'flex';
    search_btn_isActive = true
  }
}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const scrollThreshold = 5; // Set the threshold to 300px
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
     //console.log("scrollTop", scrollTop);
     if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                navbar.classList.add('hide-navbar');
                navbar.classList.add('hide-navbar_color');
            } else {
                // Scrolling up
                navbar.classList.remove('hide-navbar');
            }
     }else{  // If the user is within the  threshold  ensure the navbar is visible
        navbar.classList.remove('hide-navbar');
        navbar.classList.remove('hide-navbar_color');
     }
    lastScrollTop = scrollTop;
});


const HomeNav_btnT = document.getElementById("HomeNav_btnT");
const Movie_btnT = document.getElementById("Movie_btnT");
const TVSeries_btnT = document.getElementById("TVSeries_btnT");

const Account_btnT = document.getElementById("Account_btnT");
const Genre_divT = document.getElementById("Genre_divT");
const Anime_btnT = document.getElementById("Anime_btnT");

// Add click event listener
HomeNav_btnT.addEventListener("click", function() {
   window.location.href = "index.html";
});
Movie_btnT.addEventListener("click", function() {
   window.location.href = "view-more.html?query=movie";
});
TVSeries_btnT.addEventListener("click", function() {
   window.location.href = "view-more.html?query=show";
});

Account_btnT.addEventListener("click", function() {
    if (User_Saved_state) {
        window.location.href = "profile.html";
    }else {
        window.location.href = "L_S.html";
    }
});



Anime_btnT.addEventListener("click", function() {
   window.location.href = "anime.html";
});







let active_Genre_divT = 1;
Genre_divT.addEventListener("click", function() {
    if(active_Genre_divT){
        active_Genre_divT = 0;
        const Genre_divT_container = document.getElementById("Genre_divT_container");
        Genre_divT_container.style.display = 'block';
    } else {
        active_Genre_divT = 1;
        const Genre_divT_container = document.getElementById("Genre_divT_container");
        Genre_divT_container.style.display = 'none';
    }
});

// Add mouseleave event listener to Genre_divT_container
const Genre_divT_container = document.getElementById("Genre_divT_container");
Genre_divT_container.addEventListener("mouseleave", function () {
    Genre_divT_container.style.display = 'none'; // Hide the container on mouse leave
    active_Genre_divT = 1; // Reset the active state
});





// Add a click event listener to each genre element
const genreElements = document.querySelectorAll(".genre_each");
genreElements.forEach((genreElement) => {
    genreElement.addEventListener("click", function () {
        const genreId = genreElement.dataset.genre;
        const genreName = genreElement.textContent;
        window.location.href = "genre.html?" + genreName + '-' + genreId
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*================================  Bottom Nav bar =====================================================================*/

const HomeNav_btn = document.getElementById("HomeNav_btn");
const Movie_btn = document.getElementById("Movie_btn");
const TVSeries_btn = document.getElementById("TVSeries_btn");
const Account_btn = document.getElementById("Account_btn");
const Anime_btn = document.getElementById("Anime_btn");
const Reload_btn = document.getElementById("Reload_btn");

// Add click event listener
HomeNav_btn.addEventListener("click", function() {
   window.location.href = "index.html";
});
Movie_btn.addEventListener("click", function() {
   window.location.href = "view-more.html?query=movie";
});
TVSeries_btn.addEventListener("click", function() {
   window.location.href = "view-more.html?query=show";
});

Anime_btn.addEventListener("click", function() {
   window.location.href = "anime.html";
});

Account_btn.addEventListener("click", function() {

    let savedState = sessionStorage.getItem("U_ID");
    if (savedState) {
        window.location.href = "Favorites.html";
    }else {
        window.location.href = "L_S.html";
    }
});


let savedState = sessionStorage.getItem("U_ID");
if (savedState) {
     Account_btnT.innerHTML = '';
     Account_btnT.style.background = `url('./Assets/cat.png')`;
     Account_btnT.style.backgroundSize = '100% 100%';
     Account_btnT.style.backgroundPosition = 'center';
     Account_btnT.style.backgroundRepeat = 'no-repeat';

     Account_btn.innerHTML = '';
     Account_btn.style.background = `url('./Assets/cat.png')`;
     Account_btn.style.backgroundSize = '100% 100%';
     Account_btn.style.backgroundPosition = 'center';
     Account_btn.style.backgroundRepeat = 'no-repeat';
}


Reload_btn.addEventListener("click", function() {
   window.location.href = "";
});



const nav_bar_bottom = document.querySelector('.nav_bar_bottom')
const search_btn_bottom = document.getElementById('search_btn_bottom')
const search_div_bottom = document.querySelector('.search_div_bottom')
const search_input_bottom = document.querySelector('.search_input_bottom')
const search_btn_bottom_cancel = document.querySelector('.search_btn_bottom_cancel')
const search_btn_filter = document.getElementById("search_btn_filter_bottom");

search_btn_bottom.onclick = function(){
       search_div_bottom.style.display = "flex";
       search_input_bottom.focus();
       nav_bar_bottom.classList.add('active');
       //search_btn_filter.style.display = "flex";
}

search_btn_bottom_cancel.onclick = function(){
       search_div_bottom.style.display = "none";
       nav_bar_bottom.classList.remove('active');
       //search_btn_filter.style.display = "none";

}

//search_btn_bottom.click();



search_btn_filter.addEventListener("click", function() {
    if(active_Genre_divT){
        active_Genre_divT = 0;
        const genre_filter_bottom_nav = document.getElementById("genre_filter_bottom_nav");
        genre_filter_bottom_nav.style.display = 'block';
        genre_filter_bottom_nav.style.BackdropFilter = 'blur(240px)';

    } else {
        active_Genre_divT = 1;
        const genre_filter_bottom_nav = document.getElementById("genre_filter_bottom_nav");
        genre_filter_bottom_nav.style.display = 'none';
    }
});


// Add mouseleave event listener to genre_filter_bottom_nav
const genre_filter_bottom_nav = document.getElementById("genre_filter_bottom_nav");
genre_filter_bottom_nav.addEventListener("mouseleave", function () {
    genre_filter_bottom_nav.style.display = 'none'; // Hide the container on mouse leave
    active_Genre_divT = 1; // Reset the active state
});

genre_filter_bottom_nav.addEventListener("touchcancel", function () {
    genre_filter_bottom_nav.style.display = 'none'; // Hide the container on mouse leave
    active_Genre_divT = 1; // Reset the active state
});



/*
document.addEventListener("click", function (event) {
  Select_box_titles.forEach((Select_box_title) => {
    const dropdown_content = Select_box_title.nextElementSibling;

    // Check if the click is outside the dropdown and its associated 'Select_box_title'
    if (
      !Select_box_title.contains(event.target) &&
      !dropdown_content.contains(event.target)
    ) {
      dropdown_content.style.display = "none"; // Close the dropdown
    }
  });
});

document.addEventListener("touchcancel", function (event) {
  Select_box_titles.forEach((Select_box_title) => {
    const dropdown_content = Select_box_title.nextElementSibling;

    // Check if the click is outside the dropdown and its associated 'Select_box_title'
    if (
      !Select_box_title.contains(event.target) &&
      !dropdown_content.contains(event.target)
    ) {
      dropdown_content.style.display = "none"; // Close the dropdown
    }
  });
});


*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const trailer_div_cancel = document.getElementById("trailer_div_cancel");
trailer_div_cancel.addEventListener("click", (event) => {
        const trailer_div = document.getElementById("trailer_div");
        const trailer_div_iframe = document.getElementById("trailer_div_iframe");
        trailer_div_iframe.innerHTML = ''
        trailer_div.style.display = 'none';
});


async function PlayTrailer(id_play, type){
        //console.log('id_play_type', type)
        //console.log('id_play', id_play)
        const trailer_div = document.getElementById("trailer_div");
        trailer_div.style.display = 'flex';

        try{
                const trailer_div_iframe = document.getElementById("trailer_div_iframe");
                let t_url = `https://api.themoviedb.org/3/tv/${id_play}/videos?language=en-US`

                if (type === 'movie'){
                    t_url = `https://api.themoviedb.org/3/movie/${id_play}/videos?language=en-US`
                }
                const response = await fetch(t_url, { headers });
                const data = await response.json();

                //console.log("Trailer :" , data);
                //console.log("Trailer :" , data.results[0]);
               // console.log("Trailer :" , data.results[data.results.length - 1]);

                 if (data.results[data.results.length - 1] === undefined) {
                    trailer_div.style.display = 'none'
                    return
                 }

                //trailer_div_iframe.innerHTML = `<iframe width="560"  height="315"  src="https://www.youtube.com/embed/${data.results[data.results.length - 1]['key']}?autoplay=1&rel=1&mute=0" frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"   allowfullscreen>    </iframe>`
                trailer_div_iframe.innerHTML = `<iframe width="560"  height="315"  src="https://www.youtube.com/embed/${data.results[0]['key']}?autoplay=1&rel=1&mute=0" frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"   allowfullscreen>    </iframe>`

        } catch(error){
                 trailer_div_iframe.innerHTML = 'Trailer Not available'
                 console.log(error.massage)
         }
}




async function AddToFav(movie){
     const Fave = localStorage.getItem('Favorites');
     console.log("Fav :" , Fave);
     console.log("Fav :" , !Fave);
    if(!Fave){
        localStorage.setItem("Favorites", JSON.stringify([movie]));
    } else {
        const parsedFav = JSON.parse(Fave);
        parsedFav.push(movie);

        const uniqueMovies = parsedFav.filter((movie, index, self) =>
          index === self.findIndex(m => m.id === movie.id)
        );
        localStorage.setItem("Favorites", JSON.stringify(uniqueMovies));
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Terms_Container = document.getElementById("Terms_Container");
let terms_FeedBack = localStorage.getItem('terms_FeedBack');
//console.log('Platform Terms Condition : ', terms_FeedBack);
if (terms_FeedBack !== null ){
       Terms_Container.style.display = "none";
} else {

        Terms_Container.innerHTML =`
                  <div class="Terms_Box" id="Terms_Box">
                       <div class="Terms_Details">
                           <div class="Terms_Details_title">Terms of Use Agreement</div>
                           <div class="Terms_Details_content">
                               <p> Welcome to MoviOnyx. By accessing or using this Platform,
                                   you agree to be bound by these Terms of Use . If you do not agree to these Terms, you must not use this platform.
                                   These Terms constitute a legally binding agreement between you and us.
                               </p>
                               <h3>1. Acceptance of Terms</h3>
                               <p>
                                   By using this Platform, you confirm that you are at least 18 years old or the age of majority in your jurisdiction,
                                   and you have the legal capacity to enter into this agreement. If you are under 18 or the age of majority,
                                   you may only use the Platform with the consent and supervision of a parent or legal guardian.
                               </p>
                                <h3>2. Third-Party Links and Content</h3>
                               <p >
                                   The Platform provides access to third-party links and embedded content ("Third-Party Content") for informational and entertainment purposes only.
                                   We do not host, upload, or distribute any movies, videos, or other media files. All Third-Party Content is hosted and provided by external sources.
                                   <br><br>
                                   <p class="custom_bullets">
                                       I. <strong> No Control Over Third-Party Content: </strong> We have no control over the content, quality, legality, or availability of Third-Party Content.
                                       We do not endorse, guarantee, or assume responsibility for any Third-Party Content or the actions of third-party websites.
                                       <br>
                                       II. <strong> No Warranty:</strong> We do not guarantee the accuracy, legality, or safety of any Third-Party Content.
                                       You access and use Third-Party Content at your own risk.
                                       <br>
                                       III. <strong> Prohibited Use: </strong> You may not copy, reproduce, distribute, modify, or create derivative works of any Third-Party Content
                                       without the express permission of the copyright owner.
                                    </p>
                               </p>

                               <h3>3. User Responsibilities</h3>
                               <p> By using this Platform, you agree to the following</p>
                                  <p class="custom_bullets">
                                      <br> 1. You will not engage in any activity that disrupts or interferes with the operation of the Platform, including but not limited to hacking, spamming, or distributing malware.
                                      <br> 2. You will not use the Platform to violate any applicable laws or regulations.
                                      <br> 3. You will not attempt to reverse engineer, decompile, or disassemble any part of the Platform or its technology
                                      <br> 4. You will not impersonate any person or entity or falsely state or misrepresent your affiliation with any person or entity.
                                      <br> 5. If you access third-party websites or services through links on the Platform, you agree to comply with their respective terms of use and policies
                                      <br> 6. You agree that you are solely responsible for your actions while using the Platform. If your actions result in any claims, liabilities, or damages to us or third parties, you agree to indemnify and hold us harmless
                                  </p>

                               <h3> 4. Disclaimer of Liability </h3>
                               <p> The Platform and its Third-Party Content are provided "as is" and "as available" without any warranties, express or implied.
                                   We do not guarantee that the Platform will be error-free, uninterrupted, or free from viruses or other harmful components.</p>
                                  <p class="custom_bullets">
                                      <br> No Liability: To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your use of the Website or its Third-Party Conten
                                      <br> Third-Party Links & service : The Platform may or contain links to third-party websites or services. We are not responsible for the content, practices, or policies of these third-party sites and disclaim all liability for your use of them.
                                  </p>

                               <h3> 5. Indemnification </h3>
                               <p> You agree to indemnify, defend, and hold harmless [Your Company Name], its affiliates, officers, directors,
                                   employees, and agents from and against any and all claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or related to:.</p>
                                  <p class="custom_bullets">
                                      <br> 1. Your use of the Platform or its Third-Party Content.
                                      <br> 2. Your violation of these Terms
                                      <br> 3. Your violation of any third-party rights, including intellectual property rights.
                                      <br> 4. Any use of the Platform or its content by you or anyone accessing the Website through your account (if applicable).
                                      <br> 5. Any legal proceedings, investigations, or disputes initiated by you or a third party as a result of your use of the Platform
                                  </p>

                                <p>
                                This Platform is for use solely by individuals who are at least 18 years old and have reached the age of majority or age of consent as determined by the laws of the jurisdiction from which they are accessing the Platform. Accessing this Platform is prohibited by law.
                                By clicking “I Agree” below, you state that the following statements are accurate:
                                    <p class="custom_bullets">
                                    <br> #1. You are at least 18 years old and the age of majority or age of consent in your jurisdiction.
                                    <br> #2. You will promptly leave this Platform if you are offended by its content.
                                    <br> #3. You will not hold the Platform’s owners or its employees responsible for any materials located on the Platform. (third party materials and services)
                                    <br> #4. You acknowledge that the Platform’s Terms of Use govern your use of the Platform, and you have reviewed and agree to be bound by the Terms of Use.
                                   </p>
                                If you disagree with the above, click on the “I Disagree” button below to leave the Website.
                                </p>



                           </div>
                       </div>

                       <div class="Terms_Feedback">
                           <div class="terms_Date_btn">  2025 </div>
                           <div class="t_bts">
                               <div class="terms_agree_btn" id="terms_agree_btn"> I Agree </div>
                               <div class="terms_Disagree_btn" id="terms_Disagree_btn"> I Disagree </div>
                           </div>
                       </div>
                   </div>

                   <div class="show_terms" id='show_terms'> Start </div>
                  `;

        const terms_agree_btn = document.getElementById("terms_agree_btn");
        terms_agree_btn.addEventListener("click", () => {
             Terms_Container.style.display = "none";
             localStorage.setItem("terms_FeedBack", "Terms agreed By User");
        });

        const terms_Disagree_btn = document.getElementById("terms_Disagree_btn");
        const show_terms_btn = document.getElementById("show_terms");
        const Terms_Box = document.getElementById("Terms_Box");
        terms_Disagree_btn.addEventListener("click", () => {
              show_terms_btn.style.display = "flex";
              Terms_Box.classList.add('active')
        });


        show_terms_btn.addEventListener("click", () => {
             //Terms_Box.style.display = "none";
              show_terms_btn.style.display = "none";
              Terms_Box.classList.remove('active');
        });
}
// =====================================================================================================================

function checkAndClearLocalStorage() {
    try {
        // Attempt to write a large item to localStorage
        const testKey = "testKey";
        const testData = new Array(1024 * 1024).join("a"); // 1MB of data
        localStorage.setItem(testKey, testData);

        // If successful, remove the test item
        localStorage.removeItem(testKey);
        //console.log("localStorage is not full.");
    } catch (error) {
        if (error.name === "QuotaExceededError") {
            // localStorage is full, clear it
            localStorage.clear();
            //console.log("localStorage was full and has been cleared.");
        } else {
            // Handle other errors
            //console.error("An error occurred:", error);
        }
    }
}

// Set up the interval to run every 10 minutes (600,000 milliseconds)
const interval = 10 * 60 * 1000; // 10 minutes in milliseconds
setInterval(checkAndClearLocalStorage, interval);

// Initial check
checkAndClearLocalStorage();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Disable Right Click + Inspect Element ////////////////////////////////////////////////////


document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
    e.preventDefault();
  }
});


///////////////////////////// Self-Destruct on Debugging ///////////////////////////////////////////////////////////////

setInterval(function() {
    try {
        (function() {
            return !!Function('debugger')();
        })() && (function() {
            window.location.href = 'about:blank';
            window.stop();
            return false;
        })();
    } catch(e) {}
}, 1000)

/*
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


