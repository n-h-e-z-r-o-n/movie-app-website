const search_R_div = document.getElementById("Watch_List_container");
const logout_btn = document.getElementById("logout_btn");

const xr = document.getElementById("Account_btn");
const xr2 = document.getElementById("Account_btnT");
xr.style.pointerEvents = 'none';
xr2.style.pointerEvents = 'none';

// var Database_location = 'https://movionyx.com/Database/database.php' // Deprecated

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
let U_ID = localStorage.getItem("U_ID");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

logout_btn.addEventListener("click", async function () {
  try {
    await fetch('http://127.0.0.1:8668/logout', { method: 'POST' });
  } catch (e) {
    console.error("Logout failed on server", e);
  }

  sessionStorage.clear();
  localStorage.removeItem('U_ID')
  localStorage.removeItem('user_email')
  localStorage.removeItem('user_name')
  localStorage.removeItem('user_watchlist')
  localStorage.removeItem('user_massages')
  localStorage.removeItem('user_profile_img')

  window.location.href = "Home.html";
});

if (U_ID) {
  getUserFavorites(Search_Results_SHOW);
  //let massages_container = document.getElementById('massages_container')
  //notification_check(massages_container);
  const watchlistInterval = setInterval(auto_check_watchlist, 5000);
} else {
  logout_btn.click();
}


async function auto_check_watchlist() {
  let email = localStorage.getItem('user_email');
  /*
  let serverResponse = await fetch(Database_location, {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `action=getWatchlist&email=${encodeURIComponent(email)}`
  });
  const serverData = await serverResponse.json();
  */
  const serverData = await db.getWatchlist(email);

  if (serverData.massage !== 'Error fetching') {
    let watchlist_local = localStorage.getItem('user_watchlist');
    if (watchlist_local !== serverData.massage) {
      localStorage.setItem("user_watchlist", serverData.massage);
      getUserFavorites(Search_Results_SHOW);
    }
  }
}



