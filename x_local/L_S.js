

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



 // Navigation between forms (optional)

var Login_container  = document.getElementById("Login_container");
var Register_container  = document.getElementById("Register_container");
var Forgot_password_container  = document.getElementById("Forgot_password_container");

var Register  = document.getElementById("Register");
var Forgot_password  = document.getElementById("Forgot_password");
var login_change  = document.getElementById("login_change");
var login_change1  = document.getElementById("login_change1");





Register.addEventListener("click", function() {
        Register_container.style.display = 'block';
        Login_container.style.display = 'none';
});


login_change.addEventListener("click", function() {
        Register_container.style.display = 'none';
        Login_container.style.display = 'block';
});


Forgot_password.addEventListener("click", function() {
        Login_container.style.display = 'none';
        Forgot_password_container.style.display = 'block';

});

login_change1.addEventListener("click", function() {
        Forgot_password_container.style.display = 'none';
        Login_container.style.display = 'block';

});





function setupFormLoggers() {

   const logo_img = document.querySelector('.logo');
   logo_img.addEventListener('click', function() {
         window.location.href = "index.html";
   });

  // Login Form --------------------------------------------------------------------------------------------------------
  const loginBtn = document.querySelector('.Login_btn');
  const loginUsername = document.getElementById('login_username');
  const loginPassword = document.getElementById('login_password');

  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        var login_error_display  = document.getElementById("login_error_display");
        var username = loginUsername.value;
        var password = loginPassword.value;
        login(username, password, loginBtn, login_error_display);

    });
  }

  // Register Form------------------------------------------------------------------------------------------------------
  const signUpBtn = document.querySelector('.Sign_up_btn');
  const registerInputs = document.querySelectorAll('.Register_container .input_form');

  if (signUpBtn) {
    signUpBtn.addEventListener('click', () => {
        var signup_error_display  = document.getElementById("signup_error_display");
        var username = registerInputs[0].value
        var email = registerInputs[1].value
        var password = registerInputs[2].value
        var confirmPassword = registerInputs[3].value

        signup(email, password, username, signUpBtn, signup_error_display)
        //console.log('Register Form Submitted:', registerData);
    });
  }

  // Forgot Password Form------------------------------------------------------------------------------------------------
  const forgotPasswordBtn = document.querySelector('.Forgot_password_btn');
  const forgotPasswordInput = document.querySelector('.Forgot_password_container .input_form');

  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', () => {
        var Forgot_display  = document.getElementById("Forgot_display");

        var email = forgotPasswordInput.value
        Reset_Password(email, forgotPasswordBtn, Forgot_display)

    });
  }

}

setupFormLoggers()



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
