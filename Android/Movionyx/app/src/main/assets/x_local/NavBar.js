document.body.addEventListener("pointermove", (e)=>{
  const { currentTarget: el, clientX: x, clientY: y } = e;
  const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
  el.style.setProperty('--posX',  x-l-w/2);
  el.style.setProperty('--posY',  y-t-h/2);
})

var Database_location = 'https://movionyx.com/Database/database.php'

let div_mob = true
if(!div_mob){
   document.querySelector('.nav_bar_bottom').classList.add('hid_element');
   document.querySelector('.reload_btn').classList.add('hid_element');
} else{
   document.querySelector('.search_btn').classList.add('hid_element');
}

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const scrollThreshold = 300; // Set the threshold to 300px
mobileBreakpoint = 968;
window.addEventListener('scroll', function() {
    if (window.innerWidth < mobileBreakpoint) {
        navbar.classList.remove('hide-navbar');
        navbar.classList.remove('hide-navbar_color');

        return;
    }
     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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


/* Check if the User-Agent matches your app
if (!navigator.userAgent.includes("MovionyxApp/1.0")) {
    // Block the page and show a message

    document.body.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <h1>Website Under Maintenance</h1>
            <p>This website can only be accessed via the official <strong>Movionyx App</strong>.</p>
        </div>
    `;
    // Optional: Redirect to app store after a delay
    setTimeout(() => {
        //window.location.href = "https://play.google.com/store/apps/details?id=com.example.movionyx";
    }, 3000);
}
*/
//==////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////





var  headers = {
  "accept": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjliMmUyN2MxYTZiYzMyMzNhZjE4MzJmNGFjYzg1MCIsIm5iZiI6MTcxOTY3NDUxNy4xOTYsInN1YiI6IjY2ODAyNjk1ZWZhYTI1ZjBhOGE4NGE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTms-g8dzOl3WwCeJ7WNLq3i2kXxl3T7gOTa8POcxcw"
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// SEARCH DATA ////////////////////////////////////////////////////////////
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


const HomeNav_btnT = document.getElementById("HomeNav_btnT");
const Movie_btnT = document.getElementById("Movie_btnT");
const TVSeries_btnT = document.getElementById("TVSeries_btnT");


const Genre_divT = document.getElementById("Genre_divT");
const Anime_btnT = document.getElementById("Anime_btnT");

// Add click event listener
HomeNav_btnT.addEventListener("click", function() {
   window.location.href = "Home.html";
});
Movie_btnT.addEventListener("click", function() {
   window.location.href = "view-more.html?query=movie";
});
TVSeries_btnT.addEventListener("click", function() {
   window.location.href = "view-more.html?query=show";
});

Anime_btnT.addEventListener("click", function() {
   window.location.href = "anime.html";
});

const Reload_btn = document.getElementById("Reload_btn");
Reload_btn.addEventListener("click", function() {
   window.location.href = "";
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
const Anime_btn = document.getElementById("Anime_btn");


// Add click event listener
HomeNav_btn.addEventListener("click", function() {
   localStorage.setItem("bottom_nav", 'HomeNav_btn')
   window.location.href = "Home.html";
});
Movie_btn.addEventListener("click", function() {
   localStorage.setItem("bottom_nav", 'Movie_btn')
   window.location.href = "view-more.html?query=movie";
});
TVSeries_btn.addEventListener("click", function() {
   localStorage.setItem("bottom_nav", 'TVSeries_btn')
   window.location.href = "view-more.html?query=show";
});

Anime_btn.addEventListener("click", function() {
   localStorage.setItem("bottom_nav", 'Anime_btn')
   window.location.href = "anime.html";
});


let active_tub = localStorage.getItem ("bottom_nav")
//console.log("active_tub", active_tub)
if(active_tub){
  [HomeNav_btn, Movie_btn, TVSeries_btn, Anime_btn].forEach(btn => {
    Array.from(btn.children).forEach(child => {
      child.style.color = 'var(--global-color-fg)';
    });
  });

  if(active_tub === "HomeNav_btn") {
   Array.from(HomeNav_btn.children).forEach(child => {
      child.style.color = 'var(--Brand_Color)'; // Change child elements' text color
    });
  }
  if(active_tub === "Movie_btn") {
     Array.from(Movie_btn.children).forEach(child => {
      child.style.color = 'var(--Brand_Color)'; // Change child elements' text color
    });
  }
  if(active_tub === "TVSeries_btn") {
     Array.from(TVSeries_btn.children).forEach(child => {
      child.style.color = 'var(--Brand_Color)'; // Change child elements' text color
    });
  }
  if(active_tub === "Anime_btn") {
     Array.from(Anime_btn.children).forEach(child => {
      child.style.color = 'var(--Brand_Color)'; // Change child elements' text color
    });

  }
}



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




async function AddToFav(movie, widget){

    //console.log(movie);

    delete movie.adult;
    delete movie.networks;
    delete movie.created_by;
    delete movie.episode_run_time;
    delete movie.homepage;
    delete movie.in_production;
    delete movie.next_episode_to_air;
    delete movie.number_of_episodes;
    delete movie.number_of_seasons;
    delete movie.origin_country;
    delete movie.original_language;
    delete movie.overview;
    delete movie.popularity;
    delete movie.production_companies;
    delete movie.production_countries;
    delete movie.seasons;
    delete movie.spoken_languages;
    delete movie.languages;
    delete movie.status;
    delete movie.tagline;
    delete movie.type;
    delete movie.vote_count;
    delete movie.backdrop_path;
    delete movie.last_air_date;
    delete movie.genres;
    delete movie.last_episode_to_air;
    delete movie.belongs_to_collection;
    delete movie.budget;
    delete movie.imdb_id;
    delete movie.revenue;
    delete movie.video;
    delete movie.original_title;


    if(movie.S_info){
       delete movie.runtime
       delete movie.release_date
    }else{
       delete movie.S_info
    }


    console.log(movie)

    let email = localStorage.getItem('user_email');
    /////////////////////////////////////////////////////////////////////////////////////

    let serverResponse = await fetch(Database_location, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `action=getWatchlist&email=${encodeURIComponent(email)}`
    });
    const serverData = await serverResponse.json();
    if(serverData.massage !== 'Error fetching'){
        //console.log(serverData.massage);
        //console.log("watchlist: ",JSON.parse(serverData.massage));

        const parsedFav = JSON.parse(serverData.massage);
        parsedFav.push(movie);

        const uniqueMovies = parsedFav.filter((movie, index, self) =>
          index === self.findIndex(m => m.id === movie.id)
        );
        localStorage.setItem("user_watchlist", JSON.stringify(uniqueMovies));

        let watchlist_new =  JSON.stringify(uniqueMovies);

        let response = await fetch(Database_location, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=updateWatchlist&email=${encodeURIComponent(email)}&watchlist=${encodeURIComponent(watchlist_new)}`
        });
        const data = await response.json();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    try{
          let S_info =  movie.S_info;
          let id =  movie.id
          let numbers = S_info.match(/\d+/g).map(Number); //[1,1]
          numbers.push(id)
          //console.log(numbers);

          let serverResponse = await fetch(Database_location, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `action=getMessageslist&email=${encodeURIComponent(email)}`
          });
          const notificationData = await serverResponse.json();
          if(notificationData.massage !== 'Error fetching'){
              //console.log(notificationData.massage);
              //console.log("Notification: ",JSON.parse(notificationData.massage));
              const parsed_notification =  JSON.parse(notificationData.massage) ;
              parsed_notification.push(numbers);

              numbers = parsed_notification.filter((movie, index, self) =>
                   index === self.findIndex(m => m[2] === movie[2])
              );

              let response_note = await fetch(Database_location, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `action=updateMassagelist&email=${encodeURIComponent(email)}&Messages=${encodeURIComponent(JSON.stringify(numbers))}`
              });
              const data_note = await response_note.json();
              //console.log("notification:", data_note.massage)
              localStorage.setItem("user_massages", JSON.stringify(numbers));
           }

    } catch (error){}

    //widget.classList.remove('button_style2');
    //widget.classList.add('button_style3');
    widget.style.display = 'none';
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Terms_Container = document.getElementById("Terms_Container");
let terms_FeedBack = localStorage.getItem('terms_FeedBack');
//console.log('Platform Terms Condition : ', terms_FeedBack);
//if (terms_FeedBack !== null ){
if (true ){
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
var Authentication_section = document.getElementById("Authentication_section");
var Login_container  = document.getElementById("Login_container");
var Register_container  = document.getElementById("Register_container");
var Forgot_password_container  = document.getElementById("Forgot_password_container");

var Register_view  = document.getElementById("Register_view");
var Forgot_password_view  = document.getElementById("Forgot_password_view");
var Login_view  = document.getElementById("Login_view");


Register_view.addEventListener("click", function() {
        Register_container.style.display = 'block';
        Login_container.style.display = 'none';
        Forgot_password_container.style.display = 'none';

        Register_view.style.opacity = '1';
        Forgot_password_view.style.opacity= '0.3';
        Login_view.style.opacity = '0.3';
});


Forgot_password_view.addEventListener("click", function() {
        Login_container.style.display = 'none';
        Forgot_password_container.style.display = 'block';
        Register_container.style.display = 'none';

        Register_view.style.opacity = '0.3';
        Forgot_password_view.style.opacity = '1';
        Login_view.style.opacity ='0.3';
});

Login_view.addEventListener("click", function() {
        Forgot_password_container.style.display = 'none';
        Login_container.style.display = 'block';
        Register_container.style.display = 'none';

        Register_view.style.opacity = '0.3';
        Forgot_password_view.style.opacity = '0.3';
        Login_view.style.opacity ='1';
});

function attachEnterTrigger(containerId, buttonId) {
    const container = document.getElementById(containerId);
    const button = document.getElementById(buttonId);

    if (container && button) {
        container.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                button.click();
            }
        });
    }
}
attachEnterTrigger("Login_container", "loginForm");
attachEnterTrigger("Register_container", "signUpForm");
attachEnterTrigger("Forgot_password_container", "forget_p_form");


Login_view.click()


const cancelButtons = document.querySelectorAll('.login_cancel'); // Selects ALL elements with class
cancelButtons.forEach(button => {
    button.addEventListener('click', function() {
            Authentication_section.style.display = 'none';
    });
});


const Account_btn = document.getElementById("Account_btn");
Account_btn.style.display = 'none';
const Account_btnT = document.getElementById("Account_btnT");

const handle_account = function() {
    let savedState = localStorage.getItem("U_ID");
    console.log('savedState', savedState)
    if (savedState) {
        window.location.href = "profile.html";
        Authentication_section.style.display = 'none';
    }else {
        Authentication_section.style.display = 'flex';
    }
};
Account_btn.addEventListener("click", handle_account)
Account_btnT.addEventListener("click", handle_account)

let savedState = localStorage.getItem("U_ID");
if (savedState) {
     user_profile_img = localStorage.getItem('user_profile_img');
     Account_btnT.innerHTML = '';
     Account_btnT.style.background =  `url(${user_profile_img})`;
     Account_btnT.style.backgroundSize = '100% 100%';
     Account_btnT.style.backgroundPosition = 'center';
     Account_btnT.style.backgroundRepeat = 'no-repeat';

     Account_btn.innerHTML = '';
     Account_btn.style.background =  `url(${user_profile_img})`;
     Account_btn.style.backgroundSize = '100% 100%';
     Account_btn.style.backgroundPosition = 'center';
     Account_btn.style.backgroundRepeat = 'no-repeat';
     Account_btn.style.borderRadius = '50%';

     document.getElementById('notification_btnT').style.display = 'flex';
     notification_check()
     auto_update_user_info()
     //setInterval(notification_check, 60000);
}
async function auto_update_user_info(){
    let email = localStorage.getItem('user_email');

    let serverResponse = await fetch(Database_location, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `action=getUser&email=${encodeURIComponent(email)}`
    });
    const serverData = await serverResponse.json();
    if(serverData.massage !== 'User not found'){
          //console.log(serverData.massage);
          user_data =  serverData.massage
          let user_image =  user_data.ProfileIMG
          let user_watchlist = user_data.watchlist
          let user_mssage =  user_data.Messages

          localStorage.setItem('user_profile_img', user_image);
          localStorage.setItem("user_watchlist", user_watchlist);
          localStorage.setItem("user_massages", user_mssage);
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////   Authentication section ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('loginForm').addEventListener('click', async function(e) {
            e.preventDefault();
            const btn = e.target
            //btn.classList.add('loading_active');

            const email = document.getElementById('login_username').value.trim();
            const password = document.getElementById('login_password').value.trim();
            const messageDiv = document.getElementById('login_error_display');

            messageDiv.classList.add('loading_active');

            const response = await fetch(Database_location, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                  },
            body: `action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            });

            const data = await response.json();
            if(data.massage === 'Invalid password'){
                 messageDiv.innerHTML =  'Invalid password'
                 messageDiv.classList.remove('loading_active');

            }else if (data.massage === 'User not found'){
                 messageDiv.innerHTML =  'User not found'
                 messageDiv.classList.remove('loading_active');
            } else {
                //console.log('Login :', data);

                let user_info = data.massage;
                let not_t =  user_info.Messages || '[]';
                let watch_fave = user_info.watchlist || '[]';
                let user_profile_img = user_info.ProfileIMG || '/Assets/account.png';

                localStorage.setItem('U_ID', user_info.email);
                localStorage.setItem('user_email', user_info.email);
                localStorage.setItem('user_name', user_info.name);
                localStorage.setItem('user_watchlist', watch_fave);
                localStorage.setItem('user_massages', not_t);
                localStorage.setItem('user_joined', user_info.created_at);
                localStorage.setItem('user_profile_img', user_profile_img);

                Account_btnT.innerHTML = '';
                Account_btnT.style.background = `url(${user_profile_img})`;
                Account_btnT.style.backgroundSize = '100% 100%';
                Account_btnT.style.backgroundPosition = 'center';
                Account_btnT.style.backgroundRepeat = 'no-repeat';

                Account_btn.innerHTML = '';
                Account_btn.style.background =  `url(${user_profile_img})`;
                Account_btn.style.backgroundSize = '100% 100%';
                Account_btn.style.backgroundPosition = 'center';
                Account_btn.style.backgroundRepeat = 'no-repeat';
                Account_btn.style.borderRadius = '50%';
                messageDiv.classList.remove('loading_active');

                Authentication_section.style.display = 'none';
                document.getElementById('notification_btnT').style.display = 'flex';
                notification_check()
            }
 });

document.getElementById('signUpForm').addEventListener('click', async function(e) {
            e.preventDefault();

             // Get form elements
            const sign_up_Name_ = document.getElementById('sign_up_Name_').value.trim();
            const sign_up_email_ = document.getElementById('sign_up_email_').value.trim();
            const sign_up_password_ = document.getElementById('sign_up_password_').value.trim();
            const sign_up_password_confirm = document.getElementById('sign_up_password_confirm').value.trim();
            const messageDiv = document.getElementById('signup_error_display');

                // Clear previous messages
            messageDiv.textContent = '';
            messageDiv.className = 'error-message';

            // Basic validation
            if (!sign_up_Name_ || !sign_up_email_ || !sign_up_password_ || !sign_up_password_confirm) {
               messageDiv.textContent = 'All fields are required';
               return;
            }

            if (!isValidEmail(sign_up_email_)) {
                messageDiv.textContent = 'Please enter a valid email address';
                return;
            }

            if (sign_up_password_ !== sign_up_password_confirm) {
               messageDiv.textContent = 'Passwords do not match';
               return;
            }

            const response = await fetch(Database_location, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                  },
            body: `action=register&name=${encodeURIComponent(sign_up_Name_)}&email=${encodeURIComponent(sign_up_email_)}&password=${encodeURIComponent(sign_up_password_)}`
            });

            const data = await response.json();
            //console.log('signUp :', data);

            messageDiv.textContent = data.massage;

            let user_info = data.massage;
            if(data.massage === 'User added successfully'){
                localStorage.setItem('U_ID', sign_up_email_)
                localStorage.setItem('user_email', sign_up_email_)
                localStorage.setItem('user_name', sign_up_Name_)
                localStorage.setItem('user_watchlist', '[]')
                localStorage.setItem('user_massages', '[]')
                localStorage.setItem('user_profile_img', './Assets/account.png');
                const currentDate = new Date();
                localStorage.setItem('user_joined', currentDate.toString());


                Account_btnT.innerHTML = '';
                Account_btnT.style.background = `url('./Assets/account.png')`;
                Account_btnT.style.backgroundSize = '100% 100%';
                Account_btnT.style.backgroundPosition = 'center';
                Account_btnT.style.backgroundRepeat = 'no-repeat';

                Account_btn.innerHTML = '';
                Account_btn.style.background = `url('./Assets/account.png')`;
                Account_btn.style.backgroundSize = '100% 100%';
                Account_btn.style.backgroundPosition = 'center';
                Account_btn.style.backgroundRepeat = 'no-repeat';
                Account_btn.style.borderRadius = '50%';

                messageDiv.classList.remove('loading_active');
                Authentication_section.style.display = 'none';
                document.getElementById('notification_btnT').style.display = 'flex';
            }

});

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


document.getElementById('forget_p_form').addEventListener('click', async function(e) {
            e.preventDefault();

             // Get form elements
            const reset_email_ = document.getElementById('reset_email_').value.trim();
            const messageDiv = document.getElementById('Forgot_display');

            messageDiv.textContent = '';
            messageDiv.className = 'error-message';

            // Basic validation
            if (!reset_email_ ) {
               messageDiv.textContent = 'All fields are required';
               return;
            }

            if (!isValidEmail(reset_email_)) {
                messageDiv.textContent = 'Please enter a valid email address';
                return;
            }
            console.log(reset_email_)

            const response = await fetch(Database_location, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                  },
            body: `action=requestPasswordReset&email=${encodeURIComponent(reset_email_)}`
            });

            const data = await response.json();
            console.log('reset :', data);

            messageDiv.textContent = data.massage;

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// Notification Section /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let show_notification = false
document.getElementById('notification_btnT').addEventListener('click', async function(e) {
            e.preventDefault();

            if(show_notification){
               document.getElementById('notification_container').style.display = 'none';
            }else{
               document.getElementById('notification_container').style.display = 'flex';
            }
            show_notification = !show_notification;

});


async function notification_check(){
    let notification_widget = document.getElementById('notification_container')
    notification_widget.innerHTML = '';

    let  notification =  localStorage.getItem('user_massages');
    const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
    //console.log(notification);
     if(notification){
        const parsed_notification = JSON.parse(notification);
        let notification_count = 0
        for (let i = 0; i < parsed_notification.length; i++) {
            try{
                   let tv_id = parsed_notification[i][2]; // Assuming this is the TV show ID
                   let t_url = `https://api.themoviedb.org/3/tv/${tv_id}?language=en-US`

                   const response = await fetch(t_url, { headers });
                   const data = await response.json();

                    //console.log(parsed_notification[i]);
                    //console.log(data);
                    let { name, poster_path, id , last_episode_to_air } = data;

                    let last_season = parsed_notification[i][0];
                    let last_episode = parsed_notification[i][1];

                    let new_season = last_episode_to_air.season_number;
                    let new_episode = last_episode_to_air.episode_number;

                    let Info = '';
                    let episodeDiff = 0;
                    if (new_season > last_season) {
                        episodeDiff = new_episode;
                        Info = `New Season (${new_season}) with ${episodeDiff} episodes`;
                    } else if (new_season === last_season && new_episode > last_episode) {
                        episodeDiff = new_episode - last_episode;
                        Info = `${episodeDiff} New Episode${episodeDiff > 1 ? 's' : ''}`;
                    } else {
                      continue;
                    }

                    let movieItem = document.createElement("div");
                    movieItem.classList.add("notification_container_each");
                    movieItem.innerHTML = `
                        <img class="notification_container_each_img" src="${IMG_PATH + poster_path}" alt="">
                        <div class="notification_container_info">
                              <div class="notification_container_title"> ${name}  </div>
                              <div class="notification_container_Details"> ${Info} </div>
                        </div>
                    `;
                    // Add event listener to open another page when clicked
                    movieItem.addEventListener("click", () => {
                          window.location.href = "watch.html?id=" + id + "&type=tv";
                    });


                    notification_widget.appendChild(movieItem);

                    notification_count++
                    document.getElementById('notification_badge').style.display = 'flex'
                    document.getElementById('notification_badge').innerHTML = notification_count;

            }catch(error){}
        }

     }

}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function scrambleToText(el, finalText, speed = 40) {
      const chars = '█▓▒░<>\\/|_‖∆Ω≡≠∑√ΦΞ※Λ⋆+*#?~'
      const queue = []
      const length = finalText.length

      for (let i = 0; i < length; i++) {
        queue.push({
          to: finalText[i],
          char: '',
          done: false,
          frame: 0,
          maxFrames: Math.floor(Math.random() * speed+ speed)
        })
      }

      function randomChar() {
        return chars[Math.floor(Math.random() * chars.length)]
      }

      function update() {
        let output = ''
        let complete = 0

        for (let i = 0; i < length; i++) {
          const q = queue[i]
          if (q.done) {
            output += q.to
            complete++
          } else {
            if (q.frame >= q.maxFrames) {
              q.done = true
              output += q.to
            } else {
              if (q.frame === 0 || Math.random() < 0.5) {
                q.char = randomChar()
              }
              output += `<span class="dud" style="color: #1B1B1B; opacity: 0.1;">${q.char}</span>`
              q.frame++
            }
          }
        }

        el.innerHTML = output


        if (complete < length) {
          requestAnimationFrame(update)
        }
      }

      update()

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////// Disable Right Click + Inspect Element ////////////////////////////////////////////////////
/*

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

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


