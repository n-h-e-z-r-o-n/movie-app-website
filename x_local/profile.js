const search_R_div = document.getElementById("Watch_List_container");
const logout_btn = document.getElementById("logout_btn");

const xr = document.getElementById("Account_btn");
const xr2 = document.getElementById("Account_btnT");
xr.style.pointerEvents = 'none';
xr2.style.pointerEvents = 'none';

var Database_location = 'https://movionyx.com/Database/database.php'


const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
let U_ID = localStorage.getItem("U_ID");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

logout_btn.addEventListener("click", function() {
        sessionStorage.clear();
        localStorage.removeItem('U_ID')
        localStorage.removeItem('user_email')
        localStorage.removeItem('user_name')
        localStorage.removeItem('user_watchlist')
        localStorage.removeItem('user_massages')
        localStorage.removeItem('user_profile_img')

        window.location.href = "Home.html";
});

if(U_ID){
    getUserFavorites(Search_Results_SHOW);
      //let massages_container = document.getElementById('massages_container')
      //notification_check(massages_container);
    const watchlistInterval = setInterval(auto_check_watchlist, 5000);
}else{
      logout_btn.click();
}


async  function auto_check_watchlist (){
    let email = localStorage.getItem('user_email');
    let serverResponse = await fetch(Database_location, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `action=getWatchlist&email=${encodeURIComponent(email)}`
    });
    const serverData = await serverResponse.json();
    if(serverData.massage !== 'Error fetching'){
        let watchlist_local = localStorage.getItem('user_watchlist');
        if(watchlist_local !== serverData.massage){
               localStorage.setItem("user_watchlist", serverData.massage);
               getUserFavorites(Search_Results_SHOW);
        }
    }
}