async function getUserFavorites(passed_function) {
  let watchlist = localStorage.getItem('user_watchlist');
  if (watchlist) {
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
  switch (tabName) {
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

show_profile.addEventListener("click", function () {
  switchTab('profile');
});

show_messages.addEventListener("click", function () {
  switchTab('messages');
});

show_watchlist.addEventListener("click", function () {
  switchTab('watchlist');
});

// On page load, check for saved tab state
document.addEventListener('DOMContentLoaded', function () {
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
      switch (activeTab) {
        case 'messages':
          switchTab('profile');
          break;
        case 'watchlist':
          switchTab('messages');
          break;
      }
    } else {
      // Swipe left - go to next tab
      switch (activeTab) {
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

// Initialize Name Input
const nameInput = document.getElementById("Y_N_Input");
if (nameInput) {
  nameInput.value = localStorage.getItem('user_name') || "";
}

document.getElementById("User_Image_show").style.background = `url(${localStorage.getItem('user_profile_img')})`;
document.getElementById("User_Image_show").style.backgroundSize = '100% 100%';
document.getElementById("User_Image_show").style.backgroundPosition = 'center';
document.getElementById("User_Image_show").style.backgroundRepeat = 'no-repeat';

// SAVE PROFILE BUTTON LOGIC
const saveBtn = document.getElementById("Save_Profile_Btn");
if (saveBtn) {
  saveBtn.addEventListener("click", async function () {
    const newName = document.getElementById("Y_N_Input").value.trim();
    const messageDiv = document.getElementById("profile_msm");
    const userId = localStorage.getItem('user_id_pk');

    if (!newName) {
      messageDiv.textContent = "Name cannot be empty";
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8668/updateProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          id: userId,
          name: newName,
          ProfileIMG: localStorage.getItem('user_profile_img') // Keep existing image
        })
      });
      const data = await response.json();

      if (data.massage && data.massage.id) {
        // Success
        messageDiv.textContent = "Profile Updated Successfully";
        messageDiv.style.color = "lightgreen";

        // Update LocalStorage
        localStorage.setItem('user_name', data.massage.name);
        localStorage.setItem('user_profile_img', data.massage.ProfileIMG);

        setTimeout(() => {
          messageDiv.textContent = "";
        }, 2000);
      } else {
        messageDiv.textContent = "Update Failed: " + (data.massage || "Unknown error");
        messageDiv.style.color = "red";
      }

    } catch (e) {
      console.error(e);
      messageDiv.textContent = "Network Error";
    }
  });
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BACKUP AND RESTORE LOGIC
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const backup_btn = document.getElementById('backup_btn');
if (backup_btn) {
  backup_btn.addEventListener('click', async () => {
    const data = await db.exportDatabase();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movionyx_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

const restore_btn_trigger = document.getElementById('restore_btn_trigger');
if (restore_btn_trigger) {
  restore_btn_trigger.addEventListener('click', () => {
    document.getElementById('restore_file_input').click();
  });
}

const restore_file_input = document.getElementById('restore_file_input');
if (restore_file_input) {
  restore_file_input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const jsonString = e.target.result;
      const result = await db.importDatabase(jsonString);
      alert(result.massage);
      if (result.massage === 'Database imported successfully') {
        // Reload to apply changes (e.g. login state might change)
        location.reload();
      }
    };
    reader.readAsText(file);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Search_Results_SHOW(movies) {
  //console.log(movies);
  search_R_div.innerHTML = "";
  movies.forEach((movie) => {
    let { title, original_name, poster_path, id, vote_average, release_date, first_air_date, runtime, S_info } = movie;
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
      r_type = 'tv'
      info = S_info ? S_info : '';
    } else {
      Box_title = title;
      date = release_date && typeof release_date === 'string' ? release_date.substring(0, 4) : release_date;
      type = "mv";
      r_type = 'movie'
      info = `${runtime} min`;
    }

    if (!poster_path.startsWith('https')) {
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
      window.location.href = "watch.html?id=" + id + "&type=" + r_type;
    });

    const FaveButton = movieItem.querySelector(".remove_fave");
    FaveButton.addEventListener("click", function (event) {
      event.stopPropagation();
      RemoveFromFav(id, Search_Results_SHOW);
    });

    search_R_div.appendChild(movieItem);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function RemoveFromFav(itemIdToRemove, passed_function) {
  let email = localStorage.getItem('user_email');

  let saved_Favorites_Data = JSON.parse(localStorage.getItem('user_watchlist'));
  saved_Favorites_Data = saved_Favorites_Data.filter(movie => movie.id !== itemIdToRemove);
  passed_function(saved_Favorites_Data);
  localStorage.setItem("user_watchlist", JSON.stringify(saved_Favorites_Data));
  let watchlist_new = JSON.stringify(saved_Favorites_Data);

  /*
  let response = await fetch(Database_location, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
        },
  body: `action=updateWatchlist&email=${encodeURIComponent(email)}&watchlist=${encodeURIComponent(watchlist_new)}`
  });
  */
  const data = await db.updateWatchlist(email, watchlist_new);


  try {
    let notification_track = JSON.parse(localStorage.getItem('user_massages') || '[]');
    console.log(notification_track)
    notification_track = notification_track.filter(movie => movie[2] !== itemIdToRemove);
    //console.log(notification_track)
    //console.log(JSON.stringify(notification_track))


    /*
    let response_note = await fetch(Database_location, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `action=updateMassagelist&email=${encodeURIComponent(email)}&Messages=${encodeURIComponent(JSON.stringify(notification_track))}`
    });
    */
    const data_note = await db.updateMassagelist(email, JSON.stringify(notification_track));

    localStorage.setItem("user_massages", JSON.stringify(notification_track));
  } catch (error) { console.log(error) }

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

async function image_bite(file) {
  let user_email = localStorage.getItem('user_email');
  const userId = localStorage.getItem('user_id_pk');

  // Convert to Base64
  const reader = new FileReader();
  reader.onload = async function (e) {
    const base64Image = e.target.result;

    // Send update to server
    const response = await fetch('http://127.0.0.1:8668/updateProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        id: userId,
        name: localStorage.getItem('user_name'),
        ProfileIMG: base64Image
      })
    });
    const data = await response.json();

    if (data.massage && data.massage.id) {
      // Success
      document.getElementById("User_Image_show").style.background = `url(${base64Image})`;
      document.getElementById("User_Image_show").style.backgroundSize = '100% 100%';
      document.getElementById("User_Image_show").style.backgroundPosition = 'center';
      document.getElementById("User_Image_show").style.backgroundRepeat = 'no-repeat';

      localStorage.setItem('user_profile_img', base64Image);
      // Update NavBar icon
      const accountIcon = document.getElementById("Account_btnT");
      if (accountIcon) {
        accountIcon.style.background = `url(${base64Image})`;
        accountIcon.style.backgroundSize = 'cover';
      }
    } else {
      alert("Failed to update image: " + data.massage);
    }
  };
  reader.readAsDataURL(file);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function download_initiate(name) {


  if (name === "android") {
    let url = "https://github.com/n-h-e-z-r-o-n/movie-app-website/raw/refs/heads/main/APPS/onyx.apk";
    const anchor = document.createElement("a");
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } else if (name === "Linux") {

  } else if (name === "Tv") {

  } else if (name === "windows") {
    let url = "https://github.com/n-h-e-z-r-o-n/movie-app-website/raw/refs/heads/main/APPS/movionyx.exe";
    const anchor = document.createElement("a");
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }


}













