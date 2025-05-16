let firebase_app;
let firebase_database;
let firebase_auth;
let ref;  // Global ref
let set;  // Global set
let get;  // Global get
let update;  // Global update
let remove;  // Global remove
let signInWithEmailAndPassword
let signOut;
let sendPasswordResetEmail
async function initFirebase(){
        try{
                // Import Firebase modules
                const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js");
                const {  getAuth,  createUserWithEmailAndPassword: _createUserWithEmailAndPassword,  signInWithEmailAndPassword: _signInWithEmailAndPassword, sendPasswordResetEmail: _sendPasswordResetEmail}= await import("https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js");
                const { getDatabase, ref: _ref, set: _set, get: _get, update: _update, remove: _remove } = await import("https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js");
                const { sendEmailVerification }  = await import("https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js");
                const { signOut: _signOut } = await import("https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js");


                const firebaseConfig = {
                  apiKey: "AIzaSyBn_uXxdg8mPfiKh-Dyp06zPFKmqd-98JE",
                  authDomain: "movieonyx.firebaseapp.com",
                  databaseURL: "https://movieonyx-default-rtdb.asia-southeast1.firebasedatabase.app",
                  projectId: "movieonyx",
                  storageBucket: "movieonyx.firebasestorage.app",
                  messagingSenderId: "480212579476",
                  appId: "1:480212579476:web:9a40cebdb2abed92ae3081"
                };


                firebase_app = initializeApp(firebaseConfig); // Initialize Firebase
                firebase_database = getDatabase(firebase_app);  // Initialize Realtime Database
                firebase_auth = getAuth(firebase_app) // Initialize Authentication

                // Assign imported functions to global variables
                ref = _ref;
                set = _set;
                get = _get;
                update = _update;
                remove = _remove;
                signInWithEmailAndPassword = _signInWithEmailAndPassword;
                createUserWithEmailAndPassword = _createUserWithEmailAndPassword;
                sendPasswordResetEmail = _sendPasswordResetEmail;
                signOut = _signOut;

        }catch(error){}
}


initFirebase();




// Signup function /////////////////////////////////////////////////////////////////////////////////////////////////////

async function signup(email, password, username, container_, container) {
  container_.classList.add('loading_active');
  container.innerHTML = '';
  if (!firebase_app) {
        await initFirebase();
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebase_auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendVerificationEmail(user);     // Send verification email


    // Store additional user data
    await set(ref(firebase_database, 'users/' + user.uid), {

          // Basic Info
          email: email,
          Name: username,
          avatarUrl: '',
          bio: '',

          // Account Status
          accountCreated: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          premium_user: false,
          last_paid_date: '',
          emailVerified: false, // Track verification status

          // Watch Data
          favorites: [],
          watchedHistory: {
                movies: ['',''], // {movieId, timestamp, progress}
                shows: ['','']   // {showId, episodeId, timestamp}
          }

    });

    sessionStorage.setItem("U_ID", user.uid);
    window.location.href = "profile.html";

  } catch (error) {
        container_.classList.remove('loading_active');
        container.innerHTML = error.message
        console.error("Error signing up:", error.message);
  }
}

async function sendVerificationEmail(user) {

}


// Login function /////////////////////////////////////////////////////////////////////////////////////////////////////

async function login(email, password, container_, container) {
  container_.classList.add('loading_active');
  container.innerHTML = '';
  if (!firebase_app) {
        await initFirebase();
  }
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebase_auth,
      email,
      password
    );
    const user = userCredential.user;
    sessionStorage.setItem("U_ID", user.uid);
    window.location.href = "profile.html";
  }catch (error) {
    container.innerHTML = error.message
    container_.classList.remove('loading_active');
    console.error("Error logging in:", error.message);
    }
}

// Reset Password //////////////////////////////////////////////////////////////////////////////////////////////////////

async function Reset_Password(email, container_, container) {
  container_.classList.add('loading_active');
  container.innerHTML = '';
  if (!firebase_app) {
        await initFirebase();
  }
   try {
    await sendPasswordResetEmail(firebase_auth, email);
    container_.innerHTML = 'Password reset email sent successfully!';
    container_.style.background = 'transparent';
    container_.style.backdropFilter = 'blur(0px)';
    container_.style.paddingBottom = '15px;';
    container_.style.border = 'none';
    container_.style.color = 'gray';
    container_.classList.remove('loading_active');
   } catch (error) {
    container.innerHTML = error.message
    container_.classList.remove('loading_active');
  }
}

// User Logout /////////////////////////////////////////////////////////////////////////////////////////////////////////

async function User_logout() {
   if (!firebase_app) {
        await initFirebase();
  }
  signOut(firebase_auth).then(() => {
    // Clear all storage
    sessionStorage.removeItem("U_ID");
    localStorage.clear();
    sessionStorage.clear()
    firebase_auth.currentUser = null;
    window.location.href = "index.html";

  }).catch((error) => {
    //console.error("Error signing out:", error);
    window.location.href = "index.html";
  });
}

// Store - Retrieve user profile data ///////////////////////////////////////////////////////////////////////////////////
async function saveUserProfile(fav_list) {
  if (!firebase_app) {
        await initFirebase();
  }
  let U_ID = sessionStorage.getItem("U_ID");
  await set(ref(firebase_database, `users/${U_ID}/favorites`), fav_list);
}



async function getUserFavorites(passed_function) {
    if (!firebase_app) {
        await initFirebase();
    }
    let U_ID =  sessionStorage.getItem("U_ID");
    let Favorites_Data = localStorage.getItem('Favorites');
    let Local_fave = [];

    console.log('Favorites_Data_local_raw : ', Favorites_Data)
    if(Favorites_Data){
      Local_fave = JSON.parse(Favorites_Data);
    }
    //console.log('Favorites_Data_local_raw : ',  JSON.parse(Favorites_Data))
    //console.log('Favorites_Data_local : ', Local_fave)
    let saved_Favorites_Data = await get(ref(firebase_database, 'users/' + U_ID + '/favorites'));
    saved_Favorites_Data = saved_Favorites_Data.val() || []


    //console.log('Favorites_online : ', typeof(saved_Favorites_Data))
    if (Array.isArray(saved_Favorites_Data)) {
         Local_fave = Local_fave.concat(saved_Favorites_Data);
         const uniqueMovies = Local_fave.filter((movie, index, self) =>
          index === self.findIndex(m => m.id === movie.id)
         );

          passed_function(uniqueMovies);

          if (uniqueMovies.length > 0) {
             saveUserProfile(uniqueMovies);
          }
    }
    localStorage.removeItem('Favorites');
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check if user is admin
function checkAdminStatus(uid) {
  const adminRef = ref(firebase_database, 'admins/' + uid);
  onValue(adminRef, (snapshot) => {
    if (snapshot.val() === true) {
      // Show admin controls
      document.getElementById('adminPanel').style.display = 'block';
    }
  });
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