async function getUserFavorites(passed_function) {
    let watchlist = localStorage.getItem('user_watchlist');
    if(watchlist){
      let watchlist_array = JSON.parse(watchlist);
      passed_function(watchlist_array);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






function switchTab(tabName) {
  // Hide all containers
  document.getElementById("profile_container").style.display = 'none';
  document.getElementById("massages_container").style.display = 'none';
  document.getElementById("Watch_List_container").style.display = 'none';

  // Reset all tab colors
  show_profile.style.color = 'var(--global-color-fg)';
  show_messages.style.color = 'var(--global-color-fg)';
  show_watchlist.style.color = 'var(--global-color-fg)';

  // Show selected container and set its tab color
  switch(tabName) {
    case 'profile':
      document.getElementById("profile_container").style.display = 'flex';
      show_profile.style.color = 'var(--Brand_Color)';
      break;
    case 'messages':
      document.getElementById("massages_container").style.display = 'flex';
      show_messages.style.color = 'var(--Brand_Color)';
      break;
    case 'watchlist':
      document.getElementById("Watch_List_container").style.display = 'flex';
      show_watchlist.style.color = 'var(--Brand_Color)';
      break;
  }

  localStorage.setItem('activeTab', tabName);   // Save the active tab to localStorage

}

show_profile.addEventListener("click", function() {
  switchTab('profile');
});

show_messages.addEventListener("click", function() {
  switchTab('messages');
});

show_watchlist.addEventListener("click", function() {
  switchTab('watchlist');
});

// On page load, check for saved tab state
document.addEventListener('DOMContentLoaded', function() {
  const activeTab = localStorage.getItem('activeTab') || 'profile'; // default to profile
  switchTab(activeTab);
});


let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 200;

const containers = [
  document.getElementById("profile_container"),
  document.getElementById("massages_container"),
  document.getElementById("Watch_List_container")
];

containers.forEach(container => {
  if (container) {
    container.addEventListener('touchstart', handleTouchStart, false);
    container.addEventListener('touchend', handleTouchEnd, false);
  }
});

function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  if (Math.abs(deltaX) > swipeThreshold) {
    const activeTab = localStorage.getItem('activeTab') || 'profile';

    if (deltaX > 0) {
      // Swipe right - go to previous tab
      switch(activeTab) {
        case 'messages':
          switchTab('profile');
          break;
        case 'watchlist':
          switchTab('messages');
          break;
      }
    } else {
      // Swipe left - go to next tab
      switch(activeTab) {
        case 'profile':
          switchTab('messages');
          break;
        case 'messages':
          switchTab('watchlist');
          break;
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("E_M_A").innerHTML = localStorage.getItem('user_email')
document.getElementById("Y_N").innerHTML = localStorage.getItem('user_name')
document.getElementById("J_D").innerHTML = localStorage.getItem('user_joined')

document.getElementById("User_Image_show").style.background = `url(${localStorage.getItem('user_profile_img')})`;
document.getElementById("User_Image_show").style.backgroundSize = '100% 100%';
document.getElementById("User_Image_show").style.backgroundPosition = 'center';
document.getElementById("User_Image_show").style.backgroundRepeat = 'no-repeat';

let Change_password = false;
document.getElementById("Change_password").addEventListener("click", function() {

   if(Change_password){
       document.getElementById("N_P").style.display = 'none';
        document.getElementById("N_P_I").style.display = 'none';
        document.getElementById("C_N_P").style.display = 'none';
        document.getElementById("C_N_P_I").style.display = 'none';
        document.getElementById("C_P_SAVE").style.display = 'none';
   }else{
     document.getElementById("N_P").style.display = 'flex';
        document.getElementById("N_P_I").style.display = 'flex';
        document.getElementById("C_N_P").style.display = 'flex';
        document.getElementById("C_N_P_I").style.display = 'flex';
        document.getElementById("C_P_SAVE").style.display = 'flex';
   }
   Change_password = !Change_password;

});

document.getElementById("C_P_SAVE").addEventListener("click", async function(e)  {
          e.preventDefault();

         let p_1 = document.getElementById('N_P_I').value.trim();
         let p_2 = document.getElementById('C_N_P_I').value.trim();
         messageDiv =  document.getElementById('profile_msm');

         if (!p_1 || !p_2 ) {
               messageDiv.textContent = 'All two fields are required';
               return;
         }

         if (p_1 !== p_2) {
               messageDiv.textContent = 'Passwords do not match';
               return;
         }

        let user_email =  localStorage.getItem('user_email')
        const response = await fetch(Database_location, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
              },
        body: `action=updatePass&password=${encodeURIComponent(p_1)}&email=${encodeURIComponent(user_email)}`
        });

         const data = await response.json();


         messageDiv.textContent = data.message;
         if(data.message === "Password Changed "){
            document.getElementById('N_P_I').value = ''
            document.getElementById('C_N_P_I').value = ''
         }
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Search_Results_SHOW(movies) {
  //console.log(movies);
  search_R_div.innerHTML = "";
  movies.forEach((movie) => {
  let { title, original_name, poster_path, id, vote_average, release_date, first_air_date , runtime, S_info} = movie;
    //console.log(movie);
    //console.log('\n original_title: ', title, '\n original_name: ', original_name, '\n poster_path: ', poster_path, '\n id: ', id, '\n vote_average: ', vote_average, '\n overview: ', overview, '\n release_date: ', release_date, '\n first_air_date: ', first_air_date , '\n runtime: ', runtime, '\n S_info: ', S_info);

    let Box_title;
    let type;
    let info;
    let date;
    let r_type;

    if (S_info) {
        Box_title = original_name;
        date = first_air_date.substring(0, 4) || null;
        type = "tv";
        r_type= 'tv'
        info =  S_info ? S_info : '';
    } else {
       Box_title = title;
       date = release_date && typeof release_date === 'string' ? release_date.substring(0, 4) : release_date;
       type = "mv";
       r_type= 'movie'
       info = `${runtime} min` ;
    }

    if(!poster_path.startsWith('https')){
        poster_path = IMG_PATH + poster_path
    }

    const movieItem = document.createElement("div");
    movieItem.classList.add("box");
    movieItem.innerHTML = `

             <div class="box-img">
                <div class='remove_fave'>X</div>
                <img class="img-on" src="${poster_path}"  loading="lazy" alt="">
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
    movieItem.addEventListener("click", async (e) => {
         e.stopPropagation();
         window.location.href = "watch.html?id=" + id + "&type="+r_type;
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


 async function RemoveFromFav(itemIdToRemove, passed_function){
    let email = localStorage.getItem('user_email');

    let saved_Favorites_Data = JSON.parse(localStorage.getItem('user_watchlist'));
    saved_Favorites_Data = saved_Favorites_Data.filter(movie => movie.id !== itemIdToRemove);
    passed_function(saved_Favorites_Data);
    localStorage.setItem("user_watchlist", JSON.stringify(saved_Favorites_Data));
    let watchlist_new =  JSON.stringify(saved_Favorites_Data);

    let response = await fetch(Database_location, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
          },
    body: `action=updateWatchlist&email=${encodeURIComponent(email)}&watchlist=${encodeURIComponent(watchlist_new)}`
    });
    //const data = await response.json();

     try{
        let notification_track = JSON.parse(localStorage.getItem('user_massages') || '[]');
        console.log(notification_track)
        notification_track = notification_track.filter(movie => movie[2] !== itemIdToRemove);
        //console.log(notification_track)
        //console.log(JSON.stringify(notification_track))


        let response_note = await fetch(Database_location, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=updateMassagelist&email=${encodeURIComponent(email)}&Messages=${encodeURIComponent(JSON.stringify(notification_track))}`
        });
        localStorage.setItem("user_massages", JSON.stringify(notification_track));
    }catch(error){console.log(error)}

 }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("User_Image_input").addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    image_bite(file);
    const reader = new FileReader();
    reader.onload = (e) => {
        const uploadedImageURL = e.target.result;
        //image_bite(uploadedImageURL);
    };
   reader.readAsDataURL(file);
});

 async function image_bite(file){
        let user_email = localStorage.getItem('user_email');
        const formData = new FormData();
        formData.append('action', 'updateImg');
        formData.append('image', file); // Send the file directly
        formData.append('email', localStorage.getItem('user_email'));


     const response = await fetch(Database_location, {
        method: 'POST',
        body: formData
     });
     //console.log(response)
     const data = await response.json();
     //console.log(data)

     if(data.message === 'Profile Updated') {
            document.getElementById("User_Image_show").style.backgroundImage = `url(${data.imagedata})`;
            localStorage.setItem('user_profile_img', data.imagedata);
            // console.log(localStorage.getItem('user_profile_img'))
            document.getElementById("Account_btnT").style.background =  `url(${data.imagedata})`;
            document.getElementById("Account_btnT").style.backgroundSize = '100% 100%';
            document.getElementById("Account_btnT").style.backgroundPosition = 'center';
            document.getElementById("Account_btnT").style.backgroundRepeat = 'no-repeat';
     }
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function download_initiate(name){


  if(name === "android"){
    let url = "https://github.com/n-h-e-z-r-o-n/movie-app-website/raw/refs/heads/main/APPS/onyx.apk";
    const anchor = document.createElement("a");
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }else if(name === "Linux"){

  }else if(name === "Tv"){

  }else if(name === "windows"){
        let url = "https://github.com/n-h-e-z-r-o-n/movie-app-website/raw/refs/heads/main/APPS/movionyx.exe";
        const anchor = document.createElement("a");
        anchor.href = url;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
  }


}













